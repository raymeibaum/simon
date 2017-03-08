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
  }
  resetUserSequence() {
    this.userSequence = [];
  },
  getScore() {
    return this.score;
  },
  incrementScore() {
    this.score++;
  }
  resetScore() {
    this.score = 0;
  }
  compareSequences() {
    for (let i = 0; i < this.userSequence.length; i++) {
      if (this.userSequence[i] !== this.computerSequence[i]) {
        return false;
      }
    }
    if (this.userSequence.length === this.computerSequence.length) {
      this.incrementScore();
      this.resetUserSequence();
      return true;
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
    if (Simon.compareSequences() === true) {
      Presenter.runSequence(Simon.newComputerSequenceElement());
      Presenter.refreshScore(Simon.getScore());
    } else if (Simon.compareSequences() === false) {
      Presenter.clearBoard();
      Simon.gameOver();
      alert('Game over!');
    }
  },
}

const Presenter = {
  $score: $('h3#score'),
  runSequence(sequence) {
    let timer = 0;
    sequence.forEach(function(element) {
      window.setTimeout(function() {
        Presenter.animateSquare(Presenter.getSquareByIndex(element));
      }, timer += 1000);
    });
  },
  animateSquare($square) {
    $square.css('opacity', '0.4');
    window.setTimeout(function() {
      $square.css('opacity', '1.0');
    }, 500);
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
