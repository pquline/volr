export interface TransportData {
  lines: { value: string; label: string }[];
  stations: { value: string; label: string }[];
}

interface LineOption {
  value: string;
  label: string;
  order: number;
}

export async function fetchTransportData(city: string, lineName?: string): Promise<TransportData> {
  try {
    // Capitalize the city name to match database format
    const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);

    // Fetch lines for the city
    const linesResponse = await fetch(`/api/lines?city=${encodeURIComponent(capitalizedCity)}`);
    if (!linesResponse.ok) {
      throw new Error('Failed to fetch lines');
    }
    const lines = await linesResponse.json();

    let stations: string[] = [];
    if (lineName) {
      // Fetch stations for the specific line
      const line = lines.find((l: { name: string }) => l.name === lineName);
      if (line) {
        stations = line.stations;
      }
    }

    // Sort lines by their order field from the database
    const sortedLines = lines
      .map((line: { name: string; order: number }) => {
        return {
          value: line.name,
          label: line.name,
          order: typeof line.order === 'string' ? parseInt(line.order, 10) : line.order,
        };
      })
      .sort((a: LineOption, b: LineOption) => a.order - b.order)
      .map(({ value, label }: LineOption) => ({ value, label }));

    return {
      lines: sortedLines,
      stations: stations
        .sort((a, b) => a.localeCompare(b))
        .map((station: string) => ({
          value: station,
          label: station,
        })),
    };
  } catch (error) {
    console.error('Error fetching transport data:', error);
    throw error;
  }
}
