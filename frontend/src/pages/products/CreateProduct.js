import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Grid, TextField, Typography, Paper, Button, Box } from "@mui/material";
import * as yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import useRequestResource from "../../hooks/useRequestResource";

const validationSchema = yup.object({
  product_name: yup
    .string()
    .required("Product Name is required")
    .max(100, "Max length is 100"),
  product_description: yup.string().required("Product Description is required"),
});

const CreateProduct = () => {
  const { addResource } = useRequestResource({
    endpoint: "products",
    resourceLabel: "Product",
  });

  const [initialValues, setInitialValues] = useState({
    product_name: "",
    product_description: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const formattedValues = {
      product_name: values.product_name,
      product_description: values.product_description,
    };

    addResource(formattedValues, () => {
      navigate("/products");
    });
  };

  return (
    <Paper
      sx={{
        borderRadius: "2px",
        boxShadow: (theme) => theme.shadows[5],
        padding: "(theme) => theme.spacing(2, 4, 3)",
      }}
    >
      <Typography variant="h6" mb={4}>
        Create Product
      </Typography>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="product_name"
                    label="Product Name"
                    {...formik.getFieldProps("product_name")}
                    error={
                      formik.touched.product_name &&
                      Boolean(formik.errors.product_name)
                    }
                    helperText={
                      formik.touched.product_name && formik.errors.product_name
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="product_description"
                    label="Product Description"
                    {...formik.getFieldProps("product_description")}
                    error={
                      formik.touched.product_description &&
                      Boolean(formik.errors.product_description)
                    }
                    helperText={
                      formik.touched.product_description &&
                      formik.errors.product_description
                    }
                  />
                </Grid>
                <Grid>
                  <Box
                    sx={{
                      display: "flex",
                      margin: (theme) => theme.spacing(1),
                      marginTop: (theme) => theme.spacing(3),
                    }}
                  >
                    <Button
                      component={Link}
                      to="/products"
                      size="medium"
                      variant="outlined"
                      sx={{ mr: 2 }}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      size="medium"
                      variant="contained"
                      color="primary"
                    >
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </Paper>
  );
};

export default CreateProduct;
