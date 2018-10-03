import React, { Component } from 'react';
import{scale} from'./../transitions'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CopyToClipboard from "react-copy-to-clipboard";
import Slide from '@material-ui/core/Slide';
import IntegrationReactSelect from './SelectComponent';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const copiedStyle ={
  background:'green'
}
const notCopiedStyle={
}

class GameRoomPage extends Component{
    constructor() {
        super();
        this.state = {
            gameRoomCode: '',
            categoriesToChooseFrom: [], 
            categoriesChosen: [],
            isDialogOpen:false,
            selectedCategories:[],
            isCreateBtnDisabled:true,
            copyBtnText:'Copy code',
            isCopied:false,
            
        }
    }
    
    drawCopyButton=()=>{
        if(this.state.isCopied === true){
            return (  <Button id="copyButton"
            onClick={this.copyBtnClickHandler} style={copiedStyle}
            variant="contained" color="primary" fullWidth 
           >
             {this.state.copyBtnText}
           </Button>)
        }
        else{
            return(<Button id="copyButton"
            onClick={this.copyBtnClickHandler} style={notCopiedStyle}
            variant="contained" color="primary" fullWidth 
           >
             {this.state.copyBtnText}
           </Button>)
        }
    }

    copyBtnClickHandler=()=>{
        this.setState({
              copyBtnText:"Copied!",
              isCopied:true, 
          })
    }

    updateToSelectedCategory=(e)=>{
        this.setState({
            selectedCategories:e,
            
        },this.isCategoriesArrayEmpty);
    }

    getAvailableCategories = () => {
        var request = require("request");
        var options = { method: 'GET',
        url: 'http://10.180.186.100:8080/api/category', 
        json: true  };

        request(options, function (error, response, body) {
        if (error) {
            alert('Refresh')
        }  else{
            this.setState({
                categoriesToChooseFrom:[].concat(body).map(category => ({
                    value: category.categoryName,
                    label: category.categoryName,
                    categoryId: category.categoryId,
                  }))
            })
        } 
        console.log(body);
        }.bind(this))
    }

    sendCategoriesToGameroom=(gameId)=>{
        var request = require("request");

        var options = { method: 'POST',
          url: 'http://10.180.186.100:8080/api/categorygame',
          headers: 
           {'Content-Type': 'application/json' },
          body: { gameId: gameId, 
                  categoriesId: this.state.selectedCategories.map((selectedCategory)=>{
                    return(selectedCategory.categoryId)}
                  )},
          json: true };
        
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
        
          console.log(body);
        });

    }

    sendGamecodeToServer=(gameRoomCode)=>{
        var request = require("request");

        var options = { method: 'POST',
          url: 'http://10.180.186.100:8080/api/game/',
          headers: 
           { 'Content-Type': 'application/json' },
          body: { UniqueKey: gameRoomCode },
          json: true };
        
        request(options,  (error, response, body)=> {
          if (error) throw new Error(error);
          this.sendCategoriesToGameroom(body.gameId);
          console.log(body);
        });

    }

    componentWillMount(){
        this.getAvailableCategories();
    }

    handleClickOpen = () => {
        this.setState({ isDialogOpen: true });
        this.generateRandomGameCode();
      
    };
    
    handleClose = () => {
        this.setState({ isRestartDialogOpen: false });
    };


    generateRandomGameCode=()=>{
     var generatedCode=Math.floor(10000 + Math.random() * 90000);
     this.setState({
         gameRoomCode:generatedCode,
      },this.sendGamecodeToServer(generatedCode))
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
                <br/> <br/><br/> 
                
                <Button type="submit" disabled={this.state.isCreateBtnDisabled} variant="contained"
                 color="primary" onClick={this.handleClickOpen}>
                 Create gameroom
                </Button>
               
                <Dialog
                   open={this.state.isDialogOpen}
                   onClose={this.handleClose}
                   TransitionComponent={Transition}
                   aria-labelledby="alert-dialog-title"
                   aria-describedby="alert-dialog-description1"
                   maxWidth='md'
                   keepMounted
                    >
                   <DialogTitle id="alert-dialog-title"  > {"Gameroom code"} </DialogTitle>
                   <DialogContent>
                     <DialogContentText id="alert-dialog-description1"
                      ref={(dialogcontexttext) => this.DialogContentText = dialogcontexttext} value={this.state.gameRoomCode} >
                       {this.state.gameRoomCode}
                     </DialogContentText>
                   </DialogContent>
                   <DialogActions>

                    <CopyToClipboard text={this.state.gameRoomCode}>
                      {this.drawCopyButton()}
                    </CopyToClipboard>

                     <Button onClick={this.handleClose} autoFocus variant="contained" color="secondary">
                       Close
                     </Button>
                   </DialogActions>
                </Dialog>

                <br/><br/>
                <Button variant="contained" color="primary" 
                     onClick={()=> this.props.history.push({pathname:"/components/StartPage",state:scale})}>&nbsp; Go to start page
                </Button>
            </div>
        );
    }

}

export default GameRoomPage;