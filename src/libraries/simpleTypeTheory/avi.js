const avi = {}

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
        variableType: (typeVar === true) ? "type variable" : "term variable"
    }
}

avi.membershipAssertion = (termVariable, typeVariable) => {
    return {
        judgement: "membership",
        term: termVariable,
        ofType: typeVariable
    }
}

avi.equalityAssertion = (membershipAssertion1, membershipAssertion2) =>  {
    //Check that the two membership assertions have different types
    if (!membershipAssertion1.ofType === membershipAssertion2.ofType) {
        console.error(membershipAssertion1, membershipAssertion2 )
        throw new Error("The membership assertions do not have the same types");
    }

    return {
        judgement: "equality",
        left: membershipAssertion1,
        right: membershipAssertion2
    }
}

avi.makeContext = () => {

}


//Runtime tests
const x0 = avi.makeVariable()
const x1 = avi.makeVariable()
const T0 = avi.makeVariable("", true)
const x0_in_T0 = avi.membershipAssertion(x0, T0)
const x1_in_T0 = avi.membershipAssertion(x1, T0)
const x0_eq_x1 = avi.equalityAssertion(x0_in_T0, x1_in_T0);

avi.tests = {
    x0,
    x1,
    T0,
    x0_in_T0,
    x1_in_T0,
    x0_eq_x1,
}



export default avi;

