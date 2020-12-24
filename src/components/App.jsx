import React from 'react';
import { hot } from 'react-hot-loader';
import 'assets/scss/App.scss';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import {simpleTypeTheory} from "../libraries/simpleTypeTheory";
import TypeDisplay from "./TypeDisplay";
import RuleButtonArea from './RuleButtonArea';
import ArgumentDisplay from "./ArgumentDisplay";
import {resetExpressionFactoryCounters} from "../libraries/simpleTypeTheory/new/expressionFactories";
import {rules} from "../libraries/simpleTypeTheory/new/rules";

window.simpleTypeTheory = simpleTypeTheory;
window.avi = simpleTypeTheory.avi;
window.richard = simpleTypeTheory.richard;
window.initialRender = false;
const testJudge =  {toString: ()=>"T type"}


const initialState = {
    judgements: [],
    selectedArguments: []  // {judgement, selectedContextDeclarations: []  }
}

class App extends React.PureComponent {

    constructor () {
        super();
        this.state = initialState;

        this.addJudgement = this.addJudgement.bind(this);
        this.setSelectedArguments = this.setSelectedArguments.bind(this);
        this.resetJudgements = this.resetJudgements.bind(this);
    }

    resetJudgements() {
        this.setState(
            {
                judgements: initialState.judgements,
                selectedArguments: initialState.selectedArguments
            }
        )
        resetExpressionFactoryCounters();
    }

    addJudgement (judgement) {
        this.setState({judgements: [...this.state.judgements, judgement]});
        return this.addJudgement;
    }

    setSelectedArguments (...judgements) {

        this.setState({selectedArguments: [
            ...judgements.map(judgement => ({judgement, selectedContextDeclarations: []}))
        ]});

        return this.state.selectedArguments;
    }

    render() {
    const ruleButtonAreaBaseProps = {
        selectedArguments: this.state.selectedArguments,
        addJudgement: this.addJudgement,
        setSelectedArguments: this.setSelectedArguments
    }


    return (
      <BrowserRouter>
        <div className="app">
            <h1>Learn Type Theory</h1>
            <TypeDisplay
                judgements={this.state.judgements}
                selectedArguments={this.state.selectedArguments}
                setSelectedArguments={this.setSelectedArguments}
                resetJudgements={this.resetJudgements}
            />
            <ArgumentDisplay selectedArguments={this.state.selectedArguments} setSelectedArguments={this.setSelectedArguments}/>
            <RuleButtonArea
                {...ruleButtonAreaBaseProps}
                headingText="Context Rules"
                rules={rules.context}
            />
            <RuleButtonArea
                {...ruleButtonAreaBaseProps}
                headingText="Type Formation Rules"
                rules={rules.typeFormation}
            />
            <RuleButtonArea
                {...ruleButtonAreaBaseProps}
                headingText="Term Construction Rules"
                rules={rules.termConstruction}
            />
        </div>
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);
