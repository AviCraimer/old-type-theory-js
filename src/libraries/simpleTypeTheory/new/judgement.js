import symbols from "./symbols";

export const isJudgement  = possibleJudgement => {
    if (possibleJudgement
        && typeof possibleJudgement === "object"
        && symbols.judgement.key in possibleJudgement) {
        return true;
    }
    return false;
};

export const makeJudgement = (context, optionalDeclaration) => {
    if (!optionalDeclaration ) {
        return {
            [symbols.judgement.key]: symbols.judgement.context,
            context: context,
            declaration: null,
            toString(){
                return `${context.toString()} context`
            }
        }
    } else {
        return {
            [symbols.judgement.key]: symbols.judgement.entailment,
            context: context,
            declaration: optionalDeclaration,
            toString() {
                return `${context.toString()} ⊢ ${optionalDeclaration.toString()}`
            }
        }
    }
}