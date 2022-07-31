const insQuestion = document.getElementById("question");
const insAnswer1 = document.getElementById("answer1");
const insAnswer2 = document.getElementById("answer2");
const insAnswer3 = document.getElementById("answer3");
const insAnswer4 = document.getElementById("answer4");
const button_add = document.getElementById("button");

class QuestionList {
    constructor() {
      this.questionMass = [];
    }

    addToList(questionText, answer1Text, answer2Text, answer3Text, answer4Text ) {
        const obj = { questionText: questionText, answer1Text: answer1Text, answer2Text: answer2Text, answer3Text: answer3Text,  answer4Text: answer4Text};
        console.log(obj)
        this.questionMass.push(obj);
       
      }
}

let NewQuestionList = new QuestionList();

button_add.addEventListener("click", function (event) {
  const questionText = insQuestion.innerText;
  const answer1Text = insAnswer1.innerText;
  const answer2Text = insAnswer2.innerText;
  const answer3Text = insAnswer3.innerText;
  const answer4Text = insAnswer4.innerText;
  NewQuestionList.addToList(questionText, answer1Text, answer2Text, answer3Text, answer4Text);

});

