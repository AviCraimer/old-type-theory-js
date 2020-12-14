import React, {useState, useEffect} from 'react';
import RuleButton from "./RuleButton";


const RuleButtonArea = props => {
    const {selectedJudgements, addJudgement, setSelectedJudgements, headingText, rules} = props;

    const [judgementToAdd, setJudgementToAdd] = useState(null);

        {useEffect(() => {
            if (judgementToAdd) {
                addJudgement(judgementToAdd);
                setJudgementToAdd(null);
            }
        })}

    return  (
        <div className="ruleButtonArea">
            {
                headingText && <h2>{headingText}</h2>
            }
            <div className="ruleButtonArea__rules">
            {rules.map( rule => {
                return (
                <RuleButton
                    setJudgementToAdd={setJudgementToAdd}
                    ruleFunction={rule}
                    selectedJudgements={selectedJudgements}
                    setSelectedJudgements={setSelectedJudgements}
                    key={rule.displayName}
                >
                    {rule.displayName}
                </RuleButton>)}
                )
            }
            </div>

        </div>
    )
}

export default RuleButtonArea;