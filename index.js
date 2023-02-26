const text = document.querySelector("#text");
const uploadImage = document.querySelector("#uploadImage");
const img = document.querySelector("#img");
const synth = window.speechSynthesis;
let classifier;
let counterDisplayElem = document.querySelector('.counter-display');
let count = 0;


uploadImage.addEventListener("change", event => loadFile(event));
img.addEventListener("load", () => userImageUploaded());

function loadFile(event) {
    img.src = URL.createObjectURL(event.target.files[0]);
}

function userImageUploaded() {
    text.innerHTML = "Image is loaded";

    // Classify the image using the loaded classifier
    classifier.classify(img, (err, results) => {
        console.log(results);

        // Show the highest result
        text.innerHTML = `It's a ${results[0].label}!`;
        speak(`It's a ${results[0].label}!`);

        // Counter of the matching 20 euro images
        if (results[0].label === "20 Euro") {
            count++
            updateDisplay();
        } else {
            count--
            updateDisplay();
            console.log(results.label)
        }
    });
}

// Keep the counter updated
function updateDisplay() {
    counterDisplayElem.innerHTML = count;
};

function modelLoaded() {
    console.log('Model Loaded!');

    // Update the message and start classifying images
    text.innerHTML = "Upload een 20 euro Biljet";
    classifier = ml5.imageClassifier('model.json', () => {
        console.log('Custom model loaded!');
    });
}

// load my own model
classifier = ml5.imageClassifier('model.json', modelLoaded);

function speak(text) {
    if (synth.speaking) {
        return;
    }
    if (text !== "") {
        let utterThis = new SpeechSynthesisUtterance(text);
        synth.speak(utterThis);
    }
}
