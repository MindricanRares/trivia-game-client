import React, { Component } from 'react';
import { slide, scale } from './../transitions'


class QuestionPage extends Component{
    constructor() {
        super();
        this.state = {
            questions:[],
            currentQuestionNr: 0,
            wrongButtonStyle:"",
            correctButtonStyle:"",
            timeRemaining: 5,
            questionAnswers:[],
            redirectToScoreboard:false
        }
    }

    getQuestionsFromDB = () => {
        var request = require("request");

        var options = { method: 'GET',
        url: 'https://localhost:44343/api/game/4/questions', 
      
        json: true  };

        request(options, function (error, response, body) {
        if (error) {
            alert('Refresh')
        }  else{
            this.setState({
                questions:[].concat(body)
            },()=>{
                console.log(this.state.questions);
                this.timerFunctionForAnswers();
            });
              
        } 
        console.log(body);
        }.bind(this))

    }

    componentWillMount(){
        this.getQuestionsFromDB();
    }

   shuffleArray = (array) => {
       for (let i = array.length - 1; i > 0; i--) {
           let j = Math.floor(Math.random() * (i + 1));
           let temp = array[i];
           array[i] = array[j];
           array[j] = temp;
       }
       return array;
   }
         
        

    createAnswersArray = () => {
        let answersArray = [];
        
        answersArray.push({isCorrectAnswer:true,answer:this.state.questions[this.state.currentQuestionNr].correctAnswer});
        answersArray.push({isCorrectAnswer:false,answer:this.state.questions[this.state.currentQuestionNr].wrongAnswer1});
        answersArray.push({isCorrectAnswer:false,answer:this.state.questions[this.state.currentQuestionNr].wrongAnswer2});
        answersArray.push({isCorrectAnswer:false,answer:this.state.questions[this.state.currentQuestionNr].wrongAnswer3});
        var shuffledAnswers = this.shuffleArray(answersArray);
        return shuffledAnswers;
    }

  
    populateQuestions = () => {
        return this.state.questionAnswers.map((question)=>{
            if(question.isCorrectAnswer===true){
                return <li id="answersButtonList">
                <button value="" className={this.state.correctButtonStyle} id="answersButtons" onClick= {this.onClickCorrectAnswerBtnHandler}>{question.answer}
                </button></li>
            }
            return <li id="answersButtonList"><button id="answersButtons" className={this.state.wrongButtonStyle} onClick={this.onClickWrongAnswerBtnHandler}>{question.answer}</button>
            </li>
        })
    }

    onClickCorrectAnswerBtnHandler =()=>{
        this.setState({
            correctButtonStyle:"correctAnswer"
        })
    }

    onClickWrongAnswerBtnHandler =()=>{
      this.setState({
          wrongButtonStyle:"wrongAnswer",
          correctButtonStyle:"correctAnswer"
      })
    }

    revealAnswersHandler = () =>{
        this.setState({
            wrongButtonStyle:"wrongAnswer",
            correctButtonStyle:"correctAnswer"
        })
    }

    hideAnswersHandler = () =>{
        this.setState({
            wrongButtonStyle:"",
            correctButtonStyle:""
        })
    }
   
    timerFunctionForAnswers = () => {
        this.setState({
            questionAnswers:this.createAnswersArray()
        });
        var timer = setInterval(() => {
            this.setState((prevState) => ({
                timeRemaining: prevState.timeRemaining-1
              }));
            if(this.state.timeRemaining<=2){
                this.revealAnswersHandler();
            }
            if (this.state.timeRemaining <= 0) {
                clearInterval(timer);
                if(this.state.currentQuestionNr >=this.state.questions.length-1){
                    this.setState({
                        redirectToScoreboard:true
                    })
                   this.props.history.push({ pathname: "/components/ScoreboardPage", state: scale });
                }
                else {
                this.hideAnswersHandler();
                this.setState((prevState) => ({
                    currentQuestionNr: prevState.currentQuestionNr+1,
                    timeRemaining : 5  ,
                    questionAnswers:this.createAnswersArray()
                  }),()=>{
                    this.setState({
                        questionAnswers:this.createAnswersArray()
                    })  
                    this.timerFunctionForAnswers()
                });}
            }
        }, 1000);
    }


    render(){
        if(this.state.questions.length===0){
            return(
                <p>Loading</p>
            )
        }
        return(
            <div>
                <h1>Trivia Game</h1>
                <br/>
                <br/>
                <p id="questionTextParagraph">{this.state.questions[this.state.currentQuestionNr].questionText}</p>
                
                  <ul>
                    {this.populateQuestions()}
                  </ul>
                <br/><br/>
               
                <button onClick={this.onClickHandler}>OK</button>
              <p></p>
              <p>Time remaining: {this.state.timeRemaining}</p>
            </div>
        );
    }
}
export default QuestionPage;