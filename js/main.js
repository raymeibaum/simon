'use-strict';
const Simon = {
  computerSequence: [],
  userSequence: [],
  score: 0,
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
    this.resetComputerSequence();
    this.resetUserSequence();
    this.resetScore();
  }
};

const Controller = {
  onClickStartButton() {
    Presenter.runSequence(Simon.newComputerSequenceElement());
  },
  onClickBoxes() {
    Presenter.animateSquare($(this));
    Simon.newUserSequenceElement(parseInt($(this).attr('data-index')));
    switch (Simon.compareSequences()) {
      case 'correct sequence':
        Presenter.playSound(parseInt($(this).attr('data-index')));
        Presenter.runSequence(Simon.newComputerSequenceElement());
        Presenter.refreshScore(Simon.getScore());
        break;
      case 'incorrect sequence':
        Presenter.playSound();
        Presenter.clearBoard();
        Simon.gameOver();
        break;
      case 'additional input required':
        Presenter.playSound(parseInt($(this).attr('data-index')));
        break;
    }
  }
}

const Presenter = {
  $score: $('h3#score'),
  $squareContainer: $('div.box-container'),
  audioCtx: new window.AudioContext(),
  runSequence(sequence) {
    let timer = 0;
    sequence.forEach(function(element) {
      window.setTimeout(function() {
        Presenter.animateSquare(Presenter.getSquareByIndex(element));
        Presenter.playSound(element);
      }, timer += 600);
    });
    this.disableClickEvents(timer);
  },
  animateSquare($square) {
    $square.addClass('animated');
    $square.on('animationend', function() {
      $square.removeClass('animated');
    });
  },
  getSquareByIndex(index) {
    return $(`div.box[data-index=${index}]`);
  },
  refreshScore(score) {
    this.$score.text(score);
  },
  clearBoard() {
    this.$score.text(0);
  },
  disableClickEvents(time) {
    window.setTimeout(function() {
      Presenter.$squareContainer.css('pointer-events', 'auto');
    }, time);
    this.$squareContainer.css('pointer-events', 'none');
  },
  playSound(element) {
    let oscillator = this.audioCtx.createOscillator();
    let gainNode = this.audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    gainNode.gain.value = 1;

    oscillator.type = 'triangle';

    switch (element) {
      case 0:
        oscillator.frequency.value = 466.16;
        break;
      case 1:
        oscillator.frequency.value = 349.23;
        break;
      case 2:
        oscillator.frequency.value = 233.08;
        break;
      case 3:
        oscillator.frequency.value = 277.18;
        break;
      default:
        oscillator.frequency.value = 40;
    }
    oscillator.start();
    window.setTimeout(function() {
      oscillator.stop();
    }, 400);
  }
}

$(function() {
  $('button#start').on('click', Controller.onClickStartButton);
  $('div.box-container').on('click', 'div', Controller.onClickBoxes);
})
