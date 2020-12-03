export const symbols = {
    expression: {
        key: Symbol("This is an expression."),
        term: {
            concrete: Symbol("This is a concrete term expression standing for a specific value of a type"),
            variable: Symbol("This is a term variable expression, standing for a generic inhabitant of a type.")
        },
        type: {
            primitive: Symbol("An irreducible primitive type"),
            unit: Symbol("The unit type 1, with one term *"),
            empty: Symbol("The empty type 0, with no terms"),
            function: Symbol("A function type"),
            product: Symbol("A product type"),
            sum: Symbol("A sum type also known as coproduct type.")
        },
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
        context: Symbol("Declaration that a context is")
    }
}



export default symbols;