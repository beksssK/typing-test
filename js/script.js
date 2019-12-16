document.addEventListener('DOMContentLoaded', () => {

    const writer = document.getElementById('writer');
    const text = document.getElementById('text');
    const result = document.getElementById('result');

    const tempText = 'Behind sooner dining so window excuse he summer. Breakfast met certainty and fulfilled propriety led.';
    text.innerText = tempText;

    const wordsArray = tempText.split(' ');
});