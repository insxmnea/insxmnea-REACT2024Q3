import { render, screen } from "@testing-library/react";
import { Loader } from "src/shared/ui/loader";
import { describe, expect, it } from "vitest";

describe("Loader component", () => {
  it("renders correctly", () => {
    render(<Loader />);
    const loaderElement = screen.getByTestId("loader");
    expect(loaderElement).toBeInTheDocument();
  });
});
