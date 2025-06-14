"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { logger } from "@/lib/logger";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { submitDisruption } from "../actions/submitDisruption";
import { useCity } from "./city-toggle";

const formSchema = z.object({
  line: z.string().min(1, "Please select a line or enter a custom line"),
  station: z.string().min(1, "Please select a station or enter a custom station"),
  comment: z.string().max(40, "Comment must be less than 40 characters").optional(),
});

interface LineOption {
  value: string;
  label: string;
  order: number;
  type: string;
}

interface ApiLineData {
  name: string;
  order: number;
  type?: string;
}

interface StationOption {
  value: string;
  label: string;
}

interface TransportData {
  lines: LineOption[];
  stations: StationOption[];
  groupedLines: Record<string, LineOption[]>;
}

interface ReportADisruptionProps {
  onDisruptionSubmitted?: () => void;
}

export function SignalDisruptionForm({ onDisruptionSubmitted }: ReportADisruptionProps) {
  const t = useTranslations();
  const { city, isLoading: isCityLoading } = useCity();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isLoadingData, setIsLoadingData] = React.useState(false);
  const [options, setOptions] = React.useState<TransportData>({
    lines: [],
    stations: [],
    groupedLines: {},
  });
  const [formData, setFormData] = useState({
    lineName: '',
    station: '',
    isCustomLine: false,
    isCustomStation: false,
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

      // Clear existing options while loading
      setOptions({
        lines: [],
        stations: [],
        groupedLines: {},
      });

      // Fetch lines from API
      const linesResponse = await fetch(`/api/lines?city=${encodeURIComponent(city)}`);
      if (!linesResponse.ok) {
        throw new Error(`Failed to fetch lines: ${linesResponse.statusText}`);
      }
      const linesData = await linesResponse.json();

      // Filter out custom lines (those that don't have a type)
      const officialLines = linesData.filter((line: ApiLineData) => line.type);

      // Transform lines data to match our interface
      const lineOptions: LineOption[] = officialLines.map((line: ApiLineData) => ({
        value: line.name,
        label: line.name,
        order: line.order,
        type: line.type || 'bus'
      }));

      // Group lines by type
      const groupedLines = lineOptions.reduce((acc, line) => {
        const type = (line.type || 'bus').toUpperCase();
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(line);
        return acc;
      }, {} as Record<string, LineOption[]>);

      // Sort lines within each group by order
      Object.keys(groupedLines).forEach(type => {
        groupedLines[type].sort((a, b) => a.order - b.order);
      });

      // Remove the Custom category if it exists
      delete groupedLines['CUSTOM'];

      // Don't fetch stations initially - only fetch when a line is selected
      setOptions({
        lines: lineOptions,
        stations: [], // Empty initially
        groupedLines
      });
    } catch (error) {
      logger.error('Error loading transport data', error);
      toast.error(t("errors.loadTransportData"));
    } finally {
      setIsLoadingData(false);
    }
  }, [city, t]);

  const loadStationsForLine = React.useCallback(async (lineName: string) => {
    if (!city || !lineName) {
      setOptions(prev => ({
        ...prev,
        stations: []
      }));
      return;
    }

    try {
      const stationsResponse = await fetch(`/api/stations?city=${encodeURIComponent(city)}&line=${encodeURIComponent(lineName)}`);
      if (!stationsResponse.ok) {
        throw new Error(`Failed to fetch stations: ${stationsResponse.statusText}`);
      }
      const stationsData = await stationsResponse.json();

      const stationOptions: StationOption[] = stationsData
        .sort((a: string, b: string) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
        .map((station: string) => ({
          value: station,
          label: station
        }));

      setOptions(prev => ({
        ...prev,
        stations: stationOptions
      }));
    } catch (error) {
      logger.error('Error loading stations for line', error);
      toast.error(t("errors.loadStations"));
    }
  }, [city, t]);

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
        isCustomLine: false,
        isCustomStation: false,
      });
      form.reset();
    };

    window.addEventListener('cityChanged', handleCityChange);
    return () => {
      window.removeEventListener('cityChanged', handleCityChange);
    };
  }, [loadTransportData, form]);

  const handleLineChange = (value: string) => {
    const isCustom = value === 'custom';
    setFormData(prev => ({
      ...prev,
      lineName: isCustom ? '' : value,
      station: '',
      isCustomLine: isCustom,
      isCustomStation: isCustom,
    }));
    form.setValue("line", isCustom ? '' : value);
    form.setValue("station", "");
    if (!isCustom) {
      loadStationsForLine(value);
    }
  };

  const handleStationChange = (value: string) => {
    const isCustom = value === 'custom';
    setFormData(prev => ({
      ...prev,
      station: isCustom ? '' : value,
      isCustomStation: isCustom,
    }));
    form.setValue("station", isCustom ? '' : value);
  };

  const handleCustomLineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      lineName: value,
    }));
    form.setValue("line", value);
  };

  const handleCustomStationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
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
        city,
        line: values.line,
        station: values.station,
        comment: values.comment
      });

      if (result.success) {
        logger.info(`Disruption submitted successfully for city: ${city}, line: ${values.line}, station: ${values.station}`);
        toast.success(t("success.submit"));
        form.reset();
        setFormData({
          lineName: "",
          station: "",
          isCustomLine: false,
          isCustomStation: false,
        });
        onDisruptionSubmitted?.();
      } else {
        logger.error(`Failed to submit disruption: ${result.error}`);
        toast.error(result.error || t("errors.submit"));
      }
    } catch (error) {
      logger.error('Error submitting form', error);
      toast.error(t("errors.unexpected"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full space-y-4">
      <div className="h-[40px] flex items-center">
        <h2 className="text-lg font-black truncate lg:text-xl">
          {t("report.title")}
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
                      {t("report.form.labels.line")}<span className="font-normal"> ({t("common.required")})</span>
                    </FormLabel>
                    <FormControl>
                      <div className={cn(
                        !city && "opacity-50 pointer-events-none",
                        isLoadingData && "opacity-50 pointer-events-none"
                      )}>
                        {formData.isCustomLine ? (
                          <div className="flex gap-2">
                            <Input
                              value={formData.lineName}
                              onChange={handleCustomLineChange}
                              placeholder={t("report.form.placeholders.line")}
                              className="w-full"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  lineName: '',
                                  isCustomLine: false,
                                }));
                                form.setValue("line", "");
                              }}
                              className="shrink-0"
                            >
                              Back
                            </Button>
                          </div>
                        ) : (
                          <div className="relative">
                            <select
                              value={formData.lineName}
                              onChange={e => handleLineChange(e.target.value)}
                              className={cn(
                                "w-full min-w-[110px] appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                              )}
                              aria-label="Select line"
                              disabled={isLoadingData}
                            >
                              <option value="" disabled>
                                {isLoadingData ? t("common.loading") : t("report.form.placeholders.line")}
                              </option>
                              {Object.entries(options.groupedLines).map(([type, lines]) => (
                                <optgroup key={type} label={type}>
                                  {lines.map((line) => (
                                    <option key={line.value} value={line.value}>
                                      {line.label}
                                    </option>
                                  ))}
                                </optgroup>
                              ))}
                              <option value="custom">Other (Custom Line)</option>
                            </select>
                            <svg className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        )}
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
                      {t("report.form.labels.station")}<span className="font-normal"> ({t("common.required")})</span>
                    </FormLabel>
                    <FormControl>
                      <div className={cn(
                        !formData.lineName && !formData.isCustomLine && "opacity-50 pointer-events-none",
                        isLoadingData && "opacity-50 pointer-events-none"
                      )}>
                        {formData.isCustomStation ? (
                          <div className="flex gap-2">
                            <Input
                              value={formData.station}
                              onChange={handleCustomStationChange}
                              placeholder={t("report.form.placeholders.station")}
                              className="w-full"
                            />
                          </div>
                        ) : (
                          <div className="relative">
                            <select
                              value={formData.station}
                              onChange={e => handleStationChange(e.target.value)}
                              className={cn(
                                "w-full min-w-[110px] appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                              )}
                              aria-label="Select station"
                              disabled={isLoadingData || !formData.lineName}
                            >
                              <option value="" disabled>
                                {isLoadingData ? t("common.loading") : t("report.form.placeholders.station")}
                              </option>
                              {options.stations.map((station) => (
                                <option key={station.value} value={station.value}>
                                  {station.label}
                                </option>
                              ))}
                              {formData.isCustomLine && <option value="custom">Other (Custom Station)</option>}
                            </select>
                            <svg className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        )}
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
                    <FormLabel className="px-2 font-bold">{t("report.form.labels.comment")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("report.form.placeholders.comment")}
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
                  {isSubmitting ? t("common.loading") : t("report.form.submit")}
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
