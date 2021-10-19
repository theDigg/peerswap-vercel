import axios from "axios";
// import crypto from "shardus-crypto-web";
import stringify from "fast-stable-stringify";

let crypto: any;

// import("./Module").then((Module) => Module.method());

let archiver = JSON.parse(localStorage.getItem("archiver")) || {
  ip: "www.peerswap.org",
  // ip: "localhost",
  port: 4000,
};

let host = localStorage.getItem("host");
let network: any;

export async function init() {
  crypto = await import("shardus-crypto-web");

  await crypto.initialize(
    "69fa4195670576c0160d660c3be36556ff8d504725be8a59b5a96509e0c994bc"
  );
  network = crypto.hash("network");
  host = await getRandomHost();
  localStorage.setItem("host", host);
}

export async function getRandomHost() {
  const { data } = await axios.get(
    `https://www.peerswap.org/rproxy/${archiver.ip}:${archiver.port}/nodelist`
    // `http://${archiver.ip}:${archiver.port}/nodelist`
  );
  const nodeList = data.nodeList;
  const randomIndex = Math.floor(Math.random() * nodeList.length);
  const randomHost = nodeList[randomIndex];
  if (!randomHost) {
    throw new Error("Unable to get random host");
  }
  const { ip, port } = randomHost;
  console.log(
    `Now using: https://www.peerswap.org/rproxy/${archiver.ip}:${port} as host for query's and transactions`
    // `Now using: ${archiver.ip}:${port} as host for query's and transactions`
  );
  return `https://www.peerswap.org/rproxy/${archiver.ip}:${port}`;
  // return `http://${archiver.ip}:${port}`;
}

export async function updateArchiveServer(ip: string, port: number) {
  archiver = { ip, port };
}

export interface Wallet {
  handle: string;
  entry: {
    address: string;
    keys: {
      publicKey: string;
      secretKey: string;
    };
    id: string;
  };
}

export async function importWallet(sk: Wallet["entry"]["keys"]["secretKey"]) {
  const keys = {
    publicKey: sk.slice(64),
    secretKey: sk,
  };
  const data = await getAccountData(keys.publicKey);
  const account = data.account;
  if (account.alias) {
    const entry = {
      address: keys.publicKey,
      id: crypto.hash(account.alias),
      keys,
    };
    return {
      handle: account.alias,
      entry,
    };
  } else {
    return { error: true };
  }
}

export function createAccount(
  handle: string,
  keys = crypto.generateKeypair()
): Wallet {
  return {
    handle: handle,
    entry: {
      address: keys.publicKey,
      id: crypto.hash(handle),
      keys,
    },
  };
}

// ---------------------- TRANSACTION INTERFACES ------------------

export interface ApplyParameters {
  type: string;
  timestamp: number;
  network: string;
  current: NetworkParameters;
  next: {};
  windows: Windows;
  nextWindows: {};
  issue: number;
}

export interface ApplyTally {
  type: string;
  timestamp: number;
  network: string;
  next: Parameters;
  nextWindows: Windows;
}

export interface Bid {
  type: string;
  bid: string;
  from: string;
  swap: string;
  bidToken: string;
  offerAmount: number;
  address: string;
  timestamp: number;
  sign: Signature;
}

export interface Commit {
  type: string;
  from: string;
  swap: string;
  bid: string;
  reserve: string;
  exchanger: string;
  timestamp: number;
  sign: Signature;
}

export interface Create {
  type: string;
  from: string;
  to: string;
  amount: number;
  timestamp: number;
}

export interface Distribute {
  type: string;
  network: string;
  from: string;
  recipients: string[];
  amount: number;
  timestamp: number;
  sign: Signature;
}

export interface Email {
  type: string;
  signedTx: {
    emailHash: string;
    from: string;
    sign: Signature;
  };
  email: string;
  timestamp: number;
}

export interface GossipEmailHash {
  type: string;
  nodeId: string;
  account: string;
  from: string;
  emailHash: string;
  verified: string;
  timestamp: number;
}

export interface InitNetwork {
  type: string;
  network: string;
  timestamp: number;
}

export interface InitSwapAccount {
  type: string;
  swapAccount: string;
  timestamp: number;
}

export interface Issue {
  type: string;
  network: string;
  nodeId: string;
  from: string;
  issue: string;
  proposal: string;
  timestamp: number;
}

export interface Message {
  type: string;
  network: string;
  from: string;
  to: string;
  chatId: string;
  message: string;
  timestamp: number;
  sign: Signature;
}

export interface NodeReward {
  type: string;
  network: string;
  nodeId: string;
  from: string;
  to: string;
  timestamp: number;
}

export interface Parameters {
  type: string;
  nodeId: string;
  from: string;
  network: string;
  issue: string;
  timestamp: number;
}

export interface Proposal {
  type: string;
  network: string;
  from: string;
  proposal: string;
  issue: string;
  parameters: NetworkParameters;
  timestamp: number;
  sign: Signature;
}

export interface Receipt {
  type: string;
  from: string;
  swap: string;
  bid: string;
  exchanger: string;
  reserve: string;
  timestamp: number;
  sign: Signature;
}

export interface Register {
  type: string;
  aliasHash: string;
  from: string;
  alias: string;
  timestamp: number;
  sign: Signature;
}

export interface RemoveStakeRequest {
  type: string;
  network: string;
  from: string;
  stake: number;
  timestamp: number;
  sign: Signature;
}

export interface RemoveStake {
  type: string;
  network: string;
  from: string;
  stake: number;
  timestamp: number;
  sign: Signature;
}

export interface SnapshotClaim {
  type: string;
  network: string;
  from: string;
  timestamp: number;
  sign: Signature;
}

export interface Snapshot {
  type: string;
  from: string;
  network: string;
  snapshot: any;
  timestamp: number;
  sign: Signature;
}

export interface Stake {
  type: string;
  network: string;
  from: string;
  stake: number;
  timestamp: number;
  sign: Signature;
}

export interface Swap {
  type: string;
  swapType: "offer" | "request" | "immediate";
  swapId: string;
  initiator: string;
  tokenOffered?: string; // If they only specify the amount of tokenRequested, this can be null
  amountOffered?: number; // If they only specify the amount of tokenRequested, this can be null
  tokenRequested?: string; // Doesn't need to specify, or could specify a range of tokens
  amountRequested?: number; // If tokenRequested isn't specified or a range is selected, then this should also not be specified in the swap. We would wait for the agreement to finalize these values
  initiatorChainAddress?: string; // This could be set when the Contract is created
  initiatorChainMemo?: string; // Memo in case the blockchain requires it
  fixed: boolean; // Whether or not the amount in the Contract will be fixed or float
  maxTimeToSend: number; // time in seconds - 3600
  maxTimeToReceive: number; // time in seconds after first confirmation of send - 3600
  collateral: number; // Possibly no deposit if initiator is to go first?
  timestamp: number;
  sign: Signature;
}

export interface Dispute {
  type: string;
  dispute: string;
  from: string;
  exchanger: string;
  swap: string;
  bid: string;
  reserve: string;
  timestamp: number;
  sign: Signature;
}

export interface Tally {
  type: string;
  nodeId: string;
  from: string;
  network: string;
  issue: string;
  proposals: string[];
  timestamp: number;
}

export interface Transfer {
  type: string;
  network: string;
  from: string;
  to: string;
  amount: number;
  timestamp: number;
  sign: Signature;
}

export interface UpdateSwapAccount {
  type: string;
  timestamp: number;
  swapAccount: string;
  swap: Accounts.Swap;
}

export interface Verify {
  type: string;
  from: string;
  network: string;
  code: string;
  timestamp: number;
  sign: Signature;
}

export interface Vote {
  type: string;
  network: string;
  from: string;
  issue: string;
  proposal: string;
  amount: number;
  timestamp: number;
  sign: Signature;
}

export interface Signature {
  owner: string;
  sig: string;
}

// ---------------------- ACCOUNT INTERFACES ----------------------

export declare namespace Accounts {
  interface User {
    id: string;
    type: string;
    data: {
      balance: number;
      swapDAI: number;
      chats: object;
      stake?: number;
      remove_stake_request: number | null;
      swaps: string[];
      bids: string[];
      transactions: object[];
      lastTransaction: any
    };
    liquidity: {
      [asset: string]: {
        [chain: string]: number;
      };
    };
    reputation: number;
    jurorReputation?: number;
    alias: string | null;
    emailHash: string | null;
    verified: string | boolean;
    lastMaintenance: number;
    claimedSnapshot: boolean;
    timestamp: number;
    hash: string;
  }

  interface Node {
    id: string;
    type: string;
    balance: number;
    nodeRewardTime: number;
    hash: string;
    timestamp: number;
  }

  /*
    ! TODO: Might need to index certain Swap's based on the tokens offered/requested in order to improve query performance/scalability
    So if a user is searching for Proposals that offer bitcoin, have a field in the global Swap account that lists all the Swap id's
    that have bitcoin as the offered token, and vice versa for requested tokens.

    (Just something to think about)
  */
  interface GlobalSwap {
    id: string;
    type: string;
    swaps: {
      offer: string[];
      request: string[];
      immediate: string[];
    };
    timestamp: number;
    hash: string;
  }

  interface Swap {
    id: string;
    type: string;
    swapType: "offer" | "request" | "immediate";
    status: string;
    initiator: string;
    initiatorAlias: string;
    provider?: string;
    providerAlias?: string;
    tokenOffered?: string;
    amountOffered?: number;
    providerChainAddress?: string;
    providerChainMemo?: string; // Memo in case the blockchain requires it
    tokenRequested?: string; // Doesn't need to specify, or could specify a range of tokens
    amountRequested?: number; // If tokenRequested isn't specified or a range is selected, then this should also not be specified in the swap
    initiatorChainAddress?: string; // This could be set when the agreement is created
    initiatorChainMemo?: string; // Memo in case the blockchain requires it
    fixed: boolean;
    maxTimeToSend?: number; // time in seconds - 3600
    maxTimeToReceive?: number; // time in seconds after first confirmation of send - 3600
    collateral: number; // Possibly no deposit if initiator is to go first?
    timeOfAgreement?: number;
    disputeId?: string;
    contractId?: string;
    acceptedBid?: string;
    bids: string[];
    createdAt: number;
    hash: string;
    timestamp: number;
  }

  interface Bid {
    id: string;
    type: string;
    swapId: string;
    contractId?: string;
    disputeId?: string;
    provider: string;
    providerAlias: string;
    tokenOffered: string;
    amountOffered: number;
    tokenRequested: string;
    amountRequested: number;
    providerChainAddress: string;
    providerChainMemo?: string;
    pair: [string, string];
    rate: number;
    collateral: number;
    status: string;
    createdAt: number;
    timestamp: number;
    hash: string;
  }

  interface Contract {
    id: string;
    type: string;
    swapId: string;
    bidId: string;
    disputeId?: string;
    initiator: string;
    provider: string;
    tokenOffered: string;
    amountOffered: number;
    initiatorChainAddress: string; // This could be set when the Contract is created
    initiatorChainMemo?: string; // Memo in case the blockchain requires it
    initiatorReceipt: boolean;
    tokenRequested: string;
    amountRequested: number;
    providerChainAddress: string; // This could be set when the Contract is created
    providerChainMemo?: string; // Memo in case the blockchain requires it
    providerReceipt: boolean;
    contractDescription: string;
    fixed: boolean; // Whether or not the amount in the Contract will be fixed or float
    maxTimeToSend: number; // time in seconds - 3600
    maxTimeToReceive: number; // time in seconds after first confirmation of send - 3600
    collateral: number; // Possibly no collateral if initiator is to go first?
    timeOfAgreement: number; // Timestamp of when the initiator accepts the bid
    hash: string;
    timestamp: number;
  }

  interface Dispute {
    id: string;
    type: string;
    initiator: string;
    provider: string;
    swapId: string;
    bidId: string;
    contractId: string;
    initiatorEvidence: string[]; // Links of relevant documentation for making their case in the dispute
    providerEvidence: string[]; // Links of relevant documentation for making their case in the dispute
    jury: string[];
    juryVotes?: Array<{
      jurorId: string; // AccountId of the juror
      favor: string; // AccountId of the user who this juror voted in favor of
    }>;
    resolved: boolean;
    createdAt: number;
    hash: string;
    timestamp: number;
  }

  interface Chat {
    id: string;
    type: string;
    messages: unknown[];
    timestamp: number;
    hash: string;
  }

  interface Alias {
    id: string;
    type: string;
    hash: string;
    inbox: string;
    address: string;
    timestamp: number;
  }

  interface Network {
    id: string;
    type: string;
    current: NetworkParameters;
    next: NetworkParameters | {};
    windows: Windows;
    nextWindows: Windows | {};
    issue: number;
    hash: string;
    timestamp: number;
    snapshot?: object;
  }

  interface Issue {
    id: string;
    type: string;
    active: boolean | null;
    proposals: string[];
    proposalCount: number;
    number: number | null;
    winnerId: string | null;
    hash: string;
    timestamp: number;
  }

  interface Proposal {
    id: string;
    type: string;
    power: number;
    totalVotes: number;
    parameters: NetworkParameters;
    winner: boolean;
    number: number | null;
    hash: string;
    timestamp: number;
  }
}

/**
 * ---------------------- NETWORK DATA INTERFACES ----------------------
 */

export interface NetworkParameters {
  title: string;
  description: string;
  nodeRewardInterval: number;
  nodeRewardAmount: number;
  nodePenalty: number;
  transactionFee: number;
  stakeRequired: number;
  maintenanceInterval: number;
  maintenanceFee: number;
  proposalFee: number;
  faucetAmount: number;
  defaultToll: number;
}

export interface Windows {
  proposalWindow: number[];
  votingWindow: number[];
  graceWindow: number[];
  applyWindow: number[];
}

export async function injectTx(tx: any) {
  try {
    const { data } = await axios.post(`${host}/inject`, tx);
    // console.log(data)
    return {
      result: {
        status: data.result.success ? 'success' : 'warning',
        reason: data.result.reason
      }
    }
  } catch (err: any) {
    // console.log(err.message)
    return {
      result: {
        status: "error",
        reason: err.message,
      },
    };
  }
}

export async function getAccountData(id: string) {
  const { data } = await axios.get(`${host}/accounts/${id}`);
  return data;
}

export async function getAccountFromAlias(handle: string) {
  const url = `${host}/accounts/address/${crypto.hash(handle)}`;
  const { data } = await axios.get(url);
  return data;
}

export async function getParameters() {
  const url = `${host}/network/parameters`;
  const {
    data: { parameters },
  } = await axios.get(url);
  // console.log(parameters)
  return parameters;
}

export function getWindow(windows: Windows, timestamp: number) {
  if (inRange(timestamp, windows.proposalWindow))
    return {
      proposalWindow: Math.round(
        (windows.proposalWindow[1] - timestamp) / 1000
      ),
    };
  else if (inRange(timestamp, windows.votingWindow))
    return {
      votingWindow: Math.round((windows.votingWindow[1] - timestamp) / 1000),
    };
  else if (inRange(timestamp, windows.graceWindow))
    return {
      graceWindow: Math.round((windows.graceWindow[1] - timestamp) / 1000),
    };
  else if (inRange(timestamp, windows.applyWindow))
    return {
      applyWindow: Math.round((windows.applyWindow[1] - timestamp) / 1000),
    };
  else
    return {
      applyWindow: Math.round((windows.proposalWindow[0] - timestamp) / 1000),
    };

  function inRange(now: number, times: any) {
    return now > times[0] && now < times[1];
  }
}

export async function getIssues(url: string) {
  const { data } = await axios.get<Accounts.Issue[]>(url);
  return data;
}

// QUERY'S THE MOST RECENT NETWORK ISSUE
export async function getLatestIssue() {
  const { data } = await axios.get<Accounts.Issue>(`${host}/issues/latest`);
  return data;
}

// QUERY'S THE CURRENT NETWORK ISSUE COUNT
export async function getIssueCount() {
  const {
    data: { count },
  } = await axios.get(`${host}/issues/count`);
  return count;
}

// QUERY'S ALL NETWORK PROPOSALS
export async function getProposals() {
  const { data } = await axios.get(`${host}/proposals`);
  return data;
}

// QUERY'S ALL PROPOSALS ON THE LATEST ISSUE
export async function queryLatestProposals() {
  const {
    data: { proposals },
  } = await axios.get(`${host}/proposals/latest`);
  return proposals;
}

// QUERY'S THE CURRENT ISSUE'S PROPOSAL COUNT
export async function getProposalCount() {
  const {
    data: { count },
  } = await axios.get(`${host}/proposals/count`);
  return count;
}

export async function getSwaps() {
  const { data } = await axios.get(`${host}/swaps`);
  return data;
}

export async function getSwap(url: string) {
  const { data } = await axios.get(`${host}/swaps/single/${url.split("/")[2]}`);
  return data;
}

export async function getSwapFromBid(swapId: string) {
  const { data } = await axios.get(`${host}/swaps/single/${swapId}`);
  return data;
}

export async function queryBids(swapId: string) {
  const res = await axios.get(`${host}/bids/${swapId}`);
  return res.data;
}

// async function getMessages(to, from) {
//   try {
//     const res = await axios.get(
//       `${host}/messages/${crypto.hash([from, to].sort().join())}`
//     )
//     const { messages } = res.data
//     return messages
//   } catch (error) {
//     return error
//   }
// }

export async function getChats(account: Accounts.User, user: Wallet) {
  const userChats = account.data.chats;
  const chatData = Object.entries(userChats).map(async (entry) => {
    const { account } = await getAccountData(entry[0]);
    const alias = account.alias;
    const chat = await getAccountData(entry[1]);
    const messages = chat.account.messages.map((message: any) =>
      JSON.parse(crypto.decryptAB(message, entry[0], user.entry.keys.secretKey))
    );
    return [alias, messages];
  });
  const chats = await Promise.all(chatData);
  const formattedChatData: any = {};
  chats.forEach((chat) => {
    formattedChatData[chat[0]] = chat[1];
  });
  return formattedChatData;
}

export async function getMySwaps(address: string) {
  const { data } = await axios.get(`${host}/accounts/${address}/swaps`);
  return data.swaps;
}

export async function getMyBids(address: string) {
  const { data } = await axios.get(`${host}/accounts/${address}/bids`);
  return data.bids;
}

export async function submitMessageTx(
  message: string,
  target: string,
  user: Wallet
) {
  try {
    const { account } = await getAccountFromAlias(target);
    const targetAddress = account.id;
    const messageData = stringify({
      body: message,
      handle: user.handle,
      timestamp: Date.now(),
    });
    const encryptedMsg = crypto.encryptAB(
      messageData,
      targetAddress,
      user.entry.keys.secretKey
    );
    const tx = {
      type: "message",
      network,
      from: user.entry.address,
      to: targetAddress,
      chatId: crypto.hash([user.entry.address, targetAddress].sort().join(``)),
      message: encryptedMsg,
      timestamp: Date.now(),
    };
    crypto.signObj(tx, user.entry.keys.secretKey, user.entry.keys.publicKey);
    return injectTx(tx);
  } catch (err) {
    return {
      result: {
        status: "error",
        reason:
          "This user doesn't exist dummy, it say's it right up there in that big red alert box.",
      },
    };
  }
}

export async function submitTransferTx(
  target: string,
  amount: number,
  user: Wallet
) {
  const { address } = await getAccountFromAlias(target);
  const tx = {
    type: "transfer",
    network,
    from: user.entry.address,
    to: address,
    amount: amount,
    timestamp: Date.now(),
  };
  crypto.signObj(tx, user.entry.keys.secretKey, user.entry.keys.publicKey);
  return injectTx(tx);
}

export async function registerAlias(handle: string, user: Wallet) {
  const tx = {
    type: "register",
    aliasHash: crypto.hash(handle),
    from: user.entry.address,
    alias: handle,
    timestamp: Date.now(),
  };
  crypto.signObj(tx, user.entry.keys.secretKey, user.entry.keys.publicKey);
  return injectTx(tx);
}

export async function submitSwapTx(
  answers: {
    swapType: string;
    tokenOffered: string;
    amountOffered: number;
    tokenRequested: string;
    amountRequested: number;
    maxTimeToSend: number;
    maxTimeToReceive: number;
    collateral: number;
    initiatorChainAddress: string;
    fixed: boolean;
  },
  user: Wallet
) {
  const tx = {
    type: "swap",
    swapId: "",
    swapType: answers.swapType,
    initiator: user.entry.address,
    tokenOffered: answers.tokenOffered,
    amountOffered: answers.amountOffered,
    tokenRequested: answers.tokenRequested,
    amountRequested: answers.amountRequested,
    maxTimeToSend: answers.maxTimeToSend,
    maxTimeToReceive: answers.maxTimeToReceive,
    collateral: answers.collateral,
    initiatorChainAddress: answers.initiatorChainAddress,
    fixed: answers.fixed,
    timestamp: Date.now(),
  };
  tx.swapId = crypto.hashObj(tx);
  // console.log(tx)
  crypto.signObj(tx, user.entry.keys.secretKey, user.entry.keys.publicKey);
  return injectTx(tx);
}

export async function submitBidTx(
  answers: {
    swapId: string;
    tokenOffered: string;
    amountOffered: number;
    tokenRequested: string;
    amountRequested: number;
    providerChainAddress: string;
  },
  user: Wallet
) {
  const tx = {
    type: "bid",
    bidId: "",
    provider: user.entry.address,
    swapId: answers.swapId,
    tokenOffered: answers.tokenOffered,
    amountOffered: answers.amountOffered,
    tokenRequested: answers.tokenRequested,
    amountRequested: answers.amountRequested,
    providerChainAddress: answers.providerChainAddress,
    timestamp: Date.now(),
  };
  tx.bidId = crypto.hashObj(tx);
  // console.log(tx)

  crypto.signObj(tx, user.entry.keys.secretKey, user.entry.keys.publicKey);
  return injectTx(tx);
}

export async function submitContractTx(
  swapId: string,
  swapType: string,
  bidId: string,
  provider: string,
  initiatorChainAddress: string,
  user: Wallet
) {
  let tx = {
    type: "create_contract",
    swapType,
    contractId: "",
    initiator: user.entry.address,
    initiatorChainAddress,
    swapId,
    bidId,
    provider,
    timestamp: Date.now(),
  };

  tx.contractId = crypto.hashObj(tx);

  crypto.signObj(tx, user.entry.keys.secretKey, user.entry.keys.publicKey);
  return injectTx(tx);
}

export async function submitReceiptTx(swap: Accounts.Swap, user: Wallet) {
  const tx = {
    type: "receipt",
    initiator: user.entry.address,
    swapId: swap.id,
    bidId: swap.acceptedBid,
    provider: swap.provider,
    contractId: swap.contractId,
    timestamp: Date.now(),
  };
  crypto.signObj(tx, user.entry.keys.secretKey, user.entry.keys.publicKey);
  return injectTx(tx);
}

export async function submitReceiptFromBidTx(swapData: any, user: Wallet) {
  // console.log(typeof swapData, swapData)
  let tx: object;
  if (typeof swapData === "string") {
    const { swap } = await getSwapFromBid(swapData);
    tx = {
      type: "receipt",
      initiator: swap.data.initiator,
      swapId: swap.data.id,
      bidId: swap.data.acceptedBid,
      provider: user.entry.address,
      contractId: swap.data.contractId,
      timestamp: Date.now(),
    };
  } else {
    tx = {
      type: "receipt",
      initiator: swapData.initiator,
      swapId: swapData.id,
      bidId: swapData.acceptedBid,
      provider: user.entry.address,
      contractId: swapData.contractId,
      timestamp: Date.now(),
    };
  }
  crypto.signObj(tx, user.entry.keys.secretKey, user.entry.keys.publicKey);
  return injectTx(tx);
}

export async function submitDisputeTx(swap: Accounts.Swap, user: Wallet) {
  const tx = {
    type: "dispute",
    disputeId: crypto.hash(swap.id + swap.acceptedBid + swap.contractId),
    initiator: user.entry.address,
    swapId: swap.id,
    bidId: swap.acceptedBid,
    provider: swap.provider,
    contractId: swap.contractId,
    reasonForDispute: 'Testing random reason',
    timestamp: Date.now(),
  };
  crypto.signObj(tx, user.entry.keys.secretKey, user.entry.keys.publicKey);
  // console.log(tx)
  return injectTx(tx);
}

export async function submitProposalTx(parameters: any, user: Wallet) {
  const issue = await getIssueCount();
  const proposal = await getProposalCount();
  const tx = {
    type: "proposal",
    network,
    from: user.entry.address,
    proposal: crypto.hash(`issue-${issue}-proposal-${proposal + 1}`),
    issue: crypto.hash(`issue-${issue}`),
    parameters,
    timestamp: Date.now(),
  };
  crypto.signObj(tx, user.entry.keys.secretKey, user.entry.keys.publicKey);
  return injectTx(tx);
}

export async function submitVoteTx(
  proposal: Accounts.Proposal,
  amount: Number,
  user: Wallet
) {
  const issue = await getIssueCount();
  const tx = {
    type: "vote",
    network,
    from: user.entry.address,
    issue: crypto.hash(`issue-${issue}`),
    proposal: proposal.id,
    amount,
    timestamp: Date.now(),
  };
  crypto.signObj(tx, user.entry.keys.secretKey, user.entry.keys.publicKey);
  return injectTx(tx);
}
