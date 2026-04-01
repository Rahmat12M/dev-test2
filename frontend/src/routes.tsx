import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Library from "./components/Library";
import ManageBooks from "./components/ManageBooks";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import BookDetails from "./components/BookDetails";

const childs = [
  { index: true, element: <Library /> },
  { path: "/", element: <Library /> },
  { path: "/books", element: <Library /> },
  { path: "/book/:isbn", element: <BookDetails /> },
  { path: "/manage", element: <ManageBooks /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/logout", element: <Logout /> }
];

const appRoutes = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: childs,
  },
];

export const router = createBrowserRouter(appRoutes);
