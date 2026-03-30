import { SESSION_TYPE, SESSIONS } from './config.js';

/**
 * Single Responsibility: gère l'état de la session (travail / pause, cycles).
 * Ne sait rien du timer ni de l'affichage.
 */
export class PomodoroSession {
  #workSeconds;
  #breakSeconds;
  #currentType;
  #completedCycles;

  constructor({ workMinutes, breakMinutes }) {
    this.#workSeconds = workMinutes * 60;
    this.#breakSeconds = breakMinutes * 60;
    this.#currentType = SESSION_TYPE.WORK;
    this.#completedCycles = 0;
  }

  get type() {
    return this.#currentType;
  }

  get label() {
    return SESSIONS[this.#currentType].label;
  }

  get durationSeconds() {
    return this.#currentType === SESSION_TYPE.WORK
      ? this.#workSeconds
      : this.#breakSeconds;
  }

  get completedCycles() {
    return this.#completedCycles;
  }

  advance() {
    if (this.#currentType === SESSION_TYPE.WORK) {
      this.#completedCycles++;
      this.#currentType = SESSION_TYPE.BREAK;
    } else {
      this.#currentType = SESSION_TYPE.WORK;
    }
  }
}
