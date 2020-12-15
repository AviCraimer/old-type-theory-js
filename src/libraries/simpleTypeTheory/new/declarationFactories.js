import symbols from "./symbols";
const declarationSym = symbols.declaration;

export const typeFormingDeclaration = (typeExpression) => {
    return {
        [declarationSym.key]: declarationSym.typeForming,
        expression: typeExpression,
        toString() {
            return `${this.expression.toString()} type`
        }
    }
}

export const makeMembershipDeclaration = (termExpression, typeFormingDeclaration) => {
    //Add checks to ensure correct inputs

    return {
        [declarationSym.key]: declarationSym.membership,
        termExpression: termExpression,
        typeExpression: typeFormingDeclaration.expression,
        toString() {
            return  `${this.termExpression.toString()}:${this.typeExpression.toString()}`
        }
    }
}

export const equalityDeclaration = (membershipDec1, membershipDec2) => {
    //Add checks to ensure correct inputs
    // Check that type expression is the same

    return {
        [declarationSym.key]: declarationSym.equality,
        leftTerm: membershipDec1.termExpression,
        rightTerm: membershipDec2.termExpression,
        toString(){
            return `${this.leftTerm.toString()} = ${this.rightTerm.toString()} : ${membershipDec1.typeExpression.toString()}`
        }
    }
}

