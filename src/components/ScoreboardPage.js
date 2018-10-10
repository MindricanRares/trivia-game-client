import React, { Component } from 'react';
import{scale} from'./../transitions'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}
const buttonStyle = {
   minWidth:'160px'
  };

class ScoreboardPage extends Component{
    constructor() {
        super();
        this.state = {
            playerNamesAndScore: [],
            isRestartDialogOpen:false,
        }
    }

    getPlayerNameAndScore = () => {
        var request = require("request");
      
        var options = { method: 'GET',
        url: `http://10.180.186.111:8080/api/game/${this.props.gameroomId}/players/score`, 
        json: true  };
        request(options, function (error, response, body) {
        if (error) {
            alert('Please go back to the start page.')
            this.props.history.push({ pathname: "/components/StartPage", state: scale });
        }  else{
            this.setState({
                playerNamesAndScore:[].concat(body)
            })
        } 
        console.log(body);
        }.bind(this))

    }
    
    componentWillUpdate(){
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
        alert(this.props.playerName);    
     }

     handleClose = () => {
        this.setState({ isRestartDialogOpen: false });
     };

    

     restartHandler=()=>{
        this.props.resetPlayerScore();
        this.props.history.push({ pathname: "/components/QuestionPage", state: scale });
     }
     onClickRestartHandler = ()=>{
        this.setState({
            isRestartDialogOpen:true,
        })
   
     }
 
    displayScoreboardArrayCheck=()=>{
        if(this.state.playerNamesAndScore.length===0){
            return( <div><br/><br/>
                <CircularProgress  style={{ color: purple[500] }} thickness={6}  size={60} />
                <p>Loading scoreboard</p><br/><br/>
            </div>)
        }
    }

    deleteGameroomPost=()=>{
        var request = require("request");

        var options = { method: 'DELETE',
        url: `http://10.180.186.111:8080/api/game/${this.props.gameroomId}`,
        headers: 
        { 'Cache-Control': 'no-cache' } };

        request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        },this.props.history.push({pathname:"/components/StartPage",state:scale}),this.props.resetPlayerScore());
           
    }
   


    render(){
        
        return(
            <div>
                <h1>Gameroom {this.props.gameroomId}</h1>
                <h2>Final Scoreboard</h2>
                
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
                </div>{this.displayScoreboardArrayCheck()}
                <br/> <br/>

                <Dialog
                   open={this.state.isRestartDialogOpen}
                   onClose={this.handleClose}
                   TransitionComponent={Transition}
                   aria-labelledby="alert-dialog-title"
                   aria-describedby="alert-dialog-description1"
                   maxWidth='md'
                   keepMounted
                    >
                   <DialogTitle id="alert-dialog-title"  > Restart game? </DialogTitle>
                   <DialogContent>
                     <DialogContentText id="alert-dialog-description"
                      ref={(dialogcontexttext) => this.DialogContentText = dialogcontexttext} value="">
                       The game will restart with the name {this.props.playerName} in gameroom #{this.props.gameroomId}
                     </DialogContentText>
                   </DialogContent>
                   <DialogActions>
                   <Button onClick={this.handleClose} autoFocus variant="contained" color="secondary">
                       Close
                     </Button>

                     <Button onClick={this.restartHandler} autoFocus variant="contained" color="primary">
                       Restart
                     </Button>
                   </DialogActions>
                </Dialog>
                <div id="scoreboardButtonsContainer" >
                   <Button  onClick={this.onClickStatisticsHandler} variant="contained" color="primary" style={buttonStyle}
                   >Statistics
                   </Button>
                   <br/><br/>  
                   <Button onClick={this.onClickRestartHandler} variant="contained" color="primary" style={buttonStyle}
                   >Restart</Button>
                   <br/><br/>  
                   <Button variant="contained" color="primary"  style={buttonStyle}
                   onClick={this.deleteGameroomPost}
                   >Exit
                   </Button>
                </div>
                </div>
                <br/>
            </div>
        );
    }
//()=> this.props.history.push({pathname:"/components/StartPage",state:scale})
}

export default ScoreboardPage;