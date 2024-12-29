import { Quize } from "./quiz.module.js";
import{Questions} from "./questions.module.js";
let startQuiz=document.getElementById('startQuiz');
let category=document.getElementById('categoryMenu');
let difficulty=document.getElementById('difficultyOptions');
let questionsNumber=document.getElementById('questionsNumber');
const quizForm = document.getElementById("quizForm");

export let allQuestions;
export let quize;

startQuiz.addEventListener('click', async ()=>{
quize=new Quize(category.value,difficulty.value,questionsNumber.value);
allQuestions= await quize.getQuestions(); 
let myQuestion=new Questions(0);
quizForm.classList.replace('d-flex','d-none');
myQuestion.displayQuestion();


})
