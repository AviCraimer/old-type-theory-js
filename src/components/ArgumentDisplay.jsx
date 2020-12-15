import React from "react";
import CloseIcon from '@material-ui/icons/Close';

const ArgumentDisplay = props => {
    const {selectedJudgements, setSelectedJudgements} = props;
    // if (selectedJudgements.length === 0) {
    //     return null;
    // }


    return (
        <div className="argumentDisplay">
           <div className="argumentDisplay__selectedJudgements">
           {
                selectedJudgements.map((judgement, i) => <p className="argumentDisplay__selectedJudgements__judgement" key={judgement.toString() + i } >{judgement.toString()}</p>  )

            }
           </div>
                {
                selectedJudgements.length !== 0 && (
                <button className="argumentDisplay__clearBtn">
                    <CloseIcon onClick={() => setSelectedJudgements([]) }/>
                </button>)}
            </div>
      );
}

export default ArgumentDisplay;