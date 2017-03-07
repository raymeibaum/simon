'use-strict';
const GameData = {
  sequence: [],
  userSequence: [],
  score: 0,
  extendSequence() {
    this.sequence.push(Math.floor(Math.random() * (4)));
    return this.sequence;
  },
  deleteSequence() {
    this.sequence = [];
  },
  getSequence() {
    return this.sequence;
  },
  getScore() {
    return this.score;
  },
  compareSequences() {
    if (this.userSequence.length === this.sequence.length) {
      for (let i = 0; i < this.userSequence.length; i++) {
        if (this.userSequence[i] !== this.sequence[i]) {
          return false;
        }
      }
      this.score++;
      this.userSequence = [];
      return true;
    }
  },
  addUserInput(index) {
    this.userSequence.push(index);
    return this.userSequence;
  },
  gameOver() {
    this.sequence = [];
    this.userSequence = [];
    this.score = 0;
  }
};

const Controller = {
  onClickStartButton() {
    Presenter.runSequence(GameData.extendSequence());
  },
  onClickBoxes() {
    Presenter.animateSquare($(this));
    GameData.addUserInput(parseInt($(this).attr('data-index')));
    if (GameData.compareSequences() === true) {
      console.log('Compare sequences: true');
      Presenter.runSequence(GameData.extendSequence());
      Presenter.refreshScore(GameData.getScore());
    } else if (GameData.compareSequences() === false) {
      console.log('Compare sequences: false');
      Presenter.clearBoard();
      GameData.gameOver();
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
