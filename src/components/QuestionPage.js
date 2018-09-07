import React, { Component } from 'react';
import ScoreboardPage from './ScoreboardPage';
//import {BrowserRouter as Redirect,Router, Route} from "react-router-dom";
import { Redirect } from 'react-router'
class QuestionPage extends Component{
    constructor() {
        super();
        this.state = {
            questions: [{
                    questionText: "Sta rares inca putin astazi?",
                    correctAnswer: "Da",
                    wrongAnswer1: "Nu",
                    wrongAnswer2: "Poate ",
                    wrongAnswer3: "Nu are de ales "
                },

                {
                    questionText: "Radu este intr-o pauza continua?",
                    correctAnswer: "DA",
                    wrongAnswer1: "sigur nu",
                    wrongAnswer2: "nu",
                    wrongAnswer3: "nu are de ales"

                }
            ],
            currentQuestionNr: 0,
            wrongButtonStyle:"",
            correctButtonStyle:"",
            timeRemaining: 5,
            questionAnswers:[],
            redirectToScoreboard:false
        }
    }

    componentWillMount(){
        this.timerFunctionForAnswers()
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
                return <li><button value=""className={this.state.correctButtonStyle} onClick= {this.onClickCorrectAnswerBtnHandler}>{question.answer}</button></li>
            }

            return <li><button className={this.state.wrongButtonStyle} onClick={this.onClickWrongAnswerBtnHandler}>{question.answer}</button></li>
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
                    // return (<Redirect push to="/components/ScoreboardPage"/>);
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
        if (this.state.redirectToScoreboard) {
            return <Redirect to="/components/ScoreboardPage" />
          }
        return(
            <div>
                <h1>Trivia Game</h1>
                <br></br>
                <br></br>
                <p>{this.state.questions[this.state.currentQuestionNr].questionText}</p>
                <br></br>
                  <ul>
                    {this.populateQuestions()}
                  </ul>
                
                <br></br>    
                <button onClick={this.onClickHandler}>OK</button>
              <p></p>
              <p>Time remaining: {this.state.timeRemaining}</p>
              {/* <Route path="/components/ScoreboardPage" component={ScoreboardPage} /> */}
            </div>
        );
    }

}

export default QuestionPage;
