import symbols from "./symbols";
import {bracketedExpressionString} from "./util";
import {VariableTerm,
    UnitTerm,
    PairTerm,
    EitherTerm,
    FunctionTerm,
    GenericType,
    UnitType,
    EmptyType,
    ProductType,
    SumType,
    FunctionType} from "./typeSystemTypes";
import React from "react";
const {expression: expressionSym} = symbols;

//Types
let  typeCounter = 1;
export const makeBaseType = ( ) => {
    const name = "T" + typeCounter;

    //Increment the type counter
    typeCounter++;

    return {
        name: name,
        [expressionSym.key]: expressionSym.type.base,
        type: GenericType,
        toString: () => name,
        jsx: (<span className="typeExpression typeExpression--generic">{name}</span>)
    }
}

export const unitTypeExpression = {
    name: "Unit Type",
    type: UnitType,
    [symbols.expression.key]: symbols.expression.type.unit,
    toString: () => "1"
}

export const emptyTypeExpression = {
    name: "Empty Type",
    type: EmptyType,
    [symbols.expression.key]: symbols.expression.type.empty,
    toString: () => "0"
}

export const makeProductType = (typeExpression1, typeExpression2) => {
    return {
        [expressionSym.key]: expressionSym.type.product,
        type: ProductType,
        first: typeExpression1,
        second: typeExpression2,
        toString () {
            return `${bracketedExpressionString(this.first)} x ${bracketedExpressionString(this.second)}`
        },
        jsx: (
        <span className="typeExpression typeExpression--product">
            {typeExpression1.jsx}
            <span className="productSymbol"> × </span>
            {typeExpression2.jsx}
        </span>)
    }
}

export const makeSumType = (typeExpression1, typeExpression2) => {
    return {
        [expressionSym.key]: expressionSym.type.sum,
        type: SumType,
        left: typeExpression1,
        right: typeExpression2,
        toString () {
            return `${bracketedExpressionString(this.left)} + ${bracketedExpressionString(this.right)}`
        },
        jsx: (
            <span className="typeExpression typeExpression--sum">
                {typeExpression1.jsx}
                <span className="sumSymbol"> + </span>
                {typeExpression2.jsx}
            </span>)
    }
}

export const makeFunctionType = (typeExpression1, typeExpression2) => {
    return {
        [expressionSym.key]: expressionSym.type.function,
        type: FunctionType,
        domain: typeExpression1,
        codomain: typeExpression2,
        toString () {
            return `${bracketedExpressionString(this.domain)} → ${bracketedExpressionString(this.codomain)}`
        },
        jsx: (
            <span className="typeExpression typeExpression--sum">
                {typeExpression1.jsx}
                <span className="arrowSymbol"> → </span>
                {typeExpression2.jsx}
            </span>)
    }
}


//TERMS

let  variableCounter = 1;
export const makeVariable = () => {
    let name =  "x" + variableCounter;
    //Increment the variable counter
    variableCounter++;

    return {
        name: name,
        type: VariableTerm,
        [expressionSym.key]: expressionSym.term.variable,
        toString: () => name,
        jsx: (
        <span className="term term--variable">
            {name}
        </span>)
    }
}

export const unitTermExpression = {
    [symbols.expression.term.key]: symbols.expression.term.concrete,
    type: UnitTerm,
    name: "Singleton value",
    toString() {
        return "*"
    }
}

export const makePairTerm = (termExpression1, termExpression2) => {
    return {
        [expressionSym.key]: expressionSym.term.pair,
        type: PairTerm,
        first: termExpression1,
        second: termExpression2,
        toString() {
            return `<${this.first.toString()}, ${this.second.toString()}`
        },
        jsx: (
            <span className="term term--pair">
                {`&lt;${this.first.jsx}, ${this.second.jsx}&gt;`}
            </span>)
    }

}

export const makeFunctionTerm = (membershipDeclaration1, membershipDeclaration2) => {
    console.log(  {membershipDeclaration1,
    membershipDeclaration2})
    return {
        [expressionSym.key]: expressionSym.term.function,
        type: FunctionTerm,
        domain: membershipDeclaration1,
        codomain: membershipDeclaration2,
        toString() {
            return `(λ${this.domain.toString()}.${this.codomain.toString()})`
        },
        jsx: (
            <span className="term term--function">
                <span className="lambdaSymbol">λ</span>({this.domain.jsx})<span className="lambdaParameterBodyDivider">.</span>{this.codomain.jsx}
            </span>)
    }

}

export const resetExpressionFactoryCounters = () => {
    variableCounter = 1
    typeCounter = 1
}



