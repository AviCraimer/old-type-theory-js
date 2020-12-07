export const symbols = {
    expression: {
        key: Symbol("This is an expression."),
        term: {
            concrete: Symbol("This is a concrete term expression standing for a specific value of a type"),  //e.g.,   * : 1
            variable: Symbol("This is a term variable expression, standing for a generic inhabitant of a type.") //e.g.,   x : T
        },
        type: {
            base: Symbol("An irreducible base type"),  // e.g., T
            unit: Symbol("The unit type 1, with one term *"),  // 1
            empty: Symbol("The empty type 0, with no terms"), //  0
            function: Symbol("A function type"), // ->
            product: Symbol("A product type"), // x
            sum: Symbol("A sum type also known as coproduct type.") // +
        },
        judgement: {
            key: Symbol("A judgement"),
            context: Symbol("Judgement that this is a well formed context"),
            entailment: Symbol("Judgement that a context entails a declaration")
        }
    },
    context: {
        key: Symbol("A context"),
        empty: Symbol("The empty context"),
        nonEmpty: Symbol("A non-empty context")
    },
    declaration: {
        key: Symbol("This is a declaration."),
        typeForming: Symbol("Declaration that this is a valid type."),
        membership: Symbol("A declaration that a term (either concrete or variable) inhabits some type"),
        equality: Symbol("Declaration that two terms of the same type are strictly equal."),
    },
}



export default symbols;