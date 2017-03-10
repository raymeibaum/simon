'use-strict';
const Controller = {
  onClickStartButton() {
    event.stopPropagation();
    if (!Simon.isPlaying()) {
      Simon.newGame();
      Presenter.runSequence(Simon.newComputerSequenceElement()); // Adds to and immediately runs sequence
    }
  },
  onClickQuadrant() {
    Presenter.animateSquare($(this));
    Simon.newUserSequenceElement(parseInt($(this).attr('data-index')));
    switch (Simon.compareSequences()) {
      case 'correct sequence':
        window.setTimeout(function() { // Delay between user sequence and computer turn
          Presenter.runSequence(Simon.newComputerSequenceElement());
        }, 500);
        Presenter.playSound(400, parseInt($(this).attr('data-index')));
        Presenter.refreshScore(Simon.getScore());
        break;
      case 'incorrect sequence':
        Presenter.playSound(2000);
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
    Simon.addHighscore(Presenter.getName(), Simon.getScore());
    Presenter.disableSubmitButton();
    Presenter.displayValidationSuccess();
    Presenter.buildAndDisplayHighscores(Simon.sortHighscores());
  },
  onClickClearHighscores() {
    Presenter.buildAndDisplayHighscores(Simon.resetHighscores());
  },
  onModalDismiss() {
    Presenter.enableSubmitButton();
    Presenter.clearValidationMessage();
    Presenter.clearScore();
    Simon.gameOver();
  },
  onModalShown() {
    Presenter.focusInput();
  }
}
