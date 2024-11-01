"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import { Provider } from "react-redux";
import store from "./store/configureStore";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
