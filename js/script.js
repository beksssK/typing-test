document.addEventListener('DOMContentLoaded', () => {

    const writer = document.getElementById('writer');
    const text = document.getElementById('text');
    const secondsE = document.getElementById('seconds');
    const minutesE = document.getElementById('minutes');
    const reset = document.getElementById('reset');
    const result = document.getElementById('result');

    // timer
    let minutes = 0;
    let seconds = 0;
    let allSec = 0;

    const toString = number => {
        let string = String(number);
        while(string.length < 2){
            string = '0' + string;
        }
        return string;
    };

    let timerFlag = false;
    let timer = function(){
        timerFlag = true;
        let interval = setInterval(function(){
            allSec++;
            if (seconds < 59){
                seconds++;
                secondsE.innerText = toString(seconds);
            } else{
                seconds = 0;
                secondsE.innerText = toString(seconds);
                minutes++;
                minutesE.innerText = toString(minutes);
            }
            if(!inputTimer){
                clearInterval(interval);
            }
            reset.addEventListener('click', () => {
                clearInterval(interval);
                allSec = 0;
                writer.value = '';
                minutes = 0;
                minutesE.innerText = toString(minutes);
                seconds = 0;
                secondsE.innerText = toString(seconds);
            });
        }, 1000)
    };
    // text
    const paragraph = 'And I am not frightened of dying, any time will do, I don\'t mind. Why should I be frightened of dying? There\'s no reason for it, you\'ve gotta go sometime';
    const lettersArray = paragraph.split('');
    let words = [];
    for(let i = 0; i < lettersArray.length; i++){
        words.push(`<span id=${i}>${lettersArray[i]}</span>`);
    }
    text.innerHTML = words.join('');

    // input
    const addClass = (elementId, firstClass, secondClass) =>{
        document.getElementById(elementId).classList.add(firstClass, secondClass);
    };
    let inputTimer = false;
    writer.oninput = event => {
        if(inputTimer && !timerFlag){
            timer();
        }
        if(writer.value.length <= lettersArray.length){
            inputTimer = true;
            if(event.inputType === 'insertText'){
                for(let i = 0; i < writer.value.length; i++){
                    if(event.data === lettersArray[i]){
                        if(i > 0){
                            let previous = document.getElementById(`${i - 1}`).className;
                            if(previous !== 'wrong typed' && previous !== 'typed wrong'){
                                addClass(`${i}`,'correct', 'typed');
                            } else {
                                addClass(`${i}`, 'wrong', 'typed');
                            }
                        } else{
                            addClass(`${i}`, 'correct', 'typed');
                        }
                    } else {
                        let flag = document.getElementById(`${i}`).className;
                        if(flag !== 'correct typed' && flag !== 'typed correct'){
                            addClass(`${i}`, 'wrong', 'typed');
                        }
                    }
                }
            } else if(event.inputType === 'deleteContentBackward'){
                let typed = document.getElementsByClassName('typed');
                let correct;
                let wrong;
                for(let j = 0; j < typed.length; j++){
                    if(typed[j].classList.value.indexOf('correct') >= 0){
                        correct = typed[j];
                    } else if(typed[j].classList.value.indexOf('wrong') >= 0){
                        wrong = typed[j];

                    }
                }
                if(correct && wrong){
                    wrong.classList.remove('wrong');
                } else if(correct){
                    correct.classList.remove('correct');
                } else if(wrong){
                    wrong.classList.remove('wrong');
                }
            }
        } else{
            inputTimer = false;
            writer.disabled = true;
            let wpm = Math.round(lettersArray.length / 5) / (allSec / 60);
            result.innerText = `Your wpm is: ${wpm}`;
        }

    };
});