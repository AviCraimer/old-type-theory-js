import {bracketedExpressionString,subtypeCheck, checkSubtypeInObject } from "../new/util";
import symbols from "../new/symbols";

describe('Simple type theory utils', () => {
    // it('Bracketing', () => {
    //     const mockExpressions = basicSymbols.map(s => (
    //         {
    //             [symbols.expression.key]: s,
    //             toString: ()=>"x"
    //         }
    //     ));

    //     mockExpressions.forEach(exp => {
    //         expect(bracketedExpressionString(exp)  ).toBe("x")
    //     } )

    //     const mockNonBasicExpression  = {
    //         [symbols.expression.key]: "blah",
    //         toString: ()=>"x"
    //     }

    //     expect(bracketedExpressionString(mockNonBasicExpression)  ).toBe("(x)")

    // });


    it("type checking", () => {
        let mockType = [1,2,3]

        let mockSubtype = [...mockType, 4]
        let wrongType1 = [2,3,1,4]
        let wrongType2 = "foo"


        const checker = subtypeCheck(mockType);

        expect(typeof checker).toBe("function");
        expect(checker(mockSubtype)).toBe(true)
        expect(checker(wrongType1)).toBe(false)
        expect(checker(wrongType2)).toBe(false)
    })

    it("type checking in object", () => {
        let mockType = [1,2,3]
        let mockObj ={type: [...mockType, 4]}
        let wrongObj1 ={type: [2,3,1,4]}
        let wrongObj2 ={type: "foo"}

        const checker = checkSubtypeInObject(mockType);

        expect(typeof checker).toBe("function");
        expect(checker(mockObj)).toBe(true)
        expect(checker(wrongObj1)).toBe(false)
        expect(checker(wrongObj2)).toBe(false)

    })
});