import React, {useEffect} from "react";


const TypeDisplay = props => {
    const {typeStatements = []} = props;

    //Scroll to the bottom each time the types are updated
    useEffect(() => {
        const lastLine = document.querySelector(".typeDisplay p:last-child");
        if (lastLine) {
            lastLine.scrollIntoView({ behavior: "smooth" });
        }
    });

    return (
        <div className="typeDisplay">
            {typeStatements.map((ts,i) => (
                <p className="typeDisplay__statement" key={ts.toString() + "__" + i}>
                    <span className="typeDisplay__statement__lineNum">{i+1}</span>
                    <span className="typeDisplay__statement__expression">{ts.toString()}</span> </p>
            ))}
        </div>
    )
}

export default TypeDisplay