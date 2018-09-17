
import React,{Component} from "react";
import { Switch, Route,Router,Redirect} from "react-router-dom";
import styled from "styled-components";
import Transitions from './src/transitions'
import StartPage from './StartPage';
import ScoreboardPage from './ScoreboardPage';
import GameRoomPage from './GameRoomPage';
import QuestionPage from './QuestionPage';

class RoutesContainer extends Component{
    constructor(){
        super();
        this.state = {
        }
    }

    render(){
        return(
             <Route
              render={({ location }) => (
                <Perspective>
                  <Transitions pageKey={location.key} {...location.state}>
                    <Switch location={location}>
                     <Route exact path="/components/StartPage" component={StartPage}/>
                     <Route path="/components/ScoreboardPage" component={ScoreboardPage} />
                     <Route path="/components/GameRoomPage" component={GameRoomPage} />
                     <Route path="/components/QuestionPage" component={QuestionPage} />
                     <Route render={()=> <div>Page not found!</div>}/>
                     <Redirect from='/' to='/components/StartPage' />
                     </Switch>
                  </Transitions>
                </Perspective>
            )}/>
        );
    }
}




export default RoutesContainer;