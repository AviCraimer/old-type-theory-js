import {makeContext, isContext} from "./context";
import {makeJudgement, isJudgement, isContextJudgement, isTypeFormationJudgement} from "./judgement";
import {makeVariable, makeBaseType, makeProductType, makeSumType,
    makeLambdaType} from "./expressionFactories";
import {equalityDeclaration, membershipDeclaration, typeFormingDeclaration} from "./declarationFactories";
import symbols from "./symbols";
const symbolsExp = symbols.expression;

const argumentFail = function (args, length) {
    if (args.length === length) {
        return false;
    } else {
        return true;
    }
}


export const emptyContext = function () {
    if (argumentFail(arguments, 0)) {
        return;
    };
    return makeJudgement(makeContext());
}
emptyContext.displayName = "Empty Context";

export const genericTypeFormation = function (contextJudgement) {
    if (argumentFail(arguments, 1)) {
        return;
    };

    if (
        isContextJudgement(contextJudgement)
        && contextJudgement[symbolsExp.key] === symbolsExp.context) {
        const T =  makeBaseType();
        const TDeclaration = typeFormingDeclaration(T);
        return makeJudgement(contextJudgement.context, TDeclaration);
    }
}

genericTypeFormation.displayName = "Generic Type"

const unitTypeExpression = {
    name: "Unit Type",
    [symbols.expression.key]: symbols.expression.type.unit,
    toString: () => "1"
}

export const unitFormation = function (contextJudgement) {
    if (argumentFail(arguments, 1)) {
        return;
    };
    if (isContextJudgement(contextJudgement)) {
        const TDeclaration = typeFormingDeclaration(unitTypeExpression);
        return makeJudgement(contextJudgement.context, TDeclaration);
    }
}
unitFormation.displayName = "Unit Type"

//Common functionality for product type, sum type, and function type formation
const twoTypeCombination = combinedTypeExpressionFunction => ( function ( typeFormationJudgement1, typeFormationJudgement2) {
    //Takes one or two arguments
    if (argumentFail(arguments, 1) && argumentFail(arguments, 2)) {
        return;
    };

    //If there is only one argument, use the first type formation judgement twice.
    if (!typeFormationJudgement2) {
        typeFormationJudgement2 = typeFormationJudgement1;
    }

    const bothAreTFJudgements = isTypeFormationJudgement(typeFormationJudgement1) && isTypeFormationJudgement(typeFormationJudgement2);

    const contextsMatch = typeFormationJudgement1.context.eq(typeFormationJudgement2.context);

    if (bothAreTFJudgements && contextsMatch) {

        //Use provided function to make a combined type expression (e.g., makeProductType)
        const combinedTypeExpression = combinedTypeExpressionFunction(typeFormationJudgement1.declaration.expression, typeFormationJudgement2.declaration.expression)

        const combinedTypeDeclaration = typeFormingDeclaration(combinedTypeExpression);

        return makeJudgement(typeFormationJudgement1.context, combinedTypeDeclaration);
    }
})

export const productFormation = twoTypeCombination(makeProductType);
productFormation.displayName = "Product Type";
productFormation.description = "Get a product type from two entailment judgements with the same context on the left side, and a type declaration on the right side."

export const sumFormation = twoTypeCombination(makeSumType);
sumFormation.displayName = "Sum Type";

export const lambdaFormation = twoTypeCombination(makeLambdaType);
lambdaFormation.displayName = "Function Type";

// export const productFormation = function ( typeFormationJudgement1, typeFormationJudgement2) {

//         const productTypeExpression =  makeProductType(typeFormationJudgement1.declaration.expression, typeFormationJudgement2.declaration.expression )

//         const productTypeDeclaration = typeFormingDeclaration(productTypeExpression);

//         return makeJudgement(typeFormationJudgement1.context, productTypeDeclaration);
// }



export const rules = {
    context: [emptyContext],
    typeFormation: [
        genericTypeFormation,
        unitFormation,
        productFormation,
        sumFormation,
        lambdaFormation,
    ],
    termConstruction: []
}