import React from 'react';
import { hot } from 'react-hot-loader';
import 'assets/scss/App.scss';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import {simpleTypeTheory} from "../libraries/simpleTypeTheory";
import TypeDisplay from "./TypeDisplay";
import RuleButtonArea from './RuleButtonArea';
import {isSet} from "lodash";

window.simpleTypeTheory = simpleTypeTheory;
window.avi = simpleTypeTheory.avi;
window.richard = simpleTypeTheory.richard;

const testJudge =  {toString: ()=>"T type"}


class App extends React.PureComponent {

    constructor () {
        super();
        this.state = {
            judgements: [
                {toString: ()=>"T type"},
                {toString: ()=>". context"},
                {toString: ()=>"x : T"},{toString: ()=>"T type"},
                {toString: ()=>"T type"},
                {toString: ()=>"T type"},
                {toString: ()=>"T type"},
                {toString: ()=>"T type"},
                testJudge],
            selectedJudgements: new Set([testJudge])
        }

        this.addJudgement = this.addJudgement.bind(this);
        this.setSelectedJudgements = this.setSelectedJudgements.bind(this);
    }

    addJudgement (judgement) {
        this.setState({judgements: [...this.state.judgements, judgement]});
        return this.addJudgement;
    }

    setSelectedJudgements (judgementSet) {
        if (isSet(judgementSet)) {
            const newSelection = new Set(this.state.selectedJudgements);
            this.setState({selectedJudgements: newSelection});
        }
    }

    render() {
    console.log("Simple Type Theory Object: \n",  simpleTypeTheory);



    return (
      <BrowserRouter>
        <div className="app">
            <h1>Learn Type Theory</h1>
            <TypeDisplay  judgements={this.state.judgements} selectedJudgements={this.state.selectedJudgements}  setSelectedJudgements={this.setSelectedJudgements}/>
            <RuleButtonArea selectedJudgements={this.state.selectedJudgements}  addJudgement={this.addJudgement} />
        </div>
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);
