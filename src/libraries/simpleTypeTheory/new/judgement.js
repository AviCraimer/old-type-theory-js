import symbols from "./symbols";
import {
    Judgement,
    ContextJudgement,
    MembershipJudgement,
    TypeFormationJudgement,
    EqualityJudgement,
    TypeFormationDeclaration,
    MembershipDeclaration,
    EqualityDeclaration} from  "./typeSystemTypes";
import { checkSubtypeInObject} from "./util";
const symbolsExp = symbols.expression;


export const isJudgement  = checkSubtypeInObject(Judgement);

export const isContextJudgement = checkSubtypeInObject(ContextJudgement);

export const isTypeFormationJudgement = (possibleJudgement) => (
    isJudgement(possibleJudgement)
    && possibleJudgement.declaration
    && checkSubtypeInObject( TypeFormationDeclaration, possibleJudgement.declaration.type)
)

export const isMembershipJudgement = (possibleJudgement) => (
    isJudgement(possibleJudgement)
    && possibleJudgement.declaration
    && checkSubtypeInObject( MembershipDeclaration, possibleJudgement.declaration.type)
)



export const makeJudgement = (context, optionalDeclaration) => {
    if (!optionalDeclaration ) {
        return {
            [symbolsExp.judgement.key]: symbolsExp.judgement.context,
            type: ContextJudgement,
            context: context,
            declaration: null,
            toString(){
                return `${context.toString()} context`
            }
        }
    } else {
        const declarationType = optionalDeclaration.type;
        let judgementType;
        switch (declarationType) {
            case MembershipDeclaration:
                judgementType = MembershipJudgement;
                break;
            case TypeFormationDeclaration:
                judgementType = TypeFormationJudgement;
                break;
            case EqualityDeclaration:
                judgementType = EqualityJudgement;
                break;
            default:
                break;
        }


        return {
            [symbolsExp.judgement.key]: symbolsExp.judgement.entailment,
            type: judgementType,
            context: context,
            declaration: optionalDeclaration,
            toString() {
                return `${context.toString()} ⊢ ${optionalDeclaration.toString()}`
            }
        }
    }
}