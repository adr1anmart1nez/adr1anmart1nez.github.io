document.addEventListener("DOMContentLoaded", DOMReady);

const successColor = "#84fc50";
const errorColor = "#fc7676";

function DOMReady() {
    var html5QrcodeScanner = new Html5QrcodeScanner("qr-scanner", { fps: 10, qrbox: {width: 200, height: 200} }, false);
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
}

function onScanSuccess(decodedText, decodedResult) {
    clearFields();
    if (decodedText.length == 8) {
        successFeedback("Scan successful");
        document.getElementById("auftrag").innerHTML = decodedText;
    } else if (decodedText.length == 5 && !isNaN(decodedText)) {
        successFeedback("Scan successful");
        document.getElementById("position").innerHTML = decodedText;
    } else {
        errorFeedback("Unsupported code!");
    }
    console.log(decodedResult);
}

function onScanFailure(error) {
    clearFields();
    errorFeedback(error);
}

function successFeedback(message) {
    var feedbackDiv = getFeedbackDiv();
    feedbackDiv.innerHTML = message;
    feedbackDiv.style.backgroundColor = successColor;
    document.querySelector("#qr-scanner").insertAdjacentElement("beforebegin", feedbackDiv);

    // Success sound
    var audio = new Audio("./resources/sound/success.mp3");
    audio.play();
}

function errorFeedback(message) {
    var feedbackDiv = getFeedbackDiv();
    feedbackDiv.innerHTML = message;
    feedbackDiv.style.backgroundColor = errorColor;
    document.querySelector("#qr-scanner").insertAdjacentElement("beforebegin", feedbackDiv);

    // Error sound
    var audio = new Audio("./resources/sound/error.mp3");
    audio.play();

    // Vibration - Apparently not supported by some devices, such as iOS
    var canVibrate = window.navigator.vibrate;
    if (canVibrate) {
        window.navigator.vibrate(500);
    }
}

function getFeedbackDiv() {
    var feedbackDiv = document.querySelector(".feedback");
    if (!feedbackDiv) {
        // Div doesn't exist, create a new one
        feedbackDiv = document.createElement("div");
        feedbackDiv.classList.add("feedback");
    }
    return feedbackDiv;
}

function clearFields() {
    document.getElementById("auftrag").innerHTML = "";
    document.getElementById("position").innerHTML = "";
}