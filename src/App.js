import React, { Component } from 'react';
import './App.css';
import StartPage from './components/StartPage';
import ScoreboardPage from './components/ScoreboardPage';
import GameRoomPage from './components/GameRoomPage';
import QuestionPage from './components/QuestionPage';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(){
    super();
    this.state = {
        playerName: '',
        gameRoomCode: ''
    }
}
  render() {
    return (
      <div className="App">
        {/* <StartPage/> */}
        <BasicExample/>
      </div>
    );
  }
}


const BasicExample = () => (
  <Router>
    <div>
      <ul s>
        <li>
          <Link to="/components/StartPage">Start</Link> 
        </li>
        <li>
          <Link to="/components/ScoreboardPage">Scoreboard</Link>
        </li>
        <li>
          <Link to="/components/GameRoomPage">Gameroom</Link>
        </li>
        <li>
          <Link to="/components/QuestionPage">Questions</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/components/StartPage" component={StartPage} />
      <Route path="/components/ScoreboardPage" component={ScoreboardPage} />
      <Route path="/components/GameRoomPage" component={GameRoomPage} />
      <Route path="/components/QuestionPage" component={QuestionPage} />
    </div>
  </Router>
);



export default App;