import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import useRequestResource from "../../hooks/useRequestResource";

export default function Products() {
  const { getResourceList, getResource, resourceList } = useRequestResource({
    endpoint: "products",
  });

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
        <Box padding={10} flexDirection="row">
          {resourceList.results.map((product) => {
            return (
              <Card
                key={product.id}
                sx={{ maxWidth: 345, backgroundColor: "red" }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.product_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.product_description}
                  </Typography>
                </CardContent>
                <CardActions>
                  {/* <Button size="small">Edit</Button>
                    <Button size="small">Delete</Button> */}
                </CardActions>
              </Card>
            );
          })}
        </Box>
      </Box>
    </div>
  );
}
