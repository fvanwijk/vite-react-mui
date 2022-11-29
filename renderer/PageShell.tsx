import React from "react";
import { PageContextProvider } from "./usePageContext";
import type { PageContext } from "./types";
import { createTheme, ThemeProvider } from "@mui/material";
import { purple } from "@mui/material/colors";
import "../src/index.css";

export { PageShell };

const theme = createTheme({
  palette: {
    primary: {
      main: purple[400],
    },
  },
});

function PageShell({
  children,
  pageContext,
}: {
  children: React.ReactNode;
  pageContext: PageContext;
}) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Content>{children}</Content>
          </Layout>
        </ThemeProvider>
      </PageContextProvider>
    </React.StrictMode>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        maxWidth: 900,
        margin: "auto",
      }}
    >
      {children}
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: 20,
        paddingBottom: 50,
        borderLeft: "2px solid #eee",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
}
