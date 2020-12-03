import symbols from "./symbols";
const declarationSym = symbols.declaration;


export const typeFormingDeclaration = () => {
    return {
        [declarationSym.key]: declarationSym.typeForming,
        expression: type,
        toString(){
            return `${this.expression.toString()} type`
        }
    }
}

export const membershipDeclaration = (typeFormingDeclaration) => {
    return {
        [declarationSym.key]: declarationSym.membership,
        termExpression: term,
        typeExpression: typeFormingDeclaration.expression,
        toString() {
            return  `${this.termExpression.toString()}:${this.typeExpression.toString()}`
        }
    }
}

export const equalityDeclaration = (membershipDec1, membershipDec2) => {
    return {
        [declarationSym.key]: declarationSym.equality,
        leftTerm: membershipDec1.termExpression,
        rightTerm: membershipDec2.termExpression,
        toString(){
            return `${this.leftTerm.toString()} = ${this.rightTerm.toString()} : ${membershipDec1.typeExpression.toString()}`
        }
    }
}

export const contextDeclaration = (context) => {
    return {
        [declarationSym.key]: declarationSym.context,
        context,
        toString(){
            return `${context.toString()} context`
        }
    }
}