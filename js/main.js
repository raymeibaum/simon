'use-strict';
$(function() {
  $('img#start').on('click', Controller.onClickStartButton);
  $('div.game-container').on('click', 'div', Controller.onClickQuadrant);
  $('form').on('submit', Controller.onFormSubmit);
  $('a#clear-highscores').on('click', Controller.onClickClearHighscores);
})
