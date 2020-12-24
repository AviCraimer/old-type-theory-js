import React from "react";
import CloseIcon from '@material-ui/icons/Close';

const ArgumentDisplay = props => {
    const {selectedArguments, setSelectedArguments} = props;
    // if (selectedArguments.length === 0) {
    //     return null;
    // }


    return (
        <div className="argumentDisplay">
           <div className="argumentDisplay__selectedArguments">
           {
                selectedArguments.map((sj, i) => <p className="argumentDisplay__selectedArguments__judgement" key={sj.judgement.toString() + i } >{sj.judgement.toString()}</p>  )

            }
           </div>
                {
                selectedArguments.length !== 0 && (
                <button className="argumentDisplay__clearBtn">
                    <CloseIcon onClick={() => setSelectedArguments() }/>
                </button>)}
            </div>
      );
}

export default ArgumentDisplay;