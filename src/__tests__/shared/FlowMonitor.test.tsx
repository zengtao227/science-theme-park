import { render, screen } from "@testing-library/react";
import FlowMonitor from "../../components/shared/FlowMonitor";

// Mock framer-motion and StatCard (already tested)
jest.mock("framer-motion", () => ({
    motion: {
        div: ({ children, className, style }: any) => <div className={className} style={style}>{children}</div>,
        path: () => <path />
    }
}));

describe("FlowMonitor", () => {
    const mockSources = [
        { label: "Solar", value: 40, color: "bg-yellow-400" },
        { label: "Grid", value: 60, color: "bg-blue-400" },
    ];

    it("should render title and hub labels", () => {
        render(
            <FlowMonitor
                title="POWER_GRID"
                hubLabel="MAIN_HUB"
                hubSubLabel="DISTRIBUTION"
                sources={mockSources}
            />
        );
        expect(screen.getByText("POWER_GRID")).toBeInTheDocument();
        expect(screen.getByText(/MAIN_HUB/)).toBeInTheDocument();
        expect(screen.getByText("DISTRIBUTION")).toBeInTheDocument();
    });

    it("should render source labels and percentages", () => {
        render(
            <FlowMonitor
                title="TEST"
                hubLabel="HUB"
                sources={mockSources}
            />
        );
        expect(screen.getByText("Solar")).toBeInTheDocument();
        expect(screen.getByText("40%")).toBeInTheDocument();
        expect(screen.getByText("Grid")).toBeInTheDocument();
        expect(screen.getByText("60%")).toBeInTheDocument();
    });

    it("should render meta cards when provided", () => {
        const meta = [{ label: "Efficiency", value: "98%", color: "text-green-500" }];
        render(
            <FlowMonitor
                title="TEST"
                hubLabel="HUB"
                sources={mockSources}
                meta={meta}
            />
        );
        expect(screen.getByText("Efficiency")).toBeInTheDocument();
        expect(screen.getByText("98%")).toBeInTheDocument();
    });
});
