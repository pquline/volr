const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Mock data for each city
const mockData = {
  paris: {
    lines: [
      { name: '1', stations: ['La Défense', 'Charles de Gaulle - Étoile', 'Châtelet'] },
      { name: '2', stations: ['Porte Dauphine', 'Charles de Gaulle - Étoile', 'Nation'] },
      { name: '3', stations: ['Pont de Levallois', 'Saint-Lazare', 'Gambetta'] },
      { name: '4', stations: ['Porte de Clignancourt', 'Gare du Nord', 'Mairie de Montrouge'] },
      { name: '5', stations: ['Bobigny', 'Gare du Nord', 'Place d\'Italie'] },
      { name: '6', stations: ['Charles de Gaulle - Étoile', 'Montparnasse', 'Nation'] },
      { name: '7', stations: ['La Courneuve', 'Châtelet', 'Mairie d\'Ivry'] },
      { name: '8', stations: ['Balard', 'Madeleine', 'Créteil'] },
      { name: '9', stations: ['Pont de Sèvres', 'Châtelet', 'Mairie de Montreuil'] },
      { name: '10', stations: ['Boulogne', 'Sèvres', 'Gare d\'Austerlitz'] },
      { name: '11', stations: ['Châtelet', 'République', 'Mairie des Lilas'] },
      { name: '12', stations: ['Front Populaire', 'Madeleine', 'Mairie d\'Issy'] },
      { name: '13', stations: ['Saint-Denis', 'Châtelet', 'Châtillon'] },
      { name: '14', stations: ['Saint-Lazare', 'Gare de Lyon', 'Olympiades'] },
      { name: 'RER A', stations: ['Cergy', 'La Défense', 'Gare de Lyon'] },
      { name: 'RER B', stations: ['Aéroport CDG', 'Gare du Nord', 'Saint-Rémy'] },
      { name: 'RER C', stations: ['Pontoise', 'Gare d\'Austerlitz', 'Versailles'] },
      { name: 'RER D', stations: ['Stade de France - Saint-Denis', 'Gare du Nord', 'Châtelet - Les Halles', 'Gare de Lyon', 'Maisons-Alfort - Alfortville', 'Villeneuve-Saint-Georges', 'Juvisy', 'Corbeil-Essonnes'] },
      { name: 'RER E', stations: ['Haussmann', 'Magenta', 'Tournan'] },
      { name: 'T1', stations: ['Asnières', 'Porte de Vincennes', 'Noisy-le-Sec'] },
      { name: 'T2', stations: ['Porte de Versailles', 'La Défense', 'Pont de Bezons'] },
      { name: 'T3a', stations: ['Pont du Garigliano', 'Porte de Vincennes'] },
      { name: 'T3b', stations: ['Porte de Vincennes', 'Porte de la Chapelle'] },
      { name: 'T4', stations: ['Bondy', 'Aulnay-sous-Bois'] },
      { name: 'T5', stations: ['Marché de Saint-Denis', 'Gare de Saint-Denis'] },
      { name: 'T6', stations: ['Châtillon', 'Vélizy'] },
      { name: 'T7', stations: ['Villejuif', 'Athis-Mons'] },
      { name: 'T8', stations: ['Saint-Denis', 'Épinay-sur-Seine'] },
      { name: 'T9', stations: ['Porte de Montreuil', 'Orly'] },
      { name: 'T10', stations: ['Clamart', 'Issy-les-Moulineaux'] },
      { name: 'T11', stations: ['Épinay-sur-Seine', 'Le Bourget'] },
      { name: 'T12', stations: ['Massy', 'Évry'] },
      { name: 'T13', stations: ['Saint-Denis', 'Saint-Germain-en-Laye'] }
    ]
  },
  marseille: {
    lines: [
      { name: '1', stations: ['La Rose', 'Saint-Charles', 'La Fourragère'] },
      { name: '2', stations: ['Gèze', 'Saint-Charles', 'Sainte-Marguerite'] },
      { name: 'T1', stations: ['Les Caillols', 'Saint-Charles', 'La Blancarde'] },
      { name: 'T2', stations: ['La Blancarde', 'Saint-Charles', 'Les Caillols'] },
      { name: 'T3', stations: ['Castellane', 'Saint-Charles', 'La Blancarde'] },
      { name: 'B1', stations: ['La Rose', 'Saint-Charles', 'La Fourragère'] },
      { name: 'B2', stations: ['Gèze', 'Saint-Charles', 'Sainte-Marguerite'] },
      { name: 'B3', stations: ['Les Caillols', 'Saint-Charles', 'La Blancarde'] },
      { name: 'B4', stations: ['La Blancarde', 'Saint-Charles', 'Les Caillols'] },
      { name: 'B5', stations: ['Castellane', 'Saint-Charles', 'La Blancarde'] }
    ]
  },
  rennes: {
    lines: [
      { name: 'a', stations: ['J.F. Kennedy', 'Gares', 'La Poterie'] },
      { name: 'b', stations: ['Saint-Jacques', 'Gares', 'Cesson'] },
      { name: 'C1', stations: ['J.F. Kennedy', 'Gares', 'La Poterie'] },
      { name: 'C2', stations: ['Saint-Jacques', 'Gares', 'Cesson'] },
      { name: 'C3', stations: ['J.F. Kennedy', 'Gares', 'La Poterie'] },
      { name: 'C4', stations: ['Saint-Jacques', 'Gares', 'Cesson'] },
      { name: 'C5', stations: ['J.F. Kennedy', 'Gares', 'La Poterie'] },
      { name: 'C6', stations: ['Saint-Jacques', 'Gares', 'Cesson'] },
      { name: 'C7', stations: ['J.F. Kennedy', 'Gares', 'La Poterie'] },
      { name: 'C8', stations: ['Saint-Jacques', 'Gares', 'Cesson'] }
    ]
  }
}

async function generateMockEntries() {
  try {
    // Get all lines for each city
    for (const [cityKey, data] of Object.entries(mockData)) {
      // Convert city name to match database format (e.g., "paris" -> "Paris")
      const city = cityKey.charAt(0).toUpperCase() + cityKey.slice(1)
      console.log(`Processing city: ${city}`)

      const lines = await prisma.line.findMany({
        where: { city },
        include: { entries: true }
      })
      console.log(`Found ${lines.length} lines for ${city}`)

      // For each line, create mock entries
      for (const line of lines) {
        console.log(`Processing line: ${line.name} in ${city}`)
        const lineData = data.lines.find(l => l.name === line.name)
        if (!lineData) {
          console.log(`No mock data found for line ${line.name} in ${city}`)
          // If no mock data found, use the stations from the database
          const stations = line.stations || []
          console.log(`Using ${stations.length} stations from database for line ${line.name}`)

          // Create 2-5 mock entries per station
          for (const station of stations) {
            const numEntries = Math.floor(Math.random() * 4) + 2 // Random number between 2 and 5

            for (let i = 0; i < numEntries; i++) {
              const edits = Math.floor(Math.random() * 5) // Random number between 0 and 4
              const comment = Math.random() > 0.5 ? `Mock entry ${i + 1} for ${station}` : null

              try {
                await prisma.entry.create({
                  data: {
                    city,
                    lineName: line.name,
                    station,
                    comment,
                    edits,
                    lineId: line.id
                  }
                })
              } catch (error) {
                console.error(`Error creating entry for ${station} on line ${line.name}:`, error)
              }
            }
          }
          continue
        }

        const stations = Array.isArray(lineData.stations) ? lineData.stations : [lineData.stations]
        console.log(`Creating entries for ${stations.length} stations in line ${line.name}`)

        // Create 2-5 mock entries per station
        for (const station of stations) {
          const numEntries = Math.floor(Math.random() * 4) + 2 // Random number between 2 and 5

          for (let i = 0; i < numEntries; i++) {
            const edits = Math.floor(Math.random() * 5) // Random number between 0 and 4
            const comment = Math.random() > 0.5 ? `Mock entry ${i + 1} for ${station}` : null

            try {
              await prisma.entry.create({
                data: {
                  city,
                  lineName: line.name,
                  station,
                  comment,
                  edits,
                  lineId: line.id
                }
              })
            } catch (error) {
              console.error(`Error creating entry for ${station} on line ${line.name}:`, error)
            }
          }
        }
      }
    }

    const totalEntries = await prisma.entry.count()
    console.log(`Successfully generated ${totalEntries} mock entries`)

    // Log some sample entries to verify
    const sampleEntries = await prisma.entry.findMany({
      take: 5,
      include: {
        line: true
      }
    })
    console.log('Sample entries:', sampleEntries)
  } catch (error) {
    console.error('Error generating mock entries:', error)
  } finally {
    await prisma.$disconnect()
  }
}

generateMockEntries()
