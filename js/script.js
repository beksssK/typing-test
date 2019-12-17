document.addEventListener('DOMContentLoaded', () => {

    const writer = document.getElementById('writer');
    const text = document.getElementById('text');
    const secondsE = document.getElementById('seconds');
    const minutesE = document.getElementById('minutes');
    const reset = document.getElementById('reset');

    const tempText = 'And I am not frightened of dying, any time will do, I don\'t mind. Why should I be frightened of dying? There\'s no reason for it, you\'ve gotta go sometime. If you can hear this whispering you are dying. I never said I was frightened of dying.s';
    const lettersArray = tempText.split('');
    let words = [];
    for(let i = 0; i < lettersArray.length; i++){
        words.push(`<span id=${i}>${lettersArray[i]}</span>`);
    }
    text.innerHTML = words.join('');
    let inputTimer = false;
    writer.oninput = event => {
        if(inputTimer){
            if(!timerFlag){
                timer();
            }
        }
        if(writer.value.length <= lettersArray.length){
            inputTimer = true;
            if(event.inputType === 'insertText'){
                for(let i = 0; i < writer.value.length; i++){
                    if(event.data === lettersArray[i]){
                        if(i > 0){
                            let flag = document.getElementById(`${i - 1}`).className;
                            if(flag !== 'wrong typed' && flag !== 'typed wrong'){
                                document.getElementById(`${i}`).classList.add('correct', 'typed');
                            } else {
                                document.getElementById(`${i}`).classList.add('wrong', 'typed');
                            }
                        } else{
                            document.getElementById(`${i}`).classList.add('correct', 'typed');
                        }
                    } else {
                        let flag = document.getElementById(`${i}`).className;
                        if(flag !== 'correct typed' && flag !== 'typed correct'){
                            document.getElementById(`${i}`).classList.add('wrong', 'typed');
                        }
                    }
                }
            } else if(event.inputType === 'deleteContentBackward'){
                let typed = document.getElementsByClassName('typed');
                let correct;
                let wrong;
                for(let j = 0; j < typed.length; j++){
                    let ifCorrect = typed[j].classList.value.indexOf('correct');
                    if(ifCorrect >= 0){
                        correct = typed[j];
                    }
                    let ifWrong = typed[j].classList.value.indexOf('wrong');
                    if(ifWrong >= 0){
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
            let words = lettersArray.length / 5;
            let minutes = allSec / 60;
            let wpm = words/minutes;
            console.log(wpm);
        }

    };

    // timer
    let minutes = 0;
    let seconds = 0;
    let allSec = 0;

    let toString = function(number){
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

});