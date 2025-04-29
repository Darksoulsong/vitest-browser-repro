import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest"; // Import vi for mocking
import { render } from "../../../tests/test-utils";
import { RouterComponent } from "../RouterComponent"; // Component under test
import { MemoryRouter, Route, Routes } from "react-router"; // Needed for context

// --- Mock react-router ---
const mockNavigate = vi.fn();
const mockParams = { userId: "mockUserId123" };

vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>(
    "react-router"
  );
  return {
    ...actual, // Keep other exports intact
    useNavigate: () => mockNavigate, // Provide the mock function
    useParams: () => mockParams, // Provide the mock params
  };
});
// --- End Mock ---

describe("<RouterComponent /> with mock", () => {
  // Reset mocks before each test if needed (though isolate: true might help)
  beforeEach(() => {
    vi.clearAllMocks();
    // You could also reset mock implementation details here if necessary
    // mockNavigate.mockClear();
    // Object.assign(mockParams, { userId: 'newMockId' }); // Example of changing mock value
  });

  it("renders with mocked params and calls mock navigate on click", async () => {
    const user = userEvent.setup();

    // Render within MemoryRouter to provide necessary context, even though hooks are mocked
    // The path here sets the initial context for the mock params if needed
    render(
      <MemoryRouter initialEntries={["/users/mockUserId123"]}>
        <Routes>
          <Route path="/users/:userId" element={<RouterComponent />} />
        </Routes>
      </MemoryRouter>
    );

    // Check that the mocked param is displayed
    expect(
      screen.getByText(/User ID from URL: mockUserId123/i)
    ).toBeInTheDocument();

    // Find and click the navigation button
    const button = screen.getByRole("button", { name: /navigate away/i });
    await user.click(button);

    // Check that the mock navigate function was called
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/some-other-page");
  });
});
