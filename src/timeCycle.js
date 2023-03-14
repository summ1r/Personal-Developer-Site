
function timeNow(time) {
    time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    return time;
}

export default timeNow;