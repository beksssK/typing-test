document.addEventListener('DOMContentLoaded', () => {

    const writer = document.getElementById('writer');
    const text = document.getElementById('text');
    const result = document.getElementById('result');

    const tempText = 'Behind sooner dining so window excuse he summer. Breakfast met certainty and fulfilled propriety led.';
    text.innerText = tempText;

    const wordsArray = tempText.split(' ');

    let wordCounter = 0;

    writer.oninput = event => {
        if(writer.value){
            for(let i = 0; i < writer.value.length; i++){
                if(wordsArray[wordCounter].substring(0, i + 1) === writer.value){
                    console.log('Right');
                } else{
                    console.log('Wrong');
                }
            }
        }
    }
});