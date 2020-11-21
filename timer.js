function showTime(){
    const date = new Date();
    return "Hrs: " + date.getHours() + ", Mins: " + date.getMinutes() + ", Secs: " + date.getSeconds();
}

function showSessionExpire(){
    console.log("Activity B: Your session expired at-----> " + showTime());
}

console.log("Activity A: Triggering activity B at ------> " + showTime());
setTimeout(showSessionExpire, 5000);
console.log("Activity A: Triggering activity B at ------> " + showTime() + " will execute after 5 secs..");
