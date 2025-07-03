import { cn } from "@/lib/utils";
import {
  useDeleteBookMutation,
  useGetAllBookQuery,
} from "@/redux/APIs/bookApi";
import type { IBook } from "@/redux/APIs/interfaces/book.interface";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";

const HomeTable = () => {
  const { data } = useGetAllBookQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();

  const bookData: IBook[] = data?.totalData;

  const handleDelete = async (id: string) => {
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
          await deleteBook(id);
          Swal.fire({
            title: "Deleted!",
            text: "Your Book is deleted.",
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
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>ISBN</th>
              <th>Copies</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-xs md:text-sm">
            {bookData?.map((x: IBook) => (
              <tr key={x?.isbn}>
                <td>{x?.title}</td>
                <td>{x?.author}</td>
                <td>{x?.genre}</td>
                <td>{x?.isbn}</td>
                <td>{x?.copies}</td>
                <td
                  className={cn("text-xs font-semibold italic", {
                    "text-green-600": x?.available === true,
                    "text-red-600": x?.available === false,
                  })}
                >
                  {x?.available === true ? "true" : "false"}
                </td>
                <td className="flex justify-center items-center gap-2">
                  <button className="btn btn-outline">Edit</button>
                  <button
                    onClick={() => handleDelete(x._id as string)}
                    className="btn btn-outline btn-error"
                  >
                    <MdDeleteOutline />
                  </button>
                  <button className="btn btn-outline">Borrow</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomeTable;
