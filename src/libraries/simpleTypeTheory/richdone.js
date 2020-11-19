import _ from "lodash"
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

/* below implements ctx-Ext, from page 554 of the HoTT book.
Basically, if the input sequent has a consequent that is a judgement that 
a term is a member of a universe, then we can make a variable with a type 
the same as that of the term. We output such a membership judgement appended to the 
end of the context of the input sequent.

It would be nice to record the types of terms as they are made, but this seems to 
cause issues when we have an infinite stack of universes. 
*/

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

// not sure what to call this inference rule. It is Vble from page 554 of the HoTT book.
richdone.vble = (inputContext, index) => {
    if (!inputContext.kind == "context") {
        throw new Error("First argument must be a context");
    }
    // HAVE to check inputContext.entries is not empty, and index is in 0..(inputContext.entries.length - 1)
    const outputConsequent = inputContext.entries[index];
    const outputSequent = {
        kind: "sequent",
        context: inputContext,
        consequent: outputConsequent
    };
    return outputSequent;
}

// "AA has type universe0 entails AA has type universe0"
richdone.AAisEntailsAAis = richdone.vble(richdone.myFirstGoodContext,0);
// try
// simpleTypeTheory.richdone.AAisEntailsAAis.consequent.value

// ("AA has type universe0", "xx has type AA") is a context  
richdone.AAandxxCTX = richdone.contextExtension(richdone.AAisEntailsAAis,"xx");

// ("AA has type universe0", "xx has type AA" entails "xx has type AA")
richdone.gotVariable = richdone.vble(richdone.AAandxxCTX,1);
// try
// simpleTypeTheory.richdone.gotVariable.context.entries[0].value
// simpleTypeTheory.richdone.gotVariable.context.entries[0].type
// simpleTypeTheory.richdone.gotVariable.context.entries[1].value
// simpleTypeTheory.richdone.gotVariable.context.entries[1].type
// simpleTypeTheory.richdone.gotVariable.consequent.value
// simpleTypeTheory.richdone.gotVariable.consequent.type

// Below proves the theoem that we can introduce a variable type (of universe level 0) 
// into any context. This can be taken as an axiom, together with vble and contextExtension
// to initialize the simple type theory.
richdone.addVariableTypeToContext = (inputContext, variableName) => {
    // HAVE to check input really is a context
    // variableName must be new to the context
    const universeSequent = richdone.universeIntro(inputContext, 0);
    const outputContext = richdone.contextExtension(universeSequent,variableName);
    return outputContext;
}

richdone.takeBackElements = (theArray, n) => {
    return theArray.slice(-n);
}

// The next rule comes from the HoTT book, page 554 (Wkg1), but I guess it is also required for simple type theory 
richdone.weakening = (inputSequent1, inputSequent2, variableName) => {
    // HAVE to check inputs really are sequents
    // check consequent of first sequent is a universe membership judgement
    // check consequent of second sequent is a membership judgement
    if (inputSequent1.context.entries.length > inputSequent2.context.entries.length) {
        throw new Error("The context of the first sequent cannot be longer than the context of the second")
    }
    if (!_.isEqual(inputSequent1.context.entries,inputSequent2.context.entries.slice(0,inputSequent1.context.entries.length))) {
        throw new Error("First sequent's context must be a prefix of second sequent's context")
    }
    // Below is Delta from the book
    const residueContextEntries = inputSequent2.context.entries.slice(-(inputSequent1.context.entries.length));
    const newTerm = {
        kind: "term",
        label: "variable",
        name: variableName
    };
    const newMembershipJudgement = {
        kind: "membership judgement",
        value: newTerm,
        type: inputSequent1.consequent.value
    };
    const outputContextEntries = inputSequent1.context.entries.concat([newMembershipJudgement]).concat(residueContextEntries);
    const outputContext = {
        kind: "context",
        entries: outputContextEntries
    };
    const outputSequent = {
        kind: "sequent",
        context: outputContext,
        consequent: inputSequent2.consequent
    };
return outputSequent; 
}

// test weakening

// we should maybe also implement the substitution rule and the equality rules from pages 554 and 555 of the book
// also U-CUMUL could be implemented

richdone.productIntro = (inputSequent1, inputSequent2) => {
// test sequents are proper, with same contexts, and both have consequents as membership judgements 
// about the same level universe
const productTerm = {
    kind: "term",
    label: "product",
    name: "product " + inputSequent1.consequent.value.name + inputSequent2.consequent.value.name,
    first: inputSequent1.consequent.value,
    second: inputSequent2.consequent.value 
};
const outputConsequent = {
    kind: "membership judgement",
    value: productTerm,
    type: inputSequent1.consequent.type
};
const outputSequent = {
    kind: "sequent",
    context: inputSequent1.context,
    consequent: outputConsequent
};
return outputSequent 
}

//warnings and tests need adding above

export default richdone;


