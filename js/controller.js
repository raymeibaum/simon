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
        Presenter.playSound(400, parseInt($(this).attr('data-index')));
        Presenter.runSequence(Simon.newComputerSequenceElement());
        Presenter.refreshScore(Simon.getScore());
        break;
      case 'incorrect sequence':
        Presenter.playSound(3000);
        Presenter.displayPostgameModal(Simon.getScore());
        break;
      case 'additional input required':
        Presenter.playSound(400, parseInt($(this).attr('data-index')));
        break;
      case 'no-game':
        Presenter.playSound(400, parseInt($(this).attr('data-index')));
        break;
    }
  },
  onFormSubmit() {
    event.preventDefault();
    Simon.addHighscore(event.target[0].value, Simon.getScore());
    Presenter.buildAndDisplayHighscores(Simon.sortHighscores());
    Presenter.dismissPostgameModal();
  },
  onClickClearHighscores() {
    Presenter.buildAndDisplayHighscores(Simon.resetHighscores());
  },
  onModalDismiss() {
    Presenter.clearScore();
    Simon.gameOver();
  }
}
