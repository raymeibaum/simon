'use-strict';
const GameData = {
  sequence: [],
  extendSequence() {
    this.sequence.push(Math.floor(Math.random() * (4)));
    return this.sequence;
  },
  deleteSequence() {
    this.sequence = [];
  },

};

const Controller = {
  onClickStartButton() {
    Presenter.runSequence(GameData.extendSequence());
  }
}

const Presenter = {
  runSequence(sequence) {
    console.log(sequence);
  },
  animateSquare(index) {

  }
}

$(function() {
  $('button#start').on('click', Controller.onClickStartButton);
})
