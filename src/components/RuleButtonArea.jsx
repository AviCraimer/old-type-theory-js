import React, {useState, useEffect} from 'react';
import RuleButton from "./RuleButton";
import {serializeArguments} from "../libraries/simpleTypeTheory/new/util";


const RuleButtonArea = props => {
    const {selectedArguments, addJudgement, setSelectedArguments, headingText, rules} = props;
    const [judgementToAdd, setJudgementToAdd] = useState(null);

        {useEffect(() => {
            if (judgementToAdd) {
                addJudgement(judgementToAdd);
                setJudgementToAdd(null);
            }
        })}

    const serializedArguments = serializeArguments(selectedArguments);

    return  (
        <div className="ruleButtonArea">
            {
                headingText && <h2>{headingText}</h2>
            }
            <div className="ruleButtonArea__rules">
            {rules.map( ruleFunction => {


                return (
                <RuleButton
                    setJudgementToAdd={setJudgementToAdd}
                    ruleFunction={ruleFunction}
                    serializedArguments={serializedArguments}
                    setSelectedArguments={setSelectedArguments}
                    key={ruleFunction.displayName}
                >
                    {ruleFunction.displayName}
                </RuleButton>)}
                )
            }
            </div>

        </div>
    )
}

export default RuleButtonArea;