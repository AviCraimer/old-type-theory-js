import {makeContext, isContext} from "./context";
import {makeJudgement, isJudgement, isContextJudgement, isTypeFormationJudgement, isMembershipJudgement} from "./judgement";
import {makeVariable, makeBaseType,unitTypeExpression, emptyTypeExpression,  makeProductType, unitTermExpression, makePairTerm, makeFunctionTerm, makeSumType,
    makeFunctionType} from "./expressionFactories";
import {equalityDeclaration, makeMembershipDeclaration, makeTypeFormingDeclaration} from "./declarationFactories";
import symbols from "./symbols";
import * as TSTypes from "./typeSystemTypes";
const symbolsExp = symbols.expression;



const argumentFail = function (args, length) {
    if (args.length === length) {
        return false;
    } else {
        return true;
    }
}


// CONTEXT RULES


//EMPTY CONTEXT - Rule 1 in pdf
export const emptyContext = function () {
    return makeJudgement(makeContext());
}
emptyContext.displayName = "Empty Context";
emptyContext.validation = {acceptedArgCount: [0]};

//CONTEXT EXTENSION - Rule 8 in pdf

export const contextExtension = function ({judgement}) {
    const typeDeclaration = judgement.declaration;

    const membershipDeclaration = makeMembershipDeclaration(makeVariable(), typeDeclaration);

    const extendedContext =  judgement.context.add(membershipDeclaration);

    return  makeJudgement(extendedContext);
}
contextExtension.displayName = "Context Extension"
contextExtension.validation = {acceptedArgCount: [1], argumentTypes: [TSTypes.TypeFormationJudgement]}

//END OF CONTEXT RULES

//Rule 2 in pdf
export const genericTypeFormation = function ({judgement}) {
    console.log("Generic Type formation arguments\n", judgement);
    const T =  makeBaseType();
    const typeFormingDeclaration = makeTypeFormingDeclaration(T);
    return makeJudgement(judgement.context, typeFormingDeclaration);
}

genericTypeFormation.displayName = "Generic Type"
genericTypeFormation.validation = {acceptedArgCount: [1], argumentTypes: [TSTypes.ContextJudgement]}



//Rule 3 in pdf
const unitTypeFormingDeclaration = makeTypeFormingDeclaration(unitTypeExpression);
export const unitFormation = function ({judgement}) {
    return makeJudgement(judgement.context, unitTypeFormingDeclaration);
}
unitFormation.displayName = "Unit Type"
unitFormation.validation = {acceptedArgCount: [1], argumentTypes: [TSTypes.ContextJudgement]}



//Rule 5 in pdf
const emptyTypeFormingDeclaration = makeTypeFormingDeclaration(emptyTypeExpression);
export const emptyFormation = function ({judgement}) {
    return makeJudgement(judgement.context, emptyTypeFormingDeclaration);
}
emptyFormation.displayName = "Empty Type"
emptyFormation.validation = {acceptedArgCount: [1], argumentTypes: [TSTypes.ContextJudgement]};

//Common functionality for product type, sum type, and function type formation
const twoTypeCombination = combinedTypeExpressionFunction => {
    let typeComboFunction = function ( arg1, arg2) {

        //If there is only one argument, use the first type formation judgement twice.
        if (!arg2) {
            arg2 = arg1;
        }

        const typeFormationJudgement1 = arg1.judgement;
        const typeFormationJudgement2 = arg2.judgement;

        //NOTE: This is an additional validation function it should be moved to the validation object.
        const contextsMatch = typeFormationJudgement1.context.eq(typeFormationJudgement2.context);

        if (contextsMatch) {

            //Use provided function to make a combined type expression (e.g., makeProductType)
            const combinedTypeExpression = combinedTypeExpressionFunction(typeFormationJudgement1.declaration.expression, typeFormationJudgement2.declaration.expression)

            const combinedTypeDeclaration = makeTypeFormingDeclaration(combinedTypeExpression);

            return makeJudgement(typeFormationJudgement1.context, combinedTypeDeclaration);
        }
    }

    typeComboFunction.validation = {
        acceptedArgCount: [1],
        argumentTypes: [
            TSTypes.TypeFormationJudgement, TSTypes.TypeFormationJudgement
        ]};
    return typeComboFunction;
}

//Rule 4 in pdf
export const productFormation = twoTypeCombination(makeProductType);
productFormation.displayName = "Product Type";
productFormation.description = "Get a product type from two entailment judgements with the same context on the left side, and a type declaration on the right side."

//Rule 6 in pdf
export const sumFormation = twoTypeCombination(makeSumType);
sumFormation.displayName = "Sum Type";

//Rule 7 in pdf
export const functionFormation = twoTypeCombination(makeFunctionType);
functionFormation.displayName = "Function Type";


// Term Construction Rules

//Rule 9 in PDF -> Modified to take three context judgement arguments, since the context must be partitioned. The middle context judgement must contain only a single member
export const reiteration = function (gammaContextJ, singletonContextJ, deltaContextJ) {
    if (argumentFail(arguments, 3) || [...arguments].map(isContextJudgement).includes(false)) {//All arguments are contextJudgements
        return;
    };
    if (singletonContextJ.context.list.length === 1) {
        const combinedContext =   gammaContextJ.context
            .concat(singletonContextJ.context)
            .concat(deltaContextJ.context)

        const [membershipDeclaration] =  singletonContextJ.context.list;

        return makeJudgement(combinedContext, membershipDeclaration);
    }
}
reiteration.displayName = "Reiteration"



const unitMembershipDeclaration = makeMembershipDeclaration(unitTermExpression, unitTypeFormingDeclaration )

//Rule 14
export const unitIntro = function (contextJudgement) {
    if (argumentFail(arguments, 1)) {
        return;
    }
    if (isContextJudgement(contextJudgement)) {
        return makeJudgement(contextJudgement.context, unitMembershipDeclaration  )
    }
}

unitIntro.displayName = "Unit Intro";

//Rule 15
export const productIntro = function (membershipJudgement1, membershipJudgement2) {
    if (argumentFail(arguments, 2) && argumentFail(arguments, 1) ) {
        return;
    }
    const bothMembershipJudgements = isMembershipJudgement(membershipJudgement1) && isMembershipJudgement(membershipJudgement2);

    if (!bothMembershipJudgements) {
        return;
    }

    const contextMatch = membershipJudgement1.context.eq(membershipJudgement2.context);
    console.log({contextMatch, context1: membershipJudgement1.context, context2: membershipJudgement2.context})

    if (contextMatch) {
        const newTerm = makePairTerm(membershipJudgement1.declaration.termExpression, membershipJudgement2.declaration.termExpression );

        const productType = makeProductType(membershipJudgement1.typeExpression, membershipJudgement2.typeExpression);

        //Change makeMembershipDeclaration to take typeExpression
        // const makeMembershipDeclaration(  )

        // return makeJudgement(membershipJudgement1.context, )
    }

}

//Rule 15
productIntro.displayName = "Product Intro"
// export const rule = function () {

// }
// rule.displayName = ""
// export const rule = function () {

// }
// rule.displayName = ""


//Rule 22 - Function Introction - Not final version for export since it could lead to variable clashes
export const simpleFunctionIntro = function (membershipJudgementWithOneDeclarationInContext  ) {
    if (argumentFail(arguments, 1)) {
        return null;
    }

    if (!isMembershipJudgement(membershipJudgementWithOneDeclarationInContext)) {
        return null;
    }

    const {context} = membershipJudgementWithOneDeclarationInContext;

    const hasSingleDeclaration = context.list.length === 1;

    if (!hasSingleDeclaration) {
        return null;
    }

    const domain = membershipJudgementWithOneDeclarationInContext.context.list[0]; // e.g., x:A
    const codomain = membershipJudgementWithOneDeclarationInContext.declaration; // e.g., y:B

    const fn = makeFunctionTerm(domain, codomain);

    const tfJudgementDomain = makeJudgement( context, makeTypeFormingDeclaration( domain.typeExpression) )

    const tfJudgementCodomain = makeJudgement( context, makeTypeFormingDeclaration( codomain.typeExpression) )

    const fnTypeJudgement = functionFormation(tfJudgementDomain,  tfJudgementCodomain )

    const fnMembershipDeclaration = makeMembershipDeclaration(fn,  fnTypeJudgement.declaration );

    return makeJudgement( makeContext(), fnMembershipDeclaration);

}
simpleFunctionIntro.displayName = "Function Intro"

export const rules = {
    context: [emptyContext, contextExtension],
    typeFormation: [
        genericTypeFormation,
        unitFormation,
        emptyFormation,
        productFormation,
        sumFormation,
        functionFormation,
    ],
    termConstruction: [
    //     reiteration,
    //     unitIntro,
    //     simpleFunctionIntro
    ]
}

