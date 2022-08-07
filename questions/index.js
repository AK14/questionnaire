const questionAddForm = document.querySelector("#newQuestion form");
const addItem = document.getElementById('buttonAdd');
const answersBlock = document.getElementById('answers');
let answerCounter = 2;

class QuestionList {
    constructor() {
        this.questionMass = [];
    }
    static validate(data) {
        if (data.from && data.text && data.review >= 1 && data.review <= 5) {
            return true;
        }
        return false;
    }

    addToList(data) {
        this.questionMass.push(data);
    }
}

// функция создания эл-та input
function answerItem(){
    answerCounter++;
    let item = document.createElement('input');
    item.type = 'text';
    item.name = 'answer-'+answerCounter;
    item.className = 'form-control mb-1';
    item.placeholder = 'Add answer '+answerCounter;
    return item;
}

const NewQuestionList = new QuestionList();


// обработчик удаления вопроса
$('.btn-outline-danger').on('click', function (e){
    e.preventDefault();
    let id = e.target.dataset.question;
    $.ajax({
        method:'DELETE',
        url:'/question/'+id,
        success: function(response){
           location.reload()
        },error: function(err){
            console.log(err);
        }
    })
})

// обработчик добвления нового вопроса
addItem.addEventListener('click', function (e){
    e.preventDefault();
    let i = answerItem();
    answersBlock.appendChild(i);
})

questionAddForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataEntries = formData.entries();
    const data = Object.fromEntries(formDataEntries);

    /* Ответы собираем в массив */
    let arAnswers = [];
    for (let [key, value] of formData) {
        if(key.includes('answer')){
            arAnswers.push(value)
        }
    }

    $.ajax({
        method:'POST',
        url:'/question/create/',
        data:{
            title:data.question,
            quest:data.quest,
            answers:arAnswers.join(',')
        },
        success: function(response){
            location.href = '/quests/'+data.quest;
        },error: function(err){
            console.log(err);
        }
    })
});