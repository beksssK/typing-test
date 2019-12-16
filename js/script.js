document.addEventListener('DOMContentLoaded', () => {

    const writer = document.getElementById('writer');
    const text = document.getElementById('text');
    const result = document.getElementById('result');

    const showRight = () => {
        result.style.backgroundImage = "url('images/correct.png')";
    };
    const showWrong = () => {
        result.style.backgroundImage = "url('images/wrong.png')";
    };
    const removeResult = () => {
        result.style.backgroundImage = '';
    };

    const tempText = 'Behind sooner dining so window excuse he summer. Breakfast met certainty and fulfilled propriety led.';
    text.innerText = tempText;

    const wordsArray = tempText.split(' ');

    let wordCounter = 0;

    writer.oninput = event => {
        console.log(wordsArray.length);
        if(wordCounter !== wordsArray.length){
            if(writer.value){
                for(let i = 0; i < writer.value.length; i++){
                    if(wordsArray[wordCounter].substring(0, i + 1) === writer.value){
                        showRight();
                    } else{
                        showWrong();
                    }
                }
            }
            if(event.data === ' ' && wordsArray[wordCounter] === writer.value.substring(0, writer.value.length -1)){
                console.log('Wow');
                writer.value = '';
                wordCounter++;
                console.log(wordCounter);
            }
            if(!writer.value){
                removeResult();
            }
        }
    };
});