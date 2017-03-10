'use-strict';
const Presenter = {
  $score: $('h3.score'),
  $modalScore: $('h1#modal-score'),
  $squareContainer: $('div.game'),
  $highScoresTable: $('tbody#highscores'),
  $postgameModal: $('div#postgame-modal'),
  $tweetButton: $('a#tweet-button'),
  audioCtx: new (window.AudioContext || window.webkitAudioContext)(),
  runSequence(sequence) {
    let timer = 0;
    sequence.forEach(function(element) {
      window.setTimeout(function() {
        Presenter.animateSquare(Presenter.getSquareByIndex(element));
        Presenter.playSound(400, element);
      }, timer += 600);
    });
    this.disableClickEvents(timer);
  },
  animateSquare($square) {
    $square.addClass('animated');
    $square.on('animationend', function() {
      $square.removeClass('animated');
    });
  },
  getSquareByIndex(index) {
    return $(`div.box[data-index=${index}]`);
  },
  refreshScore(score) {
    this.$score.text(score);
  },
  clearScore() {
    this.$score.text(0);
  },
  disableClickEvents(time) {
    window.setTimeout(function() {
      Presenter.$squareContainer.css('pointer-events', 'auto');
    }, time);
    this.$squareContainer.css('pointer-events', 'none');
  },
  playSound(duration, element) {
    let oscillator = this.audioCtx.createOscillator();
    let gainNode = this.audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    gainNode.gain.value = 0.3;

    oscillator.type = 'triangle';

    switch (element) {
      case 0:
        oscillator.frequency.value = 466.16;
        break;
      case 1:
        oscillator.frequency.value = 349.23;
        break;
      case 2:
        oscillator.frequency.value = 233.08;
        break;
      case 3:
        oscillator.frequency.value = 277.18;
        break;
      default:
        oscillator.frequency.value = 40;
    }
    oscillator.start();
    window.setTimeout(function() {
      oscillator.stop();
    }, duration);
  },
  displayPostgameModal(score) {
    let message = `I just scored ${score} playing #Simon by @raymeibaum. https://raymeibaum.github.io/simon/ #GA #WDI`;
    this.$modalScore.text(score);
    this.$tweetButton.attr('href', `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`)
    this.$postgameModal.modal({
      show: true,
      backdrop: 'static'
    });
  },
  dismissPostgameModal() {
    this.$postgameModal.modal('hide');
  },
  buildAndDisplayHighscores(highscores) {
    this.$highScoresTable.empty();
    highscores.forEach(function(highscore, index) {
      let $newScoreRow = $('<tr>');
      $newScoreRow.append(`<td>${index + 1}</td>`);
      $newScoreRow.append(`<td>${highscore.name}</td>`);
      $newScoreRow.append(`<td>${highscore.score}</td>`);
      Presenter.$highScoresTable.append($newScoreRow);
    });
  }
}
