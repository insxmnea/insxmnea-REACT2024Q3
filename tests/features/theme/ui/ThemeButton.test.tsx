import { render, screen } from "@testing-library/react";
import { ThemeButton } from "src/features/theme";
import { describe, expect, it } from "vitest";

describe("ThemeButton component", () => {
  it("renders correctly with the dark theme", () => {
    render(<ThemeButton />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBe(false);
  });
});
