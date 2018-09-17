import React, { Component } from 'react';
import{slide,scale} from'./../transitions'

class GameRoomPage extends Component{
    constructor() {
        super();
        this.state = {
            gameRoomCode: '',
                playerNames: [{
                        name: 'ABC',
                    },
                    {
                        name: 'DEF',
                    },
                    {
                        name: 'GHI',
                    },
                ],
                categoriesToChooseFrom: [{
                        name: 'Math',
                    },
                    {
                        name: 'Science',
                    },
                    {
                        name: 'History',
                    }
                ],
                
            categoriesChosen: [],
            selectedCategory: "math"
        }
        this.gameroomUniqueCode = '14215';
    }

    populatePlayersList= () =>{
        return this.state.playerNames.map((players)=>{
            return(<li key={`${players.name}_${Date.now()}`}>{players.name}</li>)
        })
    }

    populateSelect =()=>{
        return this.state.categoriesToChooseFrom.map(category=>{
            return <option key={category.name} value ={category.name}> {category.name} </option> 
        })
    }

    displayCategoriesChosenList = () => {
        return this.state.categoriesChosen.map((category)=>{
            return(<li key={category.name}>{category.name}</li>)
        })
    }

    handleChange = (event)=> {
        this.setState({selectedCategory: event.target.value});

        const newCategoryChosen = this.state.categoriesChosen;
        newCategoryChosen.push({name:event.target.value});
        this.setState({
            categoriesChosen: newCategoryChosen
        });
        const newCategoriesToChooseFrom = this.state.categoriesToChooseFrom.filter((category)=>{
            return category.name !==event.target.value;
        })
        this.setState({
            categoriesToChooseFrom:newCategoriesToChooseFrom
        });
    }

    onClickReadyHandler =()=>{
        alert('emptyatm');
    }


    render(){
        return(
            <div>
                <h1>Gameroom #{this.gameroomUniqueCode}</h1>
                <br></br>
                <br></br>
                <h3>Players in gameroom</h3>
                <ul>{this.populatePlayersList()}</ul>
                <h3>List of categories selected</h3>
                <ul>{this.displayCategoriesChosenList()}</ul>
                
                <select value={this.state.value} onChange={this.handleChange}>
                    {this.populateSelect()}
                </select>

                
                <br></br>           
                <br></br>    
                <button onClick={this.onClickReadyHandler}>Ready</button><br></br><br></br>
                <button onClick={()=> this.props.history.push({pathname:"/components/QuestionPage",state:scale})}>QuestionPage</button><br></br><br></br>
                <button onClick={()=> this.props.history.push({pathname:"/components/ScoreboardPage",state:scale})}>Scoreboard</button><br></br><br></br>
                <button onClick={()=> this.props.history.push({pathname:"/components/StartPage",state:scale})}>Start</button>
            </div>
        );
    }

}

export default GameRoomPage;