import * as Bip39 from 'bip39';
import * as Nacl from 'tweetnacl';
import { Crypto, MemoryAccount, Node } from '@aeternity/aepp-sdk';
import Ae from '@aeternity/aepp-sdk/es/ae/universal';

const KEYPAIRS_KEY = 'keypairs_key';

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

    // const contractSource = fs.readFileSync('/home/slash/Desktop/vs3.aes', 'utf-8');
    // eslint-disable-next-line no-useless-escape
    const contractSource = 'contract CtStoreType =\n    record profile = {\n        pubkey : address,\n        pubkey_old : address,       //in case of unauthorized pwd change, old pwd still valid for a certain time period. during the same period withdrawals not possible\n        pwdChangedAtBlock : int,\n        pwdChangedBy : int,\n        clientInfoHash : string,\n        clientScore : int,\n        clientNumJobs : int,\n        clientTasks : list(int),\n        flancerInfoHash : string,\n        flancerScore : int,\n        flancerNumJobs : int,\n        flancerTasks : list(int),\n        active : int,\n        managed : int,\n        version : int,\n        local : int }\n\n    record task = {\n        client : int,\n        infoHash : string,\n        status : int,\n        published : int,\n        applicationStage : map(int, int),\n        appliedList : map(int, int),   //list of profile indexes of applied freelancers\n        lastAppliedIndex : int,\n        acceptedList : map(int, int),   //list of profile indexes of accepted freelancers\n        lastAcceptedIndex : int,\n        mstoneWorkplan : map(int, string),\n        mstoneValue : map(int, int),\n        mstoneWorkTime : map(int, int),\n        mstoneEscrow : map(int, int),        //boolean behaviour\n        mstoneStage : map(int, int),\n        mstoneSolution : map(int, string),\n        feedbacks : map(int, int),\n        version : int,\n        local : int }\n\n    record feedback = {\n        taskID : int,\n        flancer : int,\n        clientsScore : int,\n        clientsText : string,\n        flancersScore : int,\n        flancersText : string,\n        version : int }\n\n\n    entrypoint setCtLogic : address => unit\n    entrypoint setProfile : (int, address, string, string, int, int, int, int) => unit\n    entrypoint getProfile : int => profile\n    entrypoint getLastProfileIndex : () => int\n    entrypoint setLastProfileIndex : int => unit\n    entrypoint getKeyToProfile : address => int\n    entrypoint setKeyToProfile : (address, int) => unit\n    entrypoint setProfilePubkey : (int, address) => unit\n    entrypoint setProfilePubkeyOld : (int, address) => unit\n    entrypoint setProfilePwdChangedAtBlock : (int, int) => unit\n    entrypoint setProfilePwdChangedBy : (int, int) => unit\n    entrypoint setProfileClientInfoHash : (int, string) => unit\n    entrypoint addProfileClientTask : (int, int) => unit\n    entrypoint setProfileFlancerInfoHash : (int, string) => unit\n    entrypoint addProfileFlancerTask : (int, int) => unit\n    entrypoint setProfileClientScore : (int, int) => unit\n    entrypoint setProfileClientNumJobs : (int, int) => unit\n    entrypoint setProfileFlancerScore : (int, int) => unit\n    entrypoint setProfileFlancerNumJobs : (int, int) => unit\n    entrypoint setProfileManaged : (int, int) => unit\n    entrypoint setTask : (int, int, string, int, int, int, int) => unit\n    entrypoint getTask : int => task\n    entrypoint getLastTaskIndex : () => int\n    entrypoint setLastTaskIndex : int => unit\n    entrypoint setTaskInfoHash : (int, string) => unit\n    entrypoint setTaskStatus : (int, int) => unit\n    entrypoint setTaskApplicationStage : (int, int, int) => unit\n    entrypoint setTaskAppliedList : (int, int, int) => unit\n    entrypoint setTaskLastAppliedIndex : (int, int) => unit\n    entrypoint setTaskAcceptedList : (int, int, int) => unit\n    entrypoint setTaskLastAcceptedIndex : (int, int) => unit\n    entrypoint setTaskMstoneWorkplan : (int, int, string) => unit\n    entrypoint setTaskMstoneStage : (int, int, int) => unit\n    entrypoint setTaskFeedback : (int, int, int) => unit\n    entrypoint setFeedback : (int, int, int, int, string, int, string, int) => unit\n    entrypoint getFeedback : int => feedback\n    entrypoint getLastFeedbackIndex : () => int\n    entrypoint setLastFeedbackIndex : int => unit\n\n\n\ncontract CryptoTaskLogic =\n\n    record state = {\n        owner : address,\n        ct_store : CtStoreType,         //address of the storage contract\n        logicVersion : int,             //to protect against replay attacks if logic contract is updated to a new version and nonces start from 0 again\n        timePeriod : int,               //time period in blocks that needs to pass after the pwd change before funds can be withdrawn, also pwd reset possible within time period\n        nonces : map(address, int) }    //nonces are used because a centralized backend can be forwarding users\' signed messages (so that users don\'t need to worry about gas) - but this means nonces must be used on the contract level to protect against replay attacks\n\n\n    public stateful entrypoint init(store_address : CtStoreType, lv : int) = {\n        owner = Call.origin,\n        ct_store = store_address,\n        logicVersion = lv,\n        timePeriod = 1440,      //3 days assuming 3 minute block time\n        nonces = {} }\n\n\n    public entrypoint getOwner() =\n        state.owner\n\n    public entrypoint getCtStore() =\n        state.ct_store\n\n    public entrypoint getLogicVersion() =\n        state.logicVersion\n\n    public entrypoint getTimePeriod() =\n        state.timePeriod\n\n    public entrypoint getNonce(pubkey: address) =\n        state.nonces[pubkey=0]  \n\n\n    public stateful entrypoint signUp(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, clientInfoHash : string, flancerInfoHash : string, managed : int, local : int) =\n        //this check is used because centralized backend can be forwarding users\' signed calls. It is checked that all arguments and meta-arguments were signed by the provided pubkey\n        require(functionName == "signUp" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, String.concat(clientInfoHash, String.concat(flancerInfoHash, String.concat(Int.to_str(managed), Int.to_str(local) )))))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        require(state.ct_store.getKeyToProfile(pubkey) == 0, "Pubkey already in use")\n        let pi = state.ct_store.getLastProfileIndex() + 1\n        state.ct_store.setKeyToProfile(pubkey, pi)\n        state.ct_store.setProfile(pi, pubkey, clientInfoHash, flancerInfoHash, 1, managed, 1, local)\n        state.ct_store.setLastProfileIndex(pi)\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1}) \n\n        pi\n        \n\n    public stateful entrypoint editProfile(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, clientInfoHash : string, flancerInfoHash : string, managed : int) =\n        require(functionName == "editProfile" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, String.concat(clientInfoHash, String.concat(flancerInfoHash, Int.to_str(managed) ))))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        state.ct_store.setProfileClientInfoHash(pi, clientInfoHash)\n        state.ct_store.setProfileFlancerInfoHash(pi, flancerInfoHash)\n        state.ct_store.setProfileManaged(pi, managed)\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1})\n\n\n    public stateful entrypoint changePwd(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, pubkey_new : address) =\n        require(functionName == "changePwd" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, Address.to_str(pubkey_new)))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        require(state.ct_store.getKeyToProfile(pubkey_new) == 0, "New pubkey already in use")\n        require(Chain.block_height - profile.pwdChangedAtBlock > state.timePeriod, "Time period has not passed yet")\n\n        state.ct_store.setKeyToProfile(pubkey_new, pi)\n        state.ct_store.setProfilePubkeyOld(pi, pubkey)\n        state.ct_store.setProfilePubkey(pi, pubkey_new)\n        state.ct_store.setProfilePwdChangedAtBlock(pi, Chain.block_height)\n        state.ct_store.setProfilePwdChangedBy(pi, 1)\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1})\n\n\n    //centralized backend can change pwd for a managed account\n    public stateful entrypoint changePwdManaged(pi : int, pubkey_new : address) =\n        require(Call.origin == state.owner, "Only contract owner can call this function")        \n        let profile = state.ct_store.getProfile(pi)\n        require(profile.managed > 0, "Profile needs to be in managed state")\n        require(state.ct_store.getKeyToProfile(pubkey_new) == 0, "New pubkey already in use")\n        require(Chain.block_height - profile.pwdChangedAtBlock > state.timePeriod, "Time period has not passed yet")\n\n        state.ct_store.setKeyToProfile(pubkey_new, pi)\n        state.ct_store.setProfilePubkeyOld(pi, profile.pubkey)\n        state.ct_store.setProfilePubkey(pi, pubkey_new)\n        state.ct_store.setProfilePwdChangedAtBlock(pi, Chain.block_height)\n        state.ct_store.setProfilePwdChangedBy(pi, 2)\n        \n\n    //reset to the old pwd if within the time period, used if user thinks that centralized backend abused changePwdManaged\n    public stateful entrypoint resetPwd(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string) =\n        require(functionName == "resetPwd" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), functionName)) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let pi = state.ct_store.getKeyToProfile(pubkey)\n        require(pi > 0, "Profile doesn\'t exist")\n        let profile = state.ct_store.getProfile(pi)\n        require(profile.pubkey_old == pubkey, "Profile was not owned by the transaction signer")\n        require(Chain.block_height - profile.pwdChangedAtBlock < state.timePeriod, "Time period has passed")\n        require(profile.pwdChangedBy == 2, "Pwd reset possible only after changePwdManaged")\n\n        state.ct_store.setKeyToProfile(pubkey, pi)\n        state.ct_store.setProfilePubkey(pi, pubkey)\n        state.ct_store.setProfilePwdChangedAtBlock(pi, Chain.block_height)\n        state.ct_store.setProfilePwdChangedBy(pi, 3)\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1})\n\n\n    public stateful entrypoint postTask(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, infoHash : string, local : int) =\n        require(functionName == "postTask" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, String.concat(infoHash, Int.to_str(local) )))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        require(profile.local == local, "You can only post tasks in your own localization")     //for now cross localization posting not possible\n        let ti = state.ct_store.getLastTaskIndex() + 1\n        state.ct_store.setTask(ti, pi, infoHash, 0, 1, 1, local)\n        state.ct_store.setLastTaskIndex(ti)\n\n        state.ct_store.addProfileClientTask(pi, ti)\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1}) \n\n        ti\n\n\n    public stateful entrypoint editTask(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, ti : int, infoHash : string) =\n        require(functionName == "editTask" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, String.concat(Int.to_str(ti), infoHash)))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        let task = state.ct_store.getTask(ti)\n        require(task.client == pi, "You can only edit your own tasks")\n\n        //mstoneWorkplan is binding, task info is non-binding\n        //require(task.lastAppliedIndex == 0, "You can only edit tasks that no freelancers have applied to")\n\n        state.ct_store.setTaskInfoHash(ti, infoHash)\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1}) \n\n\n    //no new freelancer applications, status 1 (filled) indicates the task is not open to freelancer applications\n    public stateful entrypoint closeApplications(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, ti : int) =\n        require(functionName == "closeApplications" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, Int.to_str(ti)))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        let task = state.ct_store.getTask(ti)\n        require(task.client == pi, "You can only close your own tasks")\n\n        state.ct_store.setTaskStatus(ti, 1)\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1})\n\n\n    //reopen task for applications\n    public stateful entrypoint reopenApplications(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, ti : int) =\n        require(functionName == "reopenApplications" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, Int.to_str(ti)))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        let task = state.ct_store.getTask(ti)\n        require(task.client == pi, "You can only reopen your own tasks")\n        require(task.status == 1, "Task needs to be in filled status")\n\n        state.ct_store.setTaskStatus(ti, 2)\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1})\n\n\n    public stateful entrypoint applyForTask(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, ti : int) =\n        require(functionName == "applyForTask" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, Int.to_str(ti) ))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        require(profile.flancerInfoHash != "", "User doesn\'t have the freelancer profile set")\n        let task = state.ct_store.getTask(ti)\n        require(task.client != pi, "You cannot apply on your own tasks")\n        require(task.applicationStage[pi=999] == 999, "User already applied")\n        require(task.status == 0 || task.status == 2, "Task needs to be opened to applications")    //0 means created, 2 means reopened to applications\n\n        let li = task.lastAppliedIndex + 1\n        state.ct_store.setTaskAppliedList(ti, li, pi)\n        state.ct_store.setTaskLastAppliedIndex(ti, li)\n        state.ct_store.setTaskApplicationStage(ti, pi, 0)\n        state.ct_store.setTaskMstoneStage(ti, pi*10, 0)\n        //save current task infoHash as mstoneWorkplan (in case the client edits the task description later), as milestone0\n        state.ct_store.setTaskMstoneWorkplan(ti, pi*10, task.infoHash)\n\n        state.ct_store.addProfileFlancerTask(pi, ti)\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1}) \n\n\n    //limitted number of accepted flancers\n    //after accepting a flancer, task status set to 1 (filled) - indicates the task is not open to new freelancer applications, can be reopened later\n    public stateful entrypoint acceptForTask(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, ti : int, flancer : int) =\n        require(functionName == "acceptForTask" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, String.concat(Int.to_str(ti), Int.to_str(flancer) )))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        let task = state.ct_store.getTask(ti)\n        require(task.client == pi, "You can only accept freelancers for your own tasks")\n        require(task.applicationStage[flancer=999] == 0, "This freelancer has not applied")\n\n        let li = task.lastAcceptedIndex + 1\n        state.ct_store.setTaskAcceptedList(ti, li, flancer)\n        state.ct_store.setTaskLastAcceptedIndex(ti, li)\n        state.ct_store.setTaskApplicationStage(ti, flancer, 1)\n        state.ct_store.setTaskMstoneStage(ti, flancer*10, 1)\n\n        state.ct_store.setTaskStatus(ti, 1)\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1})\n\n\n    //client accepts flancer\'s work\n    public stateful entrypoint finalize(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, ti : int, flancer : int, flancersScore : int, flancersText : string) =\n        require(functionName == "finalize" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, String.concat(Int.to_str(ti), String.concat(Int.to_str(flancer), String.concat(Int.to_str(flancersScore), flancersText )))))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        let task = state.ct_store.getTask(ti)\n        require(task.client == pi, "You can only finalize applications on your own tasks")\n        require(task.applicationStage[flancer=999] == 1, "This freelancer is not working on this task")\n\n        state.ct_store.setTaskApplicationStage(ti, flancer, 2)\n        state.ct_store.setTaskMstoneStage(ti, flancer*10, 2)\n\n        let fi = state.ct_store.getLastFeedbackIndex() + 1\n        require(flancersScore >= 1 && flancersScore =< 5 && flancersText != "", "Feedback score must be 1 to 5 and text non empty")\n        state.ct_store.setFeedback(fi, ti, flancer, 0, "", flancersScore, flancersText, 1)\n        state.ct_store.setLastFeedbackIndex(fi)\n        state.ct_store.setTaskFeedback(ti, flancer, fi)\n        let profileFlancer = state.ct_store.getProfile(flancer)\n        state.ct_store.setProfileFlancerScore(flancer, profileFlancer.flancerScore + flancersScore)\n        state.ct_store.setProfileFlancerNumJobs(flancer, profileFlancer.flancerNumJobs + 1)\n\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1})\n\n\n    //freelancer can cancel an active work contract (application)\n    public stateful entrypoint cancelContractFlancer(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, ti : int, clientsScore : int, clientsText : string) =\n        require(functionName == "cancelContractFlancer" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, String.concat(Int.to_str(ti), String.concat(Int.to_str(clientsScore), clientsText))))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        let task = state.ct_store.getTask(ti)\n        require(task.applicationStage[pi=999] == 1, "You are not working on this task")\n\n        state.ct_store.setTaskApplicationStage(ti, pi, 3)\n        state.ct_store.setTaskMstoneStage(ti, pi*10, 3)\n\n        let fi = state.ct_store.getLastFeedbackIndex() + 1\n        require(clientsScore >= 1 && clientsScore =< 5 && clientsText != "", "Feedback score must be 1 to 5 and text non empty")\n        state.ct_store.setFeedback(fi, ti, pi, clientsScore, clientsText, 0, "", 1)\n        state.ct_store.setLastFeedbackIndex(fi)\n        state.ct_store.setTaskFeedback(ti, pi, fi)\n        let profileClient = state.ct_store.getProfile(task.client)\n        state.ct_store.setProfileClientScore(task.client, profileClient.clientScore + clientsScore)\n        state.ct_store.setProfileClientNumJobs(task.client, profileClient.clientNumJobs + 1)\n\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1})\n\n\n    //client can cancel an active work contract (application)\n    public stateful entrypoint cancelContractClient(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, ti : int, flancer : int, flancersScore : int, flancersText : string) =\n        require(functionName == "cancelContractClient" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, String.concat(Int.to_str(ti), String.concat(Int.to_str(flancer), String.concat(Int.to_str(flancersScore), flancersText )))))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        let task = state.ct_store.getTask(ti)\n        require(task.client == pi, "You can only cancel applications on your own tasks")\n        require(task.applicationStage[flancer=999] == 1, "This freelancer is not working on this task")\n\n        state.ct_store.setTaskApplicationStage(ti, flancer, 4)\n        state.ct_store.setTaskMstoneStage(ti, flancer*10, 4)\n\n        let fi = state.ct_store.getLastFeedbackIndex() + 1\n        require(flancersScore >= 1 && flancersScore =< 5 && flancersText != "", "Feedback score must be 1 to 5 and text non empty")\n        state.ct_store.setFeedback(fi, ti, flancer, 0, "", flancersScore, flancersText, 1)\n        state.ct_store.setLastFeedbackIndex(fi)\n        state.ct_store.setTaskFeedback(ti, flancer, fi)\n        let profileFlancer = state.ct_store.getProfile(flancer)\n        state.ct_store.setProfileFlancerScore(flancer, profileFlancer.flancerScore + flancersScore)\n        state.ct_store.setProfileFlancerNumJobs(flancer, profileFlancer.flancerNumJobs + 1)\n\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1})\n\n\n    //client can leave feedback after flancer cancelled an active work contract (application)\n    public stateful entrypoint leaveFeedbackClient(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, ti : int, flancer : int, flancersScore : int, flancersText : string) =\n        require(functionName == "leaveFeedbackClient" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, String.concat(Int.to_str(ti), String.concat(Int.to_str(flancer), String.concat(Int.to_str(flancersScore), flancersText )))))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        let task = state.ct_store.getTask(ti)\n        require(task.client == pi, "You can only leave feedback on your own tasks")\n        require(task.applicationStage[flancer=999] == 3, "Freelancer has not cancelled this task")\n\n        let fi = task.feedbacks[flancer]\n        let feedback = state.ct_store.getFeedback(fi)\n        require(flancersScore >= 1 && flancersScore =< 5 && flancersText != "", "Feedback score must be 1 to 5 and text non empty")\n        require(feedback.flancersScore == 0, "Feedback was already set")\n        state.ct_store.setFeedback(fi, ti, flancer, feedback.clientsScore, feedback.clientsText, flancersScore, flancersText, 1)\n        let profileFlancer = state.ct_store.getProfile(flancer)\n        state.ct_store.setProfileFlancerScore(flancer, profileFlancer.flancerScore + flancersScore)\n        state.ct_store.setProfileFlancerNumJobs(flancer, profileFlancer.flancerNumJobs + 1)\n\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1})\n\n\n    //flancer can leave feedback after client cancelled an active work contract (application)\n    public stateful entrypoint leaveFeedbackFlancer(pubkey: address, sig: signature, logicVersion : int, nonce : int, functionName : string, ti : int, clientsScore : int, clientsText : string) =\n        require(functionName == "leaveFeedbackFlancer" && Crypto.verify_sig(String.blake2b(String.concat(Int.to_str(logicVersion), String.concat(Int.to_str(nonce), String.concat(functionName, String.concat(Int.to_str(ti), String.concat(Int.to_str(clientsScore), clientsText))))) ), pubkey, sig) && logicVersion == state.logicVersion && nonce == state.nonces[pubkey=0], "Wrong function name, nonce, logicVersion or failed signature check" )\n\n        let (profile, pi) = getMyProfile(pubkey)\n        let task = state.ct_store.getTask(ti)\n        require(task.applicationStage[pi=999] == 2 || task.applicationStage[pi=999] == 4, "You have not been working on this task")\n\n        let fi = task.feedbacks[pi]\n        let feedback = state.ct_store.getFeedback(fi)\n        require(clientsScore >= 1 && clientsScore =< 5 && clientsText != "", "Feedback score must be 1 to 5 and text non empty")\n        require(feedback.clientsScore == 0, "Feedback was already set")\n        state.ct_store.setFeedback(fi, ti, pi, clientsScore, clientsText, feedback.flancersScore, feedback.flancersText, 1)\n        let profileClient = state.ct_store.getProfile(task.client)\n        state.ct_store.setProfileClientScore(task.client, profileClient.clientScore + clientsScore)\n        state.ct_store.setProfileClientNumJobs(task.client, profileClient.clientNumJobs + 1)\n\n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1})\n\n\n\n\n\n    /* "Escrowed" set of functions MUST be used if an application is to have multiple milestones.\n     It is possible to have a non-escrowed application with one milestone and it is also possible to have an escrowed application with one milestone.\n     It is NOT possible (nor needed) to have a non-escrowed application with multiple milestones. */\n    //TODO\n    //in case of escrowed tasks, client calls this function to hire a freelancer and at the same time sets work plan (duration etc) and escrow\n    //limitted number of accepted flancers\n    public stateful entrypoint acceptForTaskEscrowed() = { }\n\n    //TODO\n    //freelancer can decide whether to accept workplan suggested by the client, for escrowed tasks\n    public stateful entrypoint acceptWorkplanEscrowed() = { }\n\n    //TODO\n    //client accepts flancer\'s work and releases escrow\n    //flag to define whether to finalize just the milestone or also the whole application\n    public stateful entrypoint finalizeEscrowed() = { }\n\n    //TODO\n    //either client or freelancer can cancel an active work contract (application)\n    //if cancelled by flancer, client receives back the escrow. if cancelled by client, flancer can setSolutionEscrowed() and then startDisputeEscrowed()\n    public stateful entrypoint cancelContractEscrowed() = { }\n\n    //TODO\n    //if task was cancelled by client, flancer can set solution - chat-hash-chain (hash(msg+hash_prev(...))) and then startDisputeEscrowed()\n    public stateful entrypoint setSolutionEscrowed() = { }\n\n    //TODO\n    public stateful entrypoint startDisputeEscrowed() = { }\n\n    //TODO\n    public stateful entrypoint commitDisputeEscrowed() = { }\n\n\n\n    //TODO\n    //withdrawal not possible if pwd was changed recently, possible after timePeriod (unless if changed by resetPwd, pwdChangedBy == 3)\n    public stateful entrypoint withdraw() = { }\n\n    //ADVANCED / OPTIONAL\n    //withdrawal a 2 stage action, even if pwd hacked, user can call fullCustody\n    //any pwd change invalidates withdrawCommitFlag that was set in this function\n    //public stateful entrypoint withdrawCommit() = { }\n\n    //user can give centralized backend full custody over the account\n    //sets profile.managed = 2\n    //public stateful entrypoint fullCustody() = { }\n\n\n\n    private function getMyProfile(pubkey: address) =\n        let pi = state.ct_store.getKeyToProfile(pubkey)\n        require(pi > 0, "Profile doesn\'t exist")       \n        let profile = state.ct_store.getProfile(pi)\n        require(profile.pubkey == pubkey, "Profile not owned by the transaction signer")\n\n        (profile, pi)   //returns profile and profile index\n';
    const contract = await client.getContractInstance(contractSource, {
      contractAddress: process.env.VUE_APP_BC_ADDRESS,
    });

    const { keypair } = keypairs;
    const { keypairFormatted } = keypairs;
    this.setBcData({
      client,
      contract,
      keypair,
      keypairFormatted,
    });
  }

  /**
   * Update freelancer properties with smart contract properties
   * @param {Object} freelancerData
   * @return {Promise<any>}
   */
  async setFreelancerProperties(freelancerData) {
    const bcData = this.getBcData();
    console.log('bcdata', bcData);
    const flancerInfoHash = this.createFlancerInfoHash(freelancerData);
    const resNonce = await bcData.contract.methods.getNonce(bcData.keypairFormatted.publicKey);
    const nonce = resNonce.decodedResult;
    console.log('nonce', nonce);

    const args = `1${nonce.toString()}signUpnull${flancerInfoHash}11`;
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
      nonce,
      flancerInfoHash,
    });
  }

  /**
   * createFlancerInfoHash
   * @param {Object} freelancerData
   * @return {String} flancerInfoHash
   */
  createFlancerInfoHash(freelancerData) {
    return Buffer.from(Crypto.hash([freelancerData.name, freelancerData.bio, freelancerData.resume].join('')))
      .toString('hex');
  }

  /**
   * Update task properties with smart contract properties
   * @param {Object} taskData
   * @return {Promise<any>}
   */
  async setTaskProperties(taskData) {
    const bcData = this.getBcData();
    console.log('bcdata', bcData);
    const descriptionHash = Buffer.from(Crypto.hash(taskData.description))
      .toString('hex');
    const resNonce = await bcData.contract.methods.getNonce(bcData.keypairFormatted.publicKey);
    const nonce = resNonce.decodedResult;
    console.log('nonce', nonce);

    const price = taskData.price && !taskData.negotiablePrice
      ? taskData.price.toString()
      : '0';
    const duration = taskData.duration && !taskData.negotiableDuration
      ? taskData.duration.toString()
      : '0';
    const args = `${nonce.toString()}postTask${taskData.title}${descriptionHash}${price}${duration}`;
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
      nonce,
      descriptionHash,
    });
  }

  /**
   * Get task from smart contract by BC ID
   * @param bcId
   * @return {Promise<*>}
   */
  checkTaskBc(bcId) {
    const bcData = this.getBcData();
    return bcData.contract.methods.getTask(bcId);
  }
}

export default new SmartContract();
