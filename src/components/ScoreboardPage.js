import React, { Component } from 'react';

class ScoreboardPage extends Component{
    constructor() {
        super();
        this.state = {
            playerNamesAndScore: [{
                    name: 'ABC',
                    score: '100'
                },
                {
                    name: 'DEF',
                    score: '250'
                },
                {
                    name: 'GHI',
                    score: '400'
                }
            ]
        }
    }

    populatePlayerNameAndScoreList = () =>{
        return this.state.playerNamesAndScore.map((player)=>{
            return(<li>{player.name}  {player.score}</li>)
        }) 

        // let result = [];
        // for (let i = 0; i < this.state.playerNamesAndScore.length; i++) 
        //     const player = this.state.playerNamesAndScore[i];
        //     result.push(<li>{player.name}</li>)
        // }
        // return result;
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
        alert("Self destroy initiated!");   
     }

     onClickRestartHandler = ()=>{
         var playerNameReady = this.state.playerNamesAndScore[1].name;
         var gameRoomCode = "74512";
        
         alert('The game will restart with the following name ' + playerNameReady + ' in gameroom #' + gameRoomCode + '.');
     }
 


    render(){
        return(
            <div>
                <h1>Scoreboard</h1>
                <br></br>
                <br></br>
               
               <h3>Player List</h3>
                <ul >
                    {this.populatePlayerNameAndScoreList()}
                </ul>
                
                <br></br>           
                <br></br>    
                <button onClick={this.onClickStatisticsHandler}>Statistics</button>
                 <br></br>  <br></br> 
                <button onClick={this.onClickRestartHandler}>Restart</button>
                 <br></br>  <br></br> 
                <button onClick={this.onClickExitHandler}>Exit</button>
            </div>
        );
    }

}

export default ScoreboardPage;