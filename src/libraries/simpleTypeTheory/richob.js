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


// Below returns the string which is the expression's name, wrapped in brackets iff the 
// expression is not a variable
// what's the use ?
richob.bracketedExpressionString = (expression) => {
    if (! expressionKey in expression) {
        throw new Error("Not an expression");
    }

    if (expression[expressionKey] === expressionKinds.variable) {
        return expression.toString();
    } else {
        return `(${expression.toString()})`
        // what does the syntax in the previous line mean ?
        // `(${"dog"})` 
        // is "(dog)"
        // `cat` 
        // is "cat"
    }
}

//No to be called directly
let  termVariableCounter = 0;
let  typeVariableCounter = 0;
// WE SHOULD MAYBE HAVE A STACK OF UNIVERSES EVENTUALLY 
// if no inputs are given, the function below makes a new variable, otherwise it makes a new type
richob.makeVariable = (name, typeVar) => {
    if (!name) {
        if (typeVar === true) {
            name = "T_" + typeVariableCounter;
            // if the variable made is a type, should that be recorded in the object information ?

            //Increment the type variable counter
            typeVariableCounter++;
        } else {
            name = "x_" + termVariableCounter;
            

            //Increment the term variable counter
            termVariableCounter++;
        }
    }

    return  {
        name: name,
        // name is a string
        [expressionKey]: expressionKinds.variable,

        /* x = richob.makeVariable 
         x[expressionKey] says the kind of the expression is a variable,
         but how to display this in the console ? For example, if I do 
         mv = simpleTypeTheory.avi.makeVariable("bob",false) 
         Then how can I see mv[expressionKey] in the console ?
         since expressionKey is not in the console */

        toString: () => name
    }
}












export default richob;


