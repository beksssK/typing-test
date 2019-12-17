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
    const lettersArray = tempText.split('');
    let words = [];
    for(let i = 0; i < lettersArray.length; i++){
        words.push(`<span id=${i}>${lettersArray[i]}</span>`);
    }
    text.innerHTML = words.join('');

    writer.oninput = event => {
        if(writer.value.length <= lettersArray.length){
            if(writer.value){
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
                    let wrongId;
                    for(let j = 0; j < typed.length; j++){
                        let ifCorrect = typed[j].classList.value.indexOf('correct');
                        if(ifCorrect >= 0){
                            correct = typed[j];
                        }
                        let ifWrong = typed[j].classList.value.indexOf('wrong');
                        if(ifWrong >= 0){
                            wrongId = typed[j];
                        }
                    }
                    console.log(typed);
                    if(correct){
                        console.log(correct.id);
                    }
                    if(wrongId){
                        console.log(wrongId.id);
                    }
                    if(correct && wrongId){
                        wrongId.classList.remove('wrong');
                    } else {
                        correct.classList.remove('correct');
                    }
                }
            }
        }
    };
});