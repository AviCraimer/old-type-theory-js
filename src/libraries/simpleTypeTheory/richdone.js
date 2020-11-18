import richard from "./richard";

const richdone = {}

// my best version goes here


/*

There are five kinds of things:

A "term" (maybe variable), which is a value of a type (or may be a type itself, since we 
    are including a universe stack)

A "membership judgement" like x : A, for terms x and A

An "equality judgement" like x == y : A for terms x,y and A

A "context" -a list of membership judgements

A "sequent" -a context followed by a membership or equality judgement

*/

richdone.emptyContext = {
    kind: "context",
    entries: []
}


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

richdone.myUniverseSequent = richdone.universeIntro(richdone.emptyContext, 0);

// below implements ctx-Ext, from page 554 of the HoTT book
richdone.contextExtension = (inputSequent, variableName) =>  {
    if (!inputSequent.kind == "sequent") {
        throw new Error("Argument must be a sequent");
    }
    if (!inputSequent.consequent.kind == "membership judgement") {
        throw new Error("Consequent of sequent must be a membership judgement")
    }
    if (!inputSequent.consequent.type.label == "universe") {
        throw new Error("Consequent of sequent must refer to a member of a universe")
    }
    var inputContextEntries = inputSequent.context.entries;
    // HAVE to check none of the values of the input context entries have the same name as variableName
    // Should also check variableName is a string, and add default with counter, if it's missing.
    const newTerm = {
        kind: "term",
        label: "variable",
        name: variableName
    };
    const newMembershipJudgement = {
        kind: "membership judgement",
        value: newTerm,
        type: inputSequent.consequent.value
    };
    inputContextEntries.push(newMembershipJudgement);
    const outputContext = {
        kind: "context",
        entries: inputContextEntries
    };
    return outputContext;
}

richdone.myFirstGoodContext = richdone.contextExtension(richdone.myUniverseSequent,"AA")

// try
// simpleTypeTheory.richdone.myFirstGoodContext.entries[0].value


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
