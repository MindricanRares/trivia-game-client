import React, { Component } from 'react';

class StartPage extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            code: ''
        }
    }

    onChangeNameHandler = (e) => {
        this.setState({name: e.target.value})
    }

    onChangeCodeHandler = (e) => {
        this.setState({code: e.target.value})
    }

    onClickHandler = () => {
        alert(this.state.name + " " + this.state.code);    
    }

    render(){
        return(
            <div>
                <h1>Trivia Game</h1>
                <br></br>
                <br></br>
                <h3>Name:</h3>
                <input type="text" onChange={this.onChangeNameHandler}></input>
                <h3>Code:</h3>
                <input type="text" onChange={this.onChangeCodeHandler}></input>
                <br></br>           
                <br></br>    
                <button onClick={this.onClickHandler}>OK</button>
            </div>
        );
    }

}

export default StartPage;