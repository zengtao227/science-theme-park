// canonicalizeFreeText pulls in the i18n/store chain which nextJest can't
// transform from this nested path. For EN locale it returns the string unchanged,
// so mocking it here lets us test the regex pipeline in isolation.
jest.mock("@/lib/i18n/freeTextLocale", () => ({
    canonicalizeFreeText: (s: string | null | undefined) => s ?? "",
    localizeFreeText: (s: string | null | undefined) => s ?? "",
}));

import { parseNumberLike, normalizeAnswer } from "../answerMatching";

describe("parseNumberLike", () => {
    it("returns null for empty string", () => {
        expect(parseNumberLike("", "EN")).toBe(null);
        expect(parseNumberLike("  ", "EN")).toBe(null);
    });

    it("parses plain integers", () => {
        expect(parseNumberLike("42", "EN")).toBe(42);
        expect(parseNumberLike("-3", "EN")).toBe(-3);
    });

    it("parses decimals (EN dot)", () => {
        expect(parseNumberLike("3.14", "EN")).toBe(3.14);
    });

    it("parses decimals with DE comma", () => {
        expect(parseNumberLike("3,14", "DE")).toBeCloseTo(3.14);
    });

    it("parses fractions", () => {
        expect(parseNumberLike("1/2", "EN")).toBe(0.5);
        expect(parseNumberLike("3/4", "EN")).toBe(0.75);
    });

    it("returns null for division by zero", () => {
        expect(parseNumberLike("5/0", "EN")).toBe(null);
    });

    it("returns null for malformed fraction", () => {
        expect(parseNumberLike("1/2/3", "EN")).toBe(null);
    });

    it("returns null for non-numeric strings", () => {
        expect(parseNumberLike("abc", "EN")).toBe(null);
    });

    it("handles spaces in number", () => {
        expect(parseNumberLike("1 000", "EN")).toBe(1000);
    });
});

describe("normalizeAnswer", () => {
    it("lowercases and trims", () => {
        expect(normalizeAnswer("  ABC  ", "EN")).toBe("abc");
    });

    it("removes whitespace", () => {
        expect(normalizeAnswer("a b", "EN")).toBe("ab");
    });

    it("converts unicode superscripts", () => {
        expect(normalizeAnswer("x²", "EN")).toContain("^2");
        expect(normalizeAnswer("x³", "EN")).toContain("^3");
    });

    it("removes trailing ^1", () => {
        expect(normalizeAnswer("x^1", "EN")).toBe("x");
    });

    it("removes leading coefficient 1 before letter", () => {
        expect(normalizeAnswer("1x", "EN")).toBe("x");
    });
});
