
function startTimer(duration, display){
    var timer = duration, minutes, seconds; 

    setInterval(function(){
        minutes = parseInt(timer/60, 10); 
        seconds = parseInt(timer % 60, 10); 

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds; 

        if(--timer < 0){
            timer = duration;
        }
    }, 1000);
}

function setTimer(){
    
    var time = getRadio();  

    if(typeof time == 'undefined'){
        alert("Please select a time"); 
        return; 
    }
    var fiveMinutes = 60 * time, display = document.querySelector('#time'); 
    startTimer(fiveMinutes, display); 
}

function getRadio(){
    var elements = document.getElementsByName('time');
    var timeElement; 

    for(i = 0; i < elements.length; i++){
        if(elements[i].checked){
            timeElement = elements[i].value; 
        }
    }

    if(typeof timeElement ==='undefined'){
        return undefined; 
    }
    else{
        var time = parseInt(timeElement); 
        return time; 
    }

   
    
}