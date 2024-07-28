import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Loader from "../../../src/components/Loader";

describe("Loader component", () => {
  it("renders correctly", () => {
    render(<Loader />);
    const loaderElement = screen.getByTestId("loader");
    expect(loaderElement).toBeInTheDocument();
  });
});
