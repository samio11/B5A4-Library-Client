import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "@/pages/HomePage/HomePage";
import AddBook from "@/pages/AddBook/AddBook";
import BorrowSUmmary from "@/pages/BorrowSummary/BorrowSUmmary";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        path: "create-book",
        element: <AddBook></AddBook>,
      },
      {
        path: "show-borrow-summary",
        element: <BorrowSUmmary></BorrowSUmmary>,
      },
    ],
  },
]);

export default route;
