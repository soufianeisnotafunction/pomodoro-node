import inquirer from 'inquirer';
import { PomodoroTimer } from './PomodoroTimer.js';
import { PomodoroSession } from './PomodoroSession.js';
import { PomodoroDisplay } from './PomodoroDisplay.js';
import { WORK_DURATION_CHOICES, BREAK_DURATION_CHOICES } from './config.js';

/**
 * Demande à l'utilisateur la configuration du pomodoro.
 */
async function promptConfig() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'workMinutes',
      message: 'Durée du pomodoro (minutes) :',
      choices: WORK_DURATION_CHOICES,
      default: { name: '25 min', value: 25 },
    },
    {
      type: 'list',
      name: 'breakMinutes',
      message: 'Durée de la pause (minutes) :',
      choices: BREAK_DURATION_CHOICES,
      default: { name: '5 min', value: 5 },
    },
  ]);
}

/**
 * Lance un cycle (travail ou pause) et attend sa fin.
 */
function runCycle(session, display) {
  return new Promise((resolve) => {
    const timer = new PomodoroTimer(session.durationSeconds);

    timer.on('tick', (remaining) => display.renderTick(session.label, remaining));
    timer.on('end', () => {
      display.renderSessionEnd(session.label);
      resolve();
    });

    timer.start();
  });
}

/**
 * Demande si l'utilisateur veut continuer vers la prochaine session.
 */
async function promptContinue(nextLabel) {
  const { shouldContinue } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'shouldContinue',
      message: `Démarrer la session "${nextLabel}" ?`,
      default: true,
    },
  ]);
  return shouldContinue;
}

async function main() {
  const display = new PomodoroDisplay();

  display.clearScreen();
  display.renderBanner();

  const config = await promptConfig();
  const session = new PomodoroSession(config);

  display.clearScreen();
  display.renderBanner();

  let running = true;

  while (running) {
    await runCycle(session, display);
    session.advance();
    display.renderSummary(session.completedCycles);

    running = await promptContinue(session.label);

    if (running) {
      display.clearScreen();
      display.renderBanner();
    }
  }

  display.renderGoodbye();
}

main();
