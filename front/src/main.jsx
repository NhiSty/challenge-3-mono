import React, {Suspense} from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import router from "@routes/index.jsx";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TranslationLoader from "@/translation/TranslationLoader";
import i18n from "@/translation/index";
import {I18nextProvider} from "react-i18next";


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Suspense fallback={"Loading ..."}>
            <I18nextProvider i18n={i18n}>
                <TranslationLoader>
                    <RouterProvider router={router} />
                    <ToastContainer position={"bottom-right"} />
                </TranslationLoader>
            </I18nextProvider>
        </Suspense>
    </React.StrictMode>,
);
