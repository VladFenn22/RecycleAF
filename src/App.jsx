import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./components/Home/Home";
import { PageNotFound } from "./components/Home/PageNotFound";
import { ListCentroAcopio } from "./components/CentroAcopio/ListCentroAcopio";
import { DetailCentroAcopio } from "./components/CentroAcopio/DetailCentroAcopio";
import TableCentroAcopio from "./components/CentroAcopio/TableCentroAcopio";
import { ListMaterial } from "./components/Material/ListMaterial";
import { DetailMaterial } from "./components/Material/DetailMaterial";
import TableMaterial from "./components/Material/TableMaterial";
import TableHistorialCanjeMaterial from "./components/HistorialMateriales/TableHistorialCanjeMaterial";
import { ListHistorialCanjeMaterial } from "./components/HistorialMateriales/ListHistorialCanjeMaterial";
import TableHistorialMaterialCl from "./components/HistorialMateriales/TableHistorialMaterialCl";
import { DetailEncabezado } from "./components/HistorialMateriales/DetailEncabezado";
import { CreateCentroAcopio } from "./components/CentroAcopio/CreateCentroAcopio";
import { UpdateCentroAcopio } from "./components/CentroAcopio/UpdateCentroAcopio";
import { CreateMaterial } from "./components/Material/CreateMaterial";
import { UpdateMaterial } from "./components/Material/UpdateMaterial";
import UserProvider from "./components/User/UserProvider";
import { Unauthorized } from "./components/User/Unauthorized";
import { Login } from "./components/User/Login";
import { Logout } from "./components/User/Logout";
import { Signup } from "./components/User/Signup";
import { CreateCupon } from "./components/Cupon/CreateCupon";
import { ListCupon } from "./components/Cupon/ListCupon";
import { UpdateCupon } from "./components/Cupon/UpdateCupon";
import { CanjearMaterial } from "./components/GestionCanje/CanjearMaterial";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/centroacopio",
    element: <ListCentroAcopio />,
  },
  {
    path: "/centroacopio/:id",
    element: <DetailCentroAcopio />,
  },
  {
    path: "/centroacopio-table",
    element: <TableCentroAcopio />,
  },
  {
    path: "/centroacopio/crear",
    element: <CreateCentroAcopio />,
  },
  {
    path: "/centroacopio/update/:id",
    element: <UpdateCentroAcopio />,
  },
  {
    path: "/material",
    element: <ListMaterial />,
  },
  {
    path: "/material/:id",
    element: <DetailMaterial />,
  },
  {
    path: "/material-table",
    element: <TableMaterial />,
  },
  {
    path: "/material/crear",
    element: <CreateMaterial />,
  },
  {
    path: "/material/update/:id",
    element: <UpdateMaterial />,
  },
  {
    path: "historialmaterial/:id",
    element: <ListHistorialCanjeMaterial />,
  },
  {
    path: "/historialmaterial-table/:id",
    element: <TableHistorialCanjeMaterial />,
  },
  {
    path: "historialmaterialcl-table/",
    element: <TableHistorialMaterialCl />,
  },
  {
    path: "/encabezadocanje/:id",
    element: <DetailEncabezado />,
  },

  {
    path: "/create-cupon",
    element: <CreateCupon />,
  },

  {
    path: "/cupon",
    element: <ListCupon/>
  },

  {
    path: "/cupon/update/:id",
    element: <UpdateCupon/>
  },

  {
    path: '/canjearmaterial/:id',
    element: <CanjearMaterial/>
  },

  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/usuario/login",
    element: <Login />,
  },
  {
    path: "/usuario/logout",
    element: <Logout />,
  },
  {
    path: "/usuario/create",
    element: <Signup />,
  },
]);

export default function App() {
  return (
    <UserProvider>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </UserProvider>
  );
}
