import type { RouteRecord } from "vite-react-ssg";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Servicios from "./pages/Servicios";
import Agencias from "./pages/Agencias";
import NotFound from "./pages/NotFound";

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },
      { path: "servicios", element: <Servicios /> },
      { path: "agencias", element: <Agencias /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];
