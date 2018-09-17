import React, { Component } from 'react';
import{slide,scale} from'./../transitions'

class ScoreboardPage extends Component{
    constructor() {
        super();
        this.state = {
            playerNamesAndScore: []
        }
    }

    getPlayerNameAndScore = () => {
        var request = require("request");

        var options = { method: 'GET',
        url: 'https://localhost:44343/api/game/4/players/score', 
      
        json: true  };

        request(options, function (error, response, body) {
        if (error) {
            alert('Refresh')
        }  else{
            this.setState({
                playerNamesAndScore:[].concat(body)
            })
        } 
        console.log(body);
        }.bind(this))

    }
    
    componentWillMount(){
        this.getPlayerNameAndScore();
    }

    populatePlayerNameAndScoreList = () =>{
        const playersSortedByPoints = this.state.playerNamesAndScore.sort(this.compare);
        return playersSortedByPoints.map((player)=>{
            return(<div id="playerNameAndScoreDiv">
                   <div id="playerNameDiv">
                   <ul ><li>{player.name}</li></ul>
                   </div>
                   <div id="playerScoreDiv">
                   <ul ><li>{player.score}</li></ul>
                   </div>
                   </div>
                 )
            }
        ) 
    }
    
    compare = (a, b) => {
        if (a.score < b.score)
            return 1;
        if (a.score > b.score)
            return -1;
        return 0;
    }

     onClickStatisticsHandler = () => {
        const playersSortedByPoints = this.state.playerNamesAndScore.sort(this.compare);
        const highestScorePlayer = playersSortedByPoints[0];
        const highestScorePlayerName = highestScorePlayer.name +" - "+ highestScorePlayer.score;
        alert(highestScorePlayerName);    
     }

     onClickExitHandler = () => {
        alert("ExitHandler");   
     }

     onClickRestartHandler = ()=>{
         var playerNameReady = this.state.playerNamesAndScore[0].name;
         var gameRoomCode = "74512";
        
         alert('The game will restart with the following name ' + playerNameReady + ' in gameroom #' + gameRoomCode + '.');
     }
 


    render(){
        return(
            <div>
                <h1>Woobaluba-dub-dub</h1>
                <br></br>
               
               
               <h2>Final Score</h2>
                 
                    {this.populatePlayerNameAndScoreList()}
               
                
                <br></br>           
                <br></br>    
                <button onClick={this.onClickStatisticsHandler}>Statistics</button>
                <br></br><br></br> 
                <button onClick={this.onClickRestartHandler}>Restart</button>
                <br></br><br></br> 
                <button onClick={()=> this.props.history.push({pathname:"/components/StartPage",state:scale})}>Exit</button>
                <br></br><br></br>
                <button onClick={()=> this.props.history.push({pathname:"/components/GameRoomPage",state:scale})}>GameRoom</button>
                <br></br><br></br>
                <button onClick={()=> this.props.history.push({pathname:"/components/QuestionPage",state:scale})}>Questions</button>
                <br></br>
            </div>
        );
    }

}

export default ScoreboardPage;