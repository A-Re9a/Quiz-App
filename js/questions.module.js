import {allQuestions} from "./index.js";
import { quize } from "./index.js";
export class Questions{
    constructor(index){
        this.index=index;
        this.questionsLength=allQuestions.length;
        this.question=allQuestions[index].question;
        this.category=allQuestions[index].category;
        this.correct_answer=allQuestions[index].correct_answer;
        this.incorrect_answers=allQuestions[index].incorrect_answers;
        this.answer=[this.correct_answer,...this.incorrect_answers].sort();
        this.answered=false
        
    }
    displayQuestion(){
        let cartona=`<div
    class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn"
    >
    <div class="w-100 d-flex justify-content-between">
        <span class="btn btn-category"> ${this.category} </span>
        <span class="fs-6 btn btn-questions"> ${this.index+1} of ${this.questionsLength} Questions</span>
    </div>
    <h2 class="text-capitalize h4 text-center"> ${this.question} </h2>  
    <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
    ${
        this.answer.map((choice)=>`<li>${choice}</li>`).join("")
    };
    </ul>
    <h2 class="text-capitalize text-center score-color h3 fw-bold"><i class="bi bi-emoji-laughing"></i> Score: ${quize.score} </h2>        
    </div>`
        document.getElementById('questionsContainer').innerHTML=cartona;
        let allAnswers=document.querySelectorAll('.choices li');
        allAnswers.forEach((theAnswers)=>{
            theAnswers.addEventListener('click',(e)=>{
                this.checkAnswer(e.target);
                
            })
        })
    }
    checkAnswer(userAnswer){
        if(this.answered){
            return;
        }
        if(userAnswer.innerText===this.correct_answer){
            userAnswer.classList.add('correct');
            quize.score++;
    }else{
        userAnswer.classList.add('wrong');
    }
    this.index++;
    this.answered=true;
    this.animationQuestion(userAnswer);
    setTimeout(() => {
        this.nextQuestion();
    },500);

}
animationQuestion(animation){
    animation.closest('.question').classList.replace('animate__bounceIn','animate__backOutLeft');
}
nextQuestion(){
    if(this.index<this.questionsLength){
        let newQuestion=new Questions(this.index);
        newQuestion.displayQuestion();
    }else{
        document.getElementById('questionsContainer').innerHTML=`
        <div id="tryAgainContainer" class="text-center text-white animate__animated animate__bounceIn">
            <h1>Your Score is <span>${quize.score}</span></h1>
            <button id="tryAgainBtn" class="btn btn-danger">Try Again</button>
        </div>
        `
        document.getElementById('tryAgainBtn').addEventListener('click',()=>{
            window.location.reload();
        }
        )
    }
}
}