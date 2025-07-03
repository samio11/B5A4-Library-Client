import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "@/pages/HomePage/HomePage";
import AddBook from "@/pages/AddBook/AddBook";
import BorrowSUmmary from "@/pages/BorrowSummary/BorrowSUmmary";
import HomeEditBook from "@/pages/HomePage/HomeEditBook";
import CreateBorrowBook from "@/pages/BorrowBook/CreateBorrowBook";

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
      {
        path: "edit-book/:id",
        element: <HomeEditBook></HomeEditBook>,
      },
      {
        path: "borrow/:bookId",
        element: <CreateBorrowBook></CreateBorrowBook>,
      },
    ],
  },
]);

export default route;
