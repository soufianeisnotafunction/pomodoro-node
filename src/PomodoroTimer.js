import { EventEmitter } from 'node:events';

/**
 * Single Responsibility: gère uniquement la logique du compte à rebours.
 * Émet 'tick' à chaque seconde et 'end' quand le temps est écoulé.
 */
export class PomodoroTimer extends EventEmitter {
  #intervalId = null;
  #remainingSeconds;

  constructor(durationSeconds) {
    super();
    this.#remainingSeconds = durationSeconds;
  }

  start() {
    this.emit('tick', this.#remainingSeconds);
    this.#intervalId = setInterval(() => {
      this.#remainingSeconds--;
      this.emit('tick', this.#remainingSeconds);
      if (this.#remainingSeconds <= 0) {
        this.stop();
        this.emit('end');
      }
    }, 1000);
  }

  stop() {
    if (this.#intervalId) {
      clearInterval(this.#intervalId);
      this.#intervalId = null;
    }
  }
}
