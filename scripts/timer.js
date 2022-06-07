// GLOBALS

const minutes = 60;
var timeInterval;

var imagesFromDB = [];
var index = 0;

const image_input = document.querySelector("#image_input");

/**
 * MODAL CODE
 * */
var modal = document.getElementById("myModal");
var img = document.getElementById("img");

var modalImg = document.getElementById("img01");

var captionText = document.getElementById("caption");

/* CLOSE IMAGE VIEWER
 **/

var closeBtn = document.getElementById("closeBTN");
closeBtn.onclick = function () {
  modal.style.display = "none";
  captionText.textContent = ""; 
  index = 0;
  stopTimer();
};

/*
 * SET ARRAY OF IMAGES
 * **/

if (image_input) {
  image_input.addEventListener("change", function (event) {
    let files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      imagesFromDB.push(URL.createObjectURL(files[i]));
    }
    setImage(0); 
  });
}

/***
 * ACTIVATE MODAL FOR VIEWING IMAGES
 * */
function activateModal() {


  if (modal) {
    if(setTimer() === undefined){
      alert("Please select a time"); 
      return; 
    }
    modal.style.display = "block";
  }
}

function setImage(i) {

  if(imagesFromDB.length == 0){
    console.log("There was a problem with the images. Could not upload them"); 
    return; 
  }

  let urlString = "url(" + imagesFromDB[i] + ")";
  modal.style.backgroundImage = urlString;
  console.log("Image set no prob"); 

}

/**
 *  Start the timer for practice.
 *
 * @param {any} duration sets the time of the timer
 * @param {any} display where the timer will be showing
 */
function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;

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
  
}

/**
 * Get the time selected by user and
 * start session timer.
 * */
function setTimer() {

  var time = getRadio();
  if (typeof time == "undefined") {
    return undefined;
  }

  let fiveMinutes = minutes * time,
    display = document.querySelector("#timer-caption");
  startTimer(fiveMinutes, display);

  return true; 
}

/**
 * Get the information for the radios that are needed
 * for the timer. If nothing is selected, then it throws
 * an error.
 * */
function getRadio() {
  var elements = document.getElementsByName("time");
  var chosenTime;

  for (var i = 0; i < elements.length; i++) {
    if (elements[i].checked) {
      chosenTime = elements[i].value;
    }
  }

  if (typeof chosenTime === "undefined") {
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
function fetchImages(imageQuery) {

  console.log('this is what is being queried', imageQuery);
  if(imagesFromDB.length > 0){
    return; 
  }

  $.ajax({
    url: '/getImages',
    type: 'GET',
    contentType: "application/json",
    data: {
        type: imageQuery,
    },
    success: function(response) {
        console.log('data obateined', response);
        setImages(response); 
        setImage(0); 
    }
  });
  
}

/**
 * Get images URL and set them to local array.
 * @param {image objects} documents
 */
function setImages(documents) {
  console.log('The current size of the array: ' + imagesFromDB.length); 
  if(imagesFromDB.length > 0){
    imagesFromDB = []; 
    console.log('The current length: ' + imagesFromDB.length)
  }

  documents.forEach((document) => {
    imagesFromDB.push(document.url);
  });

  sessionStorage.setItem('urls', imagesFromDB);

  console.log("The db returned " + imagesFromDB.length + " items. The array was safely stored as well");


}

function getImages() {
  console.log(imagesFromDB);
  return imagesFromDB;
}

function resetImage(index) {
  if (index > imagesFromDB.length) {
    closeModal();
    return;
  }
  setImage(index);
}

