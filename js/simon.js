'use-strict';
const Simon = {
  computerSequence: [],
  userSequence: [],
  score: 0,
  inGame: false,
  isPlaying() {
    return this.inGame
  },
  newGame() {
    this.inGame = true;
  },
  newComputerSequenceElement() {
    this.computerSequence.push(Math.floor(Math.random() * (4)));
    return this.computerSequence;
  },
  getComputerSequence() {
    return this.computerSequence;
  },
  resetComputerSequence() {
    this.computerSequence = [];
  },
  newUserSequenceElement(index) {
    this.userSequence.push(index);
    return this.userSequence;
  },
  getUserSequence() {
    return this.userSequence;
  },
  resetUserSequence() {
    this.userSequence = [];
  },
  getScore() {
    return this.score;
  },
  incrementScore() {
    this.score++;
  },
  resetScore() {
    this.score = 0;
  },
  compareSequences() {
    if (this.computerSequence.length === 0) {
      this.resetUserSequence();
      return 'no-game';
    }
    for (let i = 0; i < this.userSequence.length; i++) {
      if (this.userSequence[i] !== this.computerSequence[i]) {
        return 'incorrect sequence';
      }
    }
    if (this.userSequence.length === this.computerSequence.length) {
      this.incrementScore();
      this.resetUserSequence();
      return 'correct sequence';
    } else {
      return 'additional input required';
    }
  },
  gameOver() {
    this.inGame = false;
    this.resetComputerSequence();
    this.resetUserSequence();
    this.resetScore();
  }
};
