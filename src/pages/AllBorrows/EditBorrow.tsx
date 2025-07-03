import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useGetABorrowInfoQuery,
  useUpdateBorrowInfoMutation,
} from "@/redux/APIs/borrowApi";
import { useEffect } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditBorrow = () => {
  const { id } = useParams();
  const { data } = useGetABorrowInfoQuery(id as string);
  const [updateBorrowQuantity] = useUpdateBorrowInfoMutation();
  const navigate = useNavigate();
  //   console.log(data);
  const borrowData = data?.data;
  console.log(borrowData);
  const form = useForm();

  useEffect(() => {
    if (borrowData) {
      form.reset({
        quantity: borrowData.quantity,
      });
    }
  }, [borrowData]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const result = await updateBorrowQuantity({
        id: id,
        borrowData: data,
      }).unwrap();
      console.log(result);
      if (result) {
        Swal.fire({
          title: "Book Updated!",
          text: "Your Borrow is successfully Updated.",
          icon: "success",
        });
        navigate("/all-borrow");
      }
    } catch (err: any) {
      Swal.fire({
        title: "Opps! Some Error Occure",
        text: `We will fix it later`,
        icon: "error",
      });
    }
  };
  return (
    <div className="w-auto md:w-screen h-auto md:h-[80vh] flex justify-center items-center">
      <div className="shadow-2xl p-10 space-y-2">
        <h2 className="text-center text-gray-600 font-semibold italic">
          Edit Quantity of Borrowed Book
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Borrow Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field}></Input>
                  </FormControl>
                </FormItem>
              )}
            />
            <button
              type="submit"
              className="btn btn-outline btn-wide my-3 mx-auto"
            >
              Update
            </button>
          </form>
        </Form>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline btn-wide mx-auto"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default EditBorrow;
