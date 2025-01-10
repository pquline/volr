"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SearchableSelect } from "./searchable-select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  line: z.string().min(1),
  station: z.string().min(1),
  comment: z.string().max(180).optional(),
});

export function SignalDangerForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const [options, setOptions] = React.useState<{
    lines: { value: string; label: string }[];
    stations: { value: string; label: string }[];
  }>({
    lines: [],
    stations: [],
  });

  React.useEffect(() => {
    const fetchOptions = async () => {
      const lines = [
        { value: "line1", label: "Line 1" },
        { value: "line2", label: "Line 2" },
        { value: "line3", label: "Line 3" },
      ];
      const stations = [
        { value: "station1", label: "Station 1" },
        { value: "station2", label: "Station 2" },
        { value: "station3", label: "Station 3" },
      ];

      setOptions({ lines, stations });
    };

    fetchOptions();
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-full space-y-4">
      <div className="h-[40px] flex items-center">
        <h2 className="text-lg font-black truncate lg:text-xl">
          Report A Danger
        </h2>
      </div>
      <Card>
        <CardContent className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="line"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="px-2 font-bold">
                      Line<span className="font-normal"> (Required)</span>
                    </FormLabel>
                    <FormControl>
                      <SearchableSelect
                        label="line"
                        options={options.lines}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select a line..."
                        error={!!form.formState.errors.line}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="station"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="px-2 font-bold">
                      Station<span className="font-normal"> (Required)</span>
                    </FormLabel>
                    <FormControl>
                      <SearchableSelect
                        label="station"
                        options={options.stations}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select a station..."
                        error={!!form.formState.errors.station}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="px-2 font-bold">Comment</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter an optional comment describing the danger..."
                        className="resize-none"
                        {...field}
                        maxLength={80}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-end">
                <Button variant="default" type="submit" className="justify-end">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignalDangerForm;
