import { render, screen } from "@testing-library/react";
import HUDAlert from "../../components/shared/HUDAlert";

// Mock framer-motion
jest.mock("framer-motion", () => ({
    motion: {
        div: ({ children, className }: any) => <div className={className}>{children}</div>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>
}));

describe("HUDAlert", () => {
    it("should render title and description", () => {
        render(
            <HUDAlert
                title="SYSTEM_ALERT"
                description="Power levels low"
                type="warning"
            />
        );
        expect(screen.getByText("SYSTEM_ALERT")).toBeInTheDocument();
        expect(screen.getByText("Power levels low")).toBeInTheDocument();
    });

    it("should render children", () => {
        render(
            <HUDAlert title="CHILD_TEST">
                <span data-testid="child">Deep Link</span>
            </HUDAlert>
        );
        expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("should apply correct styles based on type", () => {
        const { container } = render(<HUDAlert title="STYLE_TEST" type="error" />);
        // Error style includes bg-red-500/10 (matched by classes in implementation)
        expect(container.firstChild).toHaveClass("bg-red-500/10");
        expect(container.firstChild).toHaveClass("text-red-400");
    });
});
