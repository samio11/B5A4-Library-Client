import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import type { IBook } from "@/redux/APIs/interfaces/book.interface";
import { useGetABookQuery, useUpdateBookMutation } from "@/redux/APIs/bookApi";
import { useEffect } from "react";
import Swal from "sweetalert2";
const HomeEditBook = () => {
  const { id } = useParams();
  const form = useForm<IBook>();
  const navigate = useNavigate();
  const { data } = useGetABookQuery(id as string);
  const [updateBook] = useUpdateBookMutation();
  const bookData = data?.totalData;

  useEffect(() => {
    if (bookData) {
      form.reset({
        title: bookData.title,
        author: bookData.author,
        genre: bookData.genre,
        isbn: bookData.isbn,
        description: bookData.description,
        copies: bookData.copies.toString(),
        available: bookData.available,
      });
    }
  }, [bookData]);
  const onSubmit: SubmitHandler<IBook> = async (data) => {
    const newData = { ...data, copies: Number(data?.copies) };
    // console.log("New Data", newData);
    try {
      const result = await updateBook({ id: id, bookData: newData }).unwrap();
      console.log(result);
      if (result) {
        Swal.fire({
          title: "Book Updated!",
          text: "Your Book is successfully Updated.",
          icon: "success",
        });
        navigate("/");
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
    <div className="h-auto md:h-[80vh] w-full flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <Form {...form}>
            <p className="my-2 text-xl md:text-2xl italic font-semibold text-center">
              Edit Book
            </p>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field}></Input>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input {...field}></Input>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Genre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Genre</SelectLabel>
                            <SelectItem value="FICTION">FICTION</SelectItem>
                            <SelectItem value="NON_FICTION">
                              NON_FICTION
                            </SelectItem>
                            <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                            <SelectItem value="HISTORY">HISTORY</SelectItem>
                            <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                            <SelectItem value="FANTASY">FANTASY</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISBN</FormLabel>
                    <FormControl>
                      <Input {...field}></Input>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field}></Textarea>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="copies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>copies</FormLabel>
                    <FormControl>
                      <Input {...field}></Input>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-center items-center">
                <Button className="btn btn-wide" type="submit">
                  Update Book
                </Button>
              </div>
            </form>
          </Form>
          <Button className="ml-3" onClick={() => navigate(-1)}>
            Back Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeEditBook;
