import {
  useDeleteBorrowBookMutation,
  useGetAllBorrowInfoQuery,
} from "@/redux/APIs/borrowApi";
import type { IBook } from "@/redux/APIs/interfaces/book.interface";
import { GrFormView } from "react-icons/gr";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";

const AllBorrow = () => {
  interface IBorrowBook {
    quantity: number;
    dueDate: string;
    book: IBook;
    _id?: string;
  }
  const { data } = useGetAllBorrowInfoQuery(undefined);
  const [deleteBorrow] = useDeleteBorrowBookMutation();
  const borrowedBookData = data?.data;
  //   console.log(borrowedBookData);

  const handleBorrowBookDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBorrow(id);
          Swal.fire({
            title: "Deleted!",
            text: "Your Borrowed Book is deleted.",
            icon: "success",
          });
        } catch (err: any) {
          Swal.fire({
            title: "Opps! Some Error Occure",
            text: `${err?.message}`,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div>
      <h2 className="my-y text-center text-xl md:text-3xl font-bold italic my-5">
        See All Borrow Books
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Book Title</th>
              <th>Book Author</th>
              <th>Quantity</th>
              <th>Due Date</th>
              <th>View Book</th>
              <th>Delete Borrow</th>
              <th>Edit Borrow Quantity</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBookData?.map((x: IBorrowBook, indx: number) => (
              <tr key={indx}>
                <th>{indx + 1}</th>
                <td>{x?.book?.title}</td>
                <td>{x?.book?.author}</td>
                <td>{x?.quantity}</td>
                <td>{x?.dueDate}</td>
                <td>
                  <Link
                    className="btn btn-outline"
                    to={`/books/${x?.book?._id}`}
                  >
                    {" "}
                    <GrFormView />{" "}
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleBorrowBookDelete(x?._id as string)}
                    className="btn btn-outline"
                  >
                    {" "}
                    <MdDelete />{" "}
                  </button>
                </td>
                <td>
                  <Link
                    className="btn btn-outline"
                    to={`/edit-borrow/${x?._id}`}
                  >
                    {" "}
                    <FaEdit></FaEdit>{" "}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBorrow;
