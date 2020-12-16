import symbols from "./symbols";

const symbolsExp = symbols.expression;

export const isJudgement  = possibleJudgement => {
    if (possibleJudgement
        && typeof possibleJudgement === "object"
        && symbolsExp.judgement.key in possibleJudgement) {
        return true;
    }
    return false;
};

export const isContextJudgement = possibleJudgement => {
    return isJudgement(possibleJudgement) && possibleJudgement[symbolsExp.judgement.key] === symbolsExp.judgement.context
}

export const isTypeFormationJudgement = (possibleJudgement) => (
    isJudgement(possibleJudgement)
    && possibleJudgement.declaration
    && possibleJudgement.declaration[symbols.declaration.key] === symbols.declaration.typeForming
)

export const isMembershipJudgement = (possibleJudgement) => (
    isJudgement(possibleJudgement)
    && possibleJudgement.declaration
    && possibleJudgement.declaration[symbols.declaration.key] === symbols.declaration.membership
)

export const makeJudgement = (context, optionalDeclaration) => {
    if (!optionalDeclaration ) {
        return {
            [symbolsExp.judgement.key]: symbolsExp.judgement.context,
            context: context,
            declaration: null,
            toString(){
                return `${context.toString()} context`
            }
        }
    } else {
        return {
            [symbolsExp.judgement.key]: symbolsExp.judgement.entailment,
            context: context,
            declaration: optionalDeclaration,
            toString() {
                return `${context.toString()} ⊢ ${optionalDeclaration.toString()}`
            }
        }
    }
}