import {makeContext, isContext} from "./context";
import {makeJudgement, isJudgement} from "./judgement";
import {makeVariable, makeBaseType, makeProductType} from "./expressionFactories";
import {equalityDeclaration, membershipDeclaration, typeFormingDeclaration} from "./declarationFactories";
import symbols from "./symbols";


export const _01_emptyContext = ()  => {
    return makeJudgement(makeContext());
}
_01_emptyContext.displayName = "Empty Context";

export const _02_baseTypeFormation = (contextJudgement) => {
    if (
        isJudgement(contextJudgement)
        && contextJudgement[symbols.judgement.key] === symbols.judgement.context) {
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

export const _03_unitFormation = (context) => {
    if (
        isJudgement(contextJudgement)
        && contextJudgement[symbols.judgement.key] === symbols.judgement.context) {
        const TDeclaration = typeFormingDeclaration(unitTypeExpression);
        return makeJudgement(contextJudgement.context, TDeclaration);
    }
}
_03_unitFormation.displayName = "Unit Type Formation"


export const _04_productFormation = ( typeFormationJudgement1, typeFormationJudgement2) => {
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