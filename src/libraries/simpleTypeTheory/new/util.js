import symbols from "../new/symbols";

const { expression: expressionSym} = symbols;

export const basicSymbols = [
    expressionSym.term.variable,
    expressionSym.term.concrete,
    expressionSym.type.base,
    expressionSym.type.empty,
    expressionSym.type.unit,
]

export const bracketedExpressionString = (expression) => {
    console.log("expression in bracketedExpression String", expression)

    if (typeof expression === "object" && expressionSym.key in expression) {
        if (basicSymbols.includes(expression[expressionSym.key]) ) {
            return expression.toString();
        } else {
            return `(${expression.toString()})`
        }
    } else {
        throw new Error("Not an expression");
    }




}