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
import { logger } from "@/lib/logger";

const formSchema = z.object({
  line: z.string().min(1, "Please select a line"),
  station: z.string().min(1, "Please select a station"),
  comment: z.string().max(40, "Comment must be less than 40 characters").optional(),
});

interface ReportADisruptionProps {
  onDisruptionSubmitted?: () => void;
}

export function SignalDisruptionForm({ onDisruptionSubmitted }: ReportADisruptionProps) {
  const { city, isLoading: isCityLoading } = useCity();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isLoadingData, setIsLoadingData] = React.useState(false);
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
      setIsLoadingData(true);
      logger.debug(`Loading transport data for city: ${city}, line: ${formData.lineName}`);

      // Clear existing options while loading
      setOptions({
        lines: [],
        stations: []
      });

      const data = await fetchTransportData(city, formData.lineName);
      setOptions(data);

      logger.debug(`Transport data loaded successfully. Lines: ${data.lines.length}, Stations: ${data.stations.length}`);
    } catch (error) {
      logger.error('Error loading transport data', error);
      toast.error("Failed to load transport data. Please try again.");
    } finally {
      setIsLoadingData(false);
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
      logger.debug('Form values:', values);
      logger.debug('City:', city);
      logger.debug('Submitting disruption with data:', {
        city,
        line: values.line,
        station: values.station,
        comment: values.comment
      });

      const result = await submitDisruption({
        city,
        line: values.line,
        station: values.station,
        comment: values.comment
      });

      if (result.success) {
        logger.info(`Disruption submitted successfully for city: ${city}, line: ${values.line}, station: ${values.station}`);
        toast.success("Disruption reported successfully!");
        form.reset();
        setFormData({
          lineName: "",
          station: "",
        });
        onDisruptionSubmitted?.();
      } else {
        logger.error(`Failed to submit disruption: ${result.error}`);
        toast.error(result.error || "Failed to submit disruption");
      }
    } catch (error) {
      logger.error('Error submitting form', error);
      toast.error("An unexpected error occurred. Please try again.");
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
                render={() => (
                  <FormItem>
                    <FormLabel className="px-2 font-bold">
                      Line<span className="font-normal"> (Required)</span>
                    </FormLabel>
                    <FormControl>
                      <div className={cn(
                        !city && "opacity-50 pointer-events-none",
                        isLoadingData && "opacity-50 pointer-events-none"
                      )}>
                        <SearchableSelect
                          label="line"
                          options={options.lines}
                          value={formData.lineName}
                          onValueChange={handleLineChange}
                          placeholder={isLoadingData ? "Loading lines..." : "Select a line..."}
                          error={!!form.formState.errors.line}
                          disabled={isLoadingData}
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
                render={() => (
                  <FormItem>
                    <FormLabel className="px-2 font-bold">
                      Station<span className="font-normal"> (Required)</span>
                    </FormLabel>
                    <FormControl>
                      <div className={cn(
                        !formData.lineName && "opacity-50 pointer-events-none",
                        isLoadingData && "opacity-50 pointer-events-none"
                      )}>
                        <SearchableSelect
                          label="station"
                          options={options.stations}
                          value={formData.station}
                          onValueChange={handleStationChange}
                          placeholder={isLoadingData ? "Loading stations..." : "Select a station..."}
                          error={!!form.formState.errors.station}
                          disabled={isLoadingData}
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
                        maxLength={40}
                        disabled={isSubmitting}
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
                  disabled={isSubmitting || !city || isLoadingData}
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
