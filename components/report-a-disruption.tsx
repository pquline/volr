"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect, useState } from "react";

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
import { submitDisruption } from "../actions/submitDisruption";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useCity } from "./city-toggle";

const formSchema = z.object({
  line: z.string().min(1),
  station: z.string().min(1),
  comment: z.string().max(180).optional(),
});

interface ReportADisruptionProps {
  onDisruptionSubmitted?: () => void;
}

export function SignalDisruptionForm({ onDisruptionSubmitted }: ReportADisruptionProps) {
  const { city, isLoading: isCityLoading } = useCity();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [options, setOptions] = React.useState<{
    lines: { value: string; label: string }[];
    stations: { value: string; label: string }[];
  }>({
    lines: [],
    stations: [],
  });
  const [formData, setFormData] = useState({
    lineName: '',
    station: '',
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      line: "",
      station: "",
      comment: "",
    },
  });

  const loadTransportData = React.useCallback(async () => {
    if (!city) return;
    try {
      // Clear existing options while loading
      setOptions({
        lines: [],
        stations: []
      });
      const data = await fetchTransportData(city, formData.lineName);
      setOptions(data);
    } catch (error) {
      console.error('Error loading transport data:', error);
    }
  }, [city, formData.lineName]);

  useEffect(() => {
    if (!isCityLoading && city) {
      loadTransportData();
    }
  }, [loadTransportData, isCityLoading, city]);

  useEffect(() => {
    const handleCityChange = () => {
      loadTransportData();
      // Reset form data when city changes
      setFormData({
        lineName: '',
        station: '',
      });
      form.reset();
    };

    window.addEventListener('cityChanged', handleCityChange);
    return () => {
      window.removeEventListener('cityChanged', handleCityChange);
    };
  }, [loadTransportData, form]);

  const handleLineChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      lineName: value,
      station: '', // Reset station when line changes
    }));
    form.setValue("line", value);
  };

  const handleStationChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      station: value,
    }));
    form.setValue("station", value);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!city) return;
    try {
      setIsSubmitting(true);
      const result = await submitDisruption({
        ...values,
        city
      });

      if (result.success) {
        toast.success("Disruption reported successfully!");
        form.reset();
        setFormData({
          lineName: "",
          station: "",
        });
        onDisruptionSubmitted?.();
      } else {
        toast.error(result.error || "Failed to submit disruption");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full space-y-4">
      <div className="h-[40px] flex items-center">
        <h2 className="text-lg font-black truncate lg:text-xl">
          Report A Disruption
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
                      <div className={cn(!city && "opacity-50 pointer-events-none")}>
                        <SearchableSelect
                          label="line"
                          options={options.lines}
                          value={formData.lineName}
                          onValueChange={handleLineChange}
                          placeholder="Select a line..."
                          error={!!form.formState.errors.line}
                        />
                      </div>
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
                      <div className={cn(!formData.lineName && "opacity-50 pointer-events-none")}>
                        <SearchableSelect
                          label="station"
                          options={options.stations}
                          value={formData.station}
                          onValueChange={handleStationChange}
                          placeholder="Select a station..."
                          error={!!form.formState.errors.station}
                        />
                      </div>
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
                        placeholder="Enter an optional comment describing the disruption..."
                        className="resize-none"
                        {...field}
                        maxLength={45}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-end">
                <Button
                  variant="default"
                  type="submit"
                  className="justify-end"
                  disabled={isSubmitting || !city}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignalDisruptionForm;
