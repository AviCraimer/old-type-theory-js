import React from 'react';
import {isJudgement} from "../libraries/simpleTypeTheory/new/judgement";


const RuleButton = props => {
    const {ruleFunction, setJudgementToAdd, selectedJudgements, setSelectedJudgements} = props;

    const result = ruleFunction(...selectedJudgements);
    const validation = isJudgement (result);

    const onClickHandler = () => {
        if (validation) {
            setJudgementToAdd(result);
            setSelectedJudgements([]);
        }
    }

    const classes = ["ruleButton", (validation) ? "ruleButton__valid": ""].join(" ");

    return (<button onClick={onClickHandler} className={classes}>{ruleFunction.displayName}</button>  );
}

export default RuleButton;