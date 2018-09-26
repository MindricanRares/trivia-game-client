import React, { Component } from 'react';
import{scale} from'./../transitions'
import {badWords} from '../utils/profanityFilter';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';

 


class StartPage extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            code: '',
            readyMessage:'',
            isReadyDisabled:false,
           
        }
    }

    componentWillMount(){
        ValidatorForm.addValidationRule('isProfanity',(profaneWord)=>{
            let isProfane = true;
            badWords.map((badWord)=>{
                if(profaneWord.toLowerCase().includes(badWord.toLowerCase())){
                    isProfane= false;     
                }
            }); 
            return isProfane;
        });
    }

    loadPlayerIntoGameroom=()=>{
        var request = require("request");

        var options = { method: 'POST',
          url: 'https://localhost:44343/api/player',
          headers: 
           { 'Content-Type': 'application/json' },
          body: {
               playername: this.state.name, 
               gameroomid: this.state.code, 
               playerscore: 0 },
          json: true };
        
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
        
          console.log(body);
        });

    }

    onChangeNameHandler = (e) => {
      this.setState({
         name: e.target.value
      })
    }

    onChangeCodeHandler = (e) => {
        this.setState({code: e.target.value})
    }


    onClickHandler=()=>{
        this.setState({
            readyMessage:"it worked"
         })
         
    }
    
    onSubmitHandler=()=>{
        this.setState({
            isReadyDisabled:true,
         },()=>{
           // this.loadPlayerIntoGameroom();
            this.props.history.push({pathname:"/components/GameRoomPage",state:scale})
         })
    }

    
    render(){
        return(
        <ValidatorForm onSubmit={this.onSubmitHandler}>
             <h1>Trivia Game</h1>
             <br/><br/>
                <TextValidator label="Name" onChange={this.onChangeNameHandler} name="Name" 
                   validators={['isProfanity','minStringLength:3','maxStringLength:10','required']} 
                   autoComplete="off" autoCorrect="off"
                   value = {this.state.name}
                   errorMessages={['Name is profane.','Input a minimum of 3 characters','Your name is too long.','This field is required.']}>
                </TextValidator>
                <br/><br/>
                <TextValidator label="Code" onChange={this.onChangeCodeHandler} name="Gameroom Code"
                   validators={['isNumber','isPositive','minStringLength:5','maxStringLength:5','required']}
                   autoComplete="off" autoCorrect="off"
                   value={this.state.code}
                   errorMessages={['Use only 0-9 characters.',"You cannot use a negative number.",'Code is too short.','Code is too long.','This field is required']}>
                </TextValidator>
                <br/><br/><br/>   

                <div id="startPageButtonsContainer">
                <Button  type="submit"  disabled={this.state.isReadyDisabled} variant="contained"  
                    color="primary" size="large" onClick={this.onClickHandler}
                >join a gameroom
                </Button>
                <br/><h3>OR</h3>
                <Button variant="contained" color="primary" size="large"  
                onClick={()=> this.props.history.push({pathname:"/components/GameRoomPage",state:scale})}
                >Create gameroom
                </Button>
                <br/><br/>
               
                </div>
            </ValidatorForm>
        );
    }

}


export default StartPage;