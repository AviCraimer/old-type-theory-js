const avi = {}


//A symbol is like a string, but it is guarenteed to be unique
avi.expressionKinds = {
    variable: Symbol("a variable"),
    product: Symbol("a product"),
    coproduct: Symbol("a coproduct")
}
const expressionKey = Symbol("Is an expression of kind: ")

avi.judgementKinds = {
    type: Symbol("Judgement that this variable is a type"),
    context: Symbol("Judgement that this variable is a context"),
    membership: Symbol("Judgment that a variable is a term in a type"),
    equality: Symbol("Judgment that two terms of the same type are equal")
}

const {judgementKinds, expressionKinds} = avi;

avi.bracketedExpressionString = (expression) => {
    if (! expressionKey in expression) {
        throw new Error("Not an expression");
    }

    if (expression[expressionKey] === expressionKinds.variable) {
        return expression.toString();
    } else {
        return `(${expression.toString()})`
    }
}

//No to be called directly
let  termVariableCounter = 0;
let  typeVariableCounter = 0;
avi.makeVariable = (name, typeVar) => {
    if (!name) {
        if (typeVar === true) {
            name = "T_" + typeVariableCounter;

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
        [expressionKey]: expressionKinds.variable,
        toString: () => name
    }
}

//Produces a variable and judges it to be a type
//I'm doing it this way since we haven't introduced universes yet
avi.typeJudgement = (expression) => {

    //If expression is falsey, form a new atomic type variable
    if (!expression) {
        expression = avi.makeVariable("", true)

    } //If expression is truthy check that it is an expression
    else if (!expressionKey in expression) {
        throw new Error("Type judgements need an expression, or no argument");
    }

    return  {
        expression,
        judgement: judgementKinds.type,
        toString: () => expression.toString() + " type"
    }
}

avi.membershipJudgement = (typeJudgement) => {
    const termExpression = avi.makeVariable()

    if (!typeJudgement.judgement === judgementKinds.type ) {
        throw new Error("Membership judgement was called without a type Judgement.\n Instead " + typeJudgement + "was provided");
    }

    return {
        judgement: judgementKinds.membership,
        term: termExpression,
        ofType: typeJudgement.expression,
        toString: () => `${termExpression.toString()} : ${typeJudgement.expression.toString()}`
    }
}

avi.equalityJudgement = (membershipJudgement1, membershipJudgement2) =>  {
    //Check that the two membership Judgements have different types
    if (!membershipJudgement1.judgement === judgementKinds.membership
        && !membershipJudgement2.judgement === judgementKinds.membership) {
            console.error(membershipJudgement1, membershipJudgement2)
            throw new Error("Equality judgement was called without two membership judgements.")
        }

    if (!membershipJudgement1.ofType === membershipJudgement2.ofType) {
        console.error(membershipJudgement1, membershipJudgement2 )
        throw new Error("The membership Judgements do not have the same types");
    }

    return {
        judgement: judgementKinds.equality,
        left: membershipJudgement1,
        right: membershipJudgement2
    }
}
avi.productToString = function (product) {
    return `(${product.first.toString()} x ${product.second.toString()})`
}

//Form a product type from 2 type judgements
avi.productFormation = (typeJudgement1, typeJudgement2) => {
    if (!typeJudgement1.judgement === judgementKinds.type
    && !typeJudgement2.judgement === judgementKinds.type  ) {
        throw new Error("Need to provide two type judgements to form a product type")

    }

    const productExpression =  {
        first: typeJudgement1,
        second: typeJudgement2,
        [expressionKey]: expressionKinds.product,
        toString: () => `${avi.bracketedExpressionString(typeJudgement1.expression)} x ${avi.bracketedExpressionString(typeJudgement2.expression)}`,
    }

    return avi.typeJudgement(productExpression);


}



//Runtime tests
const T0 = avi.typeJudgement();
const x0_in_T0 = avi.membershipJudgement(T0)
const x1_in_T0 = avi.membershipJudgement(T0)
const x0_eq_x1 = avi.equalityJudgement(x0_in_T0, x1_in_T0);
const T1 = avi.typeJudgement();
const T0_x_T1 = avi.productFormation(T0, T1);
const T0_x_T1__T1 = avi.productFormation(T0_x_T1, T1);


avi.tests = {
    T0,
    x0_in_T0,
    x1_in_T0,
    x0_eq_x1,
    T1,
    T0_x_T1,
    T0_x_T1__T1
}



export default avi;

