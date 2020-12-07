import {makeContext, isContext} from "../new/context";
import symbols from "../new/symbols";

describe("Context tests", () => {
    it("New Empty context", () => {
        const empty =  makeContext();
        console.log(empty)
        expect(empty[symbols.context.key]).toBe(symbols.context.empty);
        expect(empty.list).toEqual([]);
        expect(empty.isContext(empty)).toBe(true);
    });

    it("Test isContext", () => {
        expect(isContext("foo")).toBe(false);
        expect(isContext(null)).toBe(false);
        expect(isContext({foo: {}})).toBe(false);
        expect(isContext(makeContext())).toBe(true);
    });
});