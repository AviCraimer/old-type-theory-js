import {makeContext, isContext} from "./context";
import {makeJudgement, isJudgement, isContextJudgement} from "./judgement";
import {makeVariable, makeBaseType, makeProductType} from "./expressionFactories";
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


export const _01_emptyContext = function () {
    if (argumentFail(arguments, 0)) {
        return;
    };
    return makeJudgement(makeContext());
}
_01_emptyContext.displayName = "Empty Context";

export const _02_baseTypeFormation = function (contextJudgement) {
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

_02_baseTypeFormation.displayName = "Base Type Formation"

const unitTypeExpression = {
    name: "Unit Type",
    [symbols.expression.key]: symbols.expression.type.unit,
    toString: () => "1"
}

export const _03_unitFormation = function (contextJudgement) {
    if (argumentFail(arguments, 1)) {
        return;
    };
    if (isContextJudgement(contextJudgement)) {
        const TDeclaration = typeFormingDeclaration(unitTypeExpression);
        return makeJudgement(contextJudgement.context, TDeclaration);
    }
}
_03_unitFormation.displayName = "Unit Type Formation"


export const _04_productFormation = function ( typeFormationJudgement1, typeFormationJudgement2) {
    //Takes one or two arguments
    if (argumentFail(arguments, 1) && argumentFail(arguments, 2)) {
        return;
    };

    //If there is only one argument, use the first type formation judgement twice.
    if (!typeFormationJudgement2) {
        typeFormationJudgement2 = typeFormationJudgement1;
    }
    const isTypeFormationJudgement = (tj) => (
        isJudgement(tj)
        && tj.declaration
        && tj.declaration[symbols.declaration.key] === symbols.declaration.typeForming
    )

    const bothAreTFJudgements = isTypeFormationJudgement(typeFormationJudgement1) && isTypeFormationJudgement(typeFormationJudgement2);

    const contextsMatch = typeFormationJudgement1.context.eq(typeFormationJudgement2.context);

    if (bothAreTFJudgements && contextsMatch) {
        const productTypeExpression =  makeProductType(typeFormationJudgement1.declaration.expression, typeFormationJudgement2.declaration.expression )

        const productTypeDeclaration = typeFormingDeclaration(productTypeExpression);

        return makeJudgement(typeFormationJudgement1.context, productTypeDeclaration);
    }

}

_04_productFormation.displayName = "Product Type Formation";
_04_productFormation.description = "Get a product type from two entailment judgements with the same context on the left side, and a type declaration on the right side."