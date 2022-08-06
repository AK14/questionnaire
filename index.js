const form = document.getElementById("form");

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

const NewQuestionList = new QuestionList();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formDataEntries = formData.entries();
  const data = Object.fromEntries(formDataEntries);
 /*  const validate = Review.validate(data);
  if (validate) {
    review.addToList(data);
  } else {
    alert("not a value");
  } */
 console.log(data)
});


