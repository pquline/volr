"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { SearchableSelect } from "./searchable-select"

const formSchema = z.object({
  line: z.string().min(1),
  station: z.string().min(1),
  location: z.string().min(1),
  direction: z.string().min(1),
})

export function SignalDangerForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  })

  const [options, setOptions] = React.useState<{
    lines: { value: string; label: string }[],
    stations: { value: string; label: string }[],
    locations: { value: string; label: string }[],
    directions: { value: string; label: string }[],
  }>({
    lines: [],
    stations: [],
    locations: [],
    directions: [],
  })

  React.useEffect(() => {
    const fetchOptions = async () => {
      const lines = [
        { value: "line1", label: "Line 1" },
        { value: "line2", label: "Line 2" },
        { value: "line3", label: "Line 3" },
      ]
      const stations = [
        { value: "station1", label: "Station 1" },
        { value: "station2", label: "Station 2" },
        { value: "station3", label: "Station 3" },
      ]
      const locations = [
        { value: "location1", label: "Location 1" },
        { value: "location2", label: "Location 2" },
        { value: "location3", label: "Location 3" },
      ]
      const directions = [
        { value: "direction1", label: "Direction 1" },
        { value: "direction2", label: "Direction 2" },
        { value: "direction3", label: "Direction 3" },
      ]

      setOptions({ lines, stations, locations, directions })
    }

    fetchOptions()
  }, [])

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Card className="border-muted">
        {/* <CardHeader>
          <CardTitle className="text-base sm:text-lg">Report A Danger</CardTitle>
        </CardHeader> */}
        <CardContent className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="line"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-4">
                    <FormControl className="flex-grow">
                      <SearchableSelect
                        options={options.lines}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Line"
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
                  <FormItem className="flex items-center space-x-4">
                    <FormControl className="flex-grow">
                      <SearchableSelect
                        options={options.stations}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Station"
                        error={!!form.formState.errors.station}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-4">
                    <FormControl className="flex-grow">
                      <SearchableSelect
                        options={options.locations}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Location"
                        error={!!form.formState.errors.location}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="direction"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-4">
                    <FormControl className="flex-grow">
                      <SearchableSelect
                        options={options.directions}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Direction"
                        error={!!form.formState.errors.direction}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-end">
                <Button type="submit" size="sm" className="justify-end">Submit</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
  )
}

export default SignalDangerForm;
