export interface Disruption {
  id: string;
  station: string;
  line: string;
  last_edit: Date;
  comment: string | null;
  votes: number;
}

export async function fetchDisruptions(city: string): Promise<Disruption[]> {
  try {
    // Capitalize the city name to match database format
    const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);
    const response = await fetch(`/api/disruptions?city=${encodeURIComponent(capitalizedCity)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch disruptions');
    }

    const data = await response.json();

    // Transform the API response to match the expected Disruption interface
    return data.map((entry: any) => ({
      id: entry.id.toString(),
      station: entry.station,
      line: entry.lineName,
      last_edit: entry.updatedAt,
      comment: entry.comment,
      votes: entry.votes
    }));
  } catch (error) {
    console.error('Error fetching disruptions:', error);
    throw error;
  }
}
