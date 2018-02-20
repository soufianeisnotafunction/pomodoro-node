const say = require("say");
const figlet = require("figlet");
const colors = require("colors");
const readline = require("readline-sync");

let data = {
  work: {
    time: 1500,
    msg: "WORK! : ",
    talk: " its time to work , stay focused"
  },
  pause: {
    time: 300,
    msg: "PAUSE! : ",
    talk: " chill out , its time to relax"
  }
};
let work = true;
let { time, msg, talk } = data.work;

// PROMPT
var readlineSync = require("readline-sync"),
  timeRange = [25, 35, 45],
  index = readlineSync.keyInSelect(timeRange, "Work time ?");
time = timeRange[index] * 60;

//CLEAR SCREEN
process.stdout.write("\x1B[2J\x1B[0f");
//POMODORO
console.log(figlet.textSync("POMODORO", "Calvin S").red);

say.speak(talk, "Alex", 1);

const pomodoro = () => {
  if (time < 0) {
    work = !work;
    msg = work ? data.work.msg : data.pause.msg;
    time = work ? data.work.time : data.pause.time;
    talk = work ? data.work.talk : data.pause.talk;
    say.speak(talk, "Alex", 1);
  }
  process.stdout.write(
    `${msg} ${colors.red(Math.floor(time / 60))} mn  ${colors.red(
      Math.floor(time % 60)
    )} s left \r`
  );
  // process.stdout.write(figlet.textSync(Math.round(time%60) , 'Doh' ));
  time--;
};

var timer = setInterval(pomodoro, 1000);
