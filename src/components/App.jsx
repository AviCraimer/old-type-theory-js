import React from 'react';
import { hot } from 'react-hot-loader';
import 'assets/scss/App.scss';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import {simpleTypeTheory} from "../libraries/simpleTypeTheory";
import TypeDisplay from "./TypeDisplay";

window.simpleTypeTheory = simpleTypeTheory;
window.avi = simpleTypeTheory.avi;
window.richard = simpleTypeTheory.richard;

class App extends React.PureComponent {

    constructor () {
        super();
        this.state = {
            typeStatements: [{toString: ()=>"T type"}, {toString: ()=>"T type"},{toString: ()=>"T type"},{toString: ()=>"T type"},{toString: ()=>"T type"},{toString: ()=>"T type"},{toString: ()=>"T type"},{toString: ()=>"T type"},{toString: ()=>"T type"}]
        }
    }


    render() {
    console.log("Simple Type Theory Object: \n",  simpleTypeTheory);



    return (
      <BrowserRouter>
        <div className="app">
            <h1>Learn Type Theory</h1>
            <TypeDisplay  typeStatements={this.state.typeStatements}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);
