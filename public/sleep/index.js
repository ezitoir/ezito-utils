


function sleep(milisecound = 0){
    var tick =  0;
    var compileTime = {
        current : new Date().getTime(),
        compare : new Date().getTime() ,
    };
    
    while(tick == 0){
        compileTime.compare = new Date().getTime();
        tick = Math.floor((compileTime.compare - compileTime.current) / milisecound);
    }
}

module.exports = sleep;