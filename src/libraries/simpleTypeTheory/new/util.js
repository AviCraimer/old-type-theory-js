import symbols from "../new/symbols";
import {isArray, isEqual} from "lodash"
const { expression: expressionSym} = symbols;

export const basicSymbols = [
    expressionSym.term.variable,
    expressionSym.term.concrete,
    expressionSym.type.base,
    expressionSym.type.empty,
    expressionSym.type.unit,
]

export const bracketedExpressionString = (expression) => {
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

export const serializeArguments = selectedArguments => {
    let serialized = [];

    selectedArguments.forEach(sa => {
        if (sa.selectedContextDeclarations.length === 0) {
            serialized.push( {
                judgement: sa.judgement,
                contextDeclaration: null
            });
        } else {
            sa.selectedContextDeclarations.forEach(index => {
                const singleDeclaration =  {
                    judgment: sa.judgement,
                    contextDeclaration: index
                }
                serialized.push(singleDeclaration);
            });
        }
    })
    return serialized;
}

//Checks for an exact type match based on value equality
export const typeCheckExact = desiredType => unknownType => isEqual(desiredType, unknownType);

// checks if unknownType is a subtype of desiredType
export const subtypeCheck = desiredType => unknownType => {
    if (Array.isArray(desiredType) &&
    Array.isArray(unknownType) &&
    desiredType.length <= unknownType.length) {
        let result = true;

        desiredType.forEach((symbol,i) => {
            if (unknownType[i] !== symbol) {
                result = false;
            }
        });
        return result;
    }

    return false;
}

export const checkSubtypeInObject =  desiredType =>  obj => {
    return typeof obj === "object" &&  subtypeCheck(desiredType)(obj.type);
}


// export const matchJudgementInSelected = (judgement, selectedArguments) => {
//     const justJudgements = selectedArguments.map(sj => sj.judgement);

//     if (justJudgements.includes(judgement)) {
//         return true
//     }

//     return false;

// }