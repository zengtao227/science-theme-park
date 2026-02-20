import { render, screen } from "@testing-library/react";
import ChamberLayout from "../../components/layout/ChamberLayout";
import { useAppStore } from "../../lib/store";
import { MODULE_DEPENDENCIES } from "../../lib/curriculum/dependencies";

// Mock store
jest.mock("../../lib/store", () => ({
    useAppStore: jest.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));

describe("ChamberLayout - Prerequisite System Integration", () => {
    const defaultProps = {
        title: "Test Module",
        moduleCode: "SB2.01",
        difficulty: "CORE" as const,
        onDifficultyChange: jest.fn(),
        stages: [{ id: "S1", label: "Stage 1" }],
        currentStage: "S1",
        onStageChange: jest.fn(),
        children: <div>Content</div>,
        translations: {
            back: "Back",
            check: "Check",
            next: "Next",
            correct: "Correct",
            incorrect: "Incorrect",
            difficulty: { core: "Core" }
        }
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should show 'PREREQUISITE_REQUIRED' when deps are not met", () => {
        // SB2.01 depends on SB1.01
        (useAppStore as any).mockReturnValue({
            currentLanguage: "EN",
            history: [], // No history means no completed modules
            setLanguage: jest.fn(),
            addHistory: jest.fn(),
        });

        render(<ChamberLayout {...defaultProps} />);

        // Use regex for flexible matching since HUDAlert might transform text
        expect(screen.getByText(/PREREQUISITE_REQUIRED/i)).toBeInTheDocument();
        expect(screen.getAllByText(/SB1.01/i).length).toBeGreaterThan(0);
    });

    it("should show 'LINK_STABLE' when all deps are met", () => {
        (useAppStore as any).mockReturnValue({
            currentLanguage: "EN",
            history: [{ moduleCode: "SB1.01", score: 1 }], // Completed dep
            setLanguage: jest.fn(),
            addHistory: jest.fn(),
        });

        render(<ChamberLayout {...defaultProps} />);

        expect(screen.getByText(/LINK_STABLE/i)).toBeInTheDocument();
    });
});
