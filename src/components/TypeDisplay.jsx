import React, {useEffect} from "react";


const TypeDisplay = props => {
    const {judgements = [], selectedJudgements, setSelectedJudgements} = props;

    //Scroll to the bottom each time the types are updated
    useEffect(() => {
        const lastLine = document.querySelector(".typeDisplay p:last-child");
        if (lastLine) {
            lastLine.scrollIntoView({ behavior: "smooth" });
        }
    });


    const getOnClick = judgement => () => {
        let newSelection = new Set(selectedJudgements);
        if (selectedJudgements.has(judgement)) {
            newSelection.delete(judgement);
        } else {
            newSelection.add(judgement);
        }
        setSelectedJudgements(newSelection);
    }


    return (
        <div className="typeDisplay">
            {judgements.map((judgement,i) => {
                const selected = selectedJudgements.has(judgement) ? "typeDisplay__judgement--selected" : "";

                return (
                <p
                    className={`typeDisplay__judgement ${selected}`}
                    key={judgement.toString() + "__" + i}
                    onClick={getOnClick(judgement)}
                >
                    <span className="typeDisplay__judgement__lineNum">{i+1}</span>
                    <span className="typeDisplay__judgement__math">{judgement.toString()}</span>
                </p>)
            })}
        </div>
    )
}

export default TypeDisplay