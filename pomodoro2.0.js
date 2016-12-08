var say = require('say');
var colors = require('colors');
var workInSeconds = 1500;
var pauseInSeconds = 300;
var work = true;
var msgWork = " WORK ! : ";
var msgPause = "PAUSE ! : ";
var time = workInSeconds;
var msg = msgWork;

var talkWork = 'its time to work , stay focused' ;
var talkPause = 'chill out , its time to relax' ;
var talk = talkWork;


process.stdout.write("******** POMODORO ********\n".inverse);
say.speak(talk , 'Alex' , 1);

var pomodoro = function () {
if (time < 0){
  work = !work;
  msg = work ? msgWork : msgPause;
  time = work ? workInSeconds : pauseInSeconds ;
  talk = work ? talkWork : talkPause ;
  say.speak(talk , 'Alex' , 1);
}
process.stdout.write( (msg + colors.red(Math.floor(time/60)) + "mn " + colors.red(Math.floor(time%60)) + "s left\r"));
time--;
}

var countdownWork = setInterval(pomodoro , 1000);
