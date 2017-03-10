'use-strict';
$(function() {
  $('div.game-center').click(false);
  $('i.start').on('click', Controller.onClickStartButton);
  $('div.game').on('click', 'div', Controller.onClickQuadrant);
  $('form').on('submit', Controller.onFormSubmit);
  $('div#postgame-modal').on('hide.bs.modal', Controller.onModalDismiss);
  $('div#postgame-modal').on('shown.bs.modal', Controller.onModalShown);
  $('a#clear-highscores').on('click', Controller.onClickClearHighscores);
})
