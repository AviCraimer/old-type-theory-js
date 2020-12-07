import React from 'react';

const RuleButton = props => {
    const {ruleFunction, selectedJudgements} = props;

    return (<button className="ruleButton">{ruleFunction.displayName}</button>  );
}

export default RuleButton;