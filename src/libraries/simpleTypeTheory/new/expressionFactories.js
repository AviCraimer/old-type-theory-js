import symbols from "./symbols";
import {bracketedExpressionString} from "./util";

const {expression: expressionSym} = symbols;

let  variableCounter = 1;
export const makeVariable = () => {
    let name =  "x" + variableCounter;
    //Increment the variable counter
    variableCounter++;

    return {
        name: name,
        [expressionSym.key]: expressionSym.term.variable,
        toString: () => name
    }
}



let  typeCounter = 0;
export const makeBaseType = ( ) => {
    const name = "T" + (typeCounter + 1);

    //Increment the type counter
    typeCounter++;

    return {
        name: name,
        [expressionSym.key]: expressionSym.type.base,
        toString: () => name
    }
}


export const makeProductType = (typeExpression1, typeExpression2) => {
    return {
        [expressionSym.key]: expressionSym.type.product,
        first: typeExpression1,
        second: typeExpression2,
        toString () {
            return `${bracketedExpressionString(this.first)} x ${bracketedExpressionString(this.second)}`
        }
    }
}

export const makeSumType = (typeExpression1, typeExpression2) => {
    return {
        [expressionSym.key]: expressionSym.type.sum,
        left: typeExpression1,
        right: typeExpression2,
        toString () {
            return `${bracketedExpressionString(this.left)} + ${bracketedExpressionString(this.right)}`
        }
    }
}

export const makeFunctionType = (typeExpression1, typeExpression2) => {
    return {
        [expressionSym.key]: expressionSym.type.function,
        domain: typeExpression1,
        codomain: typeExpression2,
        toString () {
            return `${bracketedExpressionString(this.domain)} → ${bracketedExpressionString(this.codomain)}`
        }
    }
}

export const resetExpressionFactoryCounters = () => {
    variableCounter = 0
    typeCounter = 0
}


