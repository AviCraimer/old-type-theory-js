import {subtypeCheck} from "./util";

// const getNumberOfArguments = selectedArguments => {
//     let count = 0;

//     selectedArguments.forEach(sa => {
//         if (sa.selectedContextDeclarations.length === 0) {
//             count++;
//         } else {
//             count = count + sa.selectedContextDeclarations.length;
//         }
//     });
//     return count;
// }

export const checkNumberOfArguments = acceptedArgCount /*array of numbers*/ => serializedArguments =>  {

    if (acceptedArgCount.includes(serializedArguments.length)) {
        return true
    }
    return false;
}

const checkArgumentTypes = argumentTypes => serializedArguments =>  {

    if (argumentTypes.length === serializedArguments.length) {

        let valid = true;

        serializedArguments.forEach((arg,i) => {
            console.log("arguments in checkArgument types", serializedArguments)
            if (arg.contextDeclaration === null) {
                //If there is no declaration selected within the context then the jdugement itself is considered to be the argument
                valid = valid && subtypeCheck(argumentTypes[i])(arg.judgement.type)
                console.log({valid})
            } else {
                //If a declaration is selected then the declaration is considered to be the argument for validation
                valid = valid && subtypeCheck(argumentTypes[i])(arg.contextDeclaration.type)
            }
        })

        return valid;
    }

    return false;
}


export const makeArgumentValidation = function ({acceptedArgCount = [], argumentTypes = []}

) {

    return serializedArguments => {


        if (checkNumberOfArguments(acceptedArgCount)(serializedArguments)) {

            //If there are fewer arguments, we need to truncate the types array.
            const truncatedArgumentTypes = argumentTypes.slice(0,serializedArguments.length);

            return checkArgumentTypes(truncatedArgumentTypes)(serializedArguments);
        };

        return false;
        ///Note: Add this back in if we need custom validation functions.
        // validationFns.forEach(fn =>
        //     valid = valid && fn(serializedArguments)
        // )
        // return valid;
    }

}