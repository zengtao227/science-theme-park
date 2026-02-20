import { render, screen } from "@testing-library/react";
import DataTracker from "../../components/shared/DataTracker";

// Mock framer-motion
jest.mock("framer-motion", () => ({
    motion: {
        div: ({ children, style, className, animate, initial }: any) => {
            // Basic mock that passes through style if needed
            return <div className={className} style={style}>{children}</div>;
        },
    }
}));

describe("DataTracker", () => {
    const mockData = [
        { label: "A", value: 10 },
        { label: "B", value: 50 },
        { label: "C", value: 90 },
    ];

    it("should render the correct number of data points", () => {
        const { container } = render(
            <DataTracker
                title="TEST_TRACKER"
                reference="REF-001"
                data={mockData}
            />
        );
        expect(screen.getByText("TEST_TRACKER")).toBeInTheDocument();
        expect(screen.getByText("REF: REF-001")).toBeInTheDocument();

        // Each data point has a .group container and a motion.div
        const bars = container.querySelectorAll(".group");
        expect(bars.length).toBe(3);
    });

    it("should render x-axis labels if provided", () => {
        const labels = ["JAN", "FEB", "MAR"];
        render(
            <DataTracker
                title="TEST_TRACKER"
                reference="REF-001"
                data={mockData}
                xAxisLabels={labels}
            />
        );
        expect(screen.getByText("JAN")).toBeInTheDocument();
        expect(screen.getByText("FEB")).toBeInTheDocument();
        expect(screen.getByText("MAR")).toBeInTheDocument();
    });
});
