import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../tests/test-utils"; // Use our custom render
import { SimpleMui } from "@/components/SimpleMui"; // Use alias here

describe("<SimpleMui />", () => {
  it("renders initial count and increments on button click", async () => {
    const user = userEvent.setup();
    render(<SimpleMui />);

    // Check initial state
    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument();

    // Find and click the button
    const button = screen.getByRole("button", { name: /increment/i });
    await user.click(button);

    // Check updated state
    expect(screen.getByText(/Count: 1/i)).toBeInTheDocument();

    // Click again
    await user.click(button);
    expect(screen.getByText(/Count: 2/i)).toBeInTheDocument();
  });
});
