export class Quize{
    constructor(category,difficulty,questionsNumber){
        this.category=category;
        this.difficulty=difficulty;
        this.questionsNumber=questionsNumber;
        this.score=0;
    }
    async getQuestions(){
        let url=await fetch(`https://opentdb.com/api.php?amount=${this.questionsNumber}&category=${this.category}&difficulty=${this.difficulty}&type=multiple`);
        let data= await url.json();
        return data.results;

        
    }

}