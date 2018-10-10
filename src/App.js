import React, { Component } from 'react';
import './App.css';
import styled from "styled-components";
import createHistory from 'history/createBrowserHistory'
import {Router,Switch,Route,Redirect } from 'react-router-dom'
import Transitions from './transitions'
import StartPage from './components/StartPage';
import ScoreboardPage from './components/ScoreboardPage';
import GameRoomPage from './components/GameRoomPage';
import QuestionPage from './components/QuestionPage';

const history = createHistory()

class App extends Component{
  constructor(){
    super();
    this.state={
      playerName:'',
      gameroomId:'',
      playerScore:0,
    }
  }


  postPlayerScoreinDB=()=>{
    var request = require("request");

    var options = { method: 'POST',
      url: 'http://10.180.186.111:8080/api/player/updatescore',
      headers: 
       { 'Content-Type': 'application/json' },
      body: { uniqueKey:this.state.gameroomId, 
              Name: this.state.playerName, 
              score:this.state.playerScore
            },
      json: true };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
    });
  }

  resetPlayerScore=()=>{
    this.setState({
      playerScore:0,
    })
  }

  updatePlayerScore=(playerScore,timeRemaining)=>{
    this.setState({
     playerScore: playerScore + 10 * timeRemaining,   
   })
  }
  
  setPlayerNameAndGameroom=(playerName,gameroomId)=>{
    this.setState({
      playerName:playerName,
      gameroomId:gameroomId,
    })
  }

  render(){
    return( 
    <Router history={history}>
      <Route render = {({location})=>(
        <Perspective style={styles.fill}>
          <Transitions pageKey={location.key}{...location.state}>
            <Switch location={location}>
                <Route exact path="/components/StartPage" render={(props)=><StartPage {...props} 
                   gameroomId = {this.state.gameroomId} 
                   setPlayerNameAndGameroom = {this.setPlayerNameAndGameroom} />}/>
                <Route path="/components/ScoreboardPage" render={(props)=><ScoreboardPage {...props} 
                   playerName ={this.state.playerName}
                   gameroomId = {this.state.gameroomId} 
                   resetPlayerScore={this.resetPlayerScore}
                   playerScore = {this.state.playerScore}/>} />
                <Route path="/components/GameRoomPage" render={(props)=><GameRoomPage {...props}/>} />
                <Route path="/components/QuestionPage" render={(props)=><QuestionPage {...props}  
                   gameroomId = {this.state.gameroomId} 
                   playerScore = {this.state.playerScore} 
                   postPlayerScoreinDB={this.postPlayerScoreinDB}
                   updatePlayerScore = {this.updatePlayerScore}/>} />
                <Redirect from='/' to='/components/StartPage' />
            </Switch>
          </Transitions>
        </Perspective>
      )}
      />
  </Router>
  )
  }
}



const Perspective = styled.div`
perspective:1200px;
margin: auto;
height:100vh;
width:100vw;
`
const styles ={};
styles.fill={
    position:'absolute',
    left:0,
    right:0,
    top:0,
    bottom:0
}

export default App;