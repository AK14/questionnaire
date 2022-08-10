let test = {
    title: 'простенький опросник',
    description: 'вопросы по тематике автомобилей, марки и тд',
    questions:
        [{
            title: 'Когда была основана компания BMW',
            answers: {
                answ1: '1900',
                answ2: '1920',
                anssw3: '1950',
                anssw4: '1950'
            }
        },
            {
                title: 'Куда лучше уехать релокейт',
                answers: {
                    answ1: 'Словакая',
                    answ2: 'Болгария',
                    anssw3: 'Чехия'
                }
            },
            {
                title: 'Здесь мог быть вопрос',
                answers: {
                    answ1: '1ый ответ',
                    answ2: '2ой ответ',
                    anssw3: '3ий ответ'
                }
            },
            {
                title: 'sadasdsadasd',
                answers: {
                    answ1: '1ый ответ',
                    answ2: '2ой ответ',
                    anssw3: '3ий ответ'
                }
            },
        ]

}

class QuestionList {
    constructor(blockOfQuestions) {
        this.blockOfQuestions = blockOfQuestions;
        this.iter = 0;
        this.userScore = 0;
        this.render()
    }

    getElement(selector) {
        const element = document.querySelector(selector)
        return element
    }
    render() {
        const listAnswer = Object.values(this.blockOfQuestions.questions[this.iter].answers);
        const listAnswerMix = listAnswer.sort((a, b) => 0.5 - Math.random());
        const yourScore = `<p> Your score: ${this.userScore} / ${this.blockOfQuestions.questions.length} </p>`
        const HTML = ` <p class="lead"> ${this.blockOfQuestions.questions[this.iter].title} </p> 
        ${listAnswerMix.map((e) =>
            `<div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" value="${e}">
             ${e} </div>`).join('')}`;
        document.getElementById("questions").innerHTML = `<form> ${HTML}  ${yourScore} </form></div>    <button id='Submit'>Submit</button>`
        this.submit = document.getElementById('Submit')
        this.submit.addEventListener('click', (event) => {
            this.ifAnswerTrue();
        })
    }
    renderScore() {
        const yourScore = `<p> Congrutulations! Your score: ${this.userScore} / ${this.blockOfQuestions.questions.length} </p>`
        document.getElementById("questions").innerHTML = `<form> ${yourScore} </form></div>`
    }
    goNext() {
        if (this.iter < this.blockOfQuestions.questions.length - 1) {
            this.iter = this.iter + 1;
            this.render();
        } else {
            this.renderScore()
        }
    }
    ifAnswerTrue() {
        const userAnswer = document.querySelector('input[name="flexRadioDefault"]:checked').value;
        if (userAnswer == this.blockOfQuestions.questions[this.iter].answers.answ1) {
            this.userScore = this.userScore + 1;
            alert('правильный ответ')
            this.goNext();
        } else {
            alert('ответ не правильный')
            this.goNext();
        }
    }
}
const example2 = new QuestionList(test);
