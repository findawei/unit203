import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import { makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import TextField from "@mui/material/TextField";

function App() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      // margin: 3
    },
    media: {
      height: 200,
    },
    link: {
      color: "black",
      "&:hover": {
        color: "#000000",
        textDecoration: "none",
      },
    },
    rightText: {
      textAlign: "right",
    },
  }));
  const classes = useStyles();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (items.length === 0) {
      axios.get("/api/items").then(
        (result) => {
          setItems(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);

  //Styling variables
  const BLUE = "#172162"; //"rgb(23, 33, 98)";
  const LIGHT_GREY = "#6e7484";
  const BLACK = "#000000";

  const SUBTOTAL = 2094.97;
  const HST = 272.3461;
  const TOTAL = 2382.3161;
  const ESTIMATED_DELIVERY = "Nov 24, 2021";

  const removeLineItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const addLineItem = (e) => {
    e.preventDefault();
    setItems((prevItems) => [
      ...prevItems,
      {
        // title,
        // price,
        // image,
        // swatchColor,
        // swatchTitle,
      },
    ]);
  };

  const subtotal = items && items.reduce((a, b) => +a + +b.price, 0);
  const tax = subtotal * 0.13;
  const shipping = 15;
  const total = subtotal + tax + shipping;

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" gutterBottom>
          Your Cart
        </Typography>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
        >
          {items &&
            items.map((item) => (
              <div key={item.id}>
                <Grid
                  item
                  xs={12}

                  // onClick={ItemView}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={2}
                  >
                    <Grid item xs={4}>
                      <img src={item && item.image} className={classes.media} />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography style={{ textTransform: "uppercase" }}>
                        <b>{item.title}</b>
                      </Typography>
                      <Typography>{item.swatchTitle}</Typography>
                    </Grid>
                    <Grid item xs={4} className={classes.rightText}>
                      <Typography>
                        <b>${item.price}</b>
                      </Typography>
                      <Typography>{item.estimatedDeliveryDate}</Typography>
                      <Button onClick={() => removeLineItem(item.id)}>
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            ))}

          <Box display={{ xs: "none", sm: "none", md: "block" }}>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="h4" display="inline" gutterBottom>
                      Subtotal
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h4" display="inline" gutterBottom>
                      ${subtotal && subtotal.toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="h4" display="inline" gutterBottom>
                      Taxes (estimated)
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h4" display="inline" gutterBottom>
                      ${tax && tax.toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="h4" display="inline" gutterBottom>
                      Shipping
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h4" display="inline" gutterBottom>
                      ${shipping}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="h4" display="inline" gutterBottom>
                      <b>Total</b>
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h4" display="inline" gutterBottom>
                      <b>${total && total.toFixed(2)}</b>
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="h4" display="inline" gutterBottom>
                      Postal Code
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h4" display="inline" gutterBottom>
                      <TextField
                        id="standard-basic"
                        label="Postal Code"
                        variant="outlined"
                      />
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
