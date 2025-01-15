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
import { fetchTransportData } from "../actions/fetchTransportData";

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
    const loadTransportData = async () => {
      try {
        const data = await fetchTransportData();
        setOptions(data);
      } catch (error) {
        console.error('Failed to load transport data:', error);
        // Here you might want to show an error message to the user
      }
    };
    loadTransportData();
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would typically send this data to your backend
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
                    <FormMessage />
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
                    <FormMessage />
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
                        maxLength={180}
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
