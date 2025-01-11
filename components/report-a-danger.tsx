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
	  { value: "line4", label: "Line 3bis" },
	  { value: "line5", label: "Line 4" },
	  { value: "line6", label: "Line 5" },
	  { value: "line7", label: "Line 6" },
	  { value: "line8", label: "Line 7" },
	  { value: "line9", label: "Line 7bis" },
	  { value: "line10", label: "Line 8" },
	  { value: "line11", label: "Line 9" },
	  { value: "line12", label: "Line 10" },
	  { value: "line13", label: "Line 11" },
	  { value: "line14", label: "Line 12" },
	  { value: "line15", label: "Line 13" },
	  { value: "line16", label: "Line 14" },
	];
	const stations = [
		{ value: "station1", label: "Saint-Denis Pleyel" },
		{ value: "station2", label: "Mairie de Saint-Ouen" },
		{ value: "station3", label: "Saint-Ouen" },
		{ value: "station4", label: "Porte de Clichy" },
		{ value: "station5", label: "Pont Cardinet" },
		{ value: "station6", label: "Saint-Lazare" },
		{ value: "station7", label: "Madeleine" },
		{ value: "station8", label: "Pyramides" },
		{ value: "station9", label: "Châtelet" },
		{ value: "station10", label: "Gare de Lyon" },
		{ value: "station11", label: "Bercy" },
		{ value: "station12", label: "Cour Saint-Émilion" },
		{ value: "station13", label: "Bibliothèque François Mitterrand" },
		{ value: "station14", label: "Olympiades" },
		{ value: "station15", label: "Maison Blanche" },
		{ value: "station16", label: "Hôpital Bicêtre" },
		{ value: "station17", label: "Villejuif - Gustave Roussy" },
		{ value: "station18", label: "L'Haÿ-les-Roses" },
		{ value: "station19", label: "Chevilly-Larue" },
		{ value: "station20", label: "Thiais - Orly" },
		{ value: "station21", label: "Aéroport d'Orly" },
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
