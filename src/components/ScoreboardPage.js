import React, { Component } from 'react';
import{scale} from'./../transitions'
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
const buttonStyle = {
   minWidth:'160px'
  };

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
            return (<TableBody>
                <TableRow>
                    <TableCell component="th" scope="row">
                    {player.name}
                    </TableCell>
                    <TableCell numeric>
                    {player.score}
                    </TableCell>
                </TableRow>
            </TableBody>)
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

     

     onClickRestartHandler = ()=>{
         var playerNameReady = this.state.playerNamesAndScore[0].name;
         var gameRoomCode = "74512";
        
         alert('The game will restart with the following name ' + playerNameReady + ' in gameroom #' + gameRoomCode + '.');
     }
 
    displayScoreboardArrayCheck=()=>{
        if(this.state.playerNamesAndScore.length===0){
            return( <div><br/><br/>
                <CircularProgress  style={{ color: purple[500] }} thickness={6}  size={60} />
                <p>Loading scoreboard</p><br/><br/>
            </div>)
        }
    }
   


    render(){
        
        return(
            <div>
                <h1>Gameroom #here</h1>
                
                <h2>Final Scoreboard</h2>
                {this.displayScoreboardArrayCheck()}
                <div id="scoreboardPageContent">
                <div id="scoreboardTableContainer">
                <Table className="table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell numeric>Score</TableCell>
                    </TableRow>
                </TableHead>
                  {this.populatePlayerNameAndScoreList()}
                </Table>
                </div>
                <br/>  
                <div id="scoreboardButtonsContainer" >
                   <Button  onClick={this.onClickStatisticsHandler} variant="contained" color="primary" style={buttonStyle}
                   >Statistics
                   </Button>
                   <br/><br/>  
                   <Button onClick={this.onClickRestartHandler} variant="contained" color="primary" style={buttonStyle}
                   >Restart</Button>
                   <br/><br/>  
                   <Button variant="contained" color="primary"  style={buttonStyle}
                   onClick={()=> this.props.history.push({pathname:"/components/StartPage",state:scale})}
                   >Exit
                   </Button>
                </div>
                </div>
                <br/>
            </div>
        );
    }

}

export default ScoreboardPage;