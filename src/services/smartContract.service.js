import * as Bip39 from 'bip39';
import * as Nacl from 'tweetnacl';
import { Crypto, MemoryAccount, Node } from '@aeternity/aepp-sdk';
import Ae from '@aeternity/aepp-sdk/es/ae/universal';

const KEYPAIRS_KEY = 'keypairs_key';
const langMappings = {
  en: 1, hr: 2, es: 3, vi: 4,
};

class SmartContract {
  constructor() {
    this._bcData = null;
    this._keypairs = null;
  }

  /**
   * Get BC data
   * @return {null}
   */
  getBcData() {
    return this._bcData;
  }

  /**
   * Set BC data
   * @param data
   */
  setBcData(data) {
    this._bcData = data;
  }

  /**
   * Get keypairs from local storage or instance
   * @return {Object}
   */
  getKeypairs() {
    if (!this._keypairs) {
      const _keypairs = JSON.parse(localStorage.getItem(KEYPAIRS_KEY));
      if (_keypairs) {
        this._keypairs = Object.assign({}, _keypairs, {
          keypair: {
            secretKey: Object.values(_keypairs.keypair.secretKey),
            publicKey: Object.values(_keypairs.keypair.publicKey),
          },
        });
      }
    }

    return this._keypairs;
  }

  /**
   * Set keypairs to local storage and instance
   * @param keypairs
   */
  setKeypairs(keypairs) {
    this._keypairs = keypairs;
    localStorage.setItem(KEYPAIRS_KEY, JSON.stringify(keypairs));
  }

  /**
   * Remove keypairs from local storage
   */
  removeKeypairs() {
    localStorage.removeItem(KEYPAIRS_KEY);
  }

  /**
   * Create keypairs
   * @param email
   * @param password
   */
  createKeypairs({ email, password }) {
    // use email+pwd as seed to generate private key
    const seed = Bip39.mnemonicToSeedSync(email + password);
    const keypair = Nacl.sign.keyPair.fromSeed(seed.slice(0, 32));
    const secretKey = Buffer.from(keypair.secretKey)
      .toString('hex');
    const publicKey = `ak_${Crypto.encodeBase58Check(keypair.publicKey)}`;
    const keypairFormatted = {
      secretKey,
      publicKey,
    };
    const keypairs = {
      keypair,
      keypairFormatted,
    };
    this.setKeypairs(keypairs);
  }

  /**
   * Create BC data
   * @return {Promise<void>}
   */
  async createBcData() {
    const keypairs = this.getKeypairs();
    const node1 = await Node({
      url: process.env.VUE_APP_BC_URL,
      internalUrl: process.env.VUE_APP_BC_URL,
    });
    const acc1 = MemoryAccount({ keypair: keypairs.keypairFormatted });
    const client = await Ae({
      // This two params deprecated and will be remove in next major release
      url: process.env.VUE_APP_BC_URL,
      internalUrl: process.env.VUE_APP_BC_URL,
      // instead use
      nodes: [
        {
          name: 'node1',
          instance: node1,
        },
        // mode2
      ],
      compilerUrl: 'https://latest.compiler.aepps.com',
      accounts: [
        acc1,
      ],
    });

    const contractSourceStore = 'contract CryptoTaskStore =\n\n    record state = {\n        owner : address,\n        ct_logic : address,     //address of the logic contract that is allowed to modify the state (this contract)\n        locked : bool,          //when locked, contract owner can no longer update the logic contract address, only logic contract itself can do that (with the idea that this is done as a community action, through voting or a similar process)\n        profiles : map(int, profile),\n        tasks : map(int, task),\n        feedbacks : map(int, feedback),\n        lastTaskIndex : int,\n        lastProfileIndex : int,\n        lastFeedbackIndex : int,\n        keyToProfile : map(address, int) }        //NOT proof of profile ownership!!! Use profile.pubkey to check ownership\n\n    record profile = {\n        pubkey : address,           //public key of the profile owner, can be derived from a pwd based seed (key stretching)\n        pubkey_old : address,       //in case of unauthorized pwd change (centralized backend abuse), old public key (old pwd) still valid for a certain time period. during the same period withdrawals not possible\n        pwdChangedAtBlock : int,\n        pwdChangedBy : int,         //0 - default, 1 - pwd was changed by changePwd, 2 - pwd was changed by changePwdManaged, 3 - pwd was changed by resetPwd\n        clientInfoHash : string,    //hash of client role profile data\n        clientScore : int,          //sum of all ratings received so far as a client\n        clientNumJobs : int,        //total number of received feedbacks as a client\n        clientTasks : list(int),\n        flancerInfoHash : string,   //hash of flancer role profile data\n        flancerScore : int,         //sum of all ratings received so far as a flancer\n        flancerNumJobs : int,       //total number of received feedbacks as a flancer\n        flancerTasks : list(int),\n        active : int,               //boolean, used by the platform to block users if needed, community management possible\n        managed : int,              //0 - user has full control, 1 - centralized backend is allowed to set a new pwd (in case user forgot pwd), 2 - centralized backend has full control\n        version : int,              //version can be used to define how the data is structured, for example what exactly is hashed to produce fields such as clientInfoHash etc.\n        local : int }               //localization: 1 - EN, 2 - HR, 3 - ES, 4 - VN...\n\n    record task = {\n        client : int,\n        infoHash : string,                  //hash of task data: title, description etc.\n        status : int,                       //CREATED: 0, FILLED: 1, ACCEPTING: 2\n        published : int,                    //boolean, used by the platform to block tasks if needed, community management possible\n        //application section START\n        //application can be in ACCEPTED while an individual milestone can be FINISHED. If a milestone is CANCELED or REJECTED then so is the whole application\n        applicationStage : map(int, int),   //profile index to -> CREATED: 0, ACCEPTED: 1, FINISHED: 2, CANCELED: 3 (flancer cancelled), REJECTED: 4 (client cancelled)\n        appliedList : map(int, int),        //list of profile indexes of applied freelancers\n        lastAppliedIndex : int,\n        acceptedList : map(int, int),       //list of profile indexes of accepted freelancers\n        lastAcceptedIndex : int,\n        //milestone mappings START here\n        //profile_index*10 + milestone_index\n        //each application can have max 10 milestones, ie flancer1 would have milestones as indices 10 to 19, flancer2 20-29 etc\n        mstoneWorkplan : map(int, string),        //(profile_index*10 + milestone_index) to milestoneWorkplan\n        mstoneValue : map(int, int),\n        mstoneWorkTime : map(int, int),\n        mstoneEscrow : map(int, int),             //(profile_index*10 + milestone_index) to boolean\n        mstoneStage : map(int, int),              //CREATED: 0, ACCEPTED: 1, FINISHED: 2, CANCELED: 3 (flancer cancelled), REJECTED: 4 (client cancelled)\n        mstoneSolution : map(int, string),\n        //milestone mappings END here\n        feedbacks : map(int, int),                //profile index to feedback\n        //application section END\n        version : int,\n        local : int }                             //localization: 1 - EN, 2 - HR, 3 - ES, 4 - VN...\n\n    record feedback = {\n        taskID : int,\n        flancer : int,\n        clientsScore : int,     //rating that client received\n        clientsText : string,   //text that client received\n        flancersScore : int,    //rating that flancer received\n        flancersText : string,  //text that flancer received\n        version : int }\n\n\n\n    public stateful entrypoint init() = {\n        owner = Call.caller,\n        ct_logic = Call.caller,\n        locked = false,\n        profiles = {},\n        tasks = {},\n        feedbacks = {},\n        lastTaskIndex = 0,\n        lastProfileIndex = 0,\n        lastFeedbackIndex = 0,\n        keyToProfile = {} }\n\n\n    public stateful entrypoint setCtLogic(logic_address : address) = \n        require(state.ct_logic == Call.caller || (state.owner == Call.caller && !state.locked), "Caller needs to be the logic contract or owner if the state contract is still unlocked")\n        put(state{ct_logic = logic_address})\n\n    public stateful entrypoint lock() = \n        require(state.owner == Call.caller && !state.locked, "Caller needs to be the owner")\n        put(state{locked = true})\n\n\n \n    public stateful entrypoint setTask(index : int, client : int, infoHash : string, status : int, published : int, version : int, local : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n\n        let new_task : task = {\n            client = client,\n            infoHash = infoHash,\n            status = status,\n            published = published,\n            applicationStage = {},\n            appliedList = {},\n            lastAppliedIndex = 0,\n            acceptedList = {},\n            lastAcceptedIndex = 0,\n            mstoneWorkplan = {},\n            mstoneValue = {},\n            mstoneWorkTime = {},\n            mstoneEscrow = {},\n            mstoneStage = {},\n            mstoneSolution = {},\n            feedbacks = {},\n            version = version,\n            local = local }\n\n        put(state{tasks[index] = new_task})\n\n    public stateful entrypoint setTaskInfoHash(index : int, infoHash : string) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{tasks[index].infoHash = infoHash})\n\n    public stateful entrypoint setTaskStatus(index : int, status : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{tasks[index].status = status})\n\n    public stateful entrypoint setTaskPublished(index : int, published : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{tasks[index].published = published})\n\n    public stateful entrypoint setTaskApplicationStage(index : int, flancer : int, applicationStage : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{tasks[index].applicationStage[flancer] = applicationStage})\n\n    public stateful entrypoint setTaskAppliedList(index : int, appliedListIndex : int, flancer : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{tasks[index].appliedList[appliedListIndex] = flancer })\n\n    public stateful entrypoint setTaskLastAppliedIndex(index : int, lastAppliedIndex : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{tasks[index].lastAppliedIndex = lastAppliedIndex })\n\n    public stateful entrypoint setTaskAcceptedList(index : int, acceptedListIndex : int, flancer : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{tasks[index].acceptedList[acceptedListIndex] = flancer })\n\n    public stateful entrypoint setTaskLastAcceptedIndex(index : int, lastAcceptedIndex : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{tasks[index].lastAcceptedIndex = lastAcceptedIndex })\n\n    public stateful entrypoint setTaskMstoneWorkplan(index : int, flancer : int, mstoneWorkplan : string) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{tasks[index].mstoneWorkplan[flancer] = mstoneWorkplan})\n\n    public stateful entrypoint setTaskMstoneValue(index : int, flancer : int, mstoneValue : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{tasks[index].mstoneValue[flancer] = mstoneValue})\n\n    public stateful entrypoint setTaskMstoneWorkTime(index : int, flancer : int, mstoneWorkTime : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{tasks[index].mstoneWorkTime[flancer] = mstoneWorkTime})\n\n    public stateful entrypoint setTaskMstoneEscrow(index : int, flancer : int, mstoneEscrow : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{tasks[index].mstoneEscrow[flancer] = mstoneEscrow})\n\n    public stateful entrypoint setTaskMstoneStage(index : int, flancer : int, mstoneStage : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{tasks[index].mstoneStage[flancer] = mstoneStage})\n\n    public stateful entrypoint setTaskMstoneSolution(index : int, flancer : int, mstoneSolution : string) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{tasks[index].mstoneSolution[flancer] = mstoneSolution})\n\n    public stateful entrypoint setTaskFeedback(index : int, flancer : int, feedback : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{tasks[index].feedbacks[flancer] = feedback})\n\n    public stateful entrypoint setTaskVersion(index : int, version : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{tasks[index].version = version})\n\n    public stateful entrypoint setTaskLocal(index : int, local : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{tasks[index].local = local})\n\n\n    public stateful entrypoint setProfile(index : int, pubkey : address, clientInfoHash : string, flancerInfoHash : string, active : int, managed : int, version : int, local : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n\n        let new_profile : profile = {\n            pubkey = pubkey,\n            pubkey_old = pubkey,\n            pwdChangedAtBlock = 0,\n            pwdChangedBy = 0,\n            clientInfoHash = clientInfoHash,\n            clientScore = 0,\n            clientNumJobs = 0,\n            clientTasks = [],\n            flancerInfoHash = flancerInfoHash,\n            flancerScore = 0,\n            flancerNumJobs = 0,\n            flancerTasks = [],\n            active = active,\n            managed = managed,\n            version = version,\n            local = local }\n\n        put(state{profiles[index] = new_profile})\n\n    public stateful entrypoint setProfilePubkey(index : int, pubkey : address) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{profiles[index].pubkey = pubkey})\n\n    public stateful entrypoint setProfilePubkeyOld(index : int, pubkey_old : address) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{profiles[index].pubkey_old = pubkey_old})\n\n    public stateful entrypoint setProfilePwdChangedAtBlock(index : int, pwdChangedAtBlock : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{profiles[index].pwdChangedAtBlock = pwdChangedAtBlock})\n\n    public stateful entrypoint setProfilePwdChangedBy(index : int, pwdChangedBy : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{profiles[index].pwdChangedBy = pwdChangedBy})\n\n    public stateful entrypoint setProfileClientInfoHash(index : int, clientInfoHash : string) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{profiles[index].clientInfoHash = clientInfoHash})\n\n    public stateful entrypoint setProfileClientScore(index : int, clientScore : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{profiles[index].clientScore = clientScore})\n\n    public stateful entrypoint setProfileClientNumJobs(index : int, clientNumJobs : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{profiles[index].clientNumJobs = clientNumJobs})\n\n    public stateful entrypoint addProfileClientTask(index : int, task : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{profiles[index].clientTasks = state.profiles[index].clientTasks ++ [task]})\n\n    public stateful entrypoint setProfileFlancerInfoHash(index : int, flancerInfoHash : string) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{profiles[index].flancerInfoHash = flancerInfoHash})\n\n    public stateful entrypoint setProfileFlancerScore(index : int, flancerScore : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{profiles[index].flancerScore = flancerScore})\n\n    public stateful entrypoint setProfileFlancerNumJobs(index : int, flancerNumJobs : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{profiles[index].flancerNumJobs = flancerNumJobs})\n\n    public stateful entrypoint addProfileFlancerTask(index : int, task : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{profiles[index].flancerTasks = state.profiles[index].flancerTasks ++ [task]})\n\n    public stateful entrypoint setProfileActive(index : int, active : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{profiles[index].active = active})\n\n    public stateful entrypoint setProfileManaged(index : int, managed : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{profiles[index].managed = managed})\n\n    public stateful entrypoint setProfileVersion(index : int, version : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{profiles[index].version = version})\n\n    public stateful entrypoint setProfileLocal(index : int, local : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{profiles[index].local = local})\n\n\n    public stateful entrypoint setFeedback(index : int, taskID : int, flancer : int, clientsScore : int, clientsText : string, flancersScore : int, flancersText : string, version : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n\n        let new_feedback : feedback = {\n            taskID = taskID,\n            flancer = flancer,\n            clientsScore = clientsScore,\n            clientsText = clientsText,\n            flancersScore = flancersScore,\n            flancersText = flancersText,\n            version = version }\n\n        put(state{feedbacks[index] = new_feedback})\n\n\n\n    public entrypoint getOwner() =\n        state.owner\n\n    public entrypoint getCtLogic() =\n        state.ct_logic\n\n    public entrypoint isLocked() =\n        state.locked\n\n    public entrypoint getTask(index: int) =\n        state.tasks[index]\n\n    public entrypoint getLastTaskIndex() =\n        state.lastTaskIndex\n\n    public stateful entrypoint setLastTaskIndex(index : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{lastTaskIndex = index})\n\n    public entrypoint getProfile(index: int) =\n        state.profiles[index]\n\n    public entrypoint getLastProfileIndex() =\n        state.lastProfileIndex\n\n    public stateful entrypoint setLastProfileIndex(index : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{lastProfileIndex = index})\n\n    public entrypoint getFeedback(index: int) =\n        state.feedbacks[index]\n\n    public entrypoint getLastFeedbackIndex() =\n        state.lastFeedbackIndex\n\n    public stateful entrypoint setLastFeedbackIndex(index : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{lastFeedbackIndex = index})\n\n    public entrypoint getKeyToProfile(pubkey: address) =\n        state.keyToProfile[pubkey=0]\n\n    public stateful entrypoint setKeyToProfile(pubkey: address, index : int) =\n        require(state.ct_logic == Call.caller, "Caller needs to be the logic contract")\n        put(state{keyToProfile[pubkey] = index})\n\n';
    const contractStore = await client.getContractInstance(contractSourceStore, {
      contractAddress: process.env.VUE_APP_BC_ADDRESS_STORE,
    });
    const contractSourceLogic = 'contract CtStoreType =\n    record profile = {\n        pubkey : address,\n        pubkey_old : address,       //in case of unauthorized pwd change, old pwd still valid for a certain time period. during the same period withdrawals not possible\n        pwdChangedAtBlock : int,\n        pwdChangedBy : int,\n        clientInfoHash : string,\n        clientScore : int,\n        clientNumJobs : int,\n        clientTasks : list(int),\n        flancerInfoHash : string,\n        flancerScore : int,\n        flancerNumJobs : int,\n        flancerTasks : list(int),\n        active : int,\n        managed : int,\n        version : int,\n        local : int }\n\n    record task = {\n        client : int,\n        infoHash : string,\n        status : int,\n        published : int,\n        applicationStage : map(int, int),\n        appliedList : map(int, int),   //list of profile indexes of applied freelancers\n        lastAppliedIndex : int,\n        acceptedList : map(int, int),   //list of profile indexes of accepted freelancers\n        lastAcceptedIndex : int,\n        mstoneWorkplan : map(int, string),\n        mstoneValue : map(int, int),\n        mstoneWorkTime : map(int, int),\n        mstoneEscrow : map(int, int),        //boolean behaviour\n        mstoneStage : map(int, int),\n        mstoneSolution : map(int, string),\n        feedbacks : map(int, int),\n        version : int,\n        local : int }\n\n    record feedback = {\n        taskID : int,\n        flancer : int,\n        clientsScore : int,\n        clientsText : string,\n        flancersScore : int,\n        flancersText : string,\n        version : int }\n\n\n    entrypoint setCtLogic : address => unit\n    entrypoint setProfile : (int, address, string, string, int, int, int, int) => unit\n    entrypoint getProfile : int => profile\n    entrypoint getLastProfileIndex : () => int\n    entrypoint setLastProfileIndex : int => unit\n    entrypoint getKeyToProfile : address => int\n    entrypoint setKeyToProfile : (address, int) => unit\n    entrypoint setProfilePubkey : (int, address) => unit\n    entrypoint setProfilePubkeyOld : (int, address) => unit\n    entrypoint setProfilePwdChangedAtBlock : (int, int) => unit\n    entrypoint setProfilePwdChangedBy : (int, int) => unit\n    entrypoint setProfileClientInfoHash : (int, string) => unit\n    entrypoint addProfileClientTask : (int, int) => unit\n    entrypoint setProfileFlancerInfoHash : (int, string) => unit\n    entrypoint addProfileFlancerTask : (int, int) => unit\n    entrypoint setProfileClientScore : (int, int) => unit\n    entrypoint setProfileClientNumJobs : (int, int) => unit\n    entrypoint setProfileFlancerScore : (int, int) => unit\n    entrypoint setProfileFlancerNumJobs : (int, int) => unit\n    entrypoint setProfileManaged : (int, int) => unit\n    entrypoint setTask : (int, int, string, int, int, int, int) => unit\n    entrypoint getTask : int => task\n    entrypoint getLastTaskIndex : () => int\n    entrypoint setLastTaskIndex : int => unit\n    entrypoint setTaskInfoHash : (int, string) => unit\n    entrypoint setTaskStatus : (int, int) => unit\n    entrypoint setTaskApplicationStage : (int, int, int) => unit\n    entrypoint setTaskAppliedList : (int, int, int) => unit\n    entrypoint setTaskLastAppliedIndex : (int, int) => unit\n    entrypoint setTaskAcceptedList : (int, int, int) => unit\n    entrypoint setTaskLastAcceptedIndex : (int, int) => unit\n    entrypoint setTaskMstoneWorkplan : (int, int, string) => unit\n    entrypoint setTaskMstoneStage : (int, int, int) => unit\n    entrypoint setTaskFeedback : (int, int, int) => unit\n    entrypoint setFeedback : (int, int, int, int, string, int, string, int) => unit\n    entrypoint getFeedback : int => feedback\n    entrypoint getLastFeedbackIndex : () => int\n    entrypoint setLastFeedbackIndex : int => unit\n\n\n\ncontract CryptoTaskLogic =\n\n    record state = {\n        owner : address,\n        ct_store : CtStoreType,         //address of the storage contract\n        logicVersion : int,             //to protect against replay attacks if logic contract is updated to a new version and nonces start from 0 again\n        timePeriod : int,               //time period in blocks that needs to pass after the pwd change before funds can be withdrawn, also pwd reset possible within time period\n        nonces : map(address, int) }    //nonces are used because a centralized backend can be forwarding users\' signed messages (so that users don\'t need to worry about gas) - but this means nonces must be used on the contract level to protect against replay attacks\n\n\n    public stateful entrypoint init(store_address : CtStoreType, lv : int) = {\n        owner = Call.caller,\n        ct_store = store_address,\n        logicVersion = lv,\n        timePeriod = 1440,      //3 days assuming 3 minute block time\n        nonces = {} }\n\n\n    public entrypoint getOwner() =\n        state.owner\n\n    public entrypoint getCtStore() =\n        state.ct_store\n\n    public entrypoint getLogicVersion() =\n        state.logicVersion\n\n    public entrypoint getTimePeriod() =\n        state.timePeriod\n\n    public entrypoint getNonce(pubkey: address) =\n        state.nonces[pubkey=0]  \n\n\n    public stateful entrypoint signUp(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, clientInfoHash : string, flancerInfoHash : string, managed : int, local : int) =\n        //this check is used because centralized backend can be forwarding users\' signed calls. It is checked that all arguments and meta-arguments were signed by the provided pubkey\n        require(functionName == "signUp" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, String.concat(clientInfoHash, String.concat(flancerInfoHash, String.concat(Int.to_str(managed), Int.to_str(local) )))))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        require(state.ct_store.getKeyToProfile(pubkey) == 0, "Pubkey already in use")\n        let pi = state.ct_store.getLastProfileIndex() + 1\n        state.ct_store.setKeyToProfile(pubkey, pi)\n        state.ct_store.setProfile(pi, pubkey, clientInfoHash, flancerInfoHash, 1, managed, 1, local)\n        state.ct_store.setLastProfileIndex(pi)\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1}) \n\n        pi\n        \n\n    public stateful entrypoint editProfile(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, clientInfoHash : string, flancerInfoHash : string, managed : int) =\n        require(functionName == "editProfile" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, String.concat(clientInfoHash, String.concat(flancerInfoHash, Int.to_str(managed) ))))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        state.ct_store.setProfileClientInfoHash(pi, clientInfoHash)\n        state.ct_store.setProfileFlancerInfoHash(pi, flancerInfoHash)\n        state.ct_store.setProfileManaged(pi, managed)\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1})\n\n\n    public stateful entrypoint changePwd(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, pubkey_new : address) =\n        require(functionName == "changePwd" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, Address.to_str(pubkey_new)))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        require(state.ct_store.getKeyToProfile(pubkey_new) == 0, "New pubkey already in use")\n        require(Chain.block_height - profile.pwdChangedAtBlock > state.timePeriod, "Time period has not passed yet")\n\n        state.ct_store.setKeyToProfile(pubkey_new, pi)\n        state.ct_store.setProfilePubkeyOld(pi, pubkey)\n        state.ct_store.setProfilePubkey(pi, pubkey_new)\n        state.ct_store.setProfilePwdChangedAtBlock(pi, Chain.block_height)\n        state.ct_store.setProfilePwdChangedBy(pi, 1)\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1})\n\n\n    //centralized backend can change pwd for a managed account\n    public stateful entrypoint changePwdManaged(pi : int, pubkey_new : address) =\n        require(Call.caller == state.owner, "Only contract owner can call this function")\n        let profile = state.ct_store.getProfile(pi)\n        require(profile.managed > 0, "Profile needs to be in managed state")\n        require(state.ct_store.getKeyToProfile(pubkey_new) == 0, "New pubkey already in use")\n        require(Chain.block_height - profile.pwdChangedAtBlock > state.timePeriod, "Time period has not passed yet")\n\n        state.ct_store.setKeyToProfile(pubkey_new, pi)\n        state.ct_store.setProfilePubkeyOld(pi, profile.pubkey)\n        state.ct_store.setProfilePubkey(pi, pubkey_new)\n        state.ct_store.setProfilePwdChangedAtBlock(pi, Chain.block_height)\n        state.ct_store.setProfilePwdChangedBy(pi, 2)\n        \n\n    //reset to the old pwd if within the time period, used if user thinks that centralized backend abused changePwdManaged\n    public stateful entrypoint resetPwd(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string) =\n        require(functionName == "resetPwd" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), functionName)) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let pi = state.ct_store.getKeyToProfile(pubkey)\n        require(pi > 0, "Profile doesn\'t exist")\n        let profile = state.ct_store.getProfile(pi)\n        require(profile.pubkey_old == pubkey, "Profile was not owned by the transaction signer")\n        require(Chain.block_height - profile.pwdChangedAtBlock < state.timePeriod, "Time period has passed")\n        require(profile.pwdChangedBy == 2, "Pwd reset possible only after changePwdManaged")\n\n        state.ct_store.setKeyToProfile(pubkey, pi)\n        state.ct_store.setProfilePubkey(pi, pubkey)\n        state.ct_store.setProfilePwdChangedAtBlock(pi, Chain.block_height)\n        state.ct_store.setProfilePwdChangedBy(pi, 3)\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1})\n\n\n    public stateful entrypoint postTask(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, infoHash : string, local : int) =\n        require(functionName == "postTask" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, String.concat(infoHash, Int.to_str(local) )))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n\n        //for now cross localization posting is possible\n        //require(profile.local == local, "You can only post tasks in your own localization")     //cross localization posting not possible\n\n        let ti = state.ct_store.getLastTaskIndex() + 1\n        state.ct_store.setTask(ti, pi, infoHash, 0, 1, 1, local)\n        state.ct_store.setLastTaskIndex(ti)\n\n        state.ct_store.addProfileClientTask(pi, ti)\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1}) \n\n        ti\n\n\n    public stateful entrypoint editTask(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, ti : int, infoHash : string) =\n        require(functionName == "editTask" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, String.concat(Int.to_str(ti), infoHash)))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        let task = state.ct_store.getTask(ti)\n        require(task.client == pi, "You can only edit your own tasks")\n\n        //mstoneWorkplan is binding, task info is non-binding\n        //require(task.lastAppliedIndex == 0, "You can only edit tasks that no freelancers have applied to")\n\n        state.ct_store.setTaskInfoHash(ti, infoHash)\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1}) \n\n\n    //no new freelancer applications, status 1 (filled) indicates the task is not open to freelancer applications\n    public stateful entrypoint closeApplications(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, ti : int) =\n        require(functionName == "closeApplications" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, Int.to_str(ti)))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        let task = state.ct_store.getTask(ti)\n        require(task.client == pi, "You can only close your own tasks")\n\n        state.ct_store.setTaskStatus(ti, 1)\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1})\n\n\n    //reopen task for applications\n    public stateful entrypoint reopenApplications(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, ti : int) =\n        require(functionName == "reopenApplications" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, Int.to_str(ti)))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        let task = state.ct_store.getTask(ti)\n        require(task.client == pi, "You can only reopen your own tasks")\n        require(task.status == 1, "Task needs to be in filled status")\n\n        state.ct_store.setTaskStatus(ti, 2)\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1})\n\n\n    public stateful entrypoint applyForTask(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, ti : int) =\n        require(functionName == "applyForTask" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, Int.to_str(ti) ))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        require(profile.flancerInfoHash != "", "User doesn\'t have the freelancer profile set")\n        let task = state.ct_store.getTask(ti)\n        require(task.client != pi, "You cannot apply on your own tasks")\n        require(task.applicationStage[pi=999] == 999, "User already applied")\n        require(task.status == 0 || task.status == 2, "Task needs to be opened to applications")    //0 means created, 2 means reopened to applications\n\n        let li = task.lastAppliedIndex + 1\n        state.ct_store.setTaskAppliedList(ti, li, pi)\n        state.ct_store.setTaskLastAppliedIndex(ti, li)\n        state.ct_store.setTaskApplicationStage(ti, pi, 0)\n        state.ct_store.setTaskMstoneStage(ti, pi*10, 0)\n        //save current task infoHash as mstoneWorkplan (in case the client edits the task description later), as milestone0\n        state.ct_store.setTaskMstoneWorkplan(ti, pi*10, task.infoHash)\n\n        state.ct_store.addProfileFlancerTask(pi, ti)\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1}) \n\n\n    //limitted number of accepted flancers\n    //after accepting a flancer, task status set to 1 (filled) - indicates the task is not open to new freelancer applications, can be reopened later\n    public stateful entrypoint acceptForTask(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, ti : int, flancer : int) =\n        require(functionName == "acceptForTask" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, String.concat(Int.to_str(ti), Int.to_str(flancer) )))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        let task = state.ct_store.getTask(ti)\n        require(task.client == pi, "You can only accept freelancers for your own tasks")\n        require(task.applicationStage[flancer=999] == 0, "This freelancer has not applied")\n\n        let li = task.lastAcceptedIndex + 1\n        state.ct_store.setTaskAcceptedList(ti, li, flancer)\n        state.ct_store.setTaskLastAcceptedIndex(ti, li)\n        state.ct_store.setTaskApplicationStage(ti, flancer, 1)\n        state.ct_store.setTaskMstoneStage(ti, flancer*10, 1)\n\n        state.ct_store.setTaskStatus(ti, 1)\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1})\n\n\n    //client accepts flancer\'s work\n    public stateful entrypoint finalize(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, ti : int, flancer : int, flancersScore : int, flancersText : string) =\n        require(functionName == "finalize" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, String.concat(Int.to_str(ti), String.concat(Int.to_str(flancer), String.concat(Int.to_str(flancersScore), flancersText )))))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        let task = state.ct_store.getTask(ti)\n        require(task.client == pi, "You can only finalize applications on your own tasks")\n        require(task.applicationStage[flancer=999] == 1, "This freelancer is not working on this task")\n\n        state.ct_store.setTaskApplicationStage(ti, flancer, 2)\n        state.ct_store.setTaskMstoneStage(ti, flancer*10, 2)\n\n        let fi = state.ct_store.getLastFeedbackIndex() + 1\n        require(flancersScore >= 1 && flancersScore =< 5 && flancersText != "", "Feedback score must be 1 to 5 and text non empty")\n        state.ct_store.setFeedback(fi, ti, flancer, 0, "", flancersScore, flancersText, 1)\n        state.ct_store.setLastFeedbackIndex(fi)\n        state.ct_store.setTaskFeedback(ti, flancer, fi)\n        let profileFlancer = state.ct_store.getProfile(flancer)\n        state.ct_store.setProfileFlancerScore(flancer, profileFlancer.flancerScore + flancersScore)\n        state.ct_store.setProfileFlancerNumJobs(flancer, profileFlancer.flancerNumJobs + 1)\n\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1})\n\n        fi\n\n\n    //freelancer can cancel an active work contract (application)\n    public stateful entrypoint cancelContractFlancer(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, ti : int, clientsScore : int, clientsText : string) =\n        require(functionName == "cancelContractFlancer" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, String.concat(Int.to_str(ti), String.concat(Int.to_str(clientsScore), clientsText))))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        let task = state.ct_store.getTask(ti)\n        require(task.applicationStage[pi=999] == 1, "You are not working on this task")\n\n        state.ct_store.setTaskApplicationStage(ti, pi, 3)\n        state.ct_store.setTaskMstoneStage(ti, pi*10, 3)\n\n        let fi = state.ct_store.getLastFeedbackIndex() + 1\n        require(clientsScore >= 1 && clientsScore =< 5 && clientsText != "", "Feedback score must be 1 to 5 and text non empty")\n        state.ct_store.setFeedback(fi, ti, pi, clientsScore, clientsText, 0, "", 1)\n        state.ct_store.setLastFeedbackIndex(fi)\n        state.ct_store.setTaskFeedback(ti, pi, fi)\n        let profileClient = state.ct_store.getProfile(task.client)\n        state.ct_store.setProfileClientScore(task.client, profileClient.clientScore + clientsScore)\n        state.ct_store.setProfileClientNumJobs(task.client, profileClient.clientNumJobs + 1)\n\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1})\n\n        fi\n\n\n    //client can cancel an active work contract (application)\n    public stateful entrypoint cancelContractClient(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, ti : int, flancer : int, flancersScore : int, flancersText : string) =\n        require(functionName == "cancelContractClient" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, String.concat(Int.to_str(ti), String.concat(Int.to_str(flancer), String.concat(Int.to_str(flancersScore), flancersText )))))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        let task = state.ct_store.getTask(ti)\n        require(task.client == pi, "You can only cancel applications on your own tasks")\n        require(task.applicationStage[flancer=999] == 1, "This freelancer is not working on this task")\n\n        state.ct_store.setTaskApplicationStage(ti, flancer, 4)\n        state.ct_store.setTaskMstoneStage(ti, flancer*10, 4)\n\n        let fi = state.ct_store.getLastFeedbackIndex() + 1\n        require(flancersScore >= 1 && flancersScore =< 5 && flancersText != "", "Feedback score must be 1 to 5 and text non empty")\n        state.ct_store.setFeedback(fi, ti, flancer, 0, "", flancersScore, flancersText, 1)\n        state.ct_store.setLastFeedbackIndex(fi)\n        state.ct_store.setTaskFeedback(ti, flancer, fi)\n        let profileFlancer = state.ct_store.getProfile(flancer)\n        state.ct_store.setProfileFlancerScore(flancer, profileFlancer.flancerScore + flancersScore)\n        state.ct_store.setProfileFlancerNumJobs(flancer, profileFlancer.flancerNumJobs + 1)\n\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1})\n\n        fi\n\n\n    //client can leave feedback after flancer cancelled an active work contract (application)\n    public stateful entrypoint leaveFeedbackClient(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, ti : int, flancer : int, flancersScore : int, flancersText : string) =\n        require(functionName == "leaveFeedbackClient" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, String.concat(Int.to_str(ti), String.concat(Int.to_str(flancer), String.concat(Int.to_str(flancersScore), flancersText )))))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        let task = state.ct_store.getTask(ti)\n        require(task.client == pi, "You can only leave feedback on your own tasks")\n        require(task.applicationStage[flancer=999] == 3, "Freelancer has not cancelled this task")\n\n        let fi = task.feedbacks[flancer]\n        let feedback = state.ct_store.getFeedback(fi)\n        require(flancersScore >= 1 && flancersScore =< 5 && flancersText != "", "Feedback score must be 1 to 5 and text non empty")\n        require(feedback.flancersScore == 0, "Feedback was already set")\n        state.ct_store.setFeedback(fi, ti, flancer, feedback.clientsScore, feedback.clientsText, flancersScore, flancersText, 1)\n        let profileFlancer = state.ct_store.getProfile(flancer)\n        state.ct_store.setProfileFlancerScore(flancer, profileFlancer.flancerScore + flancersScore)\n        state.ct_store.setProfileFlancerNumJobs(flancer, profileFlancer.flancerNumJobs + 1)\n\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1})\n\n        fi\n\n\n    //flancer can leave feedback after client cancelled an active work contract (application)\n    public stateful entrypoint leaveFeedbackFlancer(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, ti : int, clientsScore : int, clientsText : string) =\n        require(functionName == "leaveFeedbackFlancer" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, String.concat(Int.to_str(ti), String.concat(Int.to_str(clientsScore), clientsText))))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        let task = state.ct_store.getTask(ti)\n        require(task.applicationStage[pi=999] == 2 || task.applicationStage[pi=999] == 4, "You have not been working on this task")\n\n        let fi = task.feedbacks[pi]\n        let feedback = state.ct_store.getFeedback(fi)\n        require(clientsScore >= 1 && clientsScore =< 5 && clientsText != "", "Feedback score must be 1 to 5 and text non empty")\n        require(feedback.clientsScore == 0, "Feedback was already set")\n        state.ct_store.setFeedback(fi, ti, pi, clientsScore, clientsText, feedback.flancersScore, feedback.flancersText, 1)\n        let profileClient = state.ct_store.getProfile(task.client)\n        state.ct_store.setProfileClientScore(task.client, profileClient.clientScore + clientsScore)\n        state.ct_store.setProfileClientNumJobs(task.client, profileClient.clientNumJobs + 1)\n\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1})\n\n        fi\n\n\n\n\n\n    /* "Escrowed" set of functions MUST be used if an application is to have multiple milestones.\n     It is possible to have a non-escrowed application with one milestone and it is also possible to have an escrowed application with one milestone.\n     It is NOT possible (nor needed) to have a non-escrowed application with multiple milestones. */\n    //TODO\n    //in case of escrowed tasks, client calls this function to hire a freelancer and at the same time sets work plan (duration etc) and escrow\n    //limitted number of accepted flancers\n    public stateful entrypoint acceptForTaskEscrowed() = { }\n\n    //TODO\n    //freelancer can decide whether to accept workplan suggested by the client, for escrowed tasks\n    public stateful entrypoint acceptWorkplanEscrowed() = { }\n\n    //TODO\n    //client accepts flancer\'s work and releases escrow\n    //flag to define whether to finalize just the milestone or also the whole application\n    public stateful entrypoint finalizeEscrowed() = { }\n\n    //TODO\n    //either client or freelancer can cancel an active work contract (application)\n    //if cancelled by flancer, client receives back the escrow. if cancelled by client, flancer can setSolutionEscrowed() and then startDisputeEscrowed()\n    public stateful entrypoint cancelContractEscrowed() = { }\n\n    //TODO\n    //if task was cancelled by client, flancer can set solution - chat-hash-chain (hash(msg+hash_prev(...))) and then startDisputeEscrowed()\n    public stateful entrypoint setSolutionEscrowed() = { }\n\n    //TODO\n    public stateful entrypoint startDisputeEscrowed() = { }\n\n    //TODO\n    public stateful entrypoint commitDisputeEscrowed() = { }\n\n\n\n    //TODO\n    //withdrawal not possible if pwd was changed recently, possible after timePeriod (unless if changed by resetPwd, pwdChangedBy == 3)\n    public stateful entrypoint withdraw() = { }\n\n    //ADVANCED / OPTIONAL\n    //withdrawal a 2 stage action, even if pwd hacked, user can call fullCustody\n    //any pwd change invalidates withdrawCommitFlag that was set in this function\n    //public stateful entrypoint withdrawCommit() = { }\n\n    //user can give centralized backend full custody over the account\n    //sets profile.managed = 2\n    //public stateful entrypoint fullCustody() = { }\n\n\n\n    private function getMyProfile(pubkey: address) =\n        let pi = state.ct_store.getKeyToProfile(pubkey)\n        require(pi > 0, "Profile doesn\'t exist")       \n        let profile = state.ct_store.getProfile(pi)\n        require(profile.pubkey == pubkey, "Profile not owned by the transaction signer")\n\n        (profile, pi)   //returns profile and profile index\n';
    const contractLogic = await client.getContractInstance(contractSourceLogic, {
      contractAddress: process.env.VUE_APP_BC_ADDRESS_LOGIC,
    });

    const { keypair } = keypairs;
    const { keypairFormatted } = keypairs;
    this.setBcData({
      client,
      contractStore,
      contractLogic,
      keypair,
      keypairFormatted,
    });
  }

  /**
   * Update freelancer properties with smart contract properties
   * @param {Object} freelancerData
   * @param {string} langCode
   * @return {Promise<any>}
   */
  async setFreelancerProperties(freelancerData, langCode) {
    const langIdBc = langMappings[langCode];

    const bcData = this.getBcData();
    console.log('bcdata', bcData);
    const flancerInfoHash = this.createFlancerInfoHash(freelancerData);
    const resNonce = await bcData.contractLogic.methods.getNonce(bcData.keypairFormatted.publicKey);
    const nonce = resNonce.decodedResult;
    console.log('nonce', nonce);

    const args = `${process.env.VUE_APP_BC_LOGIC_VERSION}${nonce.toString()}signUpnull${flancerInfoHash}1${langIdBc.toString()}`;
    console.log(args);
    const hash = Crypto.hash(args);
    console.log('hash', hash);
    const signedHash = Crypto.sign(hash, bcData.keypair.secretKey);
    console.log(signedHash);
    const sig = Buffer.from(signedHash)
      .toString('hex');
    console.log(sig);

    return Object.assign({}, freelancerData, {
      publicKey: bcData.keypairFormatted.publicKey,
      sig,
      logicVersion: process.env.VUE_APP_BC_LOGIC_VERSION,
      nonce,
      flancerInfoHash,
      langIdBc,
    });
  }

  /**
   * createFlancerInfoHash
   * @param {Object} freelancerData
   * @return {String} flancerInfoHash
   */
  createFlancerInfoHash(freelancerData) {
    return Buffer.from(Crypto.hash([freelancerData.name, freelancerData.bio].join('')))
      .toString('hex');
  }

  /**
   * Update client properties with smart contract properties
   * @param {Object} clientData
   * @param {string} langCode
   * @return {Promise<any>}
   */
  async setClientProperties(clientData, langCode) {
    const langIdBc = langMappings[langCode];

    const bcData = this.getBcData();
    console.log('bcdata', bcData);
    const clientInfoHash = this.createClientInfoHash(clientData);
    const resNonce = await bcData.contractLogic.methods.getNonce(bcData.keypairFormatted.publicKey);
    const nonce = resNonce.decodedResult;
    console.log('nonce', nonce);

    const args = `${process.env.VUE_APP_BC_LOGIC_VERSION}${nonce.toString()}signUp${clientInfoHash}null1${langIdBc.toString()}`;
    console.log(args);
    const hash = Crypto.hash(args);
    console.log('hash', hash);
    const signedHash = Crypto.sign(hash, bcData.keypair.secretKey);
    console.log(signedHash);
    const sig = Buffer.from(signedHash)
      .toString('hex');
    console.log(sig);

    return Object.assign({}, clientData, {
      publicKey: bcData.keypairFormatted.publicKey,
      sig,
      logicVersion: process.env.VUE_APP_BC_LOGIC_VERSION,
      nonce,
      clientInfoHash,
      langIdBc,
    });
  }

  /**
   * createClientInfoHash
   * @param {Object} clientData
   * @return {String} clientInfoHash
   */
  createClientInfoHash(clientData) {
    return Buffer.from(Crypto.hash([clientData.name, clientData.about].join('')))
      .toString('hex');
  }

  /**
   * Update task properties with smart contract properties
   * @param {Object} taskData
   * @param {string} langCode
   * @return {Promise<any>}
   */
  async setTaskProperties(taskData, langCode) {
    const langIdBc = langMappings[langCode];

    const bcData = this.getBcData();
    console.log('bcdata', bcData);
    const taskInfoHash = this.createTaskInfoHash(taskData);
    const resNonce = await bcData.contractLogic.methods.getNonce(bcData.keypairFormatted.publicKey);
    const nonce = resNonce.decodedResult;
    console.log('nonce', nonce);

    const args = `${process.env.VUE_APP_BC_LOGIC_VERSION}${nonce.toString()}postTask${taskInfoHash}${langIdBc.toString()}`;
    console.log(args);
    const hash = Crypto.hash(args);
    console.log('hash', hash);
    const signedHash = Crypto.sign(hash, bcData.keypair.secretKey);
    console.log(signedHash);
    const sig = Buffer.from(signedHash)
      .toString('hex');
    console.log(sig);

    return Object.assign({}, taskData, {
      publicKey: bcData.keypairFormatted.publicKey,
      sig,
      logicVersion: process.env.VUE_APP_BC_LOGIC_VERSION,
      nonce,
      taskInfoHash,
      langIdBc,
    });
  }

  /**
   * createTaskInfoHash
   * @param {Object} taskData
   * @return {String} taskInfoHash
   */
  createTaskInfoHash(taskData) {
    return Buffer.from(Crypto.hash([taskData.title, taskData.description].join('')))
      .toString('hex');
  }

  /**
   * Update application properties with smart contract properties
   * @param {Number} taskBcId
   * @return {Promise<any>}
   */
  async setApplicationProperties(taskBcId) {
    const bcData = this.getBcData();
    console.log('bcdata', bcData);
    const resNonce = await bcData.contractLogic.methods.getNonce(bcData.keypairFormatted.publicKey);
    const nonce = resNonce.decodedResult;
    console.log('nonce', nonce);

    const args = `${process.env.VUE_APP_BC_LOGIC_VERSION}${nonce.toString()}applyForTask${taskBcId}`;
    console.log(args);
    const hash = Crypto.hash(args);
    console.log('hash', hash);
    const signedHash = Crypto.sign(hash, bcData.keypair.secretKey);
    console.log(signedHash);
    const sig = Buffer.from(signedHash)
      .toString('hex');
    console.log(sig);

    return {
      publicKey: bcData.keypairFormatted.publicKey,
      sig,
      logicVersion: process.env.VUE_APP_BC_LOGIC_VERSION,
      nonce,
      taskBcId,
    };
  }

  /**
   * Update application hire properties with smart contract properties
   * @param {Number} taskBcId
   * @param {Number} flancerBcId
   * @return {Promise<any>}
   */
  async setHireProperties(taskBcId, flancerBcId) {
    const bcData = this.getBcData();
    console.log('bcdata', bcData);
    const resNonce = await bcData.contractLogic.methods.getNonce(bcData.keypairFormatted.publicKey);
    const nonce = resNonce.decodedResult;
    console.log('nonce', nonce);

    const args = `${process.env.VUE_APP_BC_LOGIC_VERSION}${nonce.toString()}acceptForTask${taskBcId}${flancerBcId}`;
    console.log(args);
    const hash = Crypto.hash(args);
    console.log('hash', hash);
    const signedHash = Crypto.sign(hash, bcData.keypair.secretKey);
    console.log(signedHash);
    const sig = Buffer.from(signedHash)
      .toString('hex');
    console.log(sig);

    return {
      publicKey: bcData.keypairFormatted.publicKey,
      sig,
      logicVersion: process.env.VUE_APP_BC_LOGIC_VERSION,
      nonce,
      taskBcId,
      flancerBcId,
    };
  }

  /**
   * Update application hire properties with smart contract properties
   * @param {Number} feedbackId
   * @param {Number} taskBcId
   * @param {Number} flancerBcId
   * @param {Number} rate
   * @param {String} message
   * @return {Promise<any>}
   */
  async setFinalizeProperties(feedbackId, taskBcId, flancerBcId, rate, message) {
    const bcData = this.getBcData();
    console.log('bcdata', bcData);
    const resNonce = await bcData.contractLogic.methods.getNonce(bcData.keypairFormatted.publicKey);
    const nonce = resNonce.decodedResult;
    console.log('nonce', nonce);

    const args = `${process.env.VUE_APP_BC_LOGIC_VERSION}${nonce.toString()}finalize${taskBcId}${flancerBcId}${rate}${message}`;
    console.log(args);
    const hash = Crypto.hash(args);
    console.log('hash', hash);
    const signedHash = Crypto.sign(hash, bcData.keypair.secretKey);
    console.log(signedHash);
    const sig = Buffer.from(signedHash)
      .toString('hex');
    console.log(sig);

    return {
      feedbackId,
      publicKey: bcData.keypairFormatted.publicKey,
      sig,
      logicVersion: process.env.VUE_APP_BC_LOGIC_VERSION,
      nonce,
      taskBcId,
      flancerBcId,
      rate,
      message,
    };
  }

  /**
   * Get task from smart contract by BC ID
   * @param bcId
   * @return {Promise<*>}
   */
  checkTaskBc(bcId) {
    const bcData = this.getBcData();
    return bcData.contractStore.methods.getTask(bcId);
  }
}

export default new SmartContract();
