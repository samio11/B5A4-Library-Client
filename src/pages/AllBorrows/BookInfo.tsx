import { useGetABookQuery } from "@/redux/APIs/bookApi";
import { useNavigate, useParams } from "react-router-dom";

const BookInfo = () => {
  const { id } = useParams();
  const { data } = useGetABookQuery(id as string);
  const bookInfo = data?.totalData;
  const navigate = useNavigate();
  return (
    <div className="w-auto md:w-screen h-auto md:h-[80vh] flex justify-center items-center">
      <div className="card bg-neutral text-neutral-content w-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{bookInfo?.title}</h2>
          <p>{bookInfo?.description}</p>
          <p>
            Author:-{" "}
            <span className="text-gray-400 italic">{bookInfo?.author}</span>{" "}
          </p>
          <p>
            Book Type:-{" "}
            <span className="text-gray-400 italic">{bookInfo?.genre}</span>{" "}
          </p>
          <p>
            Available Copies:-{" "}
            <span className="text-gray-400 italic">{bookInfo?.copies}</span>{" "}
          </p>
          <p>
            ISBN Number:-{" "}
            <span className="text-gray-400 italic">{bookInfo?.isbn}</span>{" "}
          </p>
          <div className="card-actions justify-end">
            <button onClick={() => navigate(-1)} className="btn btn-outline">
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
