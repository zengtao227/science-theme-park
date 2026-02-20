import { render, screen, fireEvent, act } from "@testing-library/react";
import SuccessEureka from "../../components/shared/SuccessEureka";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
        span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>
}));

describe("SuccessEureka", () => {
    it("should not render when show is false", () => {
        const { container } = render(<SuccessEureka show={false} onComplete={jest.fn()} />);
        expect(container.firstChild).toBeNull();
    });

    it("should render when show is true", () => {
        render(<SuccessEureka show={true} onComplete={jest.fn()} />);
        expect(screen.getByText(/EUREKA/i)).toBeInTheDocument();
        expect(screen.getByText(/Module_Status/i)).toBeInTheDocument();
    });

    it("should call onComplete after timeout", () => {
        jest.useFakeTimers();
        const onComplete = jest.fn();
        render(<SuccessEureka show={true} onComplete={onComplete} />);

        act(() => {
            jest.advanceTimersByTime(2500);
        });

        expect(onComplete).toHaveBeenCalled();
        jest.useRealTimers();
    });
});
