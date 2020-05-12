//global variables
let voices = [];
const backToHomepage = document.querySelectorAll('.back-to-home');
const contactContainer = document.querySelector('#main-contact-container');
const contactPageButton = document.querySelector("#contact");
const contactHomeButton = document.querySelector('#contact-home-button');
const sendButton = document.querySelector('#send-button');
const homePage = document.querySelector('#homepage-container');
const animalCardFronts = document.querySelectorAll('.card > .front');
const animalCardBacks = document.querySelectorAll('.card > .back');
const animalFrontsArray = Array.from(animalCardFronts);
const animalBacksArray = Array.from(animalCardBacks);
const listenOptions = document.querySelectorAll('.audio');
const animalInfoSelector = document.querySelectorAll('.back p')
const animalInfoArray = Array.from(animalInfoSelector);
const readOption = document.querySelectorAll('.about');
const backToPics = document.querySelectorAll('.back-arrows');
const continentButtons = document.querySelectorAll('.continent-button');
const voiceSelect = document.getElementById('voice-select');


////creates the speech object instance
const message = new SpeechSynthesisUtterance();



//object that controls css
const cssChanges = {

chooseGuide: window.setTimeout(() => {
    const choose = document.querySelector('#choose-guide-message');
    choose.style.opacity = 1;
}, 2000),

showWrapperWidth: window.setTimeout(() => {
   let continentWrappers = document.querySelectorAll('.continent-wrapper');
    continentWrappers.forEach(wrapper => {
        wrapper.style.width = "250px";
    })
},5000),

showWrapperHeight: window.setTimeout(() => {
    let continentWrappers = document.querySelectorAll('.continent-wrapper')
    continentWrappers.forEach(wrapper => {
        wrapper.style.height = "250px"
    })
},7000),

eraseWrapperBorders: window.setTimeout(() => {
    let continentWrappers = document.querySelectorAll('.continent-wrapper');
    continentWrappers.forEach(wrapper => {
        wrapper.style.borderStyle= "none";
    })
},7000),

showButtonsAndFooter: window.setTimeout(() => {
    let footer = document.querySelector('#footer-container');
    footer.style.opacity = 1;
    let continentButtons = document.querySelectorAll('.continent-button');
    continentButtons.forEach(button => {
        button.style.opacity = 1;
    })
},9000),

flipToTextContent: readOption.forEach((read, index) => {
    read.addEventListener('click', () => {
        animalFrontsArray[index].style.transform = "perspective(600px) rotateY(-180deg)";
        animalBacksArray[index].style.transform = "perspective(600px) rotateY(0deg)"
    })
}),

flipToAnimalPic: backToPics.forEach((arrow, index) => {
    arrow.addEventListener('click', () => {
        animalFrontsArray[index].style.transform = "perspective(600px) rotateY(0deg)"
        animalBacksArray[index].style.transform = "perspective(600px) rotateY(180deg)";
    })
}),

};

//function controls which part of the page is displayed

function showAndHidePages(buttonIndex){
    const continentContainers = document.querySelectorAll('.continent-container');
    continentContainers.forEach((container, index) => {
        if(index === buttonIndex){
        window.setTimeout(() => {
            container.style.display = 'block';
            homePage.style.display = 'none';
        },1500)}

        else{
            homePage.style.display = 'block';
            container.style.display = 'none';
        }
    })
}


//function gets and sets voice options when called
function getVoices(){
    
    voices = speechSynthesis.getVoices();
    voices.forEach((voice, index) => {
        if(voice.lang != 'en-US'){
        voices.splice(index)
        };

        if(voices.length <= 1){
           let guideOptions =  document.getElementById("guide-container");
           guideOptions.style.display = 'none';
        }

        let name = voice.name;
        let newMaleName;
        let newMaleName2;
        const option = document.createElement('option');
        option.value = `${voice.name}`;
        if(name === 'Google Deutsch'){
        newMaleName = name.replace('Google Deutsch', "David");
        option.textContent = `${newMaleName}`;
        }else if(name === 'Microsoft David Desktop - English (United States)'){
            newMaleName2 = name.replace('Microsoft David Desktop - English (United States)', 'Elliot')
            option.textContent = `${newMaleName2}`
        }else{
            option.textContent = 'Sasha';
        }
        
        voiceSelect.appendChild(option);
})
}
 


//function call to get and set voices
getVoices();

//cancel speech instance
function cancelSpeech(){
    if(speechSynthesis.speaking){
        speechSynthesis.cancel();
    }
}


//function sets a new voice upon user selection. Called in event listener.
function setVoice(e){
    message.voice = voices.find(voice => voice.name === e.target.value)
    let arr = e.target.options;
    let index = e.target.selectedIndex;
    setTextMessage(`Welcome to E-Zoo. My name is ${arr[index].textContent}. Choose a continent below. Whenever you click on an animal's play button, I'll tell you about it. `)
    speakText();
}


//function sets spoken message of continent button click
function setTextMessage(text){
    message.text = text;
}

//function creates random welcome message for each continent click
function randomWelcome(){ 
    const greetings = ['Great! Let\'s check out the animals of', 'Let\'s do it! We\'re heading to', 'Let\'s take a little trip to', 'Fantastic!', 'ok. Let\'s head to', 'Great! Let\'s check out the animals of', 'Sure thing.', 'You got it.'];
 let greeting = greetings[Math.floor(Math.random() * greetings.length)];
 return greeting;
}

//function speaks message when called
function speakText(){
    speechSynthesis.speak(message);
}

//method repopulates voices upon change
speechSynthesis.addEventListener('voiceschanged', getVoices)


//calls set and speak functions for continent buttons and images
continentButtons.forEach((button, buttonIndex) => {
    let text = button.textContent;
    button.addEventListener('click', () => {
        setTextMessage(`${randomWelcome()} ${text}`);
        speakText();
        showAndHidePages(buttonIndex);
        
    })
    
})

//sets the animal facts to speak upon clicking the listen option
listenOptions.forEach((option, index) => {
    option.addEventListener('click', () => {
        if(speechSynthesis.speaking){
            speechSynthesis.cancel();
        }
        setTextMessage(`${animalInfoArray[index].innerHTML}`);
        speakText();

    })
})



//method sets listener which, upon a new voice selection, calls setVoice funtion which sets the chosen voice
voiceSelect.addEventListener('change', setVoice)


//function takes back to homepage from continent pages
backToHomepage.forEach((button) =>{
    button.addEventListener('click', () => {
        showAndHidePages();
        cancelSpeech();
        
    })
})

//function takes user to contact page
contactPageButton.addEventListener('click', () => {
    
    const homePageContainer = document.querySelector('#homepage-container');
    contactContainer.style.display = 'block'
    homePageContainer.style.display = 'none';
})

//function takes user home from contact page
contactHomeButton.addEventListener('click', () => {
    contactContainer.style.display = 'none';
    homePage.style.display = 'block';
})

//function validates and submits contact form

sendButton.addEventListener('click', (e) => {
   const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const comments = document.getElementById("comments").value;
    if(firstName === '' || comments === ''){
        alert('At a minimum, please fill out the first name and comment portion. Your email will not be bothered should you choose to provide it.')
    }
    
})
