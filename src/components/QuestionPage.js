import React, { Component } from 'react';
import { scale } from './../transitions'
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';

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
            redirectToScoreboard:false,
            correctButtonColor:"primary",
            wrongButtonColor:"primary",
            playerScore:0,
            timerInfoText:"Time remaining to answer",
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
                <Button variant="contained" color={this.state.correctButtonColor} size="large"
                 value="" className={this.state.correctButtonStyle} id="answersButtons" 
                 onClick= {this.onClickCorrectAnswerBtnHandler}>{question.answer}
                </Button></li>
            }
            return <li id="answersButtonList">
                <Button variant="contained" id="answersButtons" color={this.state.wrongButtonColor}
                  className={this.state.wrongButtonStyle} size="large"
                  onClick={this.onClickWrongAnswerBtnHandler}>{question.answer}
                </Button>
            </li>
        })
    }

    onClickCorrectAnswerBtnHandler =()=>{ 
        this.setState((prevState)=>({
            correctButtonStyle:"disableAnswer",
            correctButtonColor:"primary",
            wrongButtonColor:"secondary",
            wrongButtonStyle:"disableAnswer",
            playerScore: prevState.playerScore + 10 * prevState.timeRemaining,
        }))
        
    }

    onClickWrongAnswerBtnHandler =()=>{
      this.setState({
          wrongButtonStyle:"disableAnswer",
          correctButtonStyle:"disableAnswer",
          correctButtonColor:"primary",
          wrongButtonColor:"secondary",
      })
    }

    revealAnswersHandler = () =>{
        this.setState({
            wrongButtonStyle:"disableAnswer",
            correctButtonStyle:"disableAnswer",
            correctButtonColor:"primary",
            wrongButtonColor:"secondary",
            timerInfoText:"Next question in "

        })
    }

    hideAnswersHandler = () =>{
        this.setState({
            wrongButtonStyle:"",
            correctButtonStyle:"",
            correctButtonColor:"primary",
            wrongButtonColor:"primary"
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
                    timerInfoText:"Time remaining to answer",
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
                <div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <CircularProgress  style={{ color: purple[500] }} thickness={6}  size={60} /><br/>
                    <p>Loading questions from server</p>
                </div>
            )
        }
        return(
            <div>
                <h1>Trivia Game</h1>
                <br/>
                <p>Your score: {this.state.playerScore}</p>
                <p id="questionTextParagraph">{this.state.questions[this.state.currentQuestionNr].questionText}</p>
                
                  <ul>
                    {this.populateQuestions()}
                  </ul>
                <br/><br/>
              <p>{this.state.timerInfoText} : {this.state.timeRemaining}</p>
            </div>
        );
    }
}
export default QuestionPage;