import React, {useState, useEffect} from 'react';
import RuleButton from "./RuleButton";
import {_01_emptyContext,
    _02_baseTypeFormation,
    _03_unitFormation,
    _04_productFormation} from "../libraries/simpleTypeTheory/new/rules";

const rules = [
    _01_emptyContext,
    _02_baseTypeFormation,
    _03_unitFormation,
    _04_productFormation
]

const RuleButtonArea = props => {
    const {selectedJudgements, addJudgement} = props;

    const [judgementToAdd, setJudgementToAdd] = useState(null);

        {useEffect(() => {
            if (judgementToAdd) {
                addJudgement(judgementToAdd);
                setJudgementToAdd(null);
            }
        })}

    return  (
        <div className="ruleButtonArea">
            {rules.map( rule => {
                return (
                <RuleButton  setJudgementToAdd={setJudgementToAdd} ruleFunction={rule} selectedJudgements={selectedJudgements} key={rule.displayName}>
                    {rule.displayName}
                </RuleButton>)}
                )
            }
        </div>
    )
}

export default RuleButtonArea;