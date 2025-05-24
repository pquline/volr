"use client";

import * as React from "react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { FileText, Server, Users, AlertTriangle, Mail, Calendar } from "lucide-react";

export default function LegalMentions() {
  return (
    <div className="grid place-items-center py-4">
      <div className="grid grid-cols-1 gap-8 sm:gap-6 max-w-2xl w-full px-6 sm:pt-2">
        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Legal Mentions</CardTitle>
            <FileText className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              <strong>Project Name:</strong> <Link href="/"className="font-mono hover:underline">volr</Link>
            </p>
            <p>
              <strong>License:</strong> This project is open source and
              distributed under the terms of the{" "}
              <Link href="https://www.gnu.org/licenses/gpl-3.0.html"className="font-mono hover:underline">GNU General Public License (GPL v3)</Link>
              .
            </p>
            <p>
              <strong>Source Code:</strong> The source code is publicly
              available on{" "}
              <Link
                href="https://github.com/pquline/volr"
                className="font-mono hover:underline"
              >
                GitHub
              </Link>
              .
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Hosting</CardTitle>
            <Server className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              <strong>Hosting Provider:</strong>{" "}
              <Link
                href="https://vercel.com//"
                className="font-mono hover:underline"
              >
                Vercel
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Contributors</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              This project is maintained by its contributors. For a list of
              contributors, visit the{" "}
              <Link
                href="https://github.com/pquline/volr/graphs/contributors"
                className="font-mono hover:underline"
              >
                contributors page
              </Link>
              .
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Liability</CardTitle>
            <AlertTriangle className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              This project is provided &quot;as is,&quot; without warranty of any kind,
              express or implied, including but not limited to the warranties of
              merchantability, fitness for a particular purpose, and
              noninfringement. In no event shall the contributors or copyright
              holders be liable for any claim, damages, or other liability,
              whether in an action of contract, tort, or otherwise, arising
              from, out of, or in connection with the software or the use or
              other dealings in the software.
            </p>
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
                className="hover:underline font-mono"
              >
                dev@volr.cc
              </Link>
              <br />
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Last Updated</CardTitle>
            <Calendar className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>24 may 2025</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
