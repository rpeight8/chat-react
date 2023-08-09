import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useCallback } from "react";
import { sendMessage } from "@/services";

const formSchema = z.object({
  message: z.string().nonempty("Message cannot be empty"),
});

type MessageInputFormProps = {
  selectedRoom: string | null;
};

const MessageInputForm = ({ selectedRoom }: MessageInputFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = useCallback(
    (data: z.infer<typeof formSchema>) => {
      if (!selectedRoom) {
        return;
      }
      sendMessage(selectedRoom, data.message);
    },
    [selectedRoom]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-[1fr_auto] items-center gap-2"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your message</FormLabel>
              <FormControl>
                <Input placeholder="Your message here..." {...field} />
              </FormControl>
              <FormDescription>
                Message to be sent to other members
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Send</Button>
      </form>
    </Form>
  );
};

export default MessageInputForm;
