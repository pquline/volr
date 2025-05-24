"use client";

import * as React from "react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Train, Clock, Database, Mail, Sparkles, ThumbsUp, Shield, Calendar } from "lucide-react";

export default function About() {
  return (
    <div className="grid place-items-center py-4">
      <div className="grid grid-cols-1 gap-8 sm:gap-6 max-w-2xl w-full px-6 sm:pt-2">
        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>About <Link href="/" className="font-mono hover:underline">volr</Link></CardTitle>
            <Train className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="mb-2">
              <Link href="/" className="font-mono hover:underline">volr</Link> is a modern web application for reporting and tracking public transport disruptions. Users can add and view disruption reports for various cities and lines. No personal data is collected.
            </p>
            <p>Open source and free for everyone.</p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Features</CardTitle>
            <Sparkles className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              <li>Real-time disruption reporting for public transport lines and stations</li>
              <li>Multi-city support</li>
              <li>Search and filter by line or station</li>
              <li>Vote on the accuracy of reports</li>
              <li>Automatic report deletion after a period of inactivity</li>
              <li>Responsive design for mobile and desktop</li>
              <li>No authentication required; open to all users</li>
              <li>Dark mode</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Voting & Accuracy Score</CardTitle>
            <ThumbsUp className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              Each disruption report has an <b>accuracy score</b> based on community voting:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Anyone can upvote or downvote a report.</li>
              <li>The score is shown as an "Accuracy Score" badge on each report.</li>
              <li>Reports with very low accuracy (e.g., -10 or less) are automatically deleted to keep the list relevant.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Tech Stack</CardTitle>
            <Database className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              <li>Framework: <Link href="https://nextjs.org/" target="_blank" className="hover:underline font-mono">Next.js 15</Link></li>
              <li>Language: <Link href="https://www.typescriptlang.org/" target="_blank" className="hover:underline font-mono">TypeScript</Link></li>
              <li>Database: <Link href="https://www.postgresql.org/" target="_blank" className="hover:underline font-mono">PostgreSQL</Link> (<Link href="https://www.prisma.io/" target="_blank" className="hover:underline font-mono">Prisma ORM</Link>)</li>
              <li>Styling: <Link href="https://ui.shadcn.com/" target="_blank" className="hover:underline font-mono">shadcn/ui</Link>, <Link href="https://tailwindcss.com/" target="_blank" className="hover:underline font-mono">Tailwind CSS</Link>, <Link href="https://www.radix-ui.com/" target="_blank" className="hover:underline font-mono">Radix UI</Link></li>
              <li>Forms: <Link href="https://react-hook-form.com/" target="_blank" className="hover:underline font-mono">React Hook Form</Link> + <Link href="https://zod.dev/" target="_blank" className="hover:underline font-mono">Zod</Link></li>
              <li>Notifications: <Link href="https://sonner.emilkowal.ski/" target="_blank" className="hover:underline font-mono">Sonner</Link></li>
            </ul>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Privacy</CardTitle>
            <Shield className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>No personal data is collected or stored. Only disruption data (city, line, station, comment, votes) is saved. Reports are deleted automatically after a period of inactivity.</p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Contact & Contribution</CardTitle>
            <Mail className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              Open source: <Link href="https://github.com/pquline/volr" className="text-foreground hover:underline font-mono" target="_blank">GitHub</Link><br />
              Contact: <Link href="mailto:dev@volr.cc" className="text-foreground hover:underline font-mono">dev@volr.cc</Link>
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Last Updated</CardTitle>
            <Calendar className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>24 May 2025</p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
