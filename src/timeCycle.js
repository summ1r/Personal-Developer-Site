

function msecToTime(msec){

    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    /** 
    console.log("Hours: "+hh.toString()+" with str length "+hh.toString().length);
    console.log("Minutes: "+mm.toString()+" with str length "+mm.toString().length);
    */
    
    if(hh.toString().length < 2){
        hh = "0"+hh;
    }
    
    if(mm.toString().length < 2){
        mm = "0"+mm;
    }

    return (hh + ":" + mm);
}

export {msecToTime}