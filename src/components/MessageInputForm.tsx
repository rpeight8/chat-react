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
  connectedRoom: string | null;
};

const MessageInputForm = ({ connectedRoom }: MessageInputFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = useCallback(
    (data: z.infer<typeof formSchema>) => {
      if (!connectedRoom) {
        return;
      }
      sendMessage(connectedRoom, data.message);
    },
    [connectedRoom]
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
                <Input
                  placeholder="Your message here..."
                  disabled={!connectedRoom}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Message to be sent to other members
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!connectedRoom}>
          Send
        </Button>
      </form>
    </Form>
  );
};

export default MessageInputForm;
