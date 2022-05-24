import React, { useEffect } from "react";
import {
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import useRequestResource from "../../hooks/useRequestResource";
import useRequestAuth from "../../hooks/useRequestAuth";

export default function Products() {
  const { getResourceList, getResource, resourceList } = useRequestResource({
    endpoint: "products",
  });

  const { logout, logoutPending } = useRequestAuth();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    getResourceList();
  }, [getResourceList]);

  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding={10}
        flexDirection="column"
      >
        <Button
          component={Link}
          variant="contained"
          disableElevation
          to="/products/create"
        >
          Add Product
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 360 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left">Product Name</TableCell>
                <TableCell align="left">Product Description</TableCell>
                <TableCell align="right">Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resourceList.results.map((product) => {
                return (
                  <TableRow key={product.id}>
                    <TableCell align="left">{product.product_name}</TableCell>
                    <TableCell align="left">
                      {product.product_description}
                    </TableCell>
                    <TableCell align="right">
                      {new Date(product.created_at).toLocaleString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          component={Link}
          variant="contained"
          disableElevation
          to="/auth/login"
          onClick={handleLogout}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {logoutPending === true ? (
              <CircularProgress
                size={20}
                sx={{
                  mr: 2,
                }}
              />
            ) : null}
          </Box>
          Logout
        </Button>
      </Box>
    </div>
  );
}
