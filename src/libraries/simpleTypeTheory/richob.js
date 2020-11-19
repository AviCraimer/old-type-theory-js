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
    //AVI: It allows the toString methods to output strings for nested expressions and put brackets around compound expressions but not around atomic variables. e.g., see the tests: (T_O x T_1) x T_1
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

            //Avi: Yes. Using the backticks `` you can insert any javascript expression inside ${} and it will execute and concatente the results into the string. This is called a "string template literal"
    }
}

//No to be called directly
let  termVariableCounter = 0;
let  typeVariableCounter = 0;
// WE SHOULD MAYBE HAVE A STACK OF UNIVERSES EVENTUALLY
// if no inputs are given, the function below makes a new variable, if the typeVar is set to true it makes that variable name a T_n

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
            //Avi: it goes on the expression object, so you if you log that object to the console you will see it as one of the properties fo the object.
        toString: () => name
    }
}

//Produces a variable and judges it to be a type
//I'm doing it this way since we haven't introduced universes yet

// function below judges an expression to be a type, or makes a new type 
// if no expression is supplied.
richob.typeJudgement = (expression) => {

    //If expression is falsey, form a new atomic type variable
    if (!expression) {
        expression = richob.makeVariable("", true)

    } //If expression is truthy check that it is an expression
    else if (!expressionKey in expression) {
        throw new Error("Type judgements need an expression, or no argument");
    }

    return  {
        expression,
        // does this make the same object as expression, but with the judgement
        // and toString slots appended/rewritten ?
        judgement: judgementKinds.type,
        toString: () => expression.toString() + " type"
    }
}













export default richob;


