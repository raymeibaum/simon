'use-strict';
const GameData = {
  sequence: [],
  userSequence: [],
  score: 0,
  userTurn: true,
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
  compareSequence() {
    if (this.userSequence.length === this.sequence.length) {
      for (let i = 0; i < this.userSequence.length; i++) {
        if (this.userSequence[i] !== this.sequence[i]) {
          return false;
        }
      }
      this.score++;
      return true;
    }
  },
  isUserTurn() {
    return this.userTurn;
  },
  addUserInput(index) {
    this.userSequence.push(index);
    return this.userSequence;
  }
};

const Controller = {
  onClickStartButton() {
    Presenter.runSequence(GameData.extendSequence());
  },
  onClickBoxes() {
    if (GameData.isUserTurn()) {
      Presenter.animateSquare($(this));
      console.log(GameData.addUserInput(parseInt($(this).attr('data-index'))));
    }
  },
}

const Presenter = {
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
  }
}

$(function() {
  $('button#start').on('click', Controller.onClickStartButton);
  $('div.box-container').on('click', 'div', Controller.onClickBoxes);
})
