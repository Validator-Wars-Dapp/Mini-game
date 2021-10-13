// larga vida al #js13k! 
// start wrapping code
(() => {
const DEBUG = true;
const TOTAL_NFTS = 13*1024;
const pseudoRandom = (seed) => {
  let value = seed + TOTAL_NFTS;
  return () => value = value * 16807 % 2147483647;
};
const rand = Math.random;

const randomSort = (a, b) => rand()>0.5?-1:1;

let timeFactor = 1;
const delay = (ms) => new Promise((resolve)=>setTimeout(resolve, ~~(ms*timeFactor)));


const createSVGelement = (elementType) => document.createElementNS('http://www.w3.org/2000/svg', elementType);
const createElement = (elementType) => document.createElement(elementType);
const setAttribute = (element, attribute, value) => element.setAttribute(attribute, value);
const appendChild = (element, child) => element.appendChild(child);
const byId = (id) => document.getElementById(id);
// class mod
const classListName = 'classList';
const addClass = (element, _class) => element[classListName].add(_class);
const removeClass = (element, _class) => element[classListName].remove(_class);
const containsClass = (element, _class) => element[classListName].contains(_class);
const toggleClass = (element, _class) => element[classListName].toggle(_class);


const saveLocalStorage = (key, value) => localStorage.setItem(`13ksp-${key}`, value);
const getLocalStorage = (key, _default) => localStorage.getItem(`13ksp-${key}`)||_default;
const reload = () => location.reload();
// const addPatternA = (values) => {
//   return `repeating-radial-gradient(
// circle at ${values[0]}vh ${values[1]}vh,
// #111, #111 0.22vh,
// transparent 0.23vh,
// transparent 2vh
// )`;
// };
// const discountPatternA = [[0, 0.95], [5, -10.05], [0, -0.05], [5, 10.95], [0, 0.3], [0, 0.7], [5, 10.3], [5, 10.7], [10.3, 5], [10.7, 5], [10.3, 5], [10.7, 5]];
// const calculatedPatternA = discountPatternA.map((values) => addPatternA(values)).join(',');


// var style = document.createElement('style');
// style.innerHTML = `
// .discount {
//   background-color: #e3e3e3;
//   background-image: ${calculatedPatternA};
//   background-size: 100% 100%;
//   background-position: 100% 100%;
// }
// .skulls {
// 	background-color: #111;
// 	background-image:${calculatedPatternB};
// `;
// document.getElementsByTagName('head')[0].appendChild(style);
/*
document.styleSheets[0].insertRule(`.discount {
  background-color: #e3e3e3;
  background-image: ${calculatedPattern};
  background-size: 100% 100%;
  background-position: 100% 100%;
}`);*/// given an id generate a spaceship

const shipShapesChances = [1, 10, 25, 25, 20, 5, 10, 15, 2];
const shipWingsChances = [10, 18, 4, 10, 45, 35, 30, 25, 25, 15, 18, 3, 1];
const shipBGColorsChances = [2, 30, 30, 28, 50, 28, 20, 20, 15, 1];
const shipFGColorsChances = [2, 30, 30, 28, 50, 28, 20, 20, 15, 1];
const shipBGEffectChances = [10, 12, 10, 10, 5, 2, 8, 6, 4, 4, 2, 2];
const shipPalleteChances = [10, 10, 6, 6, 3 ,6, 6, 3, 6, 3, 3, 1, 1, 1, 1, 1, 3, 5];
const shipBackCoverChances = [1, 1, 1, 20, 10, 20];

const randomInt = (rnd = getConfigForId(~~(rand()*1000)), min, max) => ~~(rnd()%(max - min) + min);
const regularRandomInt = (min, max) => ~~(rand()*(max-min)) + min;
const getRandomIndexProb = (rnd, probs) => {
  const total = probs.reduce((acc, value) => acc + value, 0);
  const value = randomInt(rnd, 0, total);
  let acc = 0;
  for (let i = 0; i < probs.length; i++) {
    acc += probs[i];
    if (value < acc) {
      return i;
    }
  }
  return probs.length - 1;
};

const chanceOf = (probs, index) => {
  const total = probs.reduce((acc, value) => acc + value, 0);
  return probs[index]/total;
};// n7
const ship1 = [
  'm30 89-19-4v6l19 8 19-8v-6l-19 4zm13-46V31l3-5v-9l-3-3V5h5l12 19v11l-7 29zM30 63v26L8 84V64zM17 44V31l-3-5v-9l3-3V5h-5L1 24v11l7 29zm13 19v26l23-5V64l-23-2z',//0
  'm2 40 6 1 2 8-4 7zm40 3-12-2-13 2-9 21 22-2 23 2-10-21zm17-3-6 1-2 8 4 7z',//1
  'm30 68 8 2v17m-8-19-8 2v17m8-25V41M15 5V0m31 5V1M9 20v8l4 4v4H1m51-16v8l-3 4v4h11'//2
];
// n4
const ship2 = [
  'M28 0c-9 11-11 25-11 25V83h23V26S37 11 28 0z',
  'M22 54s-4 11-12 17-9 14-9 14h21zm13 0s4 11 12 17 9 14 9 14H34zM22 85h13v8h-13z',
  'M28 32c-8 4-8 25-8 25v30h17V57s0-21-8-25z',
  'M30 97h-3V70a1 1 0 0 1 1-1 1 1 0 0 1 1 1zM20 63l4 2v9l-4 2V63zm17 0-4 2v9l4 2z',
  'M11 85v-7m4 7V74m29 11v-7m-4 7V74'
];
// n1
const ship3 = [
  'M31 37 19 2l-3-1-3 1L3 37 1 64v19l6 10 10 6 10-6 6-10z',
  'm9 15 3 5-2 10-6 3zm15 0-3 5 3 10 6 3zM7 93l10-9 10 9-10 6zm9-45L6 60v3l10-7 12 7v-3z',
  'M16 48V1m13 35h-5m7 4h-8m-15 0H3m7-4H2m14 20L6 63v17h22V63z'
];
// n2
const ship4 = [
  'M22 25 14 1 7 25 1 49v23l14 15 14-15V49z',
  'm21 52-6-10-6 10-5 10v9l11 6 11-6v-9zM8 21l3 5-2 13-6 4zm13 0-3 5 3 13 6 4z',
  'M14 1v22m0 5v5'
];
// n3
const ship5 = [
  "M5 80H23V93H5z",
  "M13 2C0 7 1 22 1 22v63h26V22S26 7 14 2z",
  "M16 99h-4V58a2 3 0 0 1 2-3 3 3 0 0 1 2 3zm-2-84s-7 0-9 5h18c-2-5-9-5-9-5zM1 48l7 4v14L1 70v-22zm26 0-7 4v14l7 3z",
  "M26 22H1M26 27h-8m8 3h-8m-10-3H1m8 3H1"
];

const ship6 = [
  "M39 22 32 1 26 22l-6 22v20L32 99l12-34v-20z",
  "m37 47-5-9-5 9-5 9v8l10 5 10-5v-8zm7-2 14 20v14L44 64zM27 19l3 5-3 12-5 3zm11 0-3 5 3 12 5 3zM20 44 6 64v14l14-14z",
  "M16 50v5l-3 4-4 0zm31 0v5l3 4 4 0z",
  "M32 1v24m0 3v7"
];

const ship7 = [
  "m50 39-7-24-7 24-6 24V84l14 14 14-14V62z",
  "m49 35 23-13L68 1l14 11 4 23-30 22zM37 35 14 22 19 1 5 11 1 34l30 23z",
  "M49 65a6 6 0 0 0-10 0l-5 9V83l10-4L54 83v-9zM37 35l3 5-3 13-6 4zm12 0-3 5 3 13 7 4zM80 39l-9-5-8 6 1 11zM69 5l5 4 1 6-3 5zM8 39l10-5 8 7-1 11zM18 5l-6 4-1 6 3 5z",
  "M43 15v20m0 5v5M77 28 52 43M35 43 10 28"
];

//-9-11 60 120
const ship8 = [
  "M16 1C9 8-11 34 9 93v5h17v-5c20-59 0-85-7-92a3 3 0 0 0-4 1z",
  "M18 22V99M10 21v8m15 0v-8M10 31v4m15 0v-4",
  "M18 22a44 45 1 0 0 13-2c-4-10-8-16-11-19a3 3 0 0 0-4 0C13 4 8 10 5 20a45 45 0 0 0 13 2zM18 59a3 3 0 0 0-3 3V95h6V61a3 3 0 0 0-3-2z"
];

const wings1 = [
  "M8 37 4 40 1 37V11L4 1l4 11v25z",
  "M21 33h16V13H21L8 18v12l13 3zM1 15l4 3V28L1 33V15z",
  "M13 16v7m4-8v6"
];

const wings2 = [
  "M23 1 8 23v16l15-16 14 0V1H23z",
  "M8 8v42L1 43V30l7-22z",
  "M1 30h7v9H1z",
  "M18 8v6l-3 5-4 1L18 8z"
];

const wings3 = [
  "M33 24S27 41 14 50 1 71 1 71h42V1z",
  "M24 71v-15m-6 15V59"
];

const wings4 = [
  "M6 1c-5 5-5 17-5 17v50h10V17S12 5 6 1z",
  "M12 70H0l1-7h10l1 7zm-1-28h14v7H11z",
  "M7 18H1M7 24H1"
];

const wings5 = [
  "M8 26h4v15H8zm11-7h4V47H19zm36 16V10l-21 5v18z",
  "M34 33H15V20l19-8v21z",
  "M15 33H1v-6l14-5v11zm3-14 2 3 8-3 2-5-12 5zM55 1 38 9v5l17-4z"
];

const wings6 = [
  "M22 6 7 15v15l15-3 14 0V6H22z",
  "M7 1v40L1 34V22L7 1zm4 12c0 0 0 8 0 8L16 26V10"
];

const wings7 = [
  "M9 6h4v16h-4zM21 1h4v20h-4z",
  "M16 15H1v6l16 5zM59 41l-22-7V15h22z",
  "M37 15H16v14l21 8zM1 22V7l3-3v18z",
  "M19 30l2-4 8 3 2 6z"
];

const wings8 = [
  "M41 1 4 28a8 8 0 0 0-3 6v6l40-9z",
  "m20 16 2 7m-9-2 1 5",
  "m1 36 40-13"
];


const PIECE_KEY = 'pieces';
const SCALE_KEY = 'scale';
const TRANSLATE_KEY = 'translate';
const LEFT_WING_TRANSLATE_KEY = 'leftTranslate';
const RIGHT_WING_TRANSLATE_KEY = 'rightTranslate';
const STYLES_KEY = 'styles';

const ENCODED_SHAPES = {
  0: {
    [PIECE_KEY]: ship1,
    [TRANSLATE_KEY]: [-6, 20],
    [SCALE_KEY]: [0.75, 0.75],
    [STYLES_KEY]: [0, 1, 0, 1]
  },
  1: {
    [PIECE_KEY]: ship2,
    [TRANSLATE_KEY]: [-10, 0],
    [SCALE_KEY]: [1, 1],
    [STYLES_KEY]: [1, 1, 0, 1]
  },
  2: {
    [PIECE_KEY]: ship3,
    [TRANSLATE_KEY]: [4, 10],
    [SCALE_KEY]: [0.9, 0.9],
    [STYLES_KEY]: [0, 1, 0, 1]
  },
  3: {
    [PIECE_KEY]: ship4,
    [TRANSLATE_KEY]: [4, 10],
    [SCALE_KEY]: [1, 1],
    [STYLES_KEY]: [0, 1, 0, 1],
    [STYLES_KEY]: [0, 1, 0, 1]
  },
  4: {
    [PIECE_KEY]: ship5,
    [TRANSLATE_KEY]: [4.5, 0],
    [SCALE_KEY]: [1, 1],
    [STYLES_KEY]: [1, 0, 1, 1]
  },
  5: {
    [PIECE_KEY]: ship6,
    [TRANSLATE_KEY]: [-14, 0],
    [SCALE_KEY]: [1, 1],
    [STYLES_KEY]: [0, 1, 0, 1]
  },
  6: {
    [PIECE_KEY]: ship7,
    [TRANSLATE_KEY]: [-26, -10],
    [SCALE_KEY]: [1, 1],
    [STYLES_KEY]: [0, 0, 1, 0]
  },
  7: {
    [PIECE_KEY]: ship8,
    [TRANSLATE_KEY]: [0.5, 0],
    [SCALE_KEY]: [1, 1],
    [STYLES_KEY]: [0, 0, 1, 0]
  },
  8: {
    [PIECE_KEY]: ship7,
    [TRANSLATE_KEY]: [-18, -90],
    [SCALE_KEY]: [0.7, -1.4],
    [STYLES_KEY]: [0, 1, 0, 0]
  }
};

const ENCODED_WINGS = {
  0: {
    [PIECE_KEY]: wings1,
    [TRANSLATE_KEY]: [5.5, 50],
    [SCALE_KEY]: [1, 1],
    [LEFT_WING_TRANSLATE_KEY]: [-20, 0],
    [RIGHT_WING_TRANSLATE_KEY]: [-47, 0],
    [STYLES_KEY]: [0, 1, 0]
  },
  1: {
    [PIECE_KEY]: wings2,
    [TRANSLATE_KEY]: [5.5, 60],
    [SCALE_KEY]: [1, 1],
    [LEFT_WING_TRANSLATE_KEY]: [-25, 0],
    [RIGHT_WING_TRANSLATE_KEY]: [-50, 0],
    [STYLES_KEY]: [0, 1, 0, 1]
  },
  2: {
    [PIECE_KEY]: wings3,
    [TRANSLATE_KEY]: [11.5, 45],
    [SCALE_KEY]: [0.70, 0.70],
    [LEFT_WING_TRANSLATE_KEY]: [-40, 0],
    [RIGHT_WING_TRANSLATE_KEY]: [-70, 0],
    [STYLES_KEY]: [1, 0]
  },
  3: {
    [PIECE_KEY]: wings4,
    [TRANSLATE_KEY]: [0, 28],
    [SCALE_KEY]: [1, 1],
    [LEFT_WING_TRANSLATE_KEY]: [-6.5, 0],
    [RIGHT_WING_TRANSLATE_KEY]: [-43.5, 0],
    [STYLES_KEY]: [0, 1, 0]
  },
  4: {
    [PIECE_KEY]: wings5,
    [TRANSLATE_KEY]: [7, 52],
    [SCALE_KEY]: [0.85, 0.85],
    [LEFT_WING_TRANSLATE_KEY]: [-53, 0],
    [RIGHT_WING_TRANSLATE_KEY]: [-81, 0],
    [STYLES_KEY]: [0, 1, 0]
  },
  5: {
    [PIECE_KEY]: wings6,
    [TRANSLATE_KEY]: [5, 45],
    [SCALE_KEY]: [1, 1],
    [LEFT_WING_TRANSLATE_KEY]: [-20, 0],
    [RIGHT_WING_TRANSLATE_KEY]: [-46, 0],
    [STYLES_KEY]: [1, 0]
  },
  6: {
    [PIECE_KEY]: wings7,
    [TRANSLATE_KEY]: [-1.5, 52],
    [SCALE_KEY]: [0.85, 0.85],
    [LEFT_WING_TRANSLATE_KEY]: [-45, 0],
    [RIGHT_WING_TRANSLATE_KEY]: [-90, 0],
    [STYLES_KEY]: [0, 1, 0, 1]
  },
  7: {
    [PIECE_KEY]: wings8,
    [TRANSLATE_KEY]: [-4, 70],
    [SCALE_KEY]: [0.85, 0.85],
    [LEFT_WING_TRANSLATE_KEY]: [-20, 0],
    [RIGHT_WING_TRANSLATE_KEY]: [-70, 0],
    [STYLES_KEY]: [1, 1]
  },
  8: {
    [PIECE_KEY]: wings1,
    [TRANSLATE_KEY]: [-1, -95],
    [SCALE_KEY]: [1.5, -1],
    [LEFT_WING_TRANSLATE_KEY]: [-20, 0],
    [RIGHT_WING_TRANSLATE_KEY]: [-47, 0],
    [STYLES_KEY]: [1,0, 0]
  },
  9: {
    [PIECE_KEY]: wings7,
    [TRANSLATE_KEY]: [-1.5, -98],
    [SCALE_KEY]: [0.85, -0.85],
    [LEFT_WING_TRANSLATE_KEY]: [-45, 0],
    [RIGHT_WING_TRANSLATE_KEY]: [-90, 0],
    [STYLES_KEY]: [1, 0, 1, 0]
  },
  10: {
    [PIECE_KEY]: wings3,
    [TRANSLATE_KEY]: [1.5, 170],
    [SCALE_KEY]: [1.10, 0.30],
    [LEFT_WING_TRANSLATE_KEY]: [-38, 0],
    [RIGHT_WING_TRANSLATE_KEY]: [-68, 0],
    [STYLES_KEY]: [0, 1]
  },
  11: {
    [PIECE_KEY]: wings7,
    [TRANSLATE_KEY]: [-1.5, 28],
    [SCALE_KEY]: [0.85, 0.85],
    [LEFT_WING_TRANSLATE_KEY]: [-45, 0],
    [RIGHT_WING_TRANSLATE_KEY]: [-90, 0],
    [STYLES_KEY]: [1, 1, 0, 1]
  },
  12: {
    [PIECE_KEY]: [],
    [TRANSLATE_KEY]: [0, 0],
    [SCALE_KEY]: [1, 1],
    [LEFT_WING_TRANSLATE_KEY]: [0, 0],
    [RIGHT_WING_TRANSLATE_KEY]: [0, 0],
    [STYLES_KEY]: []
  }
};

const palletes = [
  [],                             // 0
  [0.95, 0.5, 108, 0.5, 0.9, 1],  // 1
  [0.7, 1, 0, 5, 1.1, 0],         // 2
  [0.7, 1, 45, 1, 1.3, 0],        // 3
  [0.6, 1, 90, 3, 1.1, 0],        // 4
  [0.4, 1, 135, 12, 1.1, 0],      // 5
  [0.6, 1, 180, 6, 1.3, 0],       // 6
  [0.12, 1, 225, 3, 3.9, 0],      // 7
  [0.4, 1, 270, 3, 1.2, 0],       // 8
  [0.4, 1, 320, 4, 1.3, 0],       // 9
  [0.9, 1, 0, 2, 0.8, 1],           //10
  [1.6, 1, 38, 13, 2, 1],          // 11
  [1.01, 1, 90, 4, 1.0, 1],          // 12
  [1.4, 1, 135, 13, 1.5, 1],       // 13
  [0.83, 1, 180, 18, 1, 1],       // 14
  [0.65, 1, 225, 6, 1, 1],        // 15
  [1.1, 1, 270, 18, 0.9, 1],         // 16
  [0.75, 1, 315, 8, 1, 1]         // 17
];

const backgroundConfig = [
  [-1, 0], [0, 0], [1, 0], [2, 0], [3, 0], [4, 0],
  [-1, 1], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1]
];


const FACTION_NAMES = [
  'shadow proclamation',
  'skulz',
  'borgz',
  'rebels',
  'the empire',
  'federation'
];
const BASE_NAMES = [
  'icarus',
  'uscss',
  'x-78',
  'nightfly',
  'z-wolf',
  'legacy',
  'bebop',
  'yamato',
  'nautilus',
  'hyperion'
];
const WINGS_NAMES = [
  'hunter',
  'liberator',
  'explorer',
  'searcher',
  'rider',
  'seeker',
  'skywalker',
  'destroyer',
  'intrepid',
  'explorer',
  'brave',
  'fearless',
  'conqueror',
  ''
];
const GALAXY_NAMES = [
  'milky way',
  'andromeda',
  'hydra',
  'helix',
  'bw tauri',
  'recursive',
  'void',
  'kraken',
  'omega',
  'xix',
  'dark',
  'ultimate'
];

const backCovers = [
  'discount',
  'skulls',
  'biohazard',
  'lobby',
  'target',
  'trellis'
];
const contractName = 'spacewars.neuromancer';

const getNetworkConfig = (networkId) => {
  return {
    networkId,
    nodeUrl: `https://rpc.${networkId}.near.org`,
    walletUrl: `https://wallet.${networkId}.near.org`,
    contractName: `${contractName}.${networkId}`,
    deps: { keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore() }
  };
}

const connectTo = async (force) => {
  const near = await nearApi.connect(getNetworkConfig(NETS[net]));
  const con = `${contractName}.${net}`;
  const walletConnection = new nearApi.WalletConnection(near);
  contract = await new nearApi.Contract(walletConnection.account(), con, {
    viewMethods: ['getAccount', 'getGame'],
    changeMethods: ['addCredit', 'getLastBattleLog', 'joinGame', 'setHand'],
    sender: walletConnection.account()
  });
  if (walletConnection.isSignedIn()) {
    // Logged in account, can write as user signed up through wallet
    //account = walletConnection.account();
    displayCustomDialog(`connected to ${NETS[net]}`, 2400);
    await syncGameState();
    toggleClass(bye, 'hide');
  } else if (force) {
    let account = new nearApi.Account(near.connection, con);
    walletConnection.requestSignIn(con)
  } else {
    netSelect.value = LOCAL;
    saveLocalStorage('net', LOCAL);
    reload();
  }
  logout = async () => {
    displayCustomDialog('loading...', 0);
    await walletConnection.signOut();
    saveLocalStorage('net', LOCAL);
    reload();
  }
}


addCreditNear = () => {
  displayCustomDialog('loading...', 0);
  contract.addCredit({}, '20000000000000', '100000000000000000000000');
}

const syncGameState = async () => {
  if (gameOver) return;
  let { ships=[], credits=1, player:_player, inQueue=-1} = (await contract.getAccount({account_id:contract.account.accountId})) || {};
  updateCredits(credits);
  if (_player) {
    if (player.id != _player.id || game.state<=SETUP) {
      player = assignPlayer(_player.id, _player.ship);
      player.alive = getLocalStorage('pS')=='true';
      players=[player];
    }
    player.state = _player.state;
    player.arsenal = _player.arsenal;
    player.victories = _player.wins;
  }

  handleGameUpdate(await contract.getGame());
  if (game.state==LOBBY && inQueue>=0) {
    !containsClass(joinGamebtn, 'hide') && toggleJoin();
    joinGameLabel.innerHTML = `${game.waitingPlayers}/8 players ready to play`;
  }

  setTimeout(syncGameState, 10000);
}

const updateCredits = (_credits) => {
  credits = _credits;
  tCredits.innerHTML = `credits ${credits.toString().padStart(3, '0')}`;
}
updateCredits(1);



const initNear = async () => {
  net = getLocalStorage('net', LOCAL);
  netSelect.value = net;
  if (net !== LOCAL) await connectTo();
}


const MAINNET='mainnet';
const TESTNET='testnet';
const LOCAL='local';

const NETS = {
  [MAINNET]: MAINNET,
  [TESTNET]: TESTNET,
  [LOCAL]: LOCAL,
};

const BUSY = 0;
const LOBBY = 1;
const SETUP = 2;
const WAIT_PLAYERS = 3;
const SOLVING_TURN = 4;
const OVER = 5;


const GAME_STATE = {
  [BUSY]: BUSY,
  [LOBBY]: LOBBY,
  [SETUP]: SETUP,
  [WAIT_PLAYERS]: WAIT_PLAYERS,
  [SOLVING_TURN]: SOLVING_TURN,
  [OVER]: OVER
};

let net = LOCAL;

let players;
let player;
let game;

const resetState = () => {
  players = [];
  player = {
    id: -1,
    shipId: 0,
    alive: true,
    arsenal: [0, 1, 2, regularRandomInt(0, 9)],
    hand: [],
    ready: false,
    victories: 0
  };
  game = {
    id: regularRandomInt(0,1000),
    state: GAME_STATE[LOBBY],
    totalPlayers: 0,
    round: 0
  };
};


const loadGameScreen = () => {
  changePage('game');
  renderGamePage();
};

const setGameState = (state) => {
  game.state = state;
};

let mockRemoteGameState = LOBBY;
const LOCAL_PLAYERS = 4;  // the ideal value here is 8

const assignPlayer = (id, _shipId) => {
  const shipId = _shipId || regularRandomInt(0, TOTAL_NFTS);
  const shipADN = codesToShip[shipId];
  return {
    id,
    shipId,
    shipADN,
    config: adnToShipConfig(shipADN),
    alive: true,
    arsenal: [0, 1, 2, regularRandomInt(3, cards.length)], // this could change if we do not want the cards to grow by level
    hand: [],
    ready: false,
    victories: 0 
  };
}



const startGame = async () => {
  if (dialogOpen) await td();
  // check network
  for (let i=0; i<LOCAL_PLAYERS; i++) {
    players.push(assignPlayer(i));
  }
  game.totalPlayers = players.length;
  player = { ...players[0] };
  td('wait');
  loadNewRound();
};

const createGame = () => {
  game.id = 0;
  setGameState(LOBBY);
  game.totalPlayers = 0;
  game.round = 0;
}

const joinGameLocal = async () => {
  await delay(350);
  startGame();
};

const loadNewRound = () => {
  game.round += 1;
  player.ready = false;
  player.hand = [];
};


const randomHand = (arsenal) => arsenal.map((_, index)=>index).sort(randomSort).splice(0, 3);
const battleStartMessage = 'battle is about to start!';
const solveTurnLocal = async () => {
  //if (game.state !== HOLD) return;
  if (player.hand.length === 0) {
    player.hand = randomHand(player.arsenal);
  }
  const [rival] = players.splice(regularRandomInt( 1, players.length), 1);
  players.splice(1, ~~(players.length/2));
  rival.hand = randomHand(rival.arsenal);
  const battleLog = solveBattle(player, rival);
  await displayCustomDialog(battleStartMessage, 1500);
  changePage('viewBattle');
  loadBattle(battleLog);
  setGameState(SOLVING_TURN);
}

const solveCardAbsolute = (cardA, cardB) => {
  let sol = solveCards(cardA, cardB);
  if (sol === TIE) {
    sol = solveCards(cardA, cardB, true);
  }
  return BATTLE_VALUES[sol];
}

const solveBattle = (playerA, playerB) => {
  let log = {
    shipA: playerA.shipId,
    shipB: playerB.shipId,
    arsenalA: playerA.arsenal,
    arsenalB: playerB.arsenal,
    winner: -1,
    rounds: []
  };
  let scores = [0, 0];
  let battleRound = 0;
  let handA;
  let handB;
  while (scores[0]<2&&scores[1]<2) {
    if (battleRound>10) break;
    switch (battleRound) {
      case 0:
        handA = playerA.hand.map(_=>_);
        handB = playerB.hand.map(_=>_);
      break;
      case 1:
        handA = playerA.hand.sort(randomSort).map(_=>_);
        handB = playerB.hand.sort(randomSort).map(_=>_);
        break;
        case 2: 
        handA = randomHand(playerA.arsenal);
        handB = randomHand(playerB.arsenal);
      break;
      default:
        handA = [regularRandomInt(0, playerA.arsenal.length)];
        handB = [regularRandomInt(0, playerB.arsenal.length)];
      break;
    }
    const res = handA.reduce((score, _, index) => score + solveCardAbsolute(playerA.arsenal[handA[index]], playerB.arsenal[handB[index]]), 0);
    if (res>0) scores[0]++;
    if (res<0) scores[1]++;
    log.rounds.push({ handA, handB });
    battleRound += 1;
  }
  log.winner = scores[0]>scores[1]?0:1;
  return log;
}

const checkGameState = () => {
}


const roundFinish = () => {
  changePage('game');
  if (net==NETS[LOCAL]) {
    player.arsenal.push(regularRandomInt(0,9));
    game.round += 1;
    game.totalPlayers = players.length;
    player.victories += 1;  // this is about if the player wins
  }
  player.hand = [];
  handSet = [false, false, false];
  blIndex = 0;
  renderGamePage();
}


// handle events depending on network
addCredits = () => {
  if (net!=NETS[LOCAL]) {
    addCreditNear();
  }
}


const joinGame = async () => {
  if (credits==0) return td();
  await delay(1500);
  if (net!=NETS[LOCAL]) {
    const reply = await contract.joinGame();
    if (reply === 3) updateCredits(credits-1);
    else saveLocalStorage('pS', player.alive);
  }
  // add network
  md(-14);
  await delay(1300);
  td();
  if (net==NETS[LOCAL]) {
    joinGameLocal();
  }
  toggleJoin();
};

setHand = async () => {
  if (player.hand.length < 3) {
    displayCustomDialog('choose 3 cards from your arsenal');
  } else {
    blIndex = 1;
    const reply = blMeStates[blIndex];
    byId('blMe').innerHTML=reply;
    if (net==NETS[LOCAL]) { 
      await displayCustomDialog(reply);
      await solveTurnLocal();
    } else {
      displayCustomDialog('delivering orders...', 0);
      await contract.setHand({hand:player.hand});
      td();
      await delay(400)
      await displayCustomDialog(reply, 1200);
    }
  }
}

loadLastBattle = async () => {
  displayCustomDialog(battleStartMessage, 0);
  const battleLog = await contract.getLastBattleLog({account_id:contract.account.accountId});
  battleLog.rounds = battleLog.rounds.map(([handA, handB])=> { return {handA, handB};});
  changePage('viewBattle');
  loadBattle(battleLog);
  saveLocalStorage('pS', player.state != 5);
  td();
}

const handleGameUpdate = async (_game) => {
  const newRound = _game.round > game.round;
  if (_game.state != game.state || newRound) {
    if (_game.state >= WAIT_PLAYERS) {
      if (player.alive && (newRound || _game.state==5)) {
        await loadLastBattle();
      } else if (player.state!=5) {
        if (game.state < WAIT_PLAYERS) {
          await delay(3000);
          td('wait');
        } else {
          changePage('game');
        }
      }
    }
    if (game.state == OVER) reload();
  }
  player.alive = player.state != 5;
  game = _game;
  if (game.state >= WAIT_PLAYERS && currentPage!='game') {
    renderGamePage();
  }
}

const contexts = [];

const injectPieces = (element, config, patterns) => {
  const {[PIECE_KEY]: pieces, [STYLES_KEY]: styles} = config;
  pieces.forEach((path, index) => {
    //const d = translateShip(encoded);
    const piece = createSVGelement('path');
    const pattern = patterns[styles[index]];
    setAttribute(piece, 'fill', `url(#pattern${ pattern })`);
    setAttribute(piece, 'd', path);
    appendChild(element, piece);
  });
};

const setTransform = (element, translate, scale=[1, 1]) => {
  setAttribute(element, 'transform', `scale(${scale[0]}, ${scale[1]}) translate(${ translate[0] }, ${translate[1]})`);
}

const renderShip = (shapeId, wingsId, bgColor, fgColor) => {
  const mainSVG = createSVGelement('svg');
  const patterns = [bgColor, fgColor];
  setAttribute(mainSVG, 'viewBox', '0 -50 35 200');
    const ship = createSVGelement('g');
    setTransform(ship, [0, 0]);
    setAttribute(ship, 'class', 'cls-1');
    
      // wings body
      const wingsData = ENCODED_WINGS[wingsId];
      const wings = createSVGelement('g');
      setTransform(wings, wingsData[TRANSLATE_KEY], wingsData[SCALE_KEY]);
        // -- left wing
        const leftWing = createSVGelement('g');
        setTransform(leftWing, wingsData[LEFT_WING_TRANSLATE_KEY]);
        injectPieces(leftWing, wingsData, patterns);
        appendChild(wings, leftWing);
        // -- right wing
        const rightWing = leftWing.cloneNode(4);
        setTransform(rightWing, wingsData[RIGHT_WING_TRANSLATE_KEY], [-1, 1]);
        appendChild(wings, rightWing);

      appendChild(ship, wings);
      
      // shape body
      const shapeData = ENCODED_SHAPES[shapeId];
      const shape = createSVGelement('g');
      setTransform(shape, shapeData[TRANSLATE_KEY], shapeData[SCALE_KEY]);
      injectPieces(shape, shapeData, patterns);

      appendChild(ship, shape);
    appendChild(mainSVG, ship);
    
  return mainSVG;
};


const changePallete = (index) => {
  const [b=1, sep=0, hue=0, sat=0, b2=1, inv=0] = palletes[index];
  document.body.style.filter = `brightness(${b}) sepia(${sep}) hue-rotate(${hue}deg) saturate(${sat}) brightness(${b2}) invert(${inv})`;
  dl.style.filter = inv?`invert(1) brightness(${1/b2}) saturate(2) sepia(1) brightness(${1/b})`:'';
};


const createCanvasElement = (cIndex) => {
  const canvas = createElement('canvas');
  setAttribute(canvas, 'width', 200);
  setAttribute(canvas, 'height', 300);
  const ctx = canvas.getContext('2d');
  let index = 0;
  let palleteIndex = 0;
  let colorBack = 0;
  const draw = (stars) => {
    ctx.save();
    ctx.fillStyle = `rgba(${colorBack},${colorBack},${colorBack}, 0.1)`;
    //ctx.fillStyle = 'rgba(255,255,255, 0.2)';
    //ctx.clearRect(0,0,400,400);
    ctx.fillRect(0, 0, 200, 300);
    ctx.fillStyle = '#888';
    ctx.strokeStyle = ctx.fillStyle;
    palleteIndex>=0 && stars[palleteIndex].forEach(star => {
      ctx.save();
      star.draw(ctx);
      ctx.restore();
    });
    ctx.restore();
  };
  const setIndex = (_index) => {
    index = _index;
    palleteIndex = backgroundConfig[index][0];
    colorBack = backgroundConfig[index][1]*255;
  };
  setIndex(cIndex);
  return {
    canvas,
    setIndex,
    draw
  }
}

const getRandomshipConfig = () => { 
  return {
    shapeId: ~~(rand()*Object.keys(ENCODED_SHAPES).length),
    wingsId: ~~(rand()*Object.keys(ENCODED_WINGS).length),
    bgColor: ~~(rand()*10),
    fgColor: ~~(rand()*10),
    bgEffect: ~~(rand()*backgroundConfig.length),
    pallete: ~~(rand()*palletes.length),
    backCover: ~~(rand()*backCovers.length)
  }
};

const codesToShip = [];
const getConfigWithSeed = (id) => {
  const rnd = pseudoRandom(id);
  const config = {
    shapeId: getRandomIndexProb(rnd, shipShapesChances),
    wingsId: getRandomIndexProb(rnd, shipWingsChances),
    bgColor: getRandomIndexProb(rnd, shipBGColorsChances),
    fgColor: getRandomIndexProb(rnd, shipFGColorsChances),
    bgEffect: getRandomIndexProb(rnd, shipBGEffectChances),
    pallete: getRandomIndexProb(rnd, shipPalleteChances),
    backCover: getRandomIndexProb(rnd, shipBackCoverChances)
  }
  const encodeADN = index => index.toString(16);
  let adn = `${encodeADN(config.shapeId)}`;
  adn += `${encodeADN(config.wingsId)}`;
  adn += `${encodeADN(config.bgColor)}`;
  adn += `${encodeADN(config.fgColor)}`;
  adn += `${encodeADN(config.bgEffect)}`;
  adn += `${encodeADN(config.pallete)}`;
  adn += `${encodeADN(config.backCover)}`;
  config.adn = adn;
  return config;
};
if (DEBUG) {
  shipsShapesDistribution = {};
  shipsWingsDistribution = {};
  shipsBGColorDistribution = {};
  shipsFGColorDistribution = {};
  shipBGEffectDistribution = {};
  shipPalleteDistribution = {};
  shipBackCoverDistribution = {};
}

const ShipGeneration = () => {
  //let collisions = 0;
  let addToDistribution;
  if (DEBUG) {
    addToDistribution = (distribution, value) => {
      if (!distribution[value]) {
        distribution[value] = 0;
      }
      distribution[value] += 1;
    }
  }
  const ships = {};
  const shipsToGenerate = TOTAL_NFTS;
  for (let i = 0; codesToShip.length < shipsToGenerate; i++) {
    const config = getConfigWithSeed(i);
    const key = config.adn.substring(0,5);
    if (!ships[key]) {
      ships[key] = 1;
      codesToShip.push(config.adn);
      if (DEBUG) {
        addToDistribution(shipsShapesDistribution, config.shapeId);
        addToDistribution(shipsWingsDistribution, config.wingsId);
        addToDistribution(shipsBGColorDistribution, config.bgColor);
        addToDistribution(shipsFGColorDistribution, config.fgColor);
        addToDistribution(shipBGEffectDistribution, config.bgEffect);
        addToDistribution(shipPalleteDistribution, config.pallete);
        addToDistribution(shipBackCoverDistribution, config.backCover);
      }
    } else {
      //collisions += 1;
      ships[key] += 1;
    }
  }
}

const adnToShipConfig = (adn) => {
  const pieces = adn.split('').map(code=>parseInt(code, 16));
  return {
    shapeId: pieces[0],
    wingsId: pieces[1],
    bgColor: pieces[2],
    fgColor: pieces[3],
    bgEffect: pieces[4],
    pallete: pieces[5],
    backCover: pieces[6]
  }
}

const flipCard = (cardElement) => {
  //e.stopPropagation();
  if (containsClass(cardElement, 'cf')) {
    addClass(cardElement, 'cu');
    setTimeout(() => {
      removeClass(cardElement, 'cf');
      removeClass(cardElement, 'cu');
    }, 500);
  }
  else { 
    addClass(cardElement, 'cf');
  }
};

const wrapInCard = (backCover, frontChilds, onclick, className='') => {
  const cardElement = createElement('div');
  cardElement.className = `card ${ className }`;
    const cardBackElement = createElement('div');
      cardBackElement.className = `card-face ${ backCovers[backCover] } card-backing`;
    cardElement.appendChild(cardBackElement);
    
    const cardFrontElement = createElement('div');
      cardFrontElement.className = 'card-face card-front';
      frontChilds.forEach(child=>cardFrontElement.appendChild(child));
      
  cardElement.appendChild(cardFrontElement);
  cardElement.onclick = () => onclick(cardElement);
  return cardElement;
}

const createCard = ({ shapeId=0, wingsId=0, bgColor=0, fgColor=0, bgEffect=0, pallete=0, backCover=0 }) => {
  let shipConfig = {
    shapeId,
    wingsId,
    bgColor,
    fgColor,
    bgEffect,
    pallete,
    backCover
  };

  const canvasTest = createCanvasElement(bgEffect);
  contexts.push(canvasTest.draw);
  let svgGenerated = renderShip(shapeId, wingsId, bgColor, fgColor);
  const cardElement = wrapInCard(backCover, [canvasTest.canvas, svgGenerated], flipCard);
  changePallete(shipConfig.pallete);
  //const cardFrontElement = cardElement.querySelector('.card-front');
  //const cardBackElement = cardElement.querySelector('.card-backing');
  return {
    cardElement,
    setShipConfiguration: (config) => {
      shipConfig = {...shipConfig, ...config};
      //cardFrontElement.removeChild(svgGenerated);
      svgGenerated = renderShip(shipConfig.shapeId, shipConfig.wingsId, shipConfig.bgColor, shipConfig.fgColor);
      canvasTest.setIndex(shipConfig.bgEffect)
      //cardFrontElement.appendChild(svgGenerated);
      //cardBackElement.className = `card-face ${ backCovers[shipConfig.backCover] } card-backing`;
      // be careful to apply this only with the main card
      changePallete(shipConfig.pallete);
    }
  };
};

const getShipById = (id) => adnToShipConfig(codesToShip[id]);

ShipGeneration();

if (DEBUG) {
  
  debugView.innerHTML = `
    <div id='previewDebug' style='width=100%;display=block;height=40vh'></div>
    <span>Shape: </span>
    <a onclick='setShapeDebug(0)'>0</a>
    <a onclick='setShapeDebug(1)'>1</a>
    <a onclick='setShapeDebug(2)'>2</a>
    <a onclick='setShapeDebug(3)'>3</a>
    <a onclick='setShapeDebug(4)'>4</a>
    <a onclick='setShapeDebug(5)'>5</a>
    <a onclick='setShapeDebug(6)'>6</a>
    <a onclick='setShapeDebug(7)'>7</a>
    <a onclick='setShapeDebug(8)'>8</a>
    <br>
    <span>Wings: </span>
    <a onclick='setWingsDebug(0)'>0</a>
    <a onclick='setWingsDebug(1)'>1</a>
    <a onclick='setWingsDebug(2)'>2</a>
    <a onclick='setWingsDebug(3)'>3</a>
    <a onclick='setWingsDebug(4)'>4</a>
    <a onclick='setWingsDebug(5)'>5</a>
    <a onclick='setWingsDebug(6)'>6</a>
    <a onclick='setWingsDebug(7)'>7</a>
    <a onclick='setWingsDebug(8)'>8</a>
    <a onclick='setWingsDebug(9)'>9</a>
    <a onclick='setWingsDebug(10)'>10</a>
    <a onclick='setWingsDebug(11)'>11</a>
    <a onclick='setWingsDebug(12)'>12</a>
    <br>
    <span>BGcolor: </span>
    <a onclick='setColorBgDebug(0)'>0</a>
    <a onclick='setColorBgDebug(1)'>1</a>
    <a onclick='setColorBgDebug(2)'>2</a>
    <a onclick='setColorBgDebug(3)'>3</a>
    <a onclick='setColorBgDebug(4)'>4</a>
    <a onclick='setColorBgDebug(5)'>5</a>
    <a onclick='setColorBgDebug(6)'>6</a>
    <a onclick='setColorBgDebug(7)'>7</a>
    <a onclick='setColorBgDebug(8)'>8</a>
    <a onclick='setColorBgDebug(9)'>9</a>
    <br>
    <span>FGcolor: </span>
    <a onclick='setColorFgDebug(0)'>0</a>
    <a onclick='setColorFgDebug(1)'>1</a>
    <a onclick='setColorFgDebug(2)'>2</a>
    <a onclick='setColorFgDebug(3)'>3</a>
    <a onclick='setColorFgDebug(4)'>4</a>
    <a onclick='setColorFgDebug(5)'>5</a>
    <a onclick='setColorFgDebug(6)'>6</a>
    <a onclick='setColorFgDebug(7)'>7</a>
    <a onclick='setColorFgDebug(8)'>8</a>
    <a onclick='setColorFgDebug(9)'>9</a>
    <br>
    <span>Pallete: </span>
    <a onclick='changePallete(0)'>0</a>
    <a onclick='changePallete(1)'>1</a>
    <a onclick='changePallete(2)'>2</a>
    <a onclick='changePallete(3)'>3</a>
    <a onclick='changePallete(4)'>4</a>
    <a onclick='changePallete(5)'>5</a>
    <a onclick='changePallete(6)'>6</a>
    <a onclick='changePallete(7)'>7</a>
    <a onclick='changePallete(8)'>8</a>
    <a onclick='changePallete(9)'>9</a>
    <a onclick='changePallete(10)'>10</a>
    <a onclick='changePallete(11)'>11</a>
    <a onclick='changePallete(12)'>12</a>
    <a onclick='changePallete(13)'>13</a>
    <a onclick='changePallete(14)'>14</a>
    <a onclick='changePallete(15)'>15</a>
    <a onclick='changePallete(16)'>16</a>
    <a onclick='changePallete(17)'>17</a>
    <br>
    <span>Background: </span>
    <a onclick='setBackground(0)'>0</a>
    <a onclick='setBackground(1)'>1</a>
    <a onclick='setBackground(2)'>2</a>
    <a onclick='setBackground(3)'>3</a>
    <a onclick='setBackground(4)'>4</a>
    <a onclick='setBackground(5)'>5</a>
    <a onclick='setBackground(6)'>6</a>
    <a onclick='setBackground(7)'>7</a>
    <a onclick='setBackground(8)'>8</a>
    <a onclick='setBackground(9)'>9</a>
    <a onclick='setBackground(10)'>10</a>
    <a onclick='setBackground(11)'>11</a>
    <br>
    <span>Back cover: </span>
    <a onclick='setBackCover(0)'>${backCovers[0]}</a>
    <a onclick='setBackCover(1)'>${backCovers[1]}<b/a>
    <a onclick='setBackCover(2)'>${backCovers[2]}</a>
    <a onclick='setBackCover(3)'>${backCovers[3]}</a>
    <a onclick='setBackCover(4)'>${backCovers[4]}</a>
    <a onclick='setBackCover(5)'>${backCovers[5]}</a>
    <br>
    <div id='cardsSelector'><span>Select Card: </span></div>
    <br>
    <a class='btn' onclick='randomConfig()'>randomProps</a>
    <a class='btn' onclick='randomConfig(true)'>all random</a>
    <a class='btn' onclick='addCard()'>add card</a>
    <br>
    <a class='btn' onclick='loadById()'>
      load by id
      <input id='shipid' type='number' value='0'/>
    </a>
    <br>
    <span id='adn-debug'></span></br>
    <span id='shapeId-id-prob'>shapeId: </span></br>
    <span id='wingsId-id-prob'>wingsId: </span></br>
    <span id='bgColor-id-prob'>bgColor: </span></br>
    <span id='fgColor-id-prob'>fgColor: </span></br>
    <span id='bgEffect-id-prob'>bgEffect: </span></br>
    <span id='pallete-id-prob'>pallete: </span></br>
    <span id='backCover-id-prob'>backCover: </span>
`;
 
  let cards = [];
  let selectedCard = 0;
  window.setShapeDebug = (shapeId) => {
    cards[selectedCard].setShipConfiguration({ shapeId });
  }
  window.setWingsDebug = (wingsId) => {
    cards[selectedCard].setShipConfiguration({ wingsId });
  }
  window.setColorBgDebug = (bgColor) => {
    cards[selectedCard].setShipConfiguration({ bgColor });
  }
  window.setColorFgDebug = (fgColor) => {
    cards[selectedCard].setShipConfiguration({ fgColor });
  }
  window.changePallete = (pallete) => {
    cards[selectedCard].setShipConfiguration({ pallete });
  };
  window.setBackground = (bgEffect) => {
    cards[selectedCard].setShipConfiguration({ bgEffect });
  };
  window.setBackCover = (backCover) => {
    cards[selectedCard].setShipConfiguration({ backCover });
  };
  window.chooseCard = (index) => {
    selectedCard = index;
    cards[selectedCard].setShipConfiguration({});
  };

  window.randomConfig = (all=false) => {
    if (all) {
      cards.forEach(card => card.setShipConfiguration(getRandomshipConfig()));
    } else {
      cards[selectedCard].setShipConfiguration(getRandomshipConfig());
    }
  };
  

  const setProbText = ( key, dis, config) => {
    const value = config[key];
    const percentage = ((dis[config[key]]*100)/13312).toFixed(2);
    byId(`${key}-id-prob`).innerHTML = `${ key }: ${ percentage }% ships have this property`;
  }
  window.loadById = () => {
    const adn = codesToShip[parseInt(shipid.value)];
    const config = adnToShipConfig(adn);
    cards.forEach(card=>card.setShipConfiguration(config));
    byId('adn-debug').innerHTML = adn;
    setProbText('shapeId', shipsShapesDistribution, config);
    setProbText('wingsId', shipsWingsDistribution, config);
    setProbText('bgColor', shipsBGColorDistribution, config);
    setProbText('fgColor', shipsFGColorDistribution, config);
    setProbText('bgEffect', shipBGEffectDistribution, config);
    setProbText('pallete', shipPalleteDistribution, config);
    setProbText('backCover', shipBackCoverDistribution, config);
  };
  
  
  let shapeId = ~~(rand()*9);
  let wingsId = ~~(rand()*13);
  let bgColor = Math.ceil(rand()*10);
  let fgColor = Math.ceil(rand()*10);
  
  const addCard = () => {
    const card = createCard(getRandomshipConfig());
    previewDebug.appendChild(card.cardElement);
    cards.push(card);

    const chooseCardLink = createElement('a');
    chooseCardLink.setAttribute('onclick', `chooseCard(${cards.length - 1})`);
    chooseCardLink.innerHTML = cards.length - 1;
    cardsSelector.appendChild(chooseCardLink);
  }

  const total = 0;
  for (let i = 0; i < total; i++) {
    addCard();
  }

  window.addCard = addCard;
}
//wrapInCard(renderSVG(translateShip(ship7)));
// renderSVG(document.body, translateShip(ship7));
// renderSVG(document.body, translateShip(ship6));
// renderSVG(document.body, translateShip(ship5));
// renderSVG(document.body, translateShip(ship4));
// renderSVG(document.body, translateShip(ship3));
// renderSVG(document.body, translateShip(ship2));
// renderSVG(document.body, translateShip(ship1));
  //renderSVG(document.body, ship2);
const PATH_KEY = 0;
const VIEWPORT_KEY = 1;
const SVG_ROCK = {
  [PATH_KEY]: 'M15 17c-1 2 2 5 5 3a21 20 0 0 0 4-6m-14 1c0 1 5 8 8-5m3 9c-1 4 4 4 5 3 0 0 3-4 4-8m-18 9a20 10-50 0 0-6-7c2-2 4-3 9-3 3 0 5-6-1-6 0 0-6 0-11 3-3 3-8 21 12 21 9 0 15-10 15-16 0-4-3-5-5-3m0 0a2 2 0 0 0-6-3c2-4-3-6-5-4 1-3-4-6-8-2-3 3-5 12-5 11m7-8L7 8',
  [VIEWPORT_KEY]: '0 0 32 32'
};

const SVG_SCISSORS = {
  [PATH_KEY]: 'm17 24-2 5c-1 2 1 7 4 3 1-1 4-8 3-6m-4 7c0 3 4 3 5 1l3-6m-16 7a5 8-1 0 0-1-4 4 3 10 0 0-4-2l5-2 4-1c3-1 3-5-1-5-1 0-8 2-10 3-6 5-1 19 11 19 6 0 11-9 12-14 1-4-4-5-4-3 2-3 0-6-3-5-4 1-3-5-2-18 0-3-5-3-5 1-1 12-1 16-3 16S7 15 7 5c0-4-5-4-5 0 1 9 1 15 0 20',
  [VIEWPORT_KEY]: '0 0 32 44'
};

const SVG_PAPER = {
  [PATH_KEY]: 'M18 35c-2-7-7-7-9-8a14 14 0 0 1-3-3c-5-5-7 1-4 3s6 4 6 7c1 9 14 10 18 8 7-4 2-11 13-28 2-3-2-5-3-2-4 7-5 10-6 10s-1-4 1-16a2 2 0 1 0-4-1c-2 11-2 16-4 15-1 0-1-5-1-17 0-3-5-4-5 0 0 12 1 17-1 17s-2-4-4-15c0-3-5-2-4 1 2 10 4 18 2 21',
  [VIEWPORT_KEY]: '-1 -1 42 45'
};

const ROCK_PAPER_SCISSORS = [SVG_ROCK, SVG_PAPER, SVG_SCISSORS];

const cards = [
  [0, 0],
  [1, 1],
  [2, 2],
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 2],
  [2, 0],
  [2, 1]
];

const getGameCard = (svgConfig, order) => {
  const mainSVG = createSVGelement('svg');
  setAttribute(mainSVG, 'viewBox', svgConfig[VIEWPORT_KEY]);
  setAttribute(mainSVG, 'class', `opt${ order }`);
  const path = createSVGelement('path');
  setAttribute(path, 'd', svgConfig[PATH_KEY]);
  setAttribute(path, 'class', 'cls-1');
  appendChild(mainSVG, path);
  return mainSVG;
};

let handSet = [false, false, false];
const toggleArsenalCard = (cardElement, orderElement, arsenalIndex) => {
  const indexOfCard = player.hand.indexOf(arsenalIndex);
  const addCard = indexOfCard==-1;
  if ( addCard && player.hand.length >=3) return;
  toggleClass(cardElement, 'selected');
  if (addCard) {
    player.hand.push(arsenalIndex);
    let indexHand = handSet.indexOf(false);
    orderElement.innerHTML = indexHand + 1;
    handSet[indexHand] = true;
  } else {
    player.hand.splice(indexOfCard, 1);
    handSet[parseInt(orderElement.innerHTML) - 1] = false;
  }
};

const getHTMLCard = (code, arsenalIndex) => {
  const svgs = cards[code].map((id, index) => getGameCard(ROCK_PAPER_SCISSORS[id], index));
  const orderElement = createElement('div');
  orderElement.className = 'order';
  svgs.push(orderElement);
  const cardElement = wrapInCard(1, svgs, 
    _ => {
      toggleArsenalCard(cardElement, orderElement, arsenalIndex);
    }
    , 'arsenal');
  flipCard(cardElement);
  return cardElement;
};

const WINNER = 'winner';
const LOSER = 'loser';
const TIE = 'tie';

const BATTLE_VALUES = {
  [WINNER]: 1,
  [TIE]: 0,
  [LOSER]: -1
};

const solveCards = (idA, idB, second=false) => {
  let valA = cards[idA][second?1:0];
  let valB = cards[idB][second?1:0];
  if (valA === 0 && valB === 2) return WINNER;
  if (valA === 1 && valB === 0) return WINNER;
  if (valA === 2 && valB === 1) return WINNER;
  if (valA === valB) return TIE;
  return LOSER;
};



const battleCardClick = flipCard;

const addCardToBattle = (config, parent) => {
  const card = createCard(config);
  parent.appendChild(card.cardElement);
  card.cardElement.onclick = () => {
    changePallete(config.pallete);
  };
  return card.cardElement;
}

const setupHand = (parent, hand, backCover) => {
  parent.innerHTML = '';
  return hand.map((id, i) => {
    const svgs = cards[id].map((_id, index) => getGameCard(ROCK_PAPER_SCISSORS[_id], index));
    const cardElement = wrapInCard(backCover, svgs, _=>_, 'arsenal');
    parent.appendChild(cardElement);
    cardElement.style.top = `-${15*i}vh`;
    return cardElement;
  });
}

const secondOption = (cardElement) => {
  const a = cardElement.querySelectorAll('svg');
  a[0].setAttribute('class', 'opt1');
  a[1].setAttribute('class', 'opt0');
}

const animateBattle = async (cardElementA, cardElementB, cardA, cardB, second=false) => {
  await delay(second?400:600);
  !second && flipCard(cardElementA);
  !second && flipCard(cardElementB);
  await delay(second?0:600);
  let winner = solveCards(cardA, cardB, second);
  addClass(cardElementA, winner);
  addClass(cardElementB, winner);
  if (!second && winner===TIE) {
    await delay(600);
    removeClass(cardElementA, winner);
    removeClass(cardElementB, winner);
    secondOption(cardElementA);
    secondOption(cardElementB);
    return await animateBattle(cardElementA, cardElementB, cardA, cardB, true);
  }
  return BATTLE_VALUES[winner];
}

const solveBattleScript = async (coverA, coverB, playerHandA, playerHandB) => {
  const handA = setupHand(sideA, playerHandA, coverA);
  const handB = setupHand(sideB, playerHandB, coverB);
  await delay(100);
  handA.forEach(cardElement=>cardElement.style.top=0);
  handB.forEach(cardElement=>cardElement.style.top=0);
  let points = 0;
  for (let index = 0; index < handA.length && Math.abs(points)<2; index++) {
    points += await animateBattle(handA[index], handB[index], playerHandA[index], playerHandB[index]);
  }
  return points;
}

const dismissCards = async () => {
  await delay(500);
  const cardsA = sideA.querySelectorAll('.card');
  const cardsB = sideB.querySelectorAll('.card');
  const cardsLength = cardsA.length;
  for(let i=0;i<cardsLength;i++) {
    containsClass(cardsA[i], 'cf')&&flipCard(cardsA[i]);
    containsClass(cardsB[i], 'cf')&&flipCard(cardsB[i]);
    //flipCard(cardsA[i]);
    //flipCard(cardsB[i]);
  }
  await delay(300);
  for(let i=0;i<cardsLength;i++) {
    addClass(cardsA[i], 'vanish');
    addClass(cardsB[i], 'vanish');
  }
  await delay(800);
}

const loadBattle = async (battleLog) => {
  const configA = getShipById(battleLog.shipA);
  const configB = getShipById(battleLog.shipB);
  const playerContent = "<ul class='victories'><li></li><li></li></ul>";
  playerA.innerHTML = playerContent;
  playerB.innerHTML = playerContent;
  sideA.innerHTML = '';
  sideB.innerHTML = '';
  // present cards
  const cardA = addCardToBattle(configA, playerA);
  const cardB = addCardToBattle(configB, playerB);
  changePallete(configA.pallete);
  await delay(400);
  flipCard(cardA);
  await delay(300);
  toggleClass(viewBattle.querySelector('h3'), 'hide');
  await delay(300);
  flipCard(cardB);
  await delay(400);

  let scores = [0, 0];
  let winner = false;
  for (let index = 0; index < battleLog.rounds.length && !winner; index++) {
    let message = 'point!!!';
    const { handA, handB } = battleLog.rounds[index];
    const roundWinner = await solveBattleScript(configA.backCover, configB.backCover, handA.map(c=>battleLog.arsenalA[c]), handB.map(c=>battleLog.arsenalB[c]));
    if (roundWinner>0) {
      scores[0]++;
      addClass(playerA.querySelector(`li:nth-child(${scores[0]})`), 'score');
    }
    if (roundWinner<0) {
      scores[1]++;
      addClass(playerB.querySelector(`li:nth-child(${scores[1]})`), 'score');
    }
    if (roundWinner == 0) {
      message = 'draw!!!'
    }
    winner = scores[0] >= 2 || scores[1] >= 2;
    await delay(500);
    if(!winner) {
      await displayCustomDialog(message);
      await dismissCards();
    }
  }
  if (battleLog.winner === player.id) {
    if (game.totalPlayers === 1) {
      gameOver=true;
      td('chicken-dinner');
    } else {
      td('battle-win');
    }
  } else {
    gameOver=true;
    td('battle-lose');
  }
  // display winner
}

let currentPage = 'index';

const changePage = (page) => {
  addClass(byId(currentPage), 'hide');
  removeClass(byId(page), 'hide');
  currentPage = page;
};

const toggleJoin = () => {
  toggleClass(joinGamebtn, 'hide');
  toggleClass(joinGameLabel, 'hide');
  netSelect.disabled = !netSelect.disabled;
};

let dialogTopn;
let dialogMax;
let dialogCategory = '';
let dialogOpen = false;

let dialogConfig = {
  rules: {
    max: -40
  },
  join: {
    max: -14,
    disableLinks: true,
    onOpen: joinGame
  },
  wait: {
    max: -14,
    disableLinks: true,
    onOpen: async () => {
      await delay(800);
      md(-14);
      await delay(1200);
      loadGameScreen();
      await delay(600);
      td();
    }
  },
  'battle-lose': {
    max: -14,
    onOpen: async () => {
      await delay(1200);
      md(-14);
    },
    onClose: reload
  }, 
  'battle-win': {
    max: -14,
    disableLinks: true,
    onOpen: async () => {
      await delay(2000);
      md(-14);
      await delay(3000);
      td();
    },
    onClose: roundFinish
  },
  'chicken-dinner': {
    max: -28,
    top: 60,
    onOpen: async () => {
      const aLink = `<a class='da' href='?id=${ player.shipId }' target='_blank'>#${ player.shipId }</a>`;
      if (net == NETS[LOCAL]) {
        winnerMessage.innerHTML = `Now you can Join to the<br>Near blockchain to earn<br>spaceships NFTs`;
      } else {
        winnerMessage.innerHTML = `The NFT ${aLink} is beeing<br>assigned to your wallet!`;
      }
      addClass(playerA.querySelector('.card'), 'chicken');
      await delay(2000);
      md(-14);
      await delay(3000);
    },
    onClose: reload
  }
};

md = (val) => {
  dialogTop += val;
  if (dialogTop < dialogMax) dialogTop -= val;
  if (dialogTop > 0) dialogTop =  0;
  dlt.style.top = `${dialogTop}vh`;
};

joinGamebtn.onclick=()=>credits<1?displayCustomDialog('not enough credits'):td("join");


const displayCustomDialog = async (text, timeout=1200) => {
  document.querySelector('#dl-custom p').innerHTML = text;
  let globalResolve =_=>_;
  const returnPromise = new Promise(resolve=>globalResolve=resolve);
  dialogConfig.custom = {
    max: 0,
    disableLinks: true,
    onOpen: async () => {
      if (timeout==0) return;
      await delay(timeout);
      td();
    },
    onClose: globalResolve
  };
  this.td('custom');
  return returnPromise;
}

td = async (category=dialogCategory, props) => {
  dialogTop = 0;
  dlt.style.top = `${dialogTop}vh`;
  const targetDialog = byId(`dl-${category}`);
  //targetDialog.classList.toggle('hide');
  let isOpenEvent = containsClass(targetDialog, 'hide');
  dialogCategory=category;
  let { max, disableLinks, onOpen, onClose, top=35 } = props || dialogConfig[category];
  dialogMax = max;
  const links = dl.querySelectorAll('a');
  
  for (let i=0;i<links.length;i++) {
    disableLinks?addClass(links[i], 'hide'):removeClass(links[i], 'hide');
  }
  if (isOpenEvent) {
    toggleClass(targetDialog, 'hide');
    toggleClass(dl, 'hide');
    await delay(1);
    dlb.style.top = `${ top }vh`;
    dlb.style.opacity = '1';
    await delay(300);
    onOpen && onOpen();
    dialogOpen = true;
  } else {
    await delay(1);
    dlb.style.top = '100vh';
    dlb.style.opacity = '0';
    await delay(300);
    dlb.style.top = '0vh';
    toggleClass(targetDialog, 'hide');
    toggleClass(dl, 'hide');
    onClose && onClose();
    dialogOpen = false;
  }
};

// dgs div game state
const MINS = 3; // setup different times depending on network?
let targetTime;
const setTargetTime = delay => targetTime = Date.now() + 1000 * 60 * MINS + delay;
setTargetTime(0);

const updatetime = () => {
  const time = targetTime - Date.now();
  if (time < 0) {
    // emit timeout!!!
    setTargetTime(time);
  }

  const mins = ~~(time / (1000 * 60));
  const secs = (~~((time - mins*60*1000) / 1000)).toString().padStart(2, '0');
  dgs.innerHTML = `game will start in ${mins}:${secs}`;
  const timer = byId('timer')
  if (timer) timer.innerHTML = `${mins}:${secs}`;
}

const starGroups = [[],[],[],[],[]];

const addStar = () => {
  let x=~~(rand()*300), y=-50, vy=rand()*5+5;
  starGroups[0].push({
    move: _ => y = y+vy>300?((vy=rand()*5 + 5)||-50):y+vy,
    draw: ctx => ctx.fillRect(x, y, 2, 4)
  })
}
const addExplodingStar = () => {
  let speed = rand()*5 + 0;
  let r = rand()*Math.PI*2;
  let x = -1, y = -1;
  let vx=0;
  let vy=0;
  const reset = () => {
    x = 100;
    y = 150;
    r = rand()*Math.PI*2;
    vx=Math.cos(r)*speed; vy=Math.sin(r)*speed;
  };

  starGroups[1].push({
    move: _=> {
      y += vy; x+= vx;
      if (y<0||y>300||x<0||x>200) reset();
    }, draw:(ctx)=>{
      ctx.translate(x, y);
      ctx.rotate(r);
      ctx.fillRect(0, -15, 1, 30)
    }
  })
}


const addRandomDimension = () => {
  let x = -1;
  let vx=rand()+1;
  const reset = () => {
    x = 100;
    vx=rand()+1;
  };
  starGroups[2].push({
    move: _=> {
      x+= vx;
      if (x<0||x>200) reset();
    }, draw:(ctx)=>{
      //ctx.fillStyle = '#999';
      ctx.globalAlpha = 1- (200-x)/100;
      ctx.fillRect(x, 0, 2, 300)
      ctx.fillRect(200-x, 0, 2, 300)
    }
  })
}

const enterTheVoid = () => {
  let speed = rand()+1;
  let r = rand()*50;
  starGroups[3].push({
    move: _=> {
      r += speed;
      if (r > 200) r = 1;
    }, draw:(ctx)=>{
      ctx.translate(100, 150);
      ctx.beginPath();
      //ctx.strokeStyle = '#eee';
      ctx.strokeWidth = 2;
      ctx.arc(0, 0, r, 0, 2 * Math.PI, false);
      ctx.stroke();
    }
  })
};

const increasingStars = () => {
  let speed = rand()+1;
  let r = rand()*200;
  let tangSpeed = 0.01;
  let angle = rand()*Math.PI*2;
  starGroups[4].push({
    move: _=> {
      r += speed;
      angle += tangSpeed;
      if (r > 200) r = 1;
    }, draw:(ctx)=>{
      ctx.translate(100, 150);
      ctx.rotate(Math.PI*3/4);
      //ctx.strokeStyle = '#eee';
      ctx.strokeRect(-r, -r, r*2, r*2);
    }
  })
}


for (let i=0;i<10; i++){
  addRandomDimension();
  increasingStars();
}
for (let i=0;i<100; i++){ 
  addExplodingStar();
  addStar();
}
for (let i=0;i<30; i++){ enterTheVoid();}

const loopStars = () => {
  starGroups.forEach(stars => stars.forEach(star => star.move()));
  contexts.forEach(fn => fn(starGroups));
};
const blMeStates = ['waiting for orders', 'ready for battle'];
let blIndex = 0;
const renderGamePage = () => {
  if (!ship.children.length) {
    const config = getShipById(player.shipId);
    const card = createCard(config);
    ship.appendChild(card.cardElement);
  }
  gameStats.innerHTML = `
<tr><td>spacewar: #${ game.id }</td><td>${ net }</td></tr>
<tr><td>round: #${ game.round }</td><td>next battle: <span id='timer'></td></tr>
<tr><td>remaining ships: ${ game.totalPlayers }</td><td>${ game.totalPlayers==2?' - last round -':'' }</td></tr>
  `;

  shipStats.innerHTML = `
<span class='shipName'>${BASE_NAMES[player.config.shapeId]} ${WINGS_NAMES[player.config.wingsId]}</span>
<hr>
<span>spaceship: <a href='https://bafybeifh3mmbyccjo64qjr6thhphyspnxirtcv6rxb3bsip5noaicv5v4i.ipfs.dweb.link?id=${ player.shipId }' target='_blank'>#${ player.shipId }</a></span>
<span>galaxy: ${ GALAXY_NAMES[player.config.bgEffect] }</span>
<span>faction: ${ FACTION_NAMES[player.config.backCover] }</span>
<span>victories: ${ player.victories }</span>
<hr>
<a id='blMe' href='#'>${blMeStates[blIndex]}</a>`;
  group.innerHTML='';
  player.arsenal.forEach((card, arsenalIndex) => group.appendChild(getHTMLCard(card, arsenalIndex)));
};

netSelect.onchange = _ => {
  net = netSelect.value;
  saveLocalStorage('net', net);
  if (net==LOCAL) return reload();
  connectTo(true);
}

// init code
const initialization = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = parseInt(urlParams.get('id'));
  if (isNaN(id) || id < 0 || id >= TOTAL_NFTS) return;
  changePage('viewCard');
  const config = getShipById(id);
  const card = createCard(config);
  viewCard.appendChild(card.cardElement);
  addClass(card.cardElement, 'cf');
}
resetState();
initNear();
if (DEBUG) {
  initialization();
  timeFactor = 0.5;
  //setGameState(JOINED);
  //changePage('viewBattle');
  //startGame();
  //loadGameScreen();
  //changePage('debugView')
}




const loop = () => {
  updatetime();
  loopStars();
  requestAnimationFrame(loop);
};

loop();

// ending wrap code
})();