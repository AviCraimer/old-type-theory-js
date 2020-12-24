import React from 'react';
import {isJudgement} from "../libraries/simpleTypeTheory/new/judgement";
import {makeArgumentValidation} from "../libraries/simpleTypeTheory/new/argumentValidation";

const RuleButton = props => {
    const {ruleFunction, setJudgementToAdd, serializedArguments, setSelectedArguments} = props;

    const validationFunction = (ruleFunction.validation) ?  makeArgumentValidation(ruleFunction.validation) : ()=>false;


    const argumentValidation = validationFunction(serializedArguments);

    let result;
    if (argumentValidation === true) {
        console.log(ruleFunction, serializedArguments)
        result = ruleFunction(...serializedArguments);
    }

    const judgementValidation = isJudgement (result);

    const onClickHandler = () => {
        if (judgementValidation) {
            setJudgementToAdd(result);
            setSelectedArguments();
        }
    }

    const classes = ["ruleButton", (judgementValidation) ? "ruleButton__valid": ""].join(" ");

    return (<button onClick={onClickHandler} className={classes}>{ruleFunction.displayName}</button>  );
}

export default RuleButton;