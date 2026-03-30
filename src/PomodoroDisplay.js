import chalk from 'chalk';
import figlet from 'figlet';

/**
 * Single Responsibility: gère uniquement le rendu terminal.
 * Ne connaît ni le timer ni la session, reçoit des données brutes.
 */
export class PomodoroDisplay {
  clearScreen() {
    process.stdout.write('\x1B[2J\x1B[0f');
  }

  renderBanner() {
    const banner = figlet.textSync('POMODORO', { font: 'Calvin S' });
    console.log(chalk.red(banner));
  }

  renderTick(label, remainingSeconds) {
    const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, '0');
    const seconds = String(remainingSeconds % 60).padStart(2, '0');
    const time = chalk.red.bold(`${minutes}:${seconds}`);
    process.stdout.write(`\r  ${chalk.bold(label)}  →  ${time} restantes  `);
  }

  renderSessionEnd(label) {
    process.stdout.write('\n');
    console.log(chalk.green(`✓ Session "${label}" terminée !`));
  }

  renderSummary(completedCycles) {
    console.log(chalk.yellow(`\nCycles complétés : ${completedCycles}`));
  }

  renderGoodbye() {
    console.log(chalk.blue('\nBonne journée ! 🍅'));
  }
}
