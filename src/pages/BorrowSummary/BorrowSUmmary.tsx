import { useShowBorrowSummaryQuery } from "@/redux/APIs/borrowApi";
import BorrowSummaryBanner from "./BorrowSummaryBanner";

const BorrowSUmmary = () => {
  interface IBorrowBooks {
    isbn: string;
    title: string;
  }
  interface IBorrowBook {
    book: IBorrowBooks;
    totalQuantity: number;
  }
  const { data } = useShowBorrowSummaryQuery(undefined);
  const totalBorrowBookData: IBorrowBook[] = data?.data;
  // console.log(totalBorrowBookData);
  return (
    <div>
      <div>
        <BorrowSummaryBanner></BorrowSummaryBanner>
      </div>
      <div className=" flex justify-between items-center">
        <div>
          <div className="overflow-x-auto w-screen">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Book Title</th>
                  <th>ISBN</th>
                  <th> Total Quantity Borrowed</th>
                </tr>
              </thead>
              <tbody>
                {totalBorrowBookData?.map((x: IBorrowBook, indx: number) => (
                  <tr key={indx}>
                    <th>{indx + 1}</th>
                    <td>{x.book.title}</td>
                    <td>{x.book.isbn}</td>
                    <td>{x.totalQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowSUmmary;
