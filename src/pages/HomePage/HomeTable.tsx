import { cn } from "@/lib/utils";
import { useGetAllBookQuery } from "@/redux/APIs/bookApi";
import type { IBook } from "@/redux/APIs/interfaces/book.interface";

const HomeTable = () => {
  const { data } = useGetAllBookQuery(undefined);

  const bookData: IBook[] = data?.totalData;

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
                  <button className="btn btn-outline">Delete</button>
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
