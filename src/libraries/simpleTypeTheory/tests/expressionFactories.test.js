import {makeVariable, makeConcreteTerm, makeBaseType}  from "../new/expressionFactories";
import symbols from "../new/symbols";

describe("Expression factory function tests", () => {
    // it("makeVariable names", () => {
    //     let vars = [1,1,1,1,1].map(x => makeVariable() )
    //     const [x,y,z,var_4, var_5] = vars;
    //     const obj =  {x,y,z,var_4, var_5};
    //     Object.entries(obj).forEach( ([varName, v]) =>  {
    //         expect(varName).toBe(v.name);
    //     } );
    // })
    // it("makeVariable has correct symbols", () => {
    //     const x = makeVariable();

    //     expect(symbols.expression.key in x).toBe(true);
    //     expect(x[symbols.expression.key]).toBe(symbols.expression.term.variable);
    // });
    // it("makeConcreteTerm names", () => {
    //     let terms = [1,1,1,1,1,1].map(x => makeConcreteTerm() )
    //     const [a, b, c, d, e, term_6] = terms;
    //     const obj =  {a, b, c, d, e, term_6};
    //     Object.entries(obj).forEach( ([termName, term]) =>  {
    //         expect(termName).toBe(term.name);
    //     } );
    // })
    // it("makeConcreteTerm has correct symbols", () => {
    //     const t = makeConcreteTerm();

    //     expect(symbols.expression.key in t).toBe(true);
    //     expect(t[symbols.expression.key]).toBe(symbols.expression.term.concrete);
    // });
    it("makeBaseType name", () => {
        const T1 = makeBaseType();
        const T2 = makeBaseType();

        expect(T1.name).toBe("T1");
        expect(T2.name).toBe("T2");
    });
    it("makeBaseType symbols", () => {
        const t = makeBaseType();

        expect(symbols.expression.key in t).toBe(true);
        expect(t[symbols.expression.key]).toBe(symbols.expression.type.base);
    });
});

