class Timer {
  constructor(duration) {
    this.duration = duration * 1000;
    this.startTime = 0;
    this.isRunning = false;
    this.timeId = null;

    this.timerContainer = document.createElement("div");
    this.timerContainer.classList.add("timer-container");
    let durationInSeconds = this.duration / 1000 / 60
    this.timerContainer.innerHTML = `${this.formatTime(durationInSeconds)}:${this.formatTime(0)}`;


    document.getElementById("road-container").appendChild(this.timerContainer);
  }

  start() {
    if (!this.isRunning) {
      this.startTime = Date.now();
      this.isRunning = true;

      this.timeId = setInterval(() => {
        const elapsedTime = Date.now() - this.startTime;
        const remainnigTime = this.duration - elapsedTime;
        if (remainnigTime <= 0) {
          this.stop();
          const gameOverWindow = document.createElement('div');
          const rePlayButton = document.createElement('button');

          gameOverWindow.innerHTML = `You Lost , Try Again `;
          gameOverWindow.id = 'gameover';
          rePlayButton.innerHTML = 'Restart Game';
          rePlayButton.classList.add('reset-button');

          rePlayButton.addEventListener('click' , () => {
            window.location.reload();
          });
          document.getElementById('road-container').appendChild(gameOverWindow);
          gameOverWindow.appendChild(rePlayButton);
        } else {
          const seconds = Math.floor(remainnigTime / 1000);
          const minutes = Math.floor(seconds / 60);
          this.timerContainer.innerHTML = `${this.formatTime(minutes % 60)}
                :${this.formatTime(seconds % 60)}`;
        }
      }, 1000);
    }
  }
  stop() {
    clearInterval(this.timeId);
    this.isRunning = false;
  }
  formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }
}

export default Timer;
