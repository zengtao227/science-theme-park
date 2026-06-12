import { normalizeModuleCode } from "../../lib/moduleCode";

describe("normalizeModuleCode", () => {
    it("lowercases and replaces dots with hyphens", () => {
        expect(normalizeModuleCode("GM1.01")).toBe("gm1-01");
        expect(normalizeModuleCode("SC1.06")).toBe("sc1-06");
        expect(normalizeModuleCode("SM2.09")).toBe("sm2-09");
        expect(normalizeModuleCode("P3.01")).toBe("p3-01");
    });

    it("is idempotent — already-canonical codes are unchanged", () => {
        expect(normalizeModuleCode("gm1-01")).toBe("gm1-01");
        expect(normalizeModuleCode("sc1-06")).toBe("sc1-06");
        expect(normalizeModuleCode("gm1-01-advanced")).toBe("gm1-01-advanced");
    });

    it("handles mixed-case input", () => {
        expect(normalizeModuleCode("Gm1.01")).toBe("gm1-01");
        expect(normalizeModuleCode("SC1.06")).toBe("sc1-06");
    });

    it("replaces every dot, not just the first", () => {
        expect(normalizeModuleCode("A.B.C")).toBe("a-b-c");
    });

    it("returns empty string for undefined/null/empty input", () => {
        expect(normalizeModuleCode(undefined)).toBe("");
        expect(normalizeModuleCode(null)).toBe("");
        expect(normalizeModuleCode("")).toBe("");
    });
});
