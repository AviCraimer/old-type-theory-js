import private from "./avi";
import private from "./avi-OLD";

const {basicKinds,
expressionKinds,
judgementKinds,
bracketedExpressionString,
makeVariable,
typeJudgement,
makeVariable,
membershipJudgement,
makeVariable,
equalityJudgement,
productToString,
productFormation} = private;

const pub = {}

pub.emptyContext = {
    kind: "context",
    entries: []
}

