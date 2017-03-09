'use-strict';
const Controller = {
  onClickStartButton() {
    event.stopPropagation();
    if (!Simon.isPlaying()) {
      Simon.newGame();
      Presenter.runSequence(Simon.newComputerSequenceElement());
    }
  },
  onClickQuadrant() {
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
        Presenter.displayPostgameModal(Simon.getScore());
        Presenter.clearBoard();
        break;
      case 'additional input required':
        Presenter.playSound(parseInt($(this).attr('data-index')));
        break;
      case 'no-game':
        Presenter.playSound(parseInt($(this).attr('data-index')));
        break;
    }
  },
  onFormSubmit() {
    event.preventDefault();
    Presenter.dismissPostgameModal();
    Simon.addHighscore(event.target[0].value, Simon.getScore());
    Presenter.buildAndDisplayHighscores(Simon.sortHighscores());
    Simon.gameOver();
  }
}
