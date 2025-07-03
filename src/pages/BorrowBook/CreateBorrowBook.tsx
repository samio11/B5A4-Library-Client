import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useGetABookQuery } from "@/redux/APIs/bookApi";
import { useCreateBorrowMutation } from "@/redux/APIs/borrowApi";
import type { IBorrow } from "@/redux/APIs/interfaces/borrow.interface";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const CreateBorrowBook = () => {
  const { bookId } = useParams();
  const { data } = useGetABookQuery(bookId as string);
  const bookInfo = data?.totalData;
  const navigate = useNavigate();
  const [createBorrow] = useCreateBorrowMutation();

  const form = useForm<IBorrow>();
  const onSubmit: SubmitHandler<IBorrow> = async (data) => {
    const formattedData = {
      ...data,
      dueDate: format(new Date(data.dueDate), "dd-MM-yyyy"),
      quantity: Number(data.quantity),
    };

    try {
      const result = await createBorrow({
        id: bookId,
        borrowData: formattedData,
      });
      console.log(result);
      if (result.data) {
        Swal.fire({
          title: "Borrow Created!",
          text: "Your Borrow is successfully created.",
          icon: "success",
        });
        navigate("/show-borrow-summary");
      } else {
        Swal.fire({
          title: "Opps! Some Error Occure",
          text: `We Try To Fix it Soon..`,
          icon: "error",
        });
      }
    } catch (err: any) {
      Swal.fire({
        title: "Opps! Some Error Occure",
        text: `${err?.message}`,
        icon: "error",
      });
    }
  };
  return (
    <div>
      <h2 className="my-y text-center text-xl md:text-3xl font-bold italic">
        Borrow A Book
      </h2>
      <div className="w-full h-auto md:h-[80vh] flex flex-col md:flex-row justify-evenly items-center gap-2">
        {/* left  */}
        <div className="flex-1 h-auto flex justify-center items-center">
          <div>
            <div className="card bg-neutral text-neutral-content w-full">
              <div className="card-body items-center text-center">
                <h2 className="card-title">{bookInfo?.title}</h2>
                <p>{bookInfo?.description}</p>
                <p>
                  Author:-{" "}
                  <span className="text-gray-400 italic">
                    {bookInfo?.author}
                  </span>{" "}
                </p>
                <p>
                  Book Type:-{" "}
                  <span className="text-gray-400 italic">
                    {bookInfo?.genre}
                  </span>{" "}
                </p>
                <p>
                  Available Copies:-{" "}
                  <span className="text-gray-400 italic">
                    {bookInfo?.copies}
                  </span>{" "}
                </p>
                <div className="card-actions justify-end"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Right  */}
        <div className="flex-1 h-auto flex justify-center items-center">
          <div>
            <Form {...form}>
              <form
                className="space-y-3 shadow-xl p-7 rounded-2xl"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" {...field}></Input>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  className=" btn btn-outline btn-wide mx-auto"
                >
                  Borrow
                </button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBorrowBook;
