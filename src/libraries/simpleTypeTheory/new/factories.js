import symbols from "./symbols";
const {expression: expressionSym} = symbols;

let  variableCounter = 0;
export const makeVariable = () => {
    const variableLetters = ["x","y","z"];
    let name;

    if (variableCounter < variableLetters.length) {
        name = variableLetters[variableCounter];
    } else {
        name = "var_" + (variableCounter + 1);
    }
    //Increment the variable counter
    variableCounter++;

    return {
        name: name,
        [expressionSym.key]: expressionSym.term.variable,
        toString: () => name
    }
}

let  termCounter = 0;
export const makeConcreteTerm = ( ) => {
    const termLetters = ["a","b","c", "d", "e"];
    let name;

    if (termCounter < termLetters.length) {
        name = termLetters[termCounter];
    } else {
        name = "term_" + (termCounter + 1);
    }
    //Increment the term counter
    termCounter++;

    return {
        name: name,
        [expressionSym.key]: expressionSym.term.concrete,
        toString: () => name
    }
}


let  typeCounter = 0;
export const makePrimitiveType = ( ) => {
    const name = "Type_" + (typeCounter + 1);

    //Increment the type counter
    typeCounter++;

    return {
        name: name,
        [expressionSym.key]: expressionSym.type.primitive,
        toString: () => name
    }
}






