/// <reference types="node" />

import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function devSetup() {
  try {
    console.log('Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });

    console.log('Running database migrations...');
    execSync('npx prisma migrate dev', { stdio: 'inherit' });

    console.log('Importing lines...');
    const importLinesPath = path.join(process.cwd(), 'scripts', 'import-lines.ts');
    execSync(`npx ts-node ${importLinesPath}`, { stdio: 'inherit' });

    // console.log('Generating mock entries...');
    // const generateMockPath = path.join(process.cwd(), 'scripts', 'generate-mock-entries.ts');
    // execSync(`npx ts-node ${generateMockPath}`, { stdio: 'inherit' });

    console.log('Development setup completed successfully!');
  } catch (error) {
    console.error('Error during development setup:', error);
  } finally {
    await prisma.$disconnect();
  }
}

devSetup();
