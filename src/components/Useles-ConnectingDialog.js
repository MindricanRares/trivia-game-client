import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ConnectingDialog extends React.Component {
  state = {
    isDialogOpen: false,
  };

  handleClickOpen = () => {
    this.setState({ isDialogOpen: true });
  };

  handleClose = () => {
    this.setState({ isDialogOpen: false });
  };

  render() {
    return (
      <div>
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
               ref={(dialogcontexttext) => this.DialogContentText = dialogcontexttext} value="empty" >
                SADasfasfa
              </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={this.handleClose} autoFocus variant="contained" color="secondary">close</Button>
              <Button onClick={this.handleClose} autoFocus variant="contained" color="secondary">
                Close
              </Button>
            </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ConnectingDialog;
