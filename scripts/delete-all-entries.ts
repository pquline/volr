import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function deleteAllEntries() {
  try {
    // Delete all entries
    const result = await prisma.entry.deleteMany()
    console.log(`Successfully deleted ${result.count} entries`)
  } catch (error) {
    console.error('Error deleting entries:', error)
  } finally {
    await prisma.$disconnect()
  }
}

deleteAllEntries()
