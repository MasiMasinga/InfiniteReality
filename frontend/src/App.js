import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { SnackbarProvider } from "notistack";

import Products from "./pages/products/Products";
import CreateProduct from "./pages/products/CreateProduct";
import SignUp from "./pages/authentication/SignUp";
import Login from "./pages/authentication/Login";
import AuthContextProvider from "./contexts/AuthContextProvider";

import RequireAuth from "./components/RequireAuth";
import RequireNotAuth from "./components/RequireNotAuth";

function App() {
  return (
    <div>
      <CssBaseline />
      <AuthContextProvider>
        <SnackbarProvider>
          <Router>
            <Box
              sx={{
                bgcolor: (theme) => theme.palette.background.default,
                minHeight: "100vh",
              }}
            >
              <Routes>
                <Route element={<RequireAuth />}>
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/create" element={<CreateProduct />} />
                </Route>

                <Route element={<RequireNotAuth />}>
                  <Route path="/" exact element={<SignUp />} />
                  <Route path="/auth/login" element={<Login />} />
                </Route>
              </Routes>
            </Box>
          </Router>
        </SnackbarProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
