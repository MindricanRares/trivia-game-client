import React, { Component } from 'react';
import './App.css';
import styled from "styled-components";
import createHistory from 'history/createBrowserHistory'
import {Router,Switch,Route,Redirect } from 'react-router-dom'
import Transitions from './transitions'
import StartPage from './components/StartPage';
import ScoreboardPage from './components/ScoreboardPage';
import GameRoomPage from './components/GameRoomPage';
import QuestionPage from './components/QuestionPage';

const history = createHistory()

export default ()=> (
  <Router history={history}>
    <Route render = {({location})=>(
      <Perspective style={styles.fill}>
        <Transitions pageKey={location.key}{...location.state}>
          <Switch location={location}>
              <Route exact path="/components/StartPage" component={StartPage}/>
              <Route path="/components/ScoreboardPage" component={ScoreboardPage} />
              <Route path="/components/GameRoomPage" component={GameRoomPage} />
              <Route path="/components/QuestionPage" component={QuestionPage} />
              <Redirect from='/' to='/components/StartPage' />
          </Switch>
        </Transitions>
      </Perspective>
    )}
    />
</Router>
)

const Perspective = styled.div`
perspective:1200px;
margin: auto;
height:100vh;
width:100vw;
`
const styles ={};
styles.fill={
    position:'absolute',
    left:0,
    right:0,
    top:0,
    bottom:0
}