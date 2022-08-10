class QuestionList {
    constructor(blockOfQuestions) {
        this.blockOfQuestions = blockOfQuestions;
        this.iter = 0;
        this.userScore = 0;
        this.render()
    }

    getElement(selector) {
        return  document.querySelector(selector)
    }
    async render() {
        const questionsBlock = document.getElementById("questions");

        // получаем список ответов
        const listAnswer = Object.values(this.blockOfQuestions.questions[this.iter].answers);
        // сортируем
        const listAnswerMix = listAnswer.sort((a, b) => 0.5 - Math.random());
        // результат
        const yourScore = `<p class="text-end"> Ваш результат: ${this.userScore} / ${this.blockOfQuestions.questions.length} </p>`
        // title вопроса
        const HTML = ` <p class="lead"> ${this.blockOfQuestions.questions[this.iter].title} </p> 
        ${listAnswerMix.map((e) =>
            `<div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" value="${e}">
                    ${e} </div>`).join('')}`;
        // форма для вопроса
        questionsBlock.innerHTML = `<form> ${HTML}  ${yourScore} </form></div>    <button class="btn btn-primary" id='Submit'>Ответить</button>`

        this.submit = document.getElementById('Submit')

        this.submit.addEventListener('click', (event) => {
            this.ifAnswerTrue();
        })
    }
    renderScore() {
        const yourScore = `<p> Поздравляем с окончанием теста!<br> Ваш результат: ${this.userScore} / ${this.blockOfQuestions.questions.length} </p>`
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
        if (userAnswer == this.blockOfQuestions.questions[this.iter].answers[0]) {
            this.userScore = this.userScore + 1;
            this.showAlert('success','правильный ответ');
            this.goNext();
        } else {
            this.showAlert('danger','ответ не правильный');
            this.goNext();
        }
    }

    showAlert(type, message){
        let element = document.querySelector('.modal-body');
        element.className = 'modal-body alert alert-'+type;
        element.innerHTML = message
        $('#alertModal').modal('toggle');
        setTimeout(()=>{
            $('#alertModal').modal('toggle');
        }, 1000)
    }


}

let data = document.querySelector('.quiz-data').innerHTML;
let obj = JSON.parse(data);

new QuestionList(obj);
