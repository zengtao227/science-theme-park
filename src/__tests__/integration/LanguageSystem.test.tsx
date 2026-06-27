import { act, renderHook } from "@testing-library/react";
import { useLanguage } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";

jest.mock("@/lib/store", () => ({
    useAppStore: jest.fn(),
}));

const setLanguageMock = jest.fn();
const mockState = {
    currentLanguage: "EN",
    setLanguage: setLanguageMock,
};

function mockStoreLanguage(language: "EN" | "CN" | "DE") {
    mockState.currentLanguage = language;
    (useAppStore as unknown as jest.Mock).mockImplementation((selector?: (state: typeof mockState) => unknown) => (
        selector ? selector(mockState) : mockState
    ));
}

describe("useLanguage i18n Hook", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockStoreLanguage("EN");
    });

    it("translates keys based on current language", () => {
        const { result } = renderHook(() => useLanguage());
        expect(result.current.t("common.history_title")).toBe("Experiment History");
    });

    it("falls back to the path for missing keys", () => {
        mockStoreLanguage("CN");
        const { result } = renderHook(() => useLanguage());
        expect(result.current.t("non.existent.key")).toBe("non.existent.key");
    });

    it("switches languages through the store setter selector", () => {
        const { result } = renderHook(() => useLanguage());

        act(() => {
            result.current.setLanguage("CN");
        });

        expect(setLanguageMock).toHaveBeenCalledWith("CN");
    });

    it("returns localized common labels after switching current language", () => {
        mockStoreLanguage("CN");
        const { result } = renderHook(() => useLanguage());
        expect(result.current.t("common.history_title")).toBe("实验历史");
    });
});
