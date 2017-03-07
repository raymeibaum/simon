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
  }
};

const Controller = {
  onClickStartButton() {
    Presenter.runSequence(GameData.extendSequence());
  },
  onClickBoxes() {
    Presenter.animateSquare($(this));
  }
}

const Presenter = {
  runSequence(sequence) {
    console.log(sequence);
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
    }, 666);
  },
  getSquareByIndex(index) {
    return $(`div.box[data-index=${index}]`);
  }
}

$(function() {
  $('button#start').on('click', Controller.onClickStartButton);
  $('div.box-container').on('click', 'div', Controller.onClickBoxes);
})
