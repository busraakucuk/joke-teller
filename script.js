const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Enable Disable Button function
function toggleButton() {
    button.disabled = !button.disabled;
}

// VoiceRSS Speech Function
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'YOUR_API_KEY',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Jokes API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // Assign One or Two Part Joke
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        }else {
            joke = data.joke;
        }
        tellMe(joke);
        toggleButton()
    } catch (error) {
        // Catch Error Here    
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton)