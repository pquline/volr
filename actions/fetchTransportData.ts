export async function fetchTransportData() {
  try {
    // Try to fetch from real API
    const response = await fetch('https://api.transport.com/v1/lines-and-stations', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch transport data:', error);
    console.log('Falling back to mock data');

    // Fallback to mock data
    return {
      lines: [
        { value: "1", label: "Line 1" },
        { value: "2", label: "Line 2" },
        { value: "3", label: "Line 3" },
      ],
      stations: [
        { value: "station1", label: "Station 1" },
        { value: "station2", label: "Station 2" },
        { value: "station3", label: "Station 3" },
      ],
    };
  }
}
