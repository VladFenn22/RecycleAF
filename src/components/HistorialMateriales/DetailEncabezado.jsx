import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import QRCode from "qrcode.react";
// import Box from '@mui/material/Box';
import recycleaf_logo from "../../assets/recycleaf_slogan.jpg";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import EncabezadoService from "../../services/EncabezadoServices";

export function DetailEncabezado() {
  const routeParams = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    EncabezadoService.getEncabezadoById(routeParams.id)
      .then((response) => {
        setData(response.data.results);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        setError(error);
        throw new Error("Respuesta no válida del servidor");
      });
  }, [routeParams.id]);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container component="main" sx={{ mt: 2, mb: 2 }}>
      {data && (
        <Grid container spacing={0}>
          <Grid item xs={12}>

            <Grid container spacing={0}>

              <Grid tem xs={10} sx={{ backgroundColor: "#29524a" }} padding={2}>
                <Typography variant="h6" gutterBottom color={"white"}>
                  <strong>Nombre del centro de acopio: </strong>{" "}
                  {data.nombre_centro_acopio}
                </Typography>
                <Typography variant="h6" gutterBottom color={"white"}>
                  <strong>Nombre del administrador: </strong>{" "}
                  {data.nombre_administrador}
                </Typography>
                <Typography variant="h6" gutterBottom color={"white"}>
                  <strong>Nombre del cliente: </strong> {data.nombre_cliente}
                </Typography>
                <Typography variant="h6" gutterBottom color={"white"}>
                  <strong>Fecha de canje: </strong> {data.fecha_canje}
                </Typography>
                <Grid item xs={2}>
                  <div
                    style={{
                      marginLeft: "90%",
                      padding: 2,
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <QRCode value={data.id} size={100} />
                  </div>
                </Grid>
              </Grid>
              
              <Grid
                item
                xs={2}
                sx={{
                  backgroundColor: "#29524a",
                  padding: 2,
                  display: "flex",
                  justifyContent: "flex-top",
                  alignItems: "center",
                }}
              >
                <img
                  src={recycleaf_logo}
                  style={{
                    maxWidth: "100px",
                    height: "auto",
                    marginRight: "10px",
                  }}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ paddingTop: 2 }}>
              <TableContainer sx={{ backgroundColor: "#29524a" }}>
                <Table sx={{ minWidth: 100 }} aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography color={"white"} variant="h6">
                          Material
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color={"white"} variant="h6">
                          Cantidad
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color={"white"} variant="h6">
                          Precio
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography color={"white"} variant="h6">
                          Sub total de monedas
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.detalles.map((row) => (
                      <TableRow key={row.desc}>
                        <TableCell sx={{ color: "white" }}>
                          {row.Material}
                        </TableCell>
                        <TableCell sx={{ color: "white" }}>
                          {row.Cantidad}
                        </TableCell>
                        <TableCell sx={{ color: "white" }}>
                          {row.Precio}
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="right">
                          {row.sub_total_monedas}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell rowSpan={3} />
                      <TableCell align="right" colSpan={2}>
                        <Typography color={"white"} variant="h5">
                          Total de monedas:{" "}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography color={"white"} variant="h5">
                          {data.Total_monedas}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
