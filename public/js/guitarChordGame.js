var gameSizes = {
  mobile: {
    gameWidth: 250,
    gameHeight: 250,
    fretsHeight: [25,53,85,115,145,175,205,225,250],
    fretsWidth: [3,38,76,116,154,191],
    neckImgScale: .15,
    nonFingerImgScale: .3,
    fingerImgScale: .2,
    wrongNeckImgScale: .15,
    wrongFretsHeight: [77,104,135,165,195,230,260,290,320],
    wrongFretsWidthOne: [6,41,75,113,152,188],
    wrongFretsWidthTwo: [253,289,327,365,404,440],
    wrongFingerImgScale: .2,
    wrongNonFingerImgScale: .3
  },
  regular: {
    gameWidth: 500,
    gameHeight: 500,
    fretsHeight: [0,57,120,180,243,305,364,400,450],
    fretsWidth: [10,76,156,232,308,382],
    neckImgScale: .3,
    nonFingerImgScale: .6,
    fingerImgScale: .4,
    wrongNeckImgScale: .15,
    wrongFretsHeight: [77,104,135,165,195,230,260,290,320],
    wrongFretsWidthOne: [6,41,75,113,152,188],
    wrongFretsWidthTwo: [253,289,327,365,404,440],
    wrongFingerImgScale: .2,
    wrongNonFingerImgScale: .3
  }
}

var currGameSize;

if (screen.width < 500){
  currGameSize = gameSizes.mobile;
}else{
  currGameSize = gameSizes.regular;
}

var leaderboardVersions = ["nearMe","topScorers"];
var currLeaderboardVersion;
var gameTimer;

var game = new Phaser.Game(currGameSize.gameWidth,currGameSize.gameWidth, Phaser.CANVAS, 'gcgGame',{preload: preload, create: create, update: update});

var text = "";
var wrongTextOne = "";
var wrongTextTwo = "";
var counter = 0;
var notes;
var currChord;
var guitarNeck;
var wrongGuitarNeckOne;
var wrongGuitarNeckTwo;
var fretWidth = 78;
var currRand = 0;
var prevRand;
var guitarTones;
var newAnswers;
var resetting = false;
var loginWarning = false;
var leaderboardTeaserCounter = 0;
var leaderboardDecrementor = 1000;

var questions = {
  easy: [
    {name: "C Major", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 3},{fret: 2,finger: 2},{fret: 0, finger: 0},{fret: 1, finger: 1},{fret: 0, finger: 0}],
      answers: [{answer: "C Major", correct: true},{answer: "G Major",correct: false},{answer: "F Major",correct: false},{answer: "E Major",correct: false}],
      scaleTones: ["x",1,3,5,1,3], noteLetters: ["x","C","E","G","C","E"]
    },
    {name: "C Major", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 1},{fret: 5,finger: 2},{fret: 5, finger: 3},{fret: 5, finger: 4},{fret: 3, finger: 1}],
      answers: [{answer: "C Major", correct: true},{answer: "G Major",correct: false},{answer: "F Major",correct: false},{answer: "E Major",correct: false}],
      scaleTones: ["x",1,5,1,3,5], noteLetters: ["x","C","G","C","E","G"]
    },
    {name: "G Major", notes: [{fret: 3, finger: 2},{fret: 2, finger: 1},{fret: 0,finger: 0},{fret: 0, finger: 0},{fret: 3, finger: 3},{fret: 3, finger: 4}],
      answers: [{answer: "G Major", correct: true},{answer: "C Major",correct: false},{answer: "F Major",correct: false},{answer: "E Major",correct: false}],
      scaleTones: [1,3,5,1,5,1], noteLetters: ["G","B","D","G","D","G"]
    },
    {name: "G Major", notes: [{fret: 3, finger: 1},{fret: 5, finger: 3},{fret: 5,finger: 4},{fret: 4, finger: 2},{fret: 3, finger: 1},{fret: 3, finger: 1}],
      answers: [{answer: "G Major", correct: true},{answer: "C Major",correct: false},{answer: "F Major",correct: false},{answer: "E Major",correct: false}],
      scaleTones: [1,5,1,3,5,1], noteLetters: ["G","D","G","B","D","G"]
    },
    {name: "D Major", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 2, finger: 1},{fret: 3, finger: 3},{fret: 2, finger: 2}],
      answers: [{answer: "D Major", correct: true},{answer: "G Major",correct: false},{answer: "F Major",correct: false},{answer: "E Major",correct: false}]
    },
    {name: "A Major", notes: [{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 2,finger: 1},{fret: 2, finger: 2},{fret: 2, finger: 3},{fret: 0, finger: 0}],
      answers: [{answer: "A Major", correct: true},{answer: "G Major",correct: false},{answer: "D Major",correct: false},{answer: "E Major",correct: false}]
    },
    {name: "E Major", notes: [{fret: 0, finger: 0},{fret: 2, finger: 2},{fret: 2,finger: 3},{fret: 1, finger: 1},{fret: 0, finger: 0},{fret: 0, finger: 0}],
      answers: [{answer: "E Major", correct: true},{answer: "A Major",correct: false},{answer: "F Major",correct: false},{answer: "C Major",correct: false}]
    },
    {name: "B Major", notes: [{fret: -1, finger: "x"},{fret: 2, finger: 1},{fret: 4,finger: 2},{fret: 4, finger: 3},{fret: 4, finger: 4},{fret: 2, finger: 1}],
      answers: [{answer: "B Major", correct: true},{answer: "A Major",correct: false},{answer: "F# Major",correct: false},{answer: "E Major",correct: false}]
    },
    {name: "F# Major", notes: [{fret: 2, finger: 1},{fret: 4, finger: 3},{fret: 4,finger: 4},{fret: 3, finger: 2},{fret: 2, finger: 1},{fret: 2, finger: 1}],
      answers: [{answer: "F# Major", correct: true},{answer: "B Major",correct: false},{answer: "F Major",correct: false},{answer: "E Major",correct: false}]
    },
    {name: "C# Major", notes: [{fret: -1, finger: "x"},{fret: 4, finger: 1},{fret: 6,finger: 2},{fret: 6, finger: 3},{fret: 6, finger: 4},{fret: 4, finger: 1}],
      answers: [{answer: "C# Major", correct: true},{answer: "C Major",correct: false},{answer: "F# Major",correct: false},{answer: "B Major",correct: false}]
    },
    {name: "F Major", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 3,finger: 3},{fret: 2, finger: 2},{fret: 1, finger: 1},{fret: 1, finger: 1}],
      answers: [{answer: "F Major", correct: true},{answer: "G Major",correct: false},{answer: "F# Major",correct: false},{answer: "Bb Major",correct: false}]
    },
    {name: "F Major", notes: [{fret: 1, finger: 1},{fret: 3, finger: 3},{fret: 3,finger: 4},{fret: 2, finger: 2},{fret: 1, finger: 1},{fret: 1, finger: 1}],
      answers: [{answer: "F Major", correct: true},{answer: "G Major",correct: false},{answer: "F# Major",correct: false},{answer: "Bb Major",correct: false}]
    },
    {name: "Bb Major", notes: [{fret: -1, finger: "x"},{fret: 1, finger: 1},{fret: 3,finger: 2},{fret: 3, finger: 3},{fret: 3, finger: 4},{fret: 1, finger: 1}],
      answers: [{answer: "Bb Major", correct: true},{answer: "F Major",correct: false},{answer: "B Major",correct: false},{answer: "E Major",correct: false}]
    },
    {name: "C minor", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 1},{fret: 5,finger: 3},{fret: 5, finger: 4},{fret: 4, finger: 2},{fret: 3, finger: 1}],
      answers: [{answer: "C minor", correct: true},{answer: "G minor",correct: false},{answer: "B minor",correct: false},{answer: "F# minor",correct: false}]
    },
    {name: "G minor", notes: [{fret: 3, finger: 1},{fret: 5, finger: 3},{fret: 5,finger: 4},{fret: 3, finger: 1},{fret: 3, finger: 1},{fret: 3, finger: 1}],
      answers: [{answer: "G minor", correct: true},{answer: "F# minor",correct: false},{answer: "B minor",correct: false},{answer: "C minor",correct: false}]
    },
    {name: "D minor", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 2, finger: 2},{fret: 3, finger: 3},{fret: 1, finger: 1}],
      answers: [{answer: "D minor", correct: true},{answer: "A minor",correct: false},{answer: "B minor",correct: false},{answer: "E minor",correct: false}]
    },
    {name: "A minor", notes: [{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 2,finger: 2},{fret: 2, finger: 3},{fret: 1, finger: 1},{fret: 0, finger: 0}],
      answers: [{answer: "A minor", correct: true},{answer: "E minor",correct: false},{answer: "C minor",correct: false},{answer: "D minor",correct: false}]
    },
    {name: "E minor", notes: [{fret: 0, finger: 0},{fret: 2, finger: 2},{fret: 2,finger: 3},{fret: 0, finger: 0},{fret: 0, finger: 0},{fret: 0, finger: 0}],
      answers: [{answer: "E minor", correct: true},{answer: "A minor",correct: false},{answer: "B minor",correct: false},{answer: "D minor",correct: false}]
    },
    {name: "B minor", notes: [{fret: -1, finger: "x"},{fret: 2, finger: 1},{fret: 4,finger: 3},{fret: 4, finger: 4},{fret: 3, finger: 2},{fret: 2, finger: 1}],
      answers: [{answer: "B minor", correct: true},{answer: "E minor",correct: false},{answer: "F# minor",correct: false},{answer: "A minor",correct: false}]
    },
    {name: "F# minor", notes: [{fret: 2, finger: 1},{fret: 4, finger: 3},{fret: 4,finger: 4},{fret: 2, finger: 1},{fret: 2, finger: 1},{fret: 2, finger: 1}],
      answers: [{answer: "F# minor", correct: true},{answer: "F minor",correct: false},{answer: "B minor",correct: false},{answer: "A minor",correct: false}]
    },
    {name: "C# minor", notes: [{fret: -1, finger: "x"},{fret: 4, finger: 1},{fret: 6,finger: 3},{fret: 6, finger: 4},{fret: 5, finger: 2},{fret: 4, finger: 1}],
      answers: [{answer: "C# minor", correct: true},{answer: "F# minor",correct: false},{answer: "B minor",correct: false},{answer: "G minor",correct: false}]
    },
    {name: "F minor", notes: [{fret: 1, finger: 1},{fret: 3, finger: 3},{fret: 3,finger: 4},{fret: 1, finger: 1},{fret: 1, finger: 1},{fret: 1, finger: 1}],
      answers: [{answer: "F minor", correct: true},{answer: "F# minor",correct: false},{answer: "B minor",correct: false},{answer: "A minor",correct: false}]
    }
  ],
  medium: [
    {name: "C2", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 1},{fret: 5, finger: 3},{fret: 5, finger: 4},{fret: 3, finger: 1},{fret: 3, finger: 1}],
      answers: [{answer: "C2", correct: true},{answer: "Csus",correct: false},{answer: "CMaj7",correct: false},{answer: "Caug",correct: false}]
    },
    {name: "G2", notes: [{fret: 3, finger: 2},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 2, finger: 1},{fret: 3, finger: 3},{fret: 3, finger: 4}],
      answers: [{answer: "G2", correct: true},{answer: "Gsus",correct: false},{answer: "GMaj7",correct: false},{answer: "Gaug",correct: false}]
    },
    {name: "D2", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 2, finger: 1},{fret: 3, finger: 3},{fret: 0, finger: 0}],
      answers: [{answer: "D2", correct: true},{answer: "Dsus",correct: false},{answer: "DMaj7",correct: false},{answer: "Ddim",correct: false}]
    },
    {name: "A2", notes: [{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 2,finger: 1},{fret: 2, finger: 2},{fret: 0, finger: 0},{fret: 0, finger: 0}],
      answers: [{answer: "A2", correct: true},{answer: "Asus",correct: false},{answer: "AMaj7",correct: false},{answer: "Adim",correct: false}]
    },
    {name: "B2", notes: [{fret: -1, finger: "x"},{fret: 2, finger: 1},{fret: 4, finger: 3},{fret: 4, finger: 4},{fret: 2, finger: 1},{fret: 2, finger: 1}],
      answers: [{answer: "B2", correct: true},{answer: "Bsus",correct: false},{answer: "BMaj7",correct: false},{answer: "B7",correct: false}]
    },
    {name: "F2", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 3,finger: 3},{fret: 0, finger: 0},{fret: 1, finger: 1},{fret: 1, finger: 1}],
      answers: [{answer: "F2", correct: true},{answer: "Fsus",correct: false},{answer: "FMaj7",correct: false},{answer: "F7",correct: false}]
    },
    {name: "F2", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 3,finger: 1},{fret: 5, finger: 3},{fret: 6, finger: 4},{fret: 3, finger: 1}],
      answers: [{answer: "F2", correct: true},{answer: "Fsus",correct: false},{answer: "FMaj7",correct: false},{answer: "F7",correct: false}]
    },
    {name: "Bb2", notes: [{fret: -1, finger: "x"},{fret: 1, finger: 1},{fret: 3,finger: 3},{fret: 3, finger: 4},{fret: 1, finger: 1},{fret: 1, finger: 1}],
      answers: [{answer: "Bb2", correct: true},{answer: "Bbsus",correct: false},{answer: "BbMaj7",correct: false},{answer: "Bb7",correct: false}]
    },
    {name: "Eb2", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 1,finger: 1},{fret: 3, finger: 3},{fret: 4, finger: 4},{fret: 1, finger: 1}],
      answers: [{answer: "Eb2", correct: true},{answer: "Ebsus",correct: false},{answer: "EbMaj7",correct: false},{answer: "Eb7",correct: false}]
    },
    {name: "Cadd9", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 2},{fret: 2, finger: 1},{fret: 0, finger: 0},{fret: 3, finger: 3},{fret: 3, finger: 4}],
      answers: [{answer: "Cadd9", correct: true},{answer: "Csus",correct: false},{answer: "CMaj7",correct: false},{answer: "C7",correct: false}]
    },
    {name: "Gadd9", notes: [{fret: 3, finger: 2},{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 2, finger: 1},{fret: 0, finger: 0},{fret: 3, finger: 4}],
      answers: [{answer: "Gadd9", correct: true},{answer: "Gsus",correct: false},{answer: "GMaj7",correct: false},{answer: "G7",correct: false}]
    },
    {name: "Dadd9", notes: [{fret: -1, finger: "x"},{fret: 5, finger: 4},{fret: 4, finger: 3},{fret: 2, finger: 1},{fret: 3, finger: 2},{fret: 0, finger: 0}],
      answers: [{answer: "Dadd9", correct: true},{answer: "Dsus",correct: false},{answer: "DMaj7",correct: false},{answer: "Daug",correct: false}]
    },
    {name: "Eadd9", notes: [{fret: 0, finger: 0},{fret: 2, finger: 2},{fret: 2, finger: 3},{fret: 1, finger: 1},{fret: 0, finger: 0},{fret: 2, finger: 4}],
      answers: [{answer: "Eadd9", correct: true},{answer: "Esus",correct: false},{answer: "EMaj7",correct: false},{answer: "E7",correct: false}]
    },
    {name: "Fadd9", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 3, finger: 3},{fret: 2, finger: 2},{fret: 1, finger: 1},{fret: 3, finger: 4}],
      answers: [{answer: "Fadd9", correct: true},{answer: "Fsus",correct: false},{answer: "FMaj7",correct: false},{answer: "F7",correct: false}]
    },
    {name: "Csus", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 1},{fret: 5,finger: 2},{fret: 5, finger: 3},{fret: 6, finger: 4},{fret: 3, finger: 1}],
      answers: [{answer: "Csus", correct: true},{answer: "Cadd9",correct: false},{answer: "CMaj7",correct: false},{answer: "Cdim",correct: false}]
    },
    {name: "Gsus", notes: [{fret: 3, finger: 3},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 0, finger: 0},{fret: 1, finger: 1},{fret: 3, finger: 4}],
      answers: [{answer: "Gsus", correct: true},{answer: "G2",correct: false},{answer: "GMaj7",correct: false},{answer: "Gdim",correct: false}]
    },
    {name: "Dsus", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 2, finger: 1},{fret: 3, finger: 3},{fret: 3, finger: 4}],
      answers: [{answer: "Dsus", correct: true},{answer: "D2",correct: false},{answer: "DMaj7",correct: false},{answer: "Daug",correct: false}]
    },
    {name: "Asus", notes: [{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 2,finger: 1},{fret: 2, finger: 2},{fret: 3, finger: 3},{fret: 0, finger: 0}],
      answers: [{answer: "Asus", correct: true},{answer: "A2",correct: false},{answer: "AMaj7",correct: false},{answer: "Aaug",correct: false}]
    },
    {name: "Esus", notes: [{fret: 0, finger: 0},{fret: 2, finger: 2},{fret: 2,finger: 3},{fret: 2, finger: 4},{fret: 0, finger: 0},{fret: 0, finger: 0}],
      answers: [{answer: "Esus", correct: true},{answer: "Eadd9",correct: false},{answer: "EMaj7",correct: false},{answer: "Eadd9",correct: false}]
    },
    {name: "Bsus", notes: [{fret: -1, finger: "x"},{fret: 2, finger: 1},{fret: 4,finger: 2},{fret: 4, finger: 3},{fret: 5, finger: 4},{fret: 2, finger: 1}],
      answers: [{answer: "Bsus", correct: true},{answer: "B7",correct: false},{answer: "BMaj7",correct: false},{answer: "B2",correct: false}]
    },
    {name: "F#sus", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 4,finger: 3},{fret: 4, finger: 4},{fret: 2, finger: 1},{fret: 2, finger: 1}],
      answers: [{answer: "F#sus", correct: true},{answer: "F#2",correct: false},{answer: "F#Maj7",correct: false},{answer: "F#add9",correct: false}]
    },
    {name: "Fsus", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 3,finger: 3},{fret: 3, finger: 4},{fret: 1, finger: 1},{fret: 1, finger: 1}],
      answers: [{answer: "Fsus", correct: true},{answer: "F2",correct: false},{answer: "FMaj7",correct: false},{answer: "Fadd9",correct: false}]
    },
    {name: "Bbsus", notes: [{fret: -1, finger: "x"},{fret: 1, finger: 1},{fret: 3,finger: 2},{fret: 3, finger: 3},{fret: 4, finger: 4},{fret: 1, finger: 1}],
      answers: [{answer: "Bbsus", correct: true},{answer: "Bb2",correct: false},{answer: "BbMaj7",correct: false},{answer: "Bb7",correct: false}]
    },
    {name: "Ebsus", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 1,finger: 1},{fret: 3, finger: 2},{fret: 4, finger: 3},{fret: 4, finger: 4}],
      answers: [{answer: "Ebsus", correct: true},{answer: "Eb2",correct: false},{answer: "EbMaj7",correct: false},{answer: "Eb7",correct: false}]
    },
    {name: "C7", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 3},{fret: 2,finger: 2},{fret: 3, finger: 4},{fret: 1, finger: 1},{fret: 0, finger: 0}],
      answers: [{answer: "C7", correct: true},{answer: "Cdim",correct: false},{answer: "CMaj7",correct: false},{answer: "Caug",correct: false}]
    },
    {name: "D7", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 2, finger: 2},{fret: 1, finger: 1},{fret: 2, finger: 3}],
      answers: [{answer: "D7", correct: true},{answer: "Ddim",correct: false},{answer: "DMaj7",correct: false},{answer: "Daug",correct: false}]
    },
    {name: "D7", notes: [{fret: -1, finger: "x"},{fret: 5, finger: 3},{fret: 4,finger: 2},{fret: 5, finger: 4},{fret: 3, finger: 1},{fret: -1, finger: "x"}],
      answers: [{answer: "D7", correct: true},{answer: "Dsus",correct: false},{answer: "DMaj7",correct: false},{answer: "Daug",correct: false}]
    },
    {name: "A7", notes: [{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 2,finger: 2},{fret: 0, finger: 0},{fret: 2, finger: 3},{fret: 0, finger: 0}],
      answers: [{answer: "A7", correct: true},{answer: "Adim",correct: false},{answer: "AMaj7",correct: false},{answer: "Aaug",correct: false}]
    },
    {name: "E7", notes: [{fret: 0, finger: 0},{fret: 2, finger: 2},{fret: 0,finger: 0},{fret: 1, finger: 1},{fret: 0, finger: 0},{fret: 0, finger: 0}],
      answers: [{answer: "E7", correct: true},{answer: "Edim",correct: false},{answer: "EMaj7",correct: false},{answer: "Esus",correct: false}]
    },
    {name: "B7", notes: [{fret: -1, finger: "x"},{fret: 2, finger: 1},{fret: 4,finger: 3},{fret: 2, finger: 1},{fret: 4, finger: 4},{fret: 2, finger: 1}],
      answers: [{answer: "B7", correct: true},{answer: "B2",correct: false},{answer: "BMaj7",correct: false},{answer: "Baug",correct: false}]
    },
    {name: "B7", notes: [{fret: -1, finger: "x"},{fret: 2, finger: 2},{fret: 1,finger: 1},{fret: 2, finger: 3},{fret: 0, finger: 0},{fret: 2, finger: 4}],
      answers: [{answer: "B7", correct: true},{answer: "Bsus",correct: false},{answer: "BMaj7",correct: false},{answer: "B2",correct: false}]
    },
    {name: "F#7", notes: [{fret: 2, finger: 1},{fret: 4, finger: 3},{fret: 2,finger: 1},{fret: 3, finger: 2},{fret: 2, finger: 1},{fret: 2, finger: 1}],
      answers: [{answer: "F#7", correct: true},{answer: "F#dim",correct: false},{answer: "F#Maj7",correct: false},{answer: "F#sus",correct: false}]
    },
    {name: "F7", notes: [{fret: 1, finger: 1},{fret: -1, finger: "x"},{fret: 1,finger: 2},{fret: 2, finger: 4},{fret: 1, finger: 3},{fret: -1, finger: "x"}],
      answers: [{answer: "F7", correct: true},{answer: "F2",correct: false},{answer: "FMaj7",correct: false},{answer: "Fsus",correct: false}]
    },
    {name: "Bb7", notes: [{fret: -1, finger: "x"},{fret: 1, finger: 1},{fret: 3,finger: 3},{fret: 1, finger: 1},{fret: 3, finger: 4},{fret: 1, finger: 1}],
      answers: [{answer: "Bb7", correct: true},{answer: "Bb2",correct: false},{answer: "BbMaj7",correct: false},{answer: "Bbsus",correct: false}]
    },
    {name: "Eb7", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 1,finger: 1},{fret: 3, finger: 3},{fret: 2, finger: 2},{fret: 3, finger: 4}],
      answers: [{answer: "Eb7", correct: true},{answer: "Eb2",correct: false},{answer: "Ebsus",correct: false},{answer: "EbMaj7",correct: false}]
    },
    {name: "CMaj7", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 3},{fret: 2,finger: 2},{fret: 0, finger: 0},{fret: 0, finger: 0},{fret: 0, finger: 0}],
      answers: [{answer: "CMaj7", correct: true},{answer: "Cdim",correct: false},{answer: "C7",correct: false},{answer: "Csus",correct: false}]
    },
    {name: "GMaj7", notes: [{fret: 3, finger: 2},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 0, finger: 0},{fret: 3, finger: 3},{fret: 2, finger: 1}],
      answers: [{answer: "GMaj7", correct: true},{answer: "Gdim",correct: false},{answer: "G7",correct: false},{answer: "Gsus",correct: false}]
    },
    {name: "GMaj7", notes: [{fret: 3, finger: 1},{fret: -1, finger: "x"},{fret: 4,finger: 3},{fret: 4, finger: 4},{fret: 3, finger: 2},{fret: -1, finger: "x"}],
      answers: [{answer: "GMaj7", correct: true},{answer: "Gaug",correct: false},{answer: "G7",correct: false},{answer: "Gsus",correct: false}]
    },
    {name: "DMaj7", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 2, finger: 1},{fret: 2, finger: 1},{fret: 2, finger: 1}],
      answers: [{answer: "DMaj7", correct: true},{answer: "Daug",correct: false},{answer: "D7",correct: false},{answer: "Dsus",correct: false}]
    },
    {name: "DMaj7", notes: [{fret: -1, finger: "x"},{fret: 5, finger: 4},{fret: 4,finger: 3},{fret: 2, finger: 1},{fret: 2, finger: 1},{fret: 2, finger: 1}],
      answers: [{answer: "DMaj7", correct: true},{answer: "Dadd9",correct: false},{answer: "D7",correct: false},{answer: "Dsus",correct: false}]
    },
    {name: "AMaj7", notes: [{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 2,finger: 2},{fret: 1, finger: 1},{fret: 2, finger: 3},{fret: 0, finger: 0}],
      answers: [{answer: "AMaj7", correct: true},{answer: "Adim",correct: false},{answer: "A7",correct: false},{answer: "A2",correct: false}]
    },
    {name: "EMaj7", notes: [{fret: 0, finger: 0},{fret: 2, finger: 3},{fret: 1,finger: 1},{fret: 1, finger: 2},{fret: 0, finger: 0},{fret: 0, finger: 0}],
      answers: [{answer: "EMaj7", correct: true},{answer: "Edim",correct: false},{answer: "E7",correct: false},{answer: "Esus",correct: false}]
    },
    {name: "BMaj7", notes: [{fret: -1, finger: "x"},{fret: 2, finger: 1},{fret: 4,finger: 3},{fret: 3, finger: 2},{fret: 4, finger: 4},{fret: 2, finger: 1}],
      answers: [{answer: "BMaj7", correct: true},{answer: "Bdim",correct: false},{answer: "B7",correct: false},{answer: "Baug",correct: false}]
    },
    {name: "F#Maj7", notes: [{fret: 2, finger: 1},{fret: -1, finger: "x"},{fret: 3,finger: 3},{fret: 3, finger: 4},{fret: 2, finger: 2},{fret: -1, finger: "x"}],
      answers: [{answer: "F#Maj7", correct: true},{answer: "F#dim",correct: false},{answer: "F#7",correct: false},{answer: "F#sus",correct: false}]
    },
    {name: "FMaj7", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 3,finger: 3},{fret: 2, finger: 2},{fret: 1, finger: 1},{fret: 0, finger: 0}],
      answers: [{answer: "FMaj7", correct: true},{answer: "F2",correct: false},{answer: "F7",correct: false},{answer: "Fsus",correct: false}]
    },
    {name: "FMaj7", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 3,finger: 1},{fret: 5, finger: 3},{fret: 5, finger: 3},{fret: 5, finger: 3}],
      answers: [{answer: "FMaj7", correct: true},{answer: "F2",correct: false},{answer: "F7",correct: false},{answer: "Fsus",correct: false}]
    },
    {name: "BbMaj7", notes: [{fret: -1, finger: "x"},{fret: 1, finger: 1},{fret: 3,finger: 3},{fret: 2, finger: 2},{fret: 3, finger: 4},{fret: 1, finger: 1}],
      answers: [{answer: "BbMaj7", correct: true},{answer: "Bb2",correct: false},{answer: "Bb7",correct: false},{answer: "Bbsus",correct: false}]
    },
    {name: "EbMaj7", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 1,finger: 1},{fret: 3, finger: 3},{fret: 3, finger: 3},{fret: 3, finger: 3}],
      answers: [{answer: "EbMaj7", correct: true},{answer: "Eb2",correct: false},{answer: "Ebsus",correct: false},{answer: "Eb7",correct: false}]
    },
    {name: "Cdim", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 1},{fret: 4,finger: 2},{fret: 5, finger: 4},{fret: 4, finger: 3},{fret: -1, finger: "x"}],
      answers: [{answer: "Cdim", correct: true},{answer: "Cmin7",correct: false},{answer: "C7",correct: false},{answer: "Caug",correct: false}]
    },
    {name: "Gdim", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 5,finger: 4},{fret: 3, finger: 2},{fret: 2, finger: 1},{fret: -1, finger: "x"}],
      answers: [{answer: "Gdim", correct: true},{answer: "G7",correct: false},{answer: "Gmin7",correct: false},{answer: "Gaug",correct: false}]
    },
    {name: "Ddim", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 1, finger: 1},{fret: 3, finger: 3},{fret: 1, finger: 1}],
      answers: [{answer: "Ddim", correct: true},{answer: "Dmin7",correct: false},{answer: "D7",correct: false},{answer: "Daug",correct: false}]
    },
    {name: "Adim", notes: [{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 1,finger: 1},{fret: 2, finger: 3},{fret: 1, finger: 2},{fret: -1, finger: "x"}],
      answers: [{answer: "Adim", correct: true},{answer: "Amin7",correct: false},{answer: "A7",correct: false},{answer: "Aaug",correct: false}]
    },
    {name: "Edim", notes: [{fret: 0, finger: 0},{fret: 1, finger: 1},{fret: 2,finger: 2},{fret: 0, finger: 0},{fret: -1, finger: "x"},{fret: -1, finger: "x"}],
      answers: [{answer: "Edim", correct: true},{answer: "EMaj7",correct: false},{answer: "E7",correct: false},{answer: "Esus",correct: false}]
    },
    {name: "Bdim", notes: [{fret: -1, finger: "x"},{fret: 2, finger: 1},{fret: 3,finger: 2},{fret: 4, finger: 4},{fret: 3, finger: 3},{fret: -1, finger: "x"}],
      answers: [{answer: "Bdim", correct: true},{answer: "Baug",correct: false},{answer: "B7",correct: false},{answer: "B2",correct: false}]
    },
    {name: "F#dim", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 4,finger: 4},{fret: 2, finger: 2},{fret: 1, finger: 1},{fret: -1, finger: "x"}],
      answers: [{answer: "F#dim", correct: true},{answer: "F#min7",correct: false},{answer: "F#7",correct: false},{answer: "F#sus",correct: false}]
    },
    {name: "Caug", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 3},{fret: 2,finger: 2},{fret: 1, finger: 1},{fret: 1, finger: 1},{fret: -1, finger: "x"}],
      answers: [{answer: "Caug", correct: true},{answer: "C7",correct: false},{answer: "CMaj7",correct: false},{answer: "Cdim",correct: false}]
    },
    {name: "Gaug", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 5,finger: 3},{fret: 4, finger: 1},{fret: 4, finger: 2},{fret: -1, finger: "x"}],
      answers: [{answer: "Gaug", correct: true},{answer: "Gsus",correct: false},{answer: "G7",correct: false},{answer: "Gdim",correct: false}]
    },
    {name: "Gaug", notes: [{fret: 3, finger: 3},{fret: 2, finger: 2},{fret: 1,finger: 1},{fret: 0, finger: 0},{fret: 0, finger: 0},{fret: 3, finger: 4}],
      answers: [{answer: "Gaug", correct: true},{answer: "GMaj7",correct: false},{answer: "G7",correct: false},{answer: "Gdim",correct: false}]
    },
    {name: "Daug", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 3, finger: 2},{fret: 3, finger: 3},{fret: 2, finger: 1}],
      answers: [{answer: "Daug", correct: true},{answer: "Dsus",correct: false},{answer: "DMaj7",correct: false},{answer: "Ddim",correct: false}]
    },
    {name: "Aaug", notes: [{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 3, finger: 4},{fret: 2, finger: 2},{fret: 2, finger: 3},{fret: 1, finger: 1}],
      answers: [{answer: "Aaug", correct: true},{answer: "Asus",correct: false},{answer: "A7",correct: false},{answer: "Adim",correct: false}]
    },
    {name: "Eaug", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 2, finger: 3},{fret: 1, finger: 1},{fret: 1, finger: 2},{fret: 0, finger: 0}],
      answers: [{answer: "Eaug", correct: true},{answer: "Esus",correct: false},{answer: "E7",correct: false},{answer: "Edim",correct: false}]
    },
    {name: "Baug", notes: [{fret: -1, finger: "x"},{fret: 2, finger: 2},{fret: 1,finger: 1},{fret: 0, finger: 0},{fret: 0, finger: 0},{fret: 3, finger: 4}],
      answers: [{answer: "Baug", correct: true},{answer: "Bdim",correct: false},{answer: "B7",correct: false},{answer: "B2",correct: false}]
    },
    {name: "Cmin7", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 3},{fret: 1,finger: 1},{fret: 3, finger: 4},{fret: 1, finger: 1},{fret: -1, finger: "x"}],
      answers: [{answer: "Cmin7", correct: true},{answer: "Cdim",correct: false},{answer: "CMaj7",correct: false},{answer: "Caug",correct: false}]
    },
    {name: "Gmin7", notes: [{fret: 3, finger: 2},{fret: -1, finger: "x"},{fret: 3,finger: 3},{fret: 3, finger: 3},{fret: 3, finger: 3},{fret: -1, finger: "x"}],
      answers: [{answer: "Gmin7", correct: true},{answer: "GMaj7",correct: false},{answer: "G7",correct: false},{answer: "Gdim",correct: false}]
    },
    {name: "Dmin7", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 2, finger: 2},{fret: 1, finger: 1},{fret: 1, finger: 1}],
      answers: [{answer: "Dmin7", correct: true},{answer: "Ddim",correct: false},{answer: "DMaj7",correct: false},{answer: "Daug",correct: false}]
    },
    {name: "Amin7", notes: [{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 2,finger: 2},{fret: 0, finger: 0},{fret: 1, finger: 1},{fret: 0, finger: 0}],
      answers: [{answer: "Amin7", correct: true},{answer: "Adim",correct: false},{answer: "AMaj7",correct: false},{answer: "Asus",correct: false}]
    },
    {name: "Emin7", notes: [{fret: 0, finger: 0},{fret: 2, finger: 1},{fret: 0,finger: 0},{fret: 0, finger: 0},{fret: 0, finger: 0},{fret: 0, finger: 0}],
      answers: [{answer: "Emin7", correct: true},{answer: "Edim",correct: false},{answer: "EMaj7",correct: false},{answer: "Esus",correct: false}]
    },
    {name: "Emin7", notes: [{fret: 0, finger: 0},{fret: 2, finger: 1},{fret: 2,finger: 2},{fret: 0, finger: 0},{fret: 3, finger: 3},{fret: 3, finger: 4}],
      answers: [{answer: "Emin7", correct: true},{answer: "Edim",correct: false},{answer: "EMaj7",correct: false},{answer: "Eaug",correct: false}]
    },
    {name: "Bmin7", notes: [{fret: -1, finger: "x"},{fret: 2, finger: 1},{fret: 4,finger: 3},{fret: 2, finger: 1},{fret: 3, finger: 2},{fret: 2, finger: 1}],
      answers: [{answer: "Bmin7", correct: true},{answer: "Bdim",correct: false},{answer: "BMaj7",correct: false},{answer: "B2",correct: false}]
    },
    {name: "Bmin7", notes: [{fret: -1, finger: "x"},{fret: 2, finger: 2},{fret: 0,finger: 0},{fret: 2, finger: 3},{fret: 0, finger: 0},{fret: 2, finger: 4}],
      answers: [{answer: "Bmin7", correct: true},{answer: "B2",correct: false},{answer: "BMaj7",correct: false},{answer: "Bsus",correct: false}]
    },
    {name: "F#min7", notes: [{fret: 2, finger: 1},{fret: 4, finger: 3},{fret: 2,finger: 1},{fret: 2, finger: 1},{fret: 2, finger: 1},{fret: 2, finger: 1}],
      answers: [{answer: "F#min7", correct: true},{answer: "F#7",correct: false},{answer: "F#dim",correct: false},{answer: "F#sus",correct: false}]
    },
    {name: "Fmin7", notes: [{fret: 1, finger: 1},{fret: 3, finger: 3},{fret: 1,finger: 1},{fret: 1, finger: 1},{fret: 1, finger: 1},{fret: 1, finger: 1}],
      answers: [{answer: "Fmin7", correct: true},{answer: "F2",correct: false},{answer: "FMaj7",correct: false},{answer: "Fsus",correct: false}]
    },
    {name: "Bbmin7", notes: [{fret: -1, finger: "x"},{fret: 1, finger: 1},{fret: 3,finger: 3},{fret: 1, finger: 1},{fret: 2, finger: 2},{fret: 1, finger: 1}],
      answers: [{answer: "Bbmin7", correct: true},{answer: "Bb2",correct: false},{answer: "BbMaj7",correct: false},{answer: "Bbsus",correct: false}]
    }
  ],
  hard: [
    {name: "G7sus", notes: [{fret: 3, finger: 3},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 0, finger: 0},{fret: 1, finger: 1},{fret: 1, finger: 1}],
      answers: [{answer: "G7sus", correct: true},{answer: "GMaj9",correct: false},{answer: "G11",correct: false},{answer: "G9",correct: false}]
    },
    {name: "A7sus", notes: [{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 2,finger: 1},{fret: 0, finger: 0},{fret: 3, finger: 3},{fret: 0, finger: 0}],
      answers: [{answer: "A7sus", correct: true},{answer: "A9",correct: false},{answer: "A6",correct: false},{answer: "Amin11",correct: false}]
    },
    {name: "E7sus", notes: [{fret: 0, finger: 0},{fret: 2, finger: 2},{fret: 0,finger: 0},{fret: 2, finger: 3},{fret: 0, finger: 0},{fret: 0, finger: 0}],
      answers: [{answer: "E7sus", correct: true},{answer: "E6",correct: false},{answer: "EMaj9",correct: false},{answer: "E9",correct: false}]
    },
    {name: "C7b5", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 1},{fret: 4,finger: 2},{fret: 3, finger: 1},{fret: 5, finger: 4},{fret: -1, finger: "x"}],
      answers: [{answer: "C7b5", correct: true},{answer: "C7b9",correct: false},{answer: "Cdim7",correct: false},{answer: "C9",correct: false}]
    },
    {name: "G7b5", notes: [{fret: 3, finger: 2},{fret: -1, finger: "x"},{fret: 3,finger: 3},{fret: 4, finger: 4},{fret: 2, finger: 1},{fret: -1, finger: "x"}],
      answers: [{answer: "G7b5", correct: true},{answer: "G7b9",correct: false},{answer: "G7#9",correct: false},{answer: "G7#5",correct: false}]
    },
    {name: "D7b5", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 1, finger: 1},{fret: 1, finger: 2},{fret: 2, finger: 3}],
      answers: [{answer: "D7b5", correct: true},{answer: "D7b9",correct: false},{answer: "Ddim7",correct: false},{answer: "D7#5",correct: false}]
    },
    {name: "A7b5", notes: [{fret: 5, finger: 2},{fret: -1, finger: "x"},{fret: 5,finger: 3},{fret: 6, finger: 4},{fret: 4, finger: 1},{fret: -1, finger: "x"}],
      answers: [{answer: "A7b5", correct: true},{answer: "A11",correct: false},{answer: "A9",correct: false},{answer: "A7#5",correct: false}]
    },
    {name: "F7b5", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 3,finger: 1},{fret: 4, finger: 2},{fret: 4, finger: 3},{fret: 5, finger: 4}],
      answers: [{answer: "F7b5", correct: true},{answer: "F9",correct: false},{answer: "F7#9",correct: false},{answer: "F7#5",correct: false}]
    },
    {name: "Bb7b5", notes: [{fret: -1, finger: "x"},{fret: 1, finger: 1},{fret: 2,finger: 2},{fret: 1, finger: 1},{fret: 3, finger: 4},{fret: -1, finger: "x"}],
      answers: [{answer: "Bb7b5", correct: true},{answer: "Bb7b9",correct: false},{answer: "Bbdim7",correct: false},{answer: "Bb7#5",correct: false}]
    },
    {name: "C7#5", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 1},{fret: -1,finger: "x"},{fret: 3, finger: 2},{fret: 5, finger: 4},{fret: 4, finger: 3}],
      answers: [{answer: "C7#5", correct: true},{answer: "C7b9",correct: false},{answer: "Cdim7",correct: false},{answer: "C7b5",correct: false}]
    },
    {name: "D7#5", notes: [{fret: -1, finger: "x"},{fret: 5, finger: 2},{fret: 4,finger: 1},{fret: 5, finger: 3},{fret: -1, finger: "x"},{fret: 6, finger: 4}],
      answers: [{answer: "D7#5", correct: true},{answer: "D7b9",correct: false},{answer: "Ddim7",correct: false},{answer: "D7b5",correct: false}]
    },
    {name: "F7#5", notes: [{fret: 1, finger: 1},{fret: -1, finger: "x"},{fret: 1,finger: 2},{fret: 2, finger: 3},{fret: 2, finger: 4},{fret: -1, finger: "x"}],
      answers: [{answer: "F7#5", correct: true},{answer: "F9",correct: false},{answer: "F7#9",correct: false},{answer: "FMaj9",correct: false}]
    },
    {name: "G7#5", notes: [{fret: 3, finger: 1},{fret: -1, finger: "x"},{fret: 3,finger: 2},{fret: 4, finger: 3},{fret: 4, finger: 4},{fret: -1, finger: "x"}],
      answers: [{answer: "G7#5", correct: true},{answer: "G7b9",correct: false},{answer: "G7#9",correct: false},{answer: "G7b5",correct: false}]
    },
    {name: "A7#5", notes: [{fret: 5, finger: 1},{fret: -1, finger: "x"},{fret: 5,finger: 2},{fret: 6, finger: 3},{fret: 6, finger: 4},{fret: -1, finger: "x"}],
      answers: [{answer: "A7#5", correct: true},{answer: "A11",correct: false},{answer: "A9",correct: false},{answer: "A7b5",correct: false}]
    },
    {name: "A7#5", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 5,finger: 1},{fret: 6, finger: 2},{fret: 6, finger: 3},{fret: 1, finger: 1}],
      answers: [{answer: "A7#5", correct: true},{answer: "A7sus",correct: false},{answer: "A9",correct: false},{answer: "A7b5",correct: false}]
    },
    {name: "Bb7#5", notes: [{fret: -1, finger: "x"},{fret: 1, finger: 1},{fret: -1,finger: "x"},{fret: 1, finger: 2},{fret: 3, finger: 4},{fret: 2, finger: 3}],
      answers: [{answer: "Bb7#5", correct: true},{answer: "Bb7b9",correct: false},{answer: "Bbdim7",correct: false},{answer: "Bb7b5",correct: false}]
    },
    {name: "C6", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 4},{fret: 2,finger: 2},{fret: 2, finger: 3},{fret: 1, finger: 1},{fret: 0, finger: 0}],
      answers: [{answer: "C6", correct: true},{answer: "C7b5",correct: false},{answer: "C7b9",correct: false},{answer: "C9",correct: false}]
    },
    {name: "G6", notes: [{fret: 3, finger: 2},{fret: -1, finger: "x"},{fret: 2,finger: 1},{fret: 4, finger: 4},{fret: 3, finger: 3},{fret: -1, finger: "x"}],
      answers: [{answer: "G6", correct: true},{answer: "G7b9",correct: false},{answer: "G7#9",correct: false},{answer: "G7b5",correct: false}]
    },
    {name: "A6", notes: [{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 2,finger: 1},{fret: 2, finger: 1},{fret: 2, finger: 1},{fret: 2, finger: 1}],
      answers: [{answer: "A6", correct: true},{answer: "A9",correct: false},{answer: "A7sus",correct: false},{answer: "A11",correct: false}]
    },
    {name: "A6", notes: [{fret: 5, finger: 2},{fret: -1, finger: "x"},{fret: 4,finger: 1},{fret: 6, finger: 4},{fret: 5, finger: 3},{fret: -1, finger: "x"}],
      answers: [{answer: "A6", correct: true},{answer: "A9",correct: false},{answer: "A7#9",correct: false},{answer: "A11",correct: false}]
    },
    {name: "E6", notes: [{fret: 0, finger: 0},{fret: 2, finger: 2},{fret: 2,finger: 3},{fret: 1, finger: 1},{fret: 2, finger: 4},{fret: 0, finger: 0}],
      answers: [{answer: "E6", correct: true},{answer: "E7sus",correct: false},{answer: "EMaj9",correct: false},{answer: "E9",correct: false}]
    },
    {name: "F6", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 3,finger: 1},{fret: 5, finger: 3},{fret: 3, finger: 1},{fret: 5, finger: 4}],
      answers: [{answer: "F6", correct: true},{answer: "F7#5",correct: false},{answer: "F11",correct: false},{answer: "F9",correct: false}]
    },
    {name: "C6/9", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 2},{fret: 2,finger: 1},{fret: 2, finger: 1},{fret: 3, finger: 3},{fret: -1, finger: "x"}],
      answers: [{answer: "C6/9", correct: true},{answer: "C9",correct: false},{answer: "C7b9",correct: false},{answer: "C11",correct: false}]
    },
    {name: "G6/9", notes: [{fret: 3, finger: 2},{fret: -1, finger: "x"},{fret: 2,finger: 1},{fret: 2, finger: 1},{fret: 3, finger: 3},{fret: -1, finger: "x"}],
      answers: [{answer: "G6/9", correct: true},{answer: "G7b9",correct: false},{answer: "G7#9",correct: false},{answer: "G13",correct: false}]
    },
    {name: "D6/9", notes: [{fret: -1, finger: "x"},{fret: 5, finger: 2},{fret: 4,finger: 1},{fret: 4, finger: 1},{fret: 5, finger: 3},{fret: -1, finger: "x"}],
      answers: [{answer: "D6/9", correct: true},{answer: "D7b5",correct: false},{answer: "D7b9",correct: false},{answer: "Dm7b5",correct: false}]
    },
    {name: "A6/9", notes: [{fret: 5, finger: 2},{fret: -1, finger: "x"},{fret: 4,finger: 1},{fret: 4, finger: 1},{fret: 5, finger: 3},{fret: -1, finger: "x"}],
      answers: [{answer: "A6/9", correct: true},{answer: "AMaj9",correct: false},{answer: "A9",correct: false},{answer: "Amin11",correct: false}]
    },
    {name: "C9", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 2},{fret: 2,finger: 1},{fret: 3, finger: 3},{fret: 3, finger: 4},{fret: -1, finger: "x"}],
      answers: [{answer: "C9", correct: true},{answer: "C7b5",correct: false},{answer: "C7b9",correct: false},{answer: "Cdim7",correct: false}]
    },
    {name: "G9", notes: [{fret: 3, finger: 3},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 2, finger: 2},{fret: 0, finger: 0},{fret: 1, finger: 1}],
      answers: [{answer: "G9", correct: true},{answer: "GMaj9",correct: false},{answer: "G11",correct: false},{answer: "G7sus",correct: false}]
    },
    {name: "D9", notes: [{fret: -1, finger: "x"},{fret: 5, finger: 2},{fret: 4,finger: 1},{fret: 5, finger: 3},{fret: 5, finger: 4},{fret: -1, finger: "x"}],
      answers: [{answer: "D9", correct: true},{answer: "D7b5",correct: false},{answer: "D7b9",correct: false},{answer: "Dm7b5",correct: false}]
    },
    {name: "D9", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 2, finger: 2},{fret: 1, finger: 1},{fret: 0, finger: 0}],
      answers: [{answer: "D9", correct: true},{answer: "D7b5",correct: false},{answer: "D7b9",correct: false},{answer: "Dm7b5",correct: false}]
    },
    {name: "A9", notes: [{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 2,finger: 1},{fret: 0, finger: 0},{fret: 0, finger: 0},{fret: 0, finger: 0}],
      answers: [{answer: "A9", correct: true},{answer: "A7sus",correct: false},{answer: "A6",correct: false},{answer: "Amin11",correct: false}]
    },
    {name: "E9", notes: [{fret: 0, finger: 0},{fret: 2, finger: 2},{fret: 0,finger: 0},{fret: 1, finger: 1},{fret: 0, finger: 0},{fret: 2, finger: 4}],
      answers: [{answer: "E9", correct: true},{answer: "E7sus",correct: false},{answer: "EMaj9",correct: false},{answer: "E11",correct: false}]
    },
    {name: "B9", notes: [{fret: -1, finger: "x"},{fret: 2, finger: 2},{fret: 1,finger: 1},{fret: 2, finger: 3},{fret: 2, finger: 4},{fret: -1, finger: "x"}],
      answers: [{answer: "B9", correct: true},{answer: "B7#9",correct: false},{answer: "B7b9",correct: false},{answer: "BMaj9",correct: false}]
    },
    {name: "F9", notes: [{fret: 1, finger: 1},{fret: -1, finger: "x"},{fret: 1,finger: 2},{fret: 0, finger: 0},{fret: 1, finger: 3},{fret: 1, finger: 4}],
      answers: [{answer: "F9", correct: true},{answer: "F7#5",correct: false},{answer: "F7#9",correct: false},{answer: "FMaj9",correct: false}]
    },
    {name: "CMaj9", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 2},{fret: 2,finger: 1},{fret: 4, finger: 4},{fret: 3, finger: 3},{fret: 0, finger: 0}],
      answers: [{answer: "CMaj9", correct: true},{answer: "C7b5",correct: false},{answer: "C7b9",correct: false},{answer: "C9",correct: false}]
    },
    {name: "GMaj9", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 5,finger: 3},{fret: 2, finger: 1},{fret: 3, finger: 2},{fret: 2, finger: 1}],
      answers: [{answer: "GMaj9", correct: true},{answer: "G7sus",correct: false},{answer: "G7b9",correct: false},{answer: "G11",correct: false}]
    },
    {name: "GMaj9", notes: [{fret: 3, finger: 3},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 2, finger: 2},{fret: 0, finger: 0},{fret: 2, finger: 1}],
      answers: [{answer: "GMaj9", correct: true},{answer: "G9",correct: false},{answer: "G11",correct: false},{answer: "GMaj11",correct: false}]
    },
    {name: "DMaj9", notes: [{fret: -1, finger: "x"},{fret: 5, finger: 2},{fret: 4,finger: 1},{fret: 6, finger: 4},{fret: 5, finger: 3},{fret: -1, finger: "x"}],
      answers: [{answer: "DMaj9", correct: true},{answer: "D7b5",correct: false},{answer: "DMaj11",correct: false},{answer: "D9",correct: false}]
    },
    {name: "AMaj9", notes: [{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 2,finger: 2},{fret: 1, finger: 1},{fret: 0, finger: 0},{fret: 0, finger: 0}],
      answers: [{answer: "AMaj9", correct: true},{answer: "A9",correct: false},{answer: "AMaj11",correct: false},{answer: "A11",correct: false}]
    },
    {name: "EMaj9", notes: [{fret: 0, finger: 0},{fret: 2, finger: 3},{fret: 1,finger: 1},{fret: 1, finger: 2},{fret: 0, finger: 0},{fret: 2, finger: 4}],
      answers: [{answer: "EMaj9", correct: true},{answer: "E9",correct: false},{answer: "E6",correct: false},{answer: "E11",correct: false}]
    },
    {name: "BMaj9", notes: [{fret: -1, finger: "x"},{fret: 2, finger: 2},{fret: 1,finger: 1},{fret: 3, finger: 4},{fret: 2, finger: 3},{fret: -1, finger: "x"}],
      answers: [{answer: "BMaj9", correct: true},{answer: "B7#9",correct: false},{answer: "B11",correct: false},{answer: "B9",correct: false}]
    },
    {name: "FMaj9", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 3,finger: 3},{fret: 0, finger: 0},{fret: 1, finger: 1},{fret: 0, finger: 0}],
      answers: [{answer: "FMaj9", correct: true},{answer: "F6",correct: false},{answer: "F11",correct: false},{answer: "F9",correct: false}]
    },
    {name: "Cmin9", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 2},{fret: 1,finger: 1},{fret: 3, finger: 3},{fret: 3, finger: 4},{fret: -1, finger: "x"}],
      answers: [{answer: "Cmin9", correct: true},{answer: "Cm7b5",correct: false},{answer: "C7b9",correct: false},{answer: "C9",correct: false}]
    },
    {name: "Dmin9", notes: [{fret: -1, finger: "x"},{fret: 5, finger: 2},{fret: 3,finger: 1},{fret: 5, finger: 3},{fret: 5, finger: 4},{fret: -1, finger: "x"}],
      answers: [{answer: "Dmin9", correct: true},{answer: "Dm7b5",correct: false},{answer: "D7#9",correct: false},{answer: "Dmin11",correct: false}]
    },
    {name: "Emin9", notes: [{fret: 0, finger: 0},{fret: 2, finger: 1},{fret: 0,finger: 0},{fret: 0, finger: 0},{fret: 0, finger: 0},{fret: 2, finger: 3}],
      answers: [{answer: "Emin9", correct: true},{answer: "E9",correct: false},{answer: "Emin11",correct: false},{answer: "Em7b5",correct: false}]
    },
    {name: "Emin9", notes: [{fret: 0, finger: 0},{fret: 2, finger: 1},{fret: 4,finger: 4},{fret: 0, finger: 0},{fret: 3, finger: 3},{fret: 0, finger: 0}],
      answers: [{answer: "Emin9", correct: true},{answer: "Emin6",correct: false},{answer: "Emin11",correct: false},{answer: "Em7b5",correct: false}]
    },
    {name: "C7b9", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 2},{fret: 2,finger: 1},{fret: 3, finger: 3},{fret: 2, finger: 1},{fret: -1, finger: "x"}],
      answers: [{answer: "C7b9", correct: true},{answer: "C7#5",correct: false},{answer: "C9",correct: false},{answer: "C7b5",correct: false}]
    },
    {name: "G7b9", notes: [{fret: 3, finger: 3},{fret: 2, finger: 2},{fret: 0,finger: 0},{fret: 1, finger: 1},{fret: 3, finger: 4},{fret: 1, finger: 1}],
      answers: [{answer: "G7b9", correct: true},{answer: "G9",correct: false},{answer: "G11",correct: false},{answer: "Gdim7",correct: false}]
    },
    {name: "D7b9", notes: [{fret: -1, finger: "x"},{fret: 5, finger: 2},{fret: 4,finger: 1},{fret: 5, finger: 3},{fret: 4, finger: 1},{fret: -1, finger: "x"}],
      answers: [{answer: "D7b9", correct: true},{answer: "D7#5",correct: false},{answer: "D9",correct: false},{answer: "Dm7b5",correct: false}]
    },
    {name: "B7b9", notes: [{fret: -1, finger: "x"},{fret: 2, finger: 2},{fret: 1,finger: 1},{fret: 2, finger: 3},{fret: 1, finger: 1},{fret: -1, finger: "x"}],
      answers: [{answer: "B7b9", correct: true},{answer: "B7#5",correct: false},{answer: "B9",correct: false},{answer: "B7b5",correct: false}]
    },
    {name: "F7b9", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 3,finger: 2},{fret: 2, finger: 1},{fret: 4, finger: 4},{fret: 2, finger: 1}],
      answers: [{answer: "F7b9", correct: true},{answer: "F9",correct: false},{answer: "F7#9",correct: false},{answer: "FMaj9",correct: false}]
    },
    {name: "Bb7b9", notes: [{fret: -1, finger: "x"},{fret: 1, finger: 1},{fret: 0,finger: 0},{fret: 1, finger: 2},{fret: 0, finger: 0},{fret: 1, finger: 3}],
      answers: [{answer: "Bb7b9", correct: true},{answer: "Bb7#5",correct: false},{answer: "Bbm7b5",correct: false},{answer: "Bb7b5",correct: false}]
    },
    {name: "C7#9", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 2},{fret: 2,finger: 1},{fret: 3, finger: 3},{fret: 4, finger: 4},{fret: -1, finger: "x"}],
      answers: [{answer: "C7#9", correct: true},{answer: "C7#5",correct: false},{answer: "C7b9",correct: false},{answer: "Cm7b5",correct: false}]
    },
    {name: "G7#9", notes: [{fret: 3, finger: 2},{fret: 2, finger: 1},{fret: 3,finger: 3},{fret: 3, finger: 4},{fret: -1, finger: "x"},{fret: -1, finger: "x"}],
      answers: [{answer: "G7#9", correct: true},{answer: "G9",correct: false},{answer: "G11",correct: false},{answer: "G7b9",correct: false}]
    },
    {name: "D7#9", notes: [{fret: -1, finger: "x"},{fret: 5, finger: 2},{fret: 4,finger: 1},{fret: 5, finger: 3},{fret: 6, finger: 4},{fret: -1, finger: "x"}],
      answers: [{answer: "D7#9", correct: true},{answer: "D7#5",correct: false},{answer: "D7b9",correct: false},{answer: "Dm7b5",correct: false}]
    },
    {name: "A7#9", notes: [{fret: 5, finger: 2},{fret: 4, finger: 1},{fret: 5,finger: 3},{fret: 5, finger: 4},{fret: -1, finger: "x"},{fret: -1, finger: "x"}],
      answers: [{answer: "A7#9", correct: true},{answer: "A9",correct: false},{answer: "A6",correct: false},{answer: "Amin11",correct: false}]
    },
    {name: "B7#9", notes: [{fret: -1, finger: "x"},{fret: 2, finger: 2},{fret: 1,finger: 1},{fret: 2, finger: 3},{fret: 3, finger: 4},{fret: -1, finger: "x"}],
      answers: [{answer: "B7#9", correct: true},{answer: "B7b5",correct: false},{answer: "B7b9",correct: false},{answer: "Bdim7",correct: false}]
    },
    {name: "F7#9", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 3,finger: 2},{fret: 2, finger: 1},{fret: 4, finger: 3},{fret: 4, finger: 4}],
      answers: [{answer: "F7#9", correct: true},{answer: "F9",correct: false},{answer: "F7b9",correct: false},{answer: "FMaj9",correct: false}]
    },
    {name: "Cm7b5", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 1},{fret: 4,finger: 3},{fret: 3, finger: 2},{fret: 4, finger: 4},{fret: -1, finger: "x"}],
      answers: [{answer: "Cm7b5", correct: true},{answer: "C7b5",correct: false},{answer: "C9",correct: false},{answer: "Cdim7",correct: false}]
    },
    {name: "Gm7b5", notes: [{fret: 3, finger: 2},{fret: -1, finger: "x"},{fret: 3,finger: 3},{fret: 3, finger: 4},{fret: 2, finger: 1},{fret: -1, finger: "x"}],
      answers: [{answer: "Gm7b5", correct: true},{answer: "G7b9",correct: false},{answer: "G7#9",correct: false},{answer: "Gdim7",correct: false}]
    },
    {name: "Dm7b5", notes: [{fret: -1, finger: "x"},{fret: 5, finger: 1},{fret: 6,finger: 3},{fret: 5, finger: 2},{fret: 6, finger: 4},{fret: -1, finger: "x"}],
      answers: [{answer: "Dm7b5", correct: true},{answer: "D7#5",correct: false},{answer: "D7#9",correct: false},{answer: "Ddim7",correct: false}]
    },
    {name: "Am7b5", notes: [{fret: 5, finger: 2},{fret: -1, finger: "x"},{fret: 5,finger: 3},{fret: 5, finger: 4},{fret: 4, finger: 1},{fret: -1, finger: "x"}],
      answers: [{answer: "Am7b5", correct: true},{answer: "A9",correct: false},{answer: "Amin11",correct: false},{answer: "A7sus",correct: false}]
    },
    {name: "Em7b5", notes: [{fret: 0, finger: 0},{fret: 1, finger: 1},{fret: 0,finger: 0},{fret: 0, finger: 0},{fret: 3, finger: 3},{fret: 0, finger: 0}],
      answers: [{answer: "Em7b5", correct: true},{answer: "Emin6",correct: false},{answer: "Emin11",correct: false},{answer: "Emin9",correct: false}]
    },
    {name: "Bbm7b5", notes: [{fret: -1, finger: "x"},{fret: 1, finger: 1},{fret: 2,finger: 3},{fret: 1, finger: 2},{fret: 2, finger: 4},{fret: -1, finger: "x"}],
      answers: [{answer: "Bbm7b5", correct: true},{answer: "Bb7#5",correct: false},{answer: "Bb7b9",correct: false},{answer: "Bbdim7",correct: false}]
    },
    {name: "Cdim7", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 2},{fret: 4,finger: 3},{fret: 2, finger: 1},{fret: 4, finger: 4},{fret: -1, finger: "x"}],
      answers: [{answer: "Cdim7", correct: true},{answer: "C7b5",correct: false},{answer: "C9",correct: false},{answer: "Cm7b5",correct: false}]
    },
    {name: "Gdim7", notes: [{fret: 3, finger: 2},{fret: -1, finger: "x"},{fret: 2,finger: 1},{fret: 3, finger: 3},{fret: 2, finger: 1},{fret: -1, finger: "x"}],
      answers: [{answer: "Gdim7", correct: true},{answer: "Gmin6",correct: false},{answer: "Gm7b5",correct: false},{answer: "Gmin11",correct: false}]
    },
    {name: "Ddim7", notes: [{fret: -1, finger: "x"},{fret: 5, finger: 2},{fret: 6,finger: 3},{fret: 4, finger: 1},{fret: 6, finger: 4},{fret: -1, finger: "x"}],
      answers: [{answer: "Ddim7", correct: true},{answer: "D7b5",correct: false},{answer: "D9",correct: false},{answer: "Dm7b5",correct: false}]
    },
    {name: "Ddim7", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 1, finger: 1},{fret: 0, finger: 0},{fret: 1, finger: 2}],
      answers: [{answer: "Ddim7", correct: true},{answer: "Dmin9",correct: false},{answer: "D11",correct: false},{answer: "Dmin6",correct: false}]
    },
    {name: "Bbdim7", notes: [{fret: -1, finger: "x"},{fret: 1, finger: 1},{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 2, finger: 3},{fret: 0, finger: 0}],
      answers: [{answer: "Bbdim7", correct: true},{answer: "Bb7b9",correct: false},{answer: "Bbm7b5",correct: false},{answer: "Bb7#5",correct: false}]
    },
    {name: "C11", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 2},{fret: -1,finger: "x"},{fret: 3, finger: 3},{fret: 3, finger: 4},{fret: 1, finger: 1}],
      answers: [{answer: "C11", correct: true},{answer: "CMaj9",correct: false},{answer: "CMaj11",correct: false},{answer: "C9",correct: false}]
    },
    {name: "G11", notes: [{fret: 3, finger: 4},{fret: 2, finger: 2},{fret: 0,finger: 0},{fret: 2, finger: 3},{fret: 1, finger: 1},{fret: 1, finger: 1}],
      answers: [{answer: "G11", correct: true},{answer: "G9",correct: false},{answer: "GMaj9",correct: false},{answer: "GMaj11",correct: false}]
    },
    {name: "D11", notes: [{fret: -1, finger: "x"},{fret: 5, finger: 2},{fret: -1,finger: "x"},{fret: 5, finger: 3},{fret: 5, finger: 4},{fret: 3, finger: 1}],
      answers: [{answer: "D11", correct: true},{answer: "DMaj9",correct: false},{answer: "DMaj11",correct: false},{answer: "D7#9",correct: false}]
    },
    {name: "A11", notes: [{fret: 5, finger: 2},{fret: -1, finger: "x"},{fret: 5,finger: 3},{fret: 6, finger: 4},{fret: 3, finger: 1},{fret: -1, finger: "x"}],
      answers: [{answer: "A11", correct: true},{answer: "AMaj9",correct: false},{answer: "A9",correct: false},{answer: "Amin11",correct: false}]
    },
    {name: "E11", notes: [{fret: 0, finger: 0},{fret: 2, finger: 1},{fret: 0,finger: 0},{fret: 2, finger: 2},{fret: 0, finger: 0},{fret: 2, finger: 3}],
      answers: [{answer: "E11", correct: true},{answer: "E9",correct: false},{answer: "Emin9",correct: false},{answer: "Em7b5",correct: false}]
    },
    {name: "B11", notes: [{fret: -1, finger: "x"},{fret: 2, finger: 2},{fret: 1,finger: 1},{fret: 2, finger: 3},{fret: 2, finger: 4},{fret: 0, finger: 0}],
      answers: [{answer: "B11", correct: true},{answer: "BMaj9",correct: false},{answer: "BMaj11",correct: false},{answer: "B7#9",correct: false}]
    },
    {name: "CMaj11", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 3},{fret: 2,finger: 2},{fret: 0, finger: 0},{fret: 0, finger: 0},{fret: 1, finger: 1}],
      answers: [{answer: "CMaj11", correct: true},{answer: "CMaj9",correct: false},{answer: "C11",correct: false},{answer: "C9",correct: false}]
    },
    {name: "GMaj11", notes: [{fret: 3, finger: 4},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 0, finger: 0},{fret: 1, finger: 1},{fret: 2, finger: 2}],
      answers: [{answer: "GMaj11", correct: true},{answer: "G9",correct: false},{answer: "G11",correct: false},{answer: "GMaj9",correct: false}]
    },
    {name: "DMaj11", notes: [{fret: -1, finger: "x"},{fret: 5, finger: 4},{fret: 4,finger: 3},{fret: 0, finger: 0},{fret: 2, finger: 1},{fret: 0, finger: 0}],
      answers: [{answer: "DMaj11", correct: true},{answer: "DMaj9",correct: false},{answer: "D11",correct: false},{answer: "D7#9",correct: false}]
    },
    {name: "BMaj11", notes: [{fret: -1, finger: "x"},{fret: 2, finger: 1},{fret: 4,finger: 4},{fret: 3, finger: 3},{fret: 2, finger: 2},{fret: 0, finger: 0}],
      answers: [{answer: "BMaj11", correct: true},{answer: "BMaj9",correct: false},{answer: "B11",correct: false},{answer: "B7#9",correct: false}]
    },
    {name: "C13", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 2},{fret: 2,finger: 1},{fret: 3, finger: 3},{fret: 3, finger: 3},{fret: 5, finger: 4}],
      answers: [{answer: "C13", correct: true},{answer: "C9",correct: false},{answer: "C7b9",correct: false},{answer: "Cdim7",correct: false}]
    },
    {name: "G13", notes: [{fret: 3, finger: 1},{fret: -1, finger: "x"},{fret: 3,finger: 2},{fret: 4, finger: 3},{fret: 5, finger: 4},{fret: -1, finger: "x"}],
      answers: [{answer: "G13", correct: true},{answer: "G9",correct: false},{answer: "G7sus",correct: false},{answer: "GMaj9",correct: false}]
    },
    {name: "F13", notes: [{fret: 1, finger: 1},{fret: -1, finger: "x"},{fret: 1,finger: 2},{fret: 2, finger: 3},{fret: 3, finger: 4},{fret: -1, finger: "x"}],
      answers: [{answer: "F13", correct: true},{answer: "F9",correct: false},{answer: "F7#9",correct: false},{answer: "FMaj9",correct: false}]
    },
    {name: "Cmin11", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 2},{fret: 1,finger: 1},{fret: 3, finger: 3},{fret: 3, finger: 4},{fret: 1, finger: 1}],
      answers: [{answer: "Cmin11", correct: true},{answer: "Cmin9",correct: false},{answer: "CMaj11",correct: false},{answer: "C11",correct: false}]
    },
    {name: "Gmin11", notes: [{fret: 3, finger: 2},{fret: -1, finger: "x"},{fret: 3,finger: 3},{fret: 3, finger: 4},{fret: 1, finger: 1},{fret: 1, finger: 1}],
      answers: [{answer: "Gmin11", correct: true},{answer: "Gdim7",correct: false},{answer: "Gm7b5",correct: false},{answer: "Gmin6",correct: false}]
    },
    {name: "Dmin11", notes: [{fret: -1, finger: "x"},{fret: 5, finger: 2},{fret: 3,finger: 1},{fret: 5, finger: 3},{fret: 5, finger: 4},{fret: 3, finger: 1}],
      answers: [{answer: "Dmin11", correct: true},{answer: "Dmin9",correct: false},{answer: "DMaj11",correct: false},{answer: "D9",correct: false}]
    },
    {name: "Amin11", notes: [{fret: 5, finger: 2},{fret: -1, finger: "x"},{fret: 5,finger: 3},{fret: 5, finger: 4},{fret: 3, finger: 1},{fret: 3, finger: 1}],
      answers: [{answer: "Amin11", correct: true},{answer: "AMaj9",correct: false},{answer: "A9",correct: false},{answer: "A11",correct: false}]
    },
    {name: "Emin11", notes: [{fret: 0, finger: 0},{fret: 2, finger: 1},{fret: 0,finger: 0},{fret: 2, finger: 2},{fret: 0, finger: 0},{fret: 3, finger: 4}],
      answers: [{answer: "Emin11", correct: true},{answer: "E9",correct: false},{answer: "Emin9",correct: false},{answer: "Em7b5",correct: false}]
    },
    {name: "Gmin6", notes: [{fret: 3, finger: 2},{fret: -1, finger: "x"},{fret: 2,finger: 1},{fret: 3, finger: 3},{fret: 3, finger: 4},{fret: -1, finger: "x"}],
      answers: [{answer: "Gmin6", correct: true},{answer: "Gdim7",correct: false},{answer: "Gm7b5",correct: false},{answer: "Gmin11",correct: false}]
    },
    {name: "Dmin6", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 2, finger: 2},{fret: 0, finger: 0},{fret: 1, finger: 1}],
      answers: [{answer: "Dmin6", correct: true},{answer: "Dmin9",correct: false},{answer: "Dm7b5",correct: false},{answer: "Dmin11",correct: false}]
    },
    {name: "Amin6", notes: [{fret: 5, finger: 2},{fret: -1, finger: "x"},{fret: 4,finger: 1},{fret: 5, finger: 3},{fret: 5, finger: 4},{fret: -1, finger: "x"}],
      answers: [{answer: "Amin6", correct: true},{answer: "A7sus",correct: false},{answer: "Am7b5",correct: false},{answer: "Amin11",correct: false}]
    },
    {name: "Amin6", notes: [{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 2,finger: 2},{fret: 2, finger: 3},{fret: 1, finger: 1},{fret: 2, finger: 4}],
      answers: [{answer: "Amin6", correct: true},{answer: "A7sus",correct: false},{answer: "Am7b5",correct: false},{answer: "A11",correct: false}]
    },
    {name: "Emin6", notes: [{fret: 0, finger: 0},{fret: 2, finger: 1},{fret: 2,finger: 2},{fret: 0, finger: 0},{fret: 2, finger: 3},{fret: 0, finger: 0}],
      answers: [{answer: "Emin6", correct: true},{answer: "E9",correct: false},{answer: "Emin11",correct: false},{answer: "Em7b5",correct: false}]
    }
  ]
  
} // end questions

var settings = [{level: questions.easy, points: 2},{level: questions.medium, points: 5},{level: questions.hard, points: 10}];
var currDifficultySetting = settings[0];
var pointsAvailable = currDifficultySetting.points;
  
//timer stuff ------------------------------------------------------------------------------->
  function timer() {         
      if(pointsAvailable > 1){
        pointsAvailable -= 1;
      }else{
        clearInterval(gameTimer);
      }  
    $('#gcgPointsAvailableDisplay').text(pointsAvailable); 
  }

  function resetTimer(){
    //reset timer
    if(gameTimer){
      clearInterval(gameTimer);
    }
    pointsAvailable = currDifficultySetting.points;
    $('#gcgPointsAvailableDisplay').text(currDifficultySetting.points);
    gameTimer = setInterval(timer, 2000);
  }

  function decrementLeaderboardTimer(){
    GAME.findLeaders("gcg",currLeaderboardVersion);
    leaderboardDecrementor = leaderboardDecrementor + 1000;
    // console.log("leaderboardDecrementor = " + leaderboardDecrementor);
    setTimeout(function(){
      decrementLeaderboardTimer();
    },leaderboardDecrementor);
  }

  decrementLeaderboardTimer();

//---------------------------------------------------------------------------

function preload(){
  //images
  game.load.image('1', '/images/gcg/1.png');
  game.load.image('2', '/images/gcg/2.png');
  game.load.image('3', '/images/gcg/3.png');
  game.load.image('4', '/images/gcg/4.png');
  game.load.image('0', '/images/gcg/O.png');
  game.load.image('x', '/images/gcg/X.png');
  game.load.image('guitarNeck', '/images/gcg/GuitarNeck.png');
  
  game.load.audio('guitarTones', [ '../sounds/guitarTones.mp3', '../sounds/guitarTones.ogg' ]);

}// end preload

function create(){
  
  game.stage.backgroundColor = '#ffffff';
  
  guitarNeck = game.add.sprite(0, 50, 'guitarNeck');
  guitarNeck.scale.set(currGameSize.neckImgScale);
  
  guitarTones = game.add.audio('guitarTones');
  guitarTones.allowMultiple = true;

  guitarTones.addMarker('60', 0, 2);
  guitarTones.addMarker('61', 2, 2);
  guitarTones.addMarker('62', 4, 2);
  guitarTones.addMarker('63', 6, 2);
  guitarTones.addMarker('64', 8, 2);
  guitarTones.addMarker('65', 10, 2);
  guitarTones.addMarker('66', 12, 2);
  guitarTones.addMarker('67', 14, 2);
  
  guitarTones.addMarker('50', 10, 2);
  guitarTones.addMarker('51', 12, 2);
  guitarTones.addMarker('52', 14, 2);
  guitarTones.addMarker('53', 16, 2);
  guitarTones.addMarker('54', 18, 2);
  guitarTones.addMarker('55', 20, 2);
  guitarTones.addMarker('56', 22, 2);
  guitarTones.addMarker('57', 24, 2);
  
  guitarTones.addMarker('40', 20, 2);
  guitarTones.addMarker('41', 22, 2);
  guitarTones.addMarker('42', 24, 2);
  guitarTones.addMarker('43', 26, 2);
  guitarTones.addMarker('44', 28, 2);
  guitarTones.addMarker('45', 30, 2);
  guitarTones.addMarker('46', 32, 2);
  guitarTones.addMarker('47', 34, 2);
  
  guitarTones.addMarker('30', 30, 2);
  guitarTones.addMarker('31', 32, 2);
  guitarTones.addMarker('32', 34, 2);
  guitarTones.addMarker('33', 36, 2);
  guitarTones.addMarker('34', 38, 2);
  guitarTones.addMarker('35', 40, 2);
  guitarTones.addMarker('36', 42, 2);
  guitarTones.addMarker('37', 44, 2);
  
  guitarTones.addMarker('20', 38, 2);
  guitarTones.addMarker('21', 40, 2);
  guitarTones.addMarker('22', 42, 2);
  guitarTones.addMarker('23', 44, 2);
  guitarTones.addMarker('24', 46, 2);
  guitarTones.addMarker('25', 48, 2);
  guitarTones.addMarker('26', 50, 2);
  guitarTones.addMarker('27', 52, 2);
  
  guitarTones.addMarker('10', 48, 2);
  guitarTones.addMarker('11', 50, 2);
  guitarTones.addMarker('12', 52, 2);
  guitarTones.addMarker('13', 54, 2);
  guitarTones.addMarker('14', 56, 2);
  guitarTones.addMarker('15', 58, 2);
  guitarTones.addMarker('16', 60, 2);
  guitarTones.addMarker('17', 62, 2);
  

  text = game.add.text(150, 0, '', { font: "30pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2 });
  $('#loadingText').html('');
     
  //START!!
  setNewChord();
}

function update(){
  
//  game.input.onDown.addOnce(setNewChord, this);
  
}// end update


function setNewChord(){
  guitarNeck.revive();
  counter = 0;
  prevRand = currRand;
  $('#gcgAnswerContainer').html("");
  resetting = true;
  function getRand(){
    var rand = game.rnd.integerInRange(0, currDifficultySetting.level.length-1);
    if ( rand === prevRand ) {
      return getRand();
    }else{
      return rand;
    }
  }
  
  if(notes){
    notes.destroy();
  }
  
  notes = game.add.group();

  currRand = getRand();
  currChord = currDifficultySetting.level[currRand];
  
  game.time.events.repeat(100, 6, setNotes, this);

//  text.setText(currChord.name); DEBUG
}

function setWrongAnswerAnimation(guess){
  var i;
  var j;
  var currFret;
  var currFinger;

  var currGuess = _.find(currDifficultySetting.level, function(item) {
    return item.name == guess; 
  });
  
  if(notes){
    notes.destroy();
  }
  
  wrongGuitarNeckOne = game.add.sprite(0, 100, 'guitarNeck');
  wrongGuitarNeckOne.scale.set(currGameSize.wrongNeckImgScale);
  wrongGuitarNeckTwo = game.add.sprite(250, 100, 'guitarNeck');
  wrongGuitarNeckTwo.scale.set(currGameSize.wrongNeckImgScale);
  
  notes = game.add.group();

  guitarNeck.kill();
  
  wrongTextOne = game.add.text(80, 30, currChord.name, { font: "20pt sans-serif", fill: "#4cae4c", stroke: "#4cae4c", strokeThickness: 2 });

  for(i = 0; i < 6; i++){
    currFret = currChord.notes[i].fret;
    currFinger = (currChord.notes[i].finger).toString();
    if (currFret < 0 ){
        // this is an X
        var note = notes.create(currGameSize.wrongFretsWidthOne[i] + 6, currGameSize.wrongFretsHeight[0], 'x', 0);
        note.scale.set(currGameSize.wrongNonFingerImgScale);
      }else{ 
        // not an X
        if( currFinger == 0){
          var note = notes.create(currGameSize.wrongFretsWidthOne[i] + 5, currGameSize.wrongFretsHeight[currFret], currFinger, 0);
          note.scale.set(currGameSize.wrongNonFingerImgScale);
        }else{
          var note = notes.create(currGameSize.wrongFretsWidthOne[i], currGameSize.wrongFretsHeight[currFret], currFinger, 0);
          note.scale.set(currGameSize.wrongFingerImgScale);
        } 
      }
  }
  
  wrongTextTwo = game.add.text(325, 30, guess, { font: "20pt sans-serif", fill: "#ff5353", stroke: "#ff5353", strokeThickness: 2 });
  
  if(currGuess){
    for(j = 0; j < 6; j++){
      currFret = currGuess.notes[j].fret;
      currFinger = (currGuess.notes[j].finger).toString();
      if (currFret < 0 ){
          // this is an X
          var note = notes.create(currGameSize.wrongFretsWidthTwo[j] + 6, currGameSize.wrongFretsHeight[0], 'x', 0);
          note.scale.set(currGameSize.wrongNonFingerImgScale);
        }else{ 
          // not an X
          if( currFinger == 0){
            var note = notes.create(currGameSize.wrongFretsWidthTwo[j] + 5, currGameSize.wrongFretsHeight[currFret], currFinger, 0);
            note.scale.set(currGameSize.wrongNonFingerImgScale);
          }else{
            var note = notes.create(currGameSize.wrongFretsWidthTwo[j], currGameSize.wrongFretsHeight[currFret], currFinger, 0);
            note.scale.set(currGameSize.wrongFingerImgScale);
          } 
        }
    }
  }
}// end setWrongAnswerAnimation

function setNotes(){
    if(resetting){
      var currFret = currChord.notes[counter].fret;
      var currFinger = (currChord.notes[counter].finger).toString();
      var toneString = (6 - counter).toString() + currFret;
      if (currFret < 0 ){
        // this is an X
        var note = notes.create(currGameSize.fretsWidth[counter] + 6, currGameSize.fretsHeight[0], 'x', 0);
        note.scale.set(currGameSize.nonFingerImgScale);
      }else{ 
        // not an X
        guitarTones.play(toneString, 0, .4);
        if( currFinger == 0){
          var note = notes.create(currGameSize.fretsWidth[counter] + 5, currGameSize.fretsHeight[currFret], currFinger, 0);
          note.scale.set(currGameSize.nonFingerImgScale);
        }else{
          var note = notes.create(currGameSize.fretsWidth[counter], currGameSize.fretsHeight[currFret], currFinger, 0);
          note.scale.set(currGameSize.fingerImgScale);
        } 
      }
      counter += 1;
      if(counter === 6){
        setAnswers();
        resetting = false;
        resetTimer();
      }
    }
}

function setAnswers(){
  newAnswers = shuffle(currChord.answers);     
    newAnswers.map(function(item){
      if(item.correct){
        $('#gcgAnswerContainer').append(
          '<div id="c" class="btn btn-default answer">' + item.answer + '</div>'
        );
      }else{
        $('#gcgAnswerContainer').append(
          '<div class="btn btn-default answer">' + item.answer + '</div>'
        );   
      } 
    });// end map
    $('.answer').click(function(e){ // click handler
      if(!resetting){
        if(gameTimer){
          clearInterval(gameTimer);
        }
        resetting = true;
        var u = $('#u').text();
        var n = $('#n').text();

        if (u === ""){
          if (!loginWarning){
            loginWarning = true;
            setNewChord();
            return $("#loginModal").modal("show");
          }
          
        }  
        
        if(e.target.id === "c"){ //correct answer
          $('#gcgGuessFeedback').html("<span class='glyphicon glyphicon-ok green'></span> +" + pointsAvailable).fadeIn(500);
          $('#c').addClass('green');
          
          if(u !== ""){
            Parse.Cloud.run("add",{amount:pointsAvailable,u: u,currApp: "gcg"}).then(function(results){
              GAME.findLeaders("gcg",currLeaderboardVersion);
              setTimeout(function(){
                $('#gcgGuessFeedback').fadeOut(500);
                setNewChord();
              },1000);
            },function(error){
              console.log(error.message);
            });
          }else{
            $('#gcgGuessFeedback').fadeOut(1000);
            setNewChord();
          }
          
        }else{ //incorrect answer
          var ans = $("#c").text();
          var guess = $(this).text();
          $('#gcgPointsAvailableDisplay').text("0");
          $('#gcgGuessFeedback').html("<span class='glyphicon glyphicon-remove red'></span> The answer is " + ans).fadeIn(500);
          $('#c').addClass('green');
 
          setWrongAnswerAnimation(guess);

          setTimeout(function(){
             // GAME.findLeaders("gcg",currLeaderboardVersion);
            
            $('#gcgGuessFeedback').html('<div class="btn btn-default">Click to Move On</div>').fadeIn(500);
            $('#gcgGuessFeedback').click(function(){
              wrongGuitarNeckOne.kill();
              wrongGuitarNeckTwo.kill();
              wrongTextOne.destroy();
              wrongTextTwo.destroy();
              if(notes){
                notes.destroy();
              }
              $('#gcgGuessFeedback').fadeOut(500);
              setNewChord();
            });  
          },5000);
        }
      }  
    });// end click handler
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}// end shuffle

// ------ JQUERY DOC READY STARTS NOW ----------------------------------->

$(function(){
  
//initialize game
  
  var u = $('#u').text();
  currLeaderboardVersion = leaderboardVersions[0];
  GAME.findLeaders("gcg",currLeaderboardVersion);

  

  // click handlers
   $('#gcgEasyBtn').click(function(){
      if(!resetting){
        if(gameTimer){
          clearInterval(gameTimer);
        }
        currDifficultySetting = settings[0];
        $('#gcgEasyBtn').addClass('selected');
        $('#gcgMediumBtn, #gcgHardBtn').removeClass('selected'); 
        setNewChord();
      }else{
        currDifficultySetting = settings[0];
        $('#gcgEasyBtn').addClass('selected');
        $('#gcgMediumBtn, #gcgHardBtn').removeClass('selected'); 
      }
  });
  
  $('#gcgMediumBtn').click(function(){
      if(!resetting){
        if(gameTimer){
          clearInterval(gameTimer);
        }
        currDifficultySetting = settings[1];
        $('#gcgMediumBtn').addClass('selected');
        $('#gcgEasyBtn, #gcgHardBtn').removeClass('selected'); 
        setNewChord();
      }else{
        currDifficultySetting = settings[1];
        $('#gcgMediumBtn').addClass('selected');
        $('#gcgEasyBtn, #gcgHardBtn').removeClass('selected'); 
      }  
  });
  
  $('#gcgHardBtn').click(function(){
      if(!resetting){
        if(gameTimer){
          clearInterval(gameTimer);
        }
        currDifficultySetting = settings[2];
        $('#gcgHardBtn').addClass('selected');
        $('#gcgEasyBtn, #gcgMediumBtn').removeClass('selected'); 
        setNewChord();
      }else{
        currDifficultySetting = settings[2];
        $('#gcgHardBtn').addClass('selected');
        $('#gcgEasyBtn, #gcgMediumBtn').removeClass('selected'); 
      }  
  });
  
  $('#gcgLbTopScorersBtn').click(function(){
    currLeaderboardVersion = leaderboardVersions[1];
    GAME.findLeaders("gcg",currLeaderboardVersion);
    $('#gcgLbTopScorersBtn').addClass('selected');
    $('#gcgLbNearMeBtn').removeClass('selected');
  });
  
  $('#gcgLbNearMeBtn').click(function(){
    currLeaderboardVersion = leaderboardVersions[0];
    GAME.findLeaders("gcg",currLeaderboardVersion);
    $('#gcgLbNearMeBtn').addClass('selected');
    $('#gcgLbTopScorersBtn').removeClass('selected');
  });
  
});// end doc ready