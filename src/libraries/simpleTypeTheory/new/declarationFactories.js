import symbols from "./symbols";
import {TypeFormationDeclaration,
    MembershipDeclaration, EqualityDeclaration} from "./typeSystemTypes"
const declarationSym = symbols.declaration;

export const makeTypeFormingDeclaration = (typeExpression) => {
    return {
        [declarationSym.key]: declarationSym.typeForming,
        type: TypeFormationDeclaration,
        expression: typeExpression,
        toString() {
            return `${this.expression.toString()} type`
        }
    }


    // declaration.jsx =  (
    //     <span className="declaration declaration-typeForming">

    //     </span>)


}

export const makeMembershipDeclaration = (termExpression, typeFormingDeclaration) => {
    //Add checks to ensure correct inputs

    return {
        [declarationSym.key]: declarationSym.membership,
        type: MembershipDeclaration,
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
        type: EqualityDeclaration,
        leftTerm: membershipDec1.termExpression,
        rightTerm: membershipDec2.termExpression,
        toString(){
            return `${this.leftTerm.toString()} = ${this.rightTerm.toString()} : ${membershipDec1.typeExpression.toString()}`
        }
    }
}

