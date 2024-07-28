import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ThemeButton from "../../../src/components/ThemeButton";

describe("ThemeButton component", () => {
  it("renders correctly with the dark theme", () => {
    render(<ThemeButton />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBe(false);
  });
});
