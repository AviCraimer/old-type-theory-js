import richard from "./richard";

const richdone = {}

// best version goes here

richdone.emptyContext = {
    kind: "context",
    entries: []
}


/*

There are five kinds of things:

A "term" (maybe variable), which is a value of a type (or may be a type itself, since we 
    are including a universe stack)

A "membership judgement" like x : A, for terms x and A

An "equality judgement" like x == y : A for terms x,y and A

A "context" -a list of membership judgements

A "sequent" -a context followed by a membership or equality judgement



*/

richdone.universeIntro = (inputContext, level) =>  {
    if (!inputContext.kind == "context") {
        throw new Error("First argument must be a context");
    }
    // HAVE to check level is non-negative integer, set to default as 0
    const babyUniverse = {
        kind: "term",
        label: "universe",
        // the label of a term indicates special features and extra slots
        name: ("universe" + level),
        level: level
    };
    const parentUniverse = {
        kind: "term",
        label: "universe",
        name: ("universe" + (level + 1)),
        level: (level + 1)
    };
    const outputConsequent = {
        kind: "membership judgement",
        value: babyUniverse,
        type: parentUniverse
    };
    const outputSequent = {
        kind: "sequent",
        context: inputContext,
        consequent: outputConsequent
    };
    return outputSequent
}

richdone.myFirstUniverse = richdone.universeIntro(richdone.emptyContext, 0);



// for now there are just two universes, the basic one, and the "parentUniverse"


/*
richdone.universeIntro = (inputContext) =>  {
    if (!entries in inputContext) {
        throw new Error("First argument must be a context");
    }
    return {
        kind: "term",
        name: "universe 0",
        label: "universe",
        hasType: "universe 1"
    }

if (!expressionKey in expression) {
    throw new Error("Type judgements need an expression, or no argument");
}

*/


export default richdone;
