import _ from "lodash"

const richard = {}

//Your code goes under here
//example:
richard.myIdentityFunction = (x) => x;


/*

This is the start of an implementation of simple type theory.

A "context entails assertion" sentence is a length 2 array (the context followed by the assertion)

A context declaration sentence is a length 1 array (containing the context, as an array)

A membership assertion x:X is stored as a length 2 array

An equality assertion x=y:X is stored as a length 3 array

A context is an array of membership assertions

*/

/* isAssertionSentence takes s and a number n as an input. 
If s is a well formed assertion sentence then the function returns true,
otherwise the function returns an error message string with refers to 
the sentence as "sentence n" */ 
richard.isAssertionSentence = (s, n) => {
    if (!(Array.isArray(s))){
        return "error: sentence " + n + " is not an array"
    } else {
        if (!(s.length == 2)){
            return "error: sentence " + n + " does not have length 2"  
        } else {
            if (!(Array.isArray(s[0]))){
                return "error: first part of sentence " + n + " is not an array"
            } else {
                if (!(Array.isArray(s[1]))){
                    return "error: second part of sentence " + n + " is not an array"
                } else {
                    if (!(((s[1]).length == 2) || ((s[1]).length == 3) )){
                        return "error: second part of sentence " + n + " does not have length 2 or 3"
                    } else {
                        return true
                    }
                }
        }
    }
}
}

/* The function below is same as above, except below requires the assertion to be about membership" */ 


richard.isMembershipAssertionSentence = (s, n) => {
    if (!(Array.isArray(s))){
        return "error: sentence " + n + " is not an array"
    } else {
        if (!(s.length == 2)){
            return "error: sentence " + n + " does not have length 2"  
        } else {
            if (!(Array.isArray(s[0]))){
                return "error: first part of sentence " + n + " is not an array"
            } else {
                if (!(Array.isArray(s[1]))){
                    return "error: second part of sentence " + n + " is not an array"
                } else {
                    if (!((s[1]).length == 2)){
                        return "error: second part of sentence " + n + " does not have length 2"
                    } else {
                        return true
                    }
                }
        }
    }
}
}



// We are using using isEqual from loadash
richard.deepEqualityDemo = _.isEqual([3,[2,2]],[3,[2,2]])


// if the input sentences are membership assertions with the same context 
// then the below function outputs the sentence about the pair within the product
richard.productIntro = (s1, s2) => {
    const m1 = richard.isMembershipAssertionSentence(s1, 1)
    const m2 = richard.isMembershipAssertionSentence(s2, 2)
    if (!(m1 == true)){
        return m1
    } else {
        if (!(m2 == true)){
            return m2
        } else {
       if (! _.isEqual(s1[0], s2[0])){
                return "error: inputs must have the same context"
            } else {
                const a1 = s1[1]
                const a2 = s2[1]
                return [s1[0],[["pair",a1[0],a2[0]],["Product",a1[1],a2[1]]]]
            }

        }
        }
    }


richard.productExample = richard.productIntro([[],["a","A"]],[[],["b","B"]])

/* 
richard.Car = (make, model, year) => {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  */

richard.carExample = new Car ('Eagle', 'Talon TSi', 1993);

function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

function MembershipAssertion(value, type) {
    this.value = value;
    this.type = type;
    this.label = "MembershipAssertion";
}

richard.MembershipAssertionExample1 = new MembershipAssertion("b", "B");


/* try this
simpleTypeTheory.richard.productExample[1][1]

learn about object oriented approach

restructure code

*/



//No code below here
export default richard;