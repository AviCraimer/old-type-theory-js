const richob = {}

//A symbol is like a string, but it is guarenteed to be unique
//The code below is an object. 
richob.expressionKinds = {
    variable: Symbol("a variable"),
    product: Symbol("a product"),
    coproduct: Symbol("a coproduct")
}
// ADD UNIT TYPE, STAR, EMPTY TYPES, PAIRS, FUNCTIONS, LAMBDA'S ETC.
// example:
// simpleTypeTheory.richob.expressionKinds.product


// Below is used to refer to the slot where the "kind" of an expression is stored
const expressionKey = Symbol("Is an expression of kind: ")
// should this be given richob prefix ? If not, how to use it in the console ?

richob.judgementKinds = {
    type: Symbol("Judgement that this variable is a type"),
    context: Symbol("Judgement that this variable is a context"),
    membership: Symbol("Judgment that a variable is a term in a type"),
    equality: Symbol("Judgment that two terms of the same type are equal")
}
// MAYBE DISCARD CONTEXT, MEMBERSHIP DOES NOT HAVE TO JUST BE FOR VARIABLES

// below makes the constants judgementKinds and expressionKinds
const {judgementKinds, expressionKinds} = richob;










export default richob;


