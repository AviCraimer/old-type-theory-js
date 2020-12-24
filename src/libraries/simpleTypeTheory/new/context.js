import symbols from "./symbols";
import {isEqual} from "lodash";
import {Context} from "./typeSystemTypes";
const contextSym = symbols.context;


export const isContext = possibleContext => {
    if (possibleContext
        && typeof possibleContext === "object"
        && contextSym.key in possibleContext) {
        return true;
    }
    return false;
};

export const makeContext = (list = []) => ( {
    [contextSym.key]: (list.length > 0) ? contextSym.nonEmpty : contextSym.empty,
    type: Context,
    list: [...list],
    isContext,
    add(membershipDeclaration) {
        if (!membershipDeclaration[symbols.declaration.key] ===   symbols.declaration.membership) {
            console.error("Attempt to add to context failed, not a membership declaration")
        } else {
            //make a new context with the added membership declaration
            return makeContext([...this.list, membershipDeclaration]);
        }
    },
    concat(otherContext) {
        if (this.isContext(otherContext)) {
            const newList = [...this.list, ...otherContext.list];
            return makeContext(newList);
        } else {
            console.error("context concatenation could not be purformed with a non-context\n", otherContext);
        }
    },

    eq(otherContext) {
        return isEqual(this, otherContext);
    //For now just use deep equality
        // if(this.isContext(otherContext) && this.list.length === otherContext.list.length ) {
        //     let answer = true;
        //     this.list.forEach( (m,i) => {
        //         //If it any membership declaration in the list is not equal, set answer to false
        //         //Set answer only if it is true
        //         answer = (answer === true) ? m.eq(otherContext.list[i]) : answer;
        //     });
        //     return answer;
        // }
        // return false;
    },
    toString() {
        if (this.list.length === 0) {
            return "."
        }
        if (this.list.length === 1) {
            return this.list[0].toString();
        } else {
            return this.list.map(x=>x.toString()).join(", ");
        }
    }
});
