import React from 'react';
import { hot } from 'react-hot-loader';
import 'assets/scss/App.scss';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import {simpleTypeTheory} from "../libraries/simpleTypeTheory";
import TypeDisplay from "./TypeDisplay";
import RuleButtonArea from './RuleButtonArea';
import ArgumentDisplay from "./ArgumentDisplay";
import {resetExpressionFactoryCounters} from "../libraries/simpleTypeTheory/new/expressionFactories";


window.simpleTypeTheory = simpleTypeTheory;
window.avi = simpleTypeTheory.avi;
window.richard = simpleTypeTheory.richard;
window.initialRender = false;
const testJudge =  {toString: ()=>"T type"}


const initialState = {
    judgements: [],
    selectedJudgements: []
}

class App extends React.PureComponent {

    constructor () {
        super();
        this.state = initialState;

        this.addJudgement = this.addJudgement.bind(this);
        this.setSelectedJudgements = this.setSelectedJudgements.bind(this);
        this.resetJudgements = this.resetJudgements.bind(this);
    }

    resetJudgements() {
        this.setState(
            {
                judgements: initialState.judgements,
                selectedJudgements: initialState.selectedJudgements
            }
        )
        resetExpressionFactoryCounters();
    }

    addJudgement (judgement) {
        this.setState({judgements: [...this.state.judgements, judgement]});
        return this.addJudgement;
    }

    setSelectedJudgements (judgementArr) {
        if (Array.isArray(judgementArr)) {
            this.setState({selectedJudgements: [...judgementArr]});
        }
        return this.state.selectedJudgements;
    }

    render() {
    if (!initialRender) {
        console.log("Simple Type Theory Object: \n",  simpleTypeTheory);
        window.initialRender = true;
    }

    return (
      <BrowserRouter>
        <div className="app">
            <h1>Learn Type Theory</h1>
            <TypeDisplay
                judgements={this.state.judgements}
                selectedJudgements={this.state.selectedJudgements}
                setSelectedJudgements={this.setSelectedJudgements}
                resetJudgements={this.resetJudgements}
            />
            <ArgumentDisplay selectedJudgements={this.state.selectedJudgements} setSelectedJudgements={this.setSelectedJudgements}/>
            <RuleButtonArea
                selectedJudgements={this.state.selectedJudgements}
                addJudgement={this.addJudgement}
                setSelectedJudgements={this.setSelectedJudgements}
            />
        </div>
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);
