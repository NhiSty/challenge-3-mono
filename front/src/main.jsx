import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import router from "@routes/index.jsx";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TranslationProvider from "@/translation/TranslationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={"Loading ..."}>
      <TranslationProvider>
        <RouterProvider router={router} />
        <ToastContainer position={"bottom-right"} />
      </TranslationProvider>
    </Suspense>
  </React.StrictMode>,
);
