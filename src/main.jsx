import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider as UIProvider } from "./components/ui/provider.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store.js";
import ScrollToTop from "./components/common/ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UIProvider>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <ScrollToTop />
          {/* Enabling routing with BrowserRouter */}
          <App />
        </BrowserRouter>
      </Provider>
    </UIProvider>
  </StrictMode>
);
