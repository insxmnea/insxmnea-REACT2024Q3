import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "src/widgets/error-boundary/ui/ErrorBoundary";
import { describe, expect, it, vi } from "vitest";

const ProblematicComponent = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary component", () => {
  it("renders children when no error occurs", () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("Child Component")).toBeInTheDocument();
  });

  it("renders ErrorComponent when an error is caught", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong :(")).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  it("calls componentDidCatch with error and errorInfo", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const componentDidCatchSpy = vi.spyOn(
      ErrorBoundary.prototype,
      "componentDidCatch"
    );

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(componentDidCatchSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
    componentDidCatchSpy.mockRestore();
  });
});
