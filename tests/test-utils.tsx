import React, { PropsWithChildren } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { counterReducer, RootState } from "../src/store"; // Import RootState

// You might need to redefine RootState if importing causes issues,
// but importing should generally work.
// import type { RootState } from '../src/store';

// Create a basic theme for MUI
const theme = createTheme();

// Define the type for the custom render options
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: ReturnType<typeof configureStore<RootState>>; // Use a more specific type for store
}

// Combine reducers for the test store
const rootReducer = { counter: counterReducer };

function render(
  ui: React.ReactElement,
  {
    // Optionally pass preloaded state or a specific store instance
    preloadedState,
    store = configureStore({ reducer: rootReducer, preloadedState }), // Use imported reducer map
    ...renderOptions
  }: ExtendedRenderOptions = {} // Use the defined interface
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
    );
  }
  return { store, ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Re-export everything from testing-library
export * from "@testing-library/react";
// Override render method
export { render };
