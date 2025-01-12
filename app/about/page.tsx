"use client";

import * as React from "react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Train, Clock, Database, Mail } from "lucide-react";

export default function About() {
  return (
    <div className="grid place-items-center py-4">
      <div className="grid grid-cols-1 gap-8 sm:gap-6 max-w-2xl w-full px-6 sm:pt-2">
        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>About Volr</CardTitle>
            <Train className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="mb-2">
              Volr is a web application used to share reports of dangers from
              public transport users.
            </p>
            <p>Anyone can add, delete, and view reported dangers.</p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Reports</CardTitle>
            <Clock className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              Reports are automatically deleted if no action is taken for a
              certain period. They can also be deleted manually.
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Collected Data</CardTitle>
            <Database className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>No personal data is collected by Volr.</p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Contact</CardTitle>
            <Mail className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              For inquiries or suggestions, reach out via email:{" "}
              <Link
                href="mailto:dev@volr.cc"
                className="text-foreground hover:underline"
              >
                dev @ volr.cc
              </Link>
              <br />
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
