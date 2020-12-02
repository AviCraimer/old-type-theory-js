import {bracketedExpressionString, basicSymbols} from "../new/util";
import symbols from "../new/symbols";

describe('Simple type theory utils', () => {
    it('Bracketing', () => {
        const mockExpressions = basicSymbols.map(s => (
            {
                [symbols.expression.key]: s,
                toString: ()=>"x"
            }
        ));

        mockExpressions.forEach(exp => {
            expect(bracketedExpressionString(exp)  ).toBe("x")
        } )

        const mockNonBasicExpression  = {
            [symbols.expression.key]: "blah",
            toString: ()=>"x"
        }

        expect(bracketedExpressionString(mockNonBasicExpression)  ).toBe("(x)")

    });
});