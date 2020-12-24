export const Expression = [Symbol("is expression.")]
    export const Term = [...Expression, Symbol("is term expression")]
        export const VariableTerm = [...Term, Symbol("is variable term")]
        export const UnitTerm = [...Term, Symbol("is unit term")]  //e.g.,   * : 1
        export const PairTerm = [...Term, Symbol("is pair term")] //value of product type
        export const EitherTerm = [...Term, Symbol("is either term")] // value of sum type
        export const FunctionTerm = [...Term, Symbol("is function term")]
    export const Type = [...Expression, Symbol("is type expression")];
        export const GenericType = [...Type, Symbol("is generic type")]
        export const UnitType = [...Type, Symbol("is unit type")]
        export const EmptyType = [...Type, Symbol("is empty type")]
        export const ProductType = [...Type, Symbol("is product type")]
        export const SumType = [...Type, Symbol("is sum type")]
        export const FunctionType = [...Type, Symbol("is function type")]


export const Judgement = [Symbol("A judgement")];
    export const ContextJudgement = [...Judgement, Symbol("is context judgement")];
    export const EntailmentJudgement = [...Judgement, Symbol("is entailment judgement")];
        export const MembershipJudgement = [...EntailmentJudgement, Symbol("is membership judgement")];
        export const TypeFormationJudgement = [...EntailmentJudgement, Symbol("is type formation judgement")];
        export const EqualityJudgement = [...EntailmentJudgement, Symbol("is equality judgement")];

export const Context = [Symbol("is context")]

export const Declaration = [Symbol("is declaration")]
    export const TypeFormationDeclaration = [...Declaration, Symbol("is type formation declaration")]
    export const MembershipDeclaration = [...Declaration, Symbol("is membership declaration")]
    export const EqualityDeclaration = [...Declaration, Symbol("is equality declaration")]



