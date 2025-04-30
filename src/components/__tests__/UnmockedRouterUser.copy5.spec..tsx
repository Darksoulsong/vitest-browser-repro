import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter, Routes, Route, Link } from "react-router";

// Simple component using Link from react-router
function SimpleLinkComponent() {
  return <Link to="/somewhere">Go Somewhere</Link>;
}

describe("UnmockedRouterUser", () => {
  it("renders a link using the original react-router Link", () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="*" element={<SimpleLinkComponent />} />
        </Routes>
      </MemoryRouter>
    );

    // Check that the real Link component rendered an anchor tag
    const linkElement = screen.getByRole("link", { name: /go somewhere/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/somewhere");
  });
});
