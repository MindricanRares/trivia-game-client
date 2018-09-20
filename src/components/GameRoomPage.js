import React, { Component } from 'react';
import{scale} from'./../transitions'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from '@material-ui/core/Slide';
import IntegrationReactSelect from './SelectComponent';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class GameRoomPage extends Component{
    constructor() {
        super();
        this.state = {
            gameRoomCode: '',
            categoriesToChooseFrom: [], 
            categoriesChosen: [],
            selectedCategory: "math",
            isDialogOpen:false,
            selectedCategories:[],
            isCreateBtnDisabled:true,
        }
    }

    updateToSelectedCategory=(e)=>{
        this.setState({
            selectedCategories:e,
        },this.isCategoriesArrayEmpty);
    }

    getAvailableCategories = () => {
        var request = require("request");
        var options = { method: 'GET',
        url: 'https://localhost:44343/api/category', 
        json: true  };

        request(options, function (error, response, body) {
        if (error) {
            alert('Refresh')
        }  else{
            this.setState({
                categoriesToChooseFrom:[].concat(body).map(category => ({
                    value: category.categoryName,
                    label: category.categoryName,
                  }))
            })
        } 
        console.log(body);
        }.bind(this))
     
    }

    componentWillMount(){
        this.getAvailableCategories();
    }

    handleClickOpen = () => {
        this.setState({ isDialogOpen: true });
        this.generateRandomGameCode();
    };
    
    handleClose = () => {
        this.setState({ isDialogOpen: false });
    };

    copyToClipboard = (e) => {
        this.dialogcontexttext.select();
        document.execCommand('copy');
        e.target.focus();
    };

    generateRandomGameCode=()=>{
        var generatedCode=Math.floor(10000 + Math.random() * 90000);
        this.setState({
            gameRoomCode:generatedCode,
         })
    }
       
    checkRandom=()=>{
      console.log(
        Math.floor(10000 + Math.random() * 90000)
      );
    }

 
    isCategoriesArrayEmpty=()=>{
        if (this.state.selectedCategories.length !== 0){
            this.setState({
                isCreateBtnDisabled:false,
            })
        } else{
            this.setState({
                isCreateBtnDisabled:true,
            })
        } 
    }

    render(){
        return(
            <div>
                <h1>Gameroom #{this.state.gameRoomCode}</h1>
                <br/><br/>
                <h2>Create a gameroom</h2>
                <IntegrationReactSelect categoriesToChooseFrom={this.state.categoriesToChooseFrom} 
                                        updateToSelectedCategory={(e)=>this.updateToSelectedCategory(e)}>
                </IntegrationReactSelect>
                <br/>          
                <br/>  
                
                <Button type="submit" disabled={this.state.isCreateBtnDisabled} variant="contained" color="primary" onClick={this.handleClickOpen}>
                 Create gameroom
                </Button>
                <p>{this.state.isCreateBtnDisabled.toString()}</p>
                <Dialog
                   open={this.state.isDialogOpen}
                   onClose={this.handleClose}
                   TransitionComponent={Transition}
                   aria-labelledby="alert-dialog-title"
                   aria-describedby="alert-dialog-description"
                   maxWidth='md'
                   keepMounted
                    >
                   <DialogTitle id="alert-dialog-title"  > {"Gameroom code"} </DialogTitle>
                   <DialogContent>
                     <DialogContentText id="alert-dialog-description"
                      ref={(dialogcontexttext) => this.DialogContentText = dialogcontexttext} value={this.state.gameRoomCode} >
                       {this.state.gameRoomCode}
                     </DialogContentText>
                   </DialogContent>
                   <DialogActions>
                     <Button onClick={this.copyCodeToClipboard} variant="contained" color="primary">
                       Copy code
                     </Button>
                     <Button onClick={this.handleClose} autoFocus variant="contained" color="secondary">
                       Close
                     </Button>
                   </DialogActions>
                </Dialog>
                 
                <br/><br/>
                <Button variant="contained" color="primary"  onClick={this.checkRandom}>Check log</Button><br/><br/>
                <Button variant="contained" color="primary" 
                 onClick={()=> this.props.history.push({pathname:"/components/QuestionPage",state:scale})}>QuestionPage
                 </Button>
                <br/><br/>
                <Button variant="contained" color="primary" 
                onClick={()=> this.props.history.push({pathname:"/components/ScoreboardPage",state:scale})}>Scoreboard
                </Button>
                <br/><br/>
                <Button variant="contained" color="primary" 
                onClick={()=> this.props.history.push({pathname:"/components/StartPage",state:scale})}>Start
                </Button>
            </div>
        );
    }

}

export default GameRoomPage;