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
                makeText();
                timerFlag = false;
            });
        }, 1000)
    };
    // text
    const makeText = () => {
        const paragraph = 'And I am not frightened of dying, any time will do, I don\'t mind. Why should I be frightened of dying? There\'s no reason for it, you\'ve gotta go sometime';
        const letters = paragraph.split('');
        const words = [];
        for(let i = 0; i < letters.length; i++){
            words.push(`<span id=${i}>${letters[i]}</span>`);
        }
        text.innerHTML = words.join('');
        return paragraph.split('');
    };
    const lettersArray = makeText();

    // input


    const addClass = (elementId, firstClass, secondClass) =>{ //adds classes to span elements in order to color them
        document.getElementById(elementId).classList.add(firstClass, secondClass);
    };
    const addClassCheck = (event, input, array) => { // logic for checking if we can add certain classes
        for(let i = 0; i < input.value.length; i++){
            if(event.data === array[i]){
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
    };
    const deleteClass = () => { // deletes certain class names
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
    };

    let inputTimer = false;
    writer.oninput = event => {
        if(inputTimer && !timerFlag){
            timer();
        }
        if(writer.value.length <= lettersArray.length){
            inputTimer = true;
            if(event.inputType === 'insertText'){
                addClassCheck(event, writer, lettersArray);
            } else if(event.inputType === 'deleteContentBackward'){
                deleteClass();
            }
        } else{
            inputTimer = false;
            writer.disabled = true;
            let wpm = Math.round(lettersArray.length / 5) / (allSec / 60);
            result.innerText = `Your wpm is: ${wpm}`;
        }

    };
});