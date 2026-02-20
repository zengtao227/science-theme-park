import { render, screen } from "@testing-library/react";
import ProgressBar from "../../components/shared/ProgressBar";

describe("ProgressBar", () => {
    it("should render continuous bar by default", () => {
        const { container } = render(<ProgressBar value={50} />);
        const bar = container.querySelector(".bg-green-500");
        expect(bar).toBeInTheDocument();
        // Check if motion.div width is handled by framer-motion (rendered as style)
        // Note: Inline styles might not be easily accessible in jest-dom with framer-motion without mocks
    });

    it("should render stepped segments when segments prop is provided", () => {
        const { container } = render(<ProgressBar value={40} segments={5} />);
        const segments = container.querySelectorAll(".flex-1");
        expect(segments.length).toBe(5);

        // At 40%, 2 segments should be active (thresholds: 0, 20, 40, 60, 80)
        // Wait, logic is isActive = value > threshold
        // i=0: 0, 40 > 0 -> Active
        // i=1: 20, 40 > 20 -> Active
        // i=2: 40, 40 > 40 -> Inactive (depending on implementation, here it is >)
        const activeSegments = container.querySelectorAll(".bg-green-500");
        expect(activeSegments.length).toBe(2);
    });

    it("should show labels and sublabels", () => {
        render(<ProgressBar value={50} label="LOADING" subLabel="SYSTEM_CACHE" />);
        expect(screen.getByText("LOADING")).toBeInTheDocument();
        expect(screen.getByText("SYSTEM_CACHE")).toBeInTheDocument();
    });

    it("should show percentage value by default", () => {
        render(<ProgressBar value={75.5} />);
        expect(screen.getByText("76%")).toBeInTheDocument();
    });
});
