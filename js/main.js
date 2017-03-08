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
        console.log('correct sequence');
        Presenter.runSequence(Simon.newComputerSequenceElement());
        Presenter.refreshScore(Simon.getScore());
        break;
      case 'incorrect sequence':
        console.log('incorrect sequence');
        Presenter.clearBoard();
        Simon.gameOver();
        break;
      case 'additional input required':
        console.log('additional input required');
        break;
    }
  }
}

const Presenter = {
  $score: $('h3#score'),
  animationQueue: null,
  runSequence(sequence) {
    let timer = 0;
    sequence.forEach(function(element) {
      window.setTimeout(function() {
        Presenter.animateSquare(Presenter.getSquareByIndex(element));
      }, timer += 1000);
    });
  },
  animateSquare($square) {
    $square.css('opacity', '0');
    $square.animate({
      opacity: '1.0',
    }, {
      duration: 1000,
      queue: true,
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
  }
}

$(function() {
  $('button#start').on('click', Controller.onClickStartButton);
  $('div.box-container').on('click', 'div', Controller.onClickBoxes);
})
