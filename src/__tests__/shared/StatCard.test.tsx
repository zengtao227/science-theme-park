import { render, screen } from "@testing-library/react";
import StatCard from "../../components/shared/StatCard";

// Mock framer-motion
jest.mock("framer-motion", () => ({
    motion: {
        div: ({ children, className }: any) => <div className={className}>{children}</div>,
    }
}));

describe("StatCard", () => {
    it("should render label and value", () => {
        render(<StatCard label="Temperature" value="32°C" />);
        expect(screen.getByText("Temperature")).toBeInTheDocument();
        expect(screen.getByText("32°C")).toBeInTheDocument();
    });

    it("should show trend indicator when trend is provided", () => {
        render(<StatCard label="Growth" value="15%" trend="up" />);
        expect(screen.getByText("Positive Trend")).toBeInTheDocument();
    });

    it("should handle down trend", () => {
        render(<StatCard label="Loss" value="2%" trend="down" />);
        expect(screen.getByText("Negative Delta")).toBeInTheDocument();
    });

    it("should display custom subValue", () => {
        render(<StatCard label="Link" value="Active" subValue="STABLE" />);
        expect(screen.getByText("STABLE")).toBeInTheDocument();
    });
});
