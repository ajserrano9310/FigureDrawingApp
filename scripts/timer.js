
// GLOBALS

const minutes = 60;
var timeInterval;

var imagesFromDB = [];
var images = []; 
var index = 0;
const imageID = 'current';

const image_input = document.querySelector('#image_input');

var uploadedImage = '';


/**
 * MODAL CODE
 * */
var modal = document.getElementById("myModal");
var img = document.getElementById("img"); 

var modalImg = document.getElementById("img01");

var captionText = document.getElementById("caption");

/* CLOSE IMAGE VIEWER
 **/

var closeBtn = document.getElementById('closeBTN');
closeBtn.onclick = function () {
    modal.style.display = 'none';
    stopTimer(); 
}


//First Commit?
//Another commit for checking purposes

/* TIMER DISPLAY */
//var timerDisplay = document.getElementById("timer");

/*
 * SET ARRAY OF IMAGES 
 * **/

if(image_input){
    image_input.addEventListener("change", function (event) {
        let files = event.target.files;
    
        for (let i = 0; i < files.length; i++) {
            imagesFromDB.push(
                URL.createObjectURL(files[i]));
          
        }
    })
}



/***
 * ACTIVATE MODAL FOR VIEWING IMAGES
 * */
function activateModal() {

    if(modal){

        setTimer(); 
        modal.style.display = "block";
        setImage(0); 
       
        

    }

  
}


function setImage(i) {
    let urlString = 'url(' + imagesFromDB[i] + ')';
    modal.style.backgroundImage = urlString; 
}

/**
 *  Start the timer for practice.
 * 
 * @param {any} duration sets the time of the timer
 * @param {any} display where the timer will be showing
 */
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;

        timeInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
            index++;
            resetImage(index);
            console.log("reset image"); 
            
        }
    }, 1000);

   
}

/**
 * Stop the session timer 
 * */
function stopTimer() {
    clearInterval(timeInterval);
    alert("timer stopped");
}

/**
 * Get the time selected by user and
 * start session timer. 
 * */
function setTimer() {

    var time = getRadio();
    if (typeof time == 'undefined') {
        alert("Please select a time");
        return undefined; 
    }

    let fiveMinutes = minutes * time, display = document.querySelector('#timer-caption');
    startTimer(fiveMinutes, display);

}

/**
 * Get the information for the radios that are needed
 * for the timer. If nothing is selected, then it throws
 * an error.
 * */
function getRadio() {
    var elements = document.getElementsByName('time');
    var chosenTime;

    for (i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            chosenTime = elements[i].value;
        }
    }

    if (typeof chosenTime === 'undefined') {
        return undefined;
    }
    else {
        var time = parseInt(chosenTime);
        return time;
    }
}

/**
 * Load the images from Database 
 * */
function fetchImages() {

    alert("fetching images");

    imagesFromDB.push("https://i.ibb.co/VtQWxdx/the-killer-elite-3-by-mjranum-stock-d1fllr0-fullview.jpg"); 
    imagesFromDB.push("https://i.ibb.co/HHB874n/14910.jpg"); 
    imagesFromDB.push("https://i.ibb.co/8Y51HwM/this-will-hardly-hurt-2-by-mjranum-stock-d321gkz-fullview.jpg"); 

    /*
    $.ajax({
        url : "/Home/FetchImages",
        type: "POST",
        success: function (data) {
            setImages(data);
        }
    });
    */
}

function setImages(images) {
    imagesFromDB = images;
}

function resetImage(index) {

    if (index >= imagesFromDB.length) {
        alert("Images are done");
        return; 
    }

    setImage(index);

}


