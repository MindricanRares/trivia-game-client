import React, { Component } from 'react';
import{scale} from'./../transitions'
import {badWords} from '../utils/profanityFilter';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info'

function Transition(props) {
    return <Slide direction="up" {...props} />;
}
 

class StartPage extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            code: '',
            isReadyDisabled:false,
            isDialogOpen: false,
            playersInGameroom:1,
            openHelp: false,
            scroll: "paper" ,
        }
    }

    handleClickOpenHelp = scroll => () => {
        this.setState({ openHelp: true, scroll });
      };
    
      handleCloseHelp = () => {
        this.setState({ openHelp: false });
      };
    

    handleClickOpenDialog = () => {
        this.setState({ isDialogOpen: true });
    };
    
      handleCloseDialog = () => {
        this.setState({ isDialogOpen: false });
    };
    

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

    checkGameroomIntervalFunction=()=>{
        var playersCheck = setInterval(() => {
            if (this.state.playersInGameroom < 4) {
              this.getNumberOfPlayersInGameroom();
              
            }//add function in the if below to start game at a set number of players.
            else if(this.state.playersInGameroom >= 4){
              clearInterval(playersCheck);
              this.handleCloseDialog();
              this.props.history.push({ pathname: "/components/QuestionPage", state: scale });
            }   
        },2000)
    }

    
    getNumberOfPlayersInGameroom=()=>{
        var request = require("request");

        var options = { method: 'GET',
          url: `http://10.180.186.111:8080/api/game/${this.state.code}/players/number`,
          headers: 
           { 'Content-Type': 'application/json' } 
        };
        
        request(options, function (error, response, body) {
          if (error) {
            alert('Refresh number of players')
          }else{
              this.setState({
                  playersInGameroom:body
              })
            console.log(body);
          }
         
        }.bind(this));
    }

    loadPlayerIntoGameroom=()=>{
        var request = require("request");

        var options = { method: 'POST',
          url: 'http://10.180.186.111:8080/api/player',
          headers: 
           { 'Content-Type': 'application/json' },
          body: {
               playername: this.state.name, 
               UniqueKey: this.state.code, 
               },
          json: true };
        
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
          this.checkGameroomIntervalFunction();
          console.log(body);
        }.bind(this));
        
    }

    onChangeNameHandler = (e) => {
      this.setState({name: e.target.value})
    }

    onChangeCodeHandler = (e) => {
        this.setState({code: e.target.value})
    }


    onClickHandler=()=>{
   
    this.loadPlayerIntoGameroom();
    this.props.setPlayerNameAndGameroom(this.state.name,this.state.code);
    }
    
    onSubmitHandler=()=>{
        this.setState({
            isReadyDisabled:true,
         })
      this.handleClickOpenDialog();
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
                >Join a gameroom
                </Button>
                <br/><h3>OR</h3>
                <Button variant="contained" color="primary" size="large"  
                onClick={()=> this.props.history.push({pathname:"/components/GameRoomPage",state:scale})}
                >Create gameroom
                </Button>

                <Dialog open={this.state.isDialogOpen} onClose={this.handleCloseDialog}
                    TransitionComponent={Transition} aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description" maxWidth='md'keepMounted>
                    <DialogTitle id="alert-dialog-title"  > </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description"
                       ref={(dialogcontexttext) => this.DialogContentText = dialogcontexttext} value="empty" >
                        Players in lobby<br/>
                       <p id="playersInGameroomText">{this.state.playersInGameroom}</p> 
                        
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    
                      <Button onClick={this.handleCloseDialog} autoFocus variant="contained" color="secondary">
                        Close
                      </Button>
                    </DialogActions>
               </Dialog>
               <br/>
               <div className="helpDiv">
               <IconButton aria-label="Info"  color="secondary" id="helpButton" >
                  <InfoIcon fontSize="large" onClick={this.handleClickOpenHelp("paper")} />
                </IconButton>
                <Dialog
                     open={this.state.openHelp}
                     onClose={this.handleCloseHelp}
                     scroll={this.state.scroll}
                     aria-labelledby="scroll-dialog-title"
                >
                <DialogTitle id="scroll-dialog-title">Help</DialogTitle>
                <DialogContent>
                <DialogContentText align="left">
                 1.If you or one of your friends already created a gameroom,simply
                  fill in the required fields and click on "Join gameroom".
                 <br/>
                 <br/>
                 2.If you don't have a gameroom code,click on "Create a
                 gameroom" and create one yourself by selecting the categories you
                  wish.
                 <br/>
                 <br/>
                 3.After you connected to a gameroom,a series of 10 questions
                 will appear succesively, each question has 4 possible answers of
                 which only one is correct.
                 <br/>
                 <br/>
                 4.The faster you answer a question,the more points you get.
                 <br/>
                 <br/>
                 5.If one or more of the players in the same gameroom press Exit at
                  the end of the game,the gameroom will be deleted and a new one has
                   to be created.
               </DialogContentText>
               </DialogContent>
               <DialogActions>
                   <Button onClick={this.handleCloseHelp} color="primary">
                        Close
                   </Button>
                  </DialogActions>
              </Dialog>
               </div>
             </div>
            </ValidatorForm>
        );
    }

}


export default StartPage;