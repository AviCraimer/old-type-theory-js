import {makeContext} from "../new/context";
import symbols from "../new/symbols";

describe("Context tests", () => {
    it("New Empty context", () => {
        const empty =  makeContext();

        expect(empty[symbols.context.key]).toBe(symbols.context.empty);
        expect(empty.list).toEqual([]);
        expect(empty.isContext(empty)).toBe(true);
    });


});