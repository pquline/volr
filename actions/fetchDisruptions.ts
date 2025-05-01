export interface Disruption {
  id: string;
  station: string;
  line: string;
  last_edit: string;
  comment: string | null;
  edits: number;
}

export async function fetchDisruptions() {
  try {
    const response = await fetch('https://api.transport.com/v1/disruptions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as Disruption[];
  } catch (error) {
    console.error('Failed to fetch disruptions:', error);
    // Fallback to mock data if API fails
    return [
      {
        id: "1",
        station: "Châtelet",
        line: "1",
        last_edit: "5m",
        comment: null,
        edits: 3,
      },
      {
        id: "2",
        station: "Gare de Lyon",
        line: "14",
        last_edit: "10m",
        comment: "Les controleurs sont la mdr",
        edits: 1,
      },
      {
        id: "3",
        station: "Bastille",
        line: "5",
        last_edit: "15m",
        comment: "Les controleurs sont la mdr",
        edits: 2,
      },
    ];
  }
}
