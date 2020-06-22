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
      compilerUrl: 'https://compiler.aepps.com',
      accounts: [
        acc1,
      ],
    });

    // const contractSource = fs.readFileSync('/home/slash/Desktop/vs3.aes', 'utf-8');
    // eslint-disable-next-line no-useless-escape
    const contractSource = 'contract CryptoTask =\n\n    record state = {\n        tasks : map(int, task),\n        lastTaskIndex : int,\n        nonces : map(address, int)\n        }\n\n    record task = {\n        client : address,\n        flancers : list(int),\n        title : string,\n        descriptionHash : string,\n        taskValue : int,\n        workTime : int,\n        stage : int\n        }\n\n    public stateful entrypoint init() = { \n            tasks = {},\n            lastTaskIndex = 0,\n            nonces = {}\n        }\n        \n        \n    public stateful entrypoint postTask(pubkey: address, sig: signature, nonce : int, functionName : string, title : string, descriptionHash : string, taskValue : int, workTime : int) =      \n        require(functionName == \"postTask\" && Crypto.verify_sig(String.blake2b( String.concat(Int.to_str(nonce), String.concat(functionName, String.concat(title, String.concat(descriptionHash, String.concat(Int.to_str(taskValue), Int.to_str(workTime)))))) ), pubkey, sig) && nonce == state.nonces[pubkey=0], \"Wrong function name, nonce or failed signature check\" )\n\n        let new_task : task = {\n            client = pubkey,\n            flancers = [],\n            title = title,\n            descriptionHash = descriptionHash,\n            taskValue = taskValue,\n            workTime = workTime,\n            stage = 0}\n\n        put(state{tasks[state.lastTaskIndex] = new_task})  \n        put(state{lastTaskIndex = state.lastTaskIndex + 1}) \n        put(state{nonces[pubkey] = state.nonces[pubkey=0] + 1}) \n\n\tstate.lastTaskIndex - 1\n\n\n    public entrypoint getTask(index: int) =\n        state.tasks[index]\n        \n    public entrypoint getNonce(pubkey: address) =\n        state.nonces[pubkey=0]    \n\n';
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
    const flancerInfoHash = Buffer.from(Crypto.hash([freelancerData.name, freelancerData.bio, freelancerData.resume].join('')))
      .toString('hex');
    const resNonce = await bcData.contract.methods.getNonce(bcData.keypairFormatted.publicKey);
    const nonce = resNonce.decodedResult;
    console.log('nonce', nonce);

    const args = `1${nonce.toString()}signUp${flancerInfoHash}11`;
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
