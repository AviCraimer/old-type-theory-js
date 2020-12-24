import React, {useEffect} from "react";
import RefreshIcon from '@material-ui/icons/Refresh';

const TypeDisplay = props => {
    const {judgements = [], selectedArguments, setSelectedArguments, resetJudgements} = props;

    //Scroll to the bottom each time the types are updated
    useEffect(() => {
        const lastLine = document.querySelector(".typeDisplay p:last-child");
        if (lastLine) {
            lastLine.scrollIntoView({ behavior: "smooth" });
        }
    });


    const getOnClick = (judgement) => () => {
        let newSelection = [...selectedArguments];

        const index = selectedArguments.indexOf(judgement);

        if (index > -1) {
            newSelection.splice(index, 1);
        } else {
            newSelection.push(judgement);
        }

        setSelectedArguments(...newSelection);
    }
    const selectedJustJudgements = selectedArguments.map(sj => sj.judgement);



    return (
        <div className="typeDisplay">
            <button className="typeDisplay__resetBtn" onClick={resetJudgements}>
                <RefreshIcon  />
            </button>

            {judgements.map((judgement,i) => {
                const selected = selectedJustJudgements.includes(judgement) ? "typeDisplay__judgement--selected" : "";

                return (
                <p
                    className={`typeDisplay__judgement ${selected}`}
                    key={judgement.toString() + "__" + i}
                    onClick={getOnClick(judgement)}
                >
                    {/* <span className="typeDisplay__judgement__lineNum">{i+1}</span> */}
                    <span className="typeDisplay__judgement__math">{judgement.toString()}</span>
                </p>)
            })}
        </div>
    )
}

export default TypeDisplay