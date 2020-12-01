import _ from "lodash"
import richard from "./richard";

const richsimp = {};

// implementation of new, simpler, type theory

richsimp.emptyContext = {
    kind: "context",
    entries: []
};


richsimp.exampleTerm1 = {
    kind: "term",
    label: "",
    name: "a",
};

richsimp.exampleType1 = {
    kind: "type",
    label: "",
    name: "A",
};

richsimp.exampleTypeDeclaration1 = {
    kind: "type declaration",
    value: richsimp.exampleTerm1,
    type: richsimp.exampleType1
};

richsimp.exampleJudgement1 = {
    kind: "judgement",
    context: richsimp.emptyContext,
    declaration: richsimp.exampleTypeDeclaration1
};

richsimp.exampleTerm2 = {
    kind: "term",
    label: "",
    name: "b",
};

richsimp.exampleType2 = {
    kind: "type",
    label: "",
    name: "B",
};

richsimp.exampleTypeDeclaration2 = {
    kind: "type declaration",
    value: richsimp.exampleTerm2,
    type: richsimp.exampleType2
};


richsimp.exampleJudgement2 = {
    kind: "judgement",
    context: richsimp.emptyContext,
    declaration: richsimp.exampleTypeDeclaration2
};





richsimp.productIntro = (inputJudgement1, inputJudgement2) => {

    if (!inputJudgement1.kind == "judgement" ) {
        throw new Error("First input must be a judgement");
    }
    
    if (!inputJudgement2.kind == "judgement" ) {
        throw new Error("Second input must be a judgement");
    }

    
    if (!inputJudgement1.declaration.kind == "type declaration" ) {
        throw new Error("First judgement must be a type declaration");
    }

    if (!inputJudgement2.declaration.kind == "type declaration" ) {
        throw new Error("Second judgement must be a type declaration");
    }

    if (!_.isEqual(inputJudgement1.context,inputJudgement2.context)) {
        throw new Error("Input judgements must have the same contexts")
    }

    const pairTerm = {
        kind: "term",
        label: "pair",
        name: "pair " + inputJudgement1.declaration.value.name + " " + inputJudgement2.declaration.value.name,
        first: inputJudgement1.declaration.value,
        second: inputJudgement2.declaration.value 
    };
    const productType = {
        kind: "type",
        label: "product",
        name: "product " + inputJudgement1.declaration.type.name + " " + inputJudgement2.declaration.type.name,
        first: inputJudgement1.declaration.type,
        second: inputJudgement2.declaration.type 
    };
    const outputDeclaration = {
        kind: "type declaration",
        value: pairTerm,
        type: productType
    };
    const outputJudgement = {
        kind: "judgement",
        context: inputJudgement1.context,
        declaration: outputDeclaration
    };
    return outputJudgement 
    };

richsimp.examplePair = richsimp.productIntro(richsimp.exampleJudgement1, richsimp.exampleJudgement2);    


//warnings and tests need adding above

export default richsimp;


