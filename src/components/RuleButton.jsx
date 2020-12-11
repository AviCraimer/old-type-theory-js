import React from 'react';
import {isJudgement} from "../libraries/simpleTypeTheory/new/judgement";


const RuleButton = props => {
    const {ruleFunction, setJudgementToAdd, selectedJudgements} = props;

    const onClickHandler = () => {
        const result = ruleFunction(...selectedJudgements);

        console.log("result of onClick", result)
        if (isJudgement (result)) {
            console.log("Result string: ", result.toString())
            setJudgementToAdd(result);
        }
    }


    return (<button onClick={onClickHandler} className="ruleButton">{ruleFunction.displayName}</button>  );
}

export default RuleButton;