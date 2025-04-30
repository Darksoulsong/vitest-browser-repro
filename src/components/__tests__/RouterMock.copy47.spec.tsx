import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render } from "../../../tests/test-utils";
import { RouterComponent } from "../RouterComponent"; // Component under test
import {
  MemoryRouter,
  Route,
  Routes,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router"; // Import necessary items from 'react-router'

// --- Hoist mock variables ---
const { mockNavigate, mockUseParams, mockUseLocation } = vi.hoisted(() => {
  return {
    mockNavigate: vi.fn(),
    mockUseParams: vi.fn(() => ({ userId: "mockUserId123" })),
    mockUseLocation: vi.fn(() => ({
      pathname: "/mocked-path",
      search: "",
      hash: "",
      state: null,
      key: "mockedKey",
    })),
  };
});
// --- End Hoist ---

// --- Mock react-router (Complete Mock) ---
vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>(); // Restore importing original
  return {
    ...actual, // Restore spreading original exports
    useNavigate: () => mockNavigate,
    useParams: mockUseParams,
    useLocation: mockUseLocation,
  };
});
// --- End Mock ---

describe("<RouterComponent /> with mock", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mock implementations using the hoisted references
    mockUseParams.mockReturnValue({ userId: "mockUserId123" });
    mockUseLocation.mockReturnValue({
      pathname: "/mocked-path",
      search: "",
      hash: "",
      state: null,
      key: "mockedKey",
    });
  });

  it("renders with mocked params and calls mock navigate on click", async () => {
    const user = userEvent.setup();
    // This render might fail now if MemoryRouter/Routes/Route are undefined due to the mock
    render(
      <MemoryRouter initialEntries={["/users/mockUserId123"]}>
        <Routes>
          <Route path="/users/:userId" element={<RouterComponent />} />
        </Routes>
      </MemoryRouter>
    );

    // Assertions below might not be reached if render fails
    expect(
      screen.getByText(/User ID from URL: mockUserId123/i)
    ).toBeInTheDocument();
    expect(mockUseParams).toHaveBeenCalled();

    const button = screen.getByRole("button", { name: /navigate away/i });
    await user.click(button);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/some-other-page");
  });
});

// --- Second Test Suite using the Mock ---

// A simple component that displays the current path
function LocationDisplay() {
  const location = useLocation(); // This uses the mocked hook provided by vi.mock
  return <div data-testid="location-display">{location.pathname}</div>;
}

// A simple component with links
function NavigationLinks() {
  return (
    <nav>
      <Link to="/">Home</Link>{" "}
      {/* This might use the original Link or a mocked one if defined */}
      <Link to="/about">About</Link>
      <LocationDisplay />
    </nav>
  );
}

describe("NavigationLinks Component Test with mock", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mock implementations using the hoisted references
    mockUseParams.mockReturnValue({ userId: "mockUserId123" });
    mockUseLocation.mockReturnValue({
      pathname: "/mocked-path",
      search: "",
      hash: "",
      state: null,
      key: "mockedKey",
    });
  });

  it("renders navigation links and mocked location", () => {
    // This render might fail now if MemoryRouter/Routes/Route/Link are undefined due to the mock
    render(
      <MemoryRouter initialEntries={["/initial"]}>
        <Routes>
          <Route path="*" element={<NavigationLinks />} />
        </Routes>
      </MemoryRouter>
    );

    // Assertions below might not be reached if render fails
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();

    expect(screen.getByTestId("location-display")).toHaveTextContent(
      "/mocked-path"
    );
    expect(mockUseLocation).toHaveBeenCalled();
  });
});
