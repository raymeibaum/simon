'use-strict';
$(function() {
  $('img#start').on('click', Controller.onClickStartButton);
  $('div.game-container').on('click', 'div', Controller.onClickQuadrant);
  $('form').on('submit', Controller.onFormSubmit);
  $('div#postgame-modal').on('hide.bs.modal', Controller.onModalDismiss);
  $('a#clear-highscores').on('click', Controller.onClickClearHighscores);
})
