import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider as ReduxStoreProvider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxStoreProvider store={store}>
      <App />
    </ReduxStoreProvider>
  </StrictMode>
);
