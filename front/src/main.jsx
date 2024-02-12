import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import router from "@routes/index.jsx";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TranslationProvider from "@/translation/TranslationContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <TranslationProvider>
        <RouterProvider router={router} />
        <ToastContainer position={"bottom-right"} />
      </TranslationProvider>
    </LocalizationProvider>
  </React.StrictMode>,
);
