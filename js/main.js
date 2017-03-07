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
    let timer = 0;
    sequence.forEach(function(element) {
      window.setTimeout(function() {
        Presenter.animateSquare(Presenter.getBoxByIndex(element));
      }, timer += 1000);
    });
  },
  animateSquare($square) {
    $square.css('opacity', '0.4');
    window.setTimeout(function() {
      $square.css('opacity', '1.0');
    }, 666);
  },
  getBoxByIndex(index) {
    return $(`div.box[data-index=${index}]`);
  }
}

$(function() {
  $('button#start').on('click', Controller.onClickStartButton);
})
