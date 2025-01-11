"use client";

import * as React from "react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function LegalMentions() {
  return (
    <div className="grid place-items-center py-4">
      <div className="grid grid-cols-1 gap-8 sm:gap-6 max-w-2xl w-full px-6 sm:pt-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle>Legal Mentions</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Project Name:</strong> Volr
            </p>
            <p>
              <strong>License:</strong> This project is open source and
              distributed under the terms of the{" "}
              <Link
                href="https://www.gnu.org/licenses/gpl-3.0.html"
                className="text-foreground underline"
              >
                GNU General Public License (GPL v3)
              </Link>
              .
            </p>
            <p>
              <strong>Source Code:</strong> The source code is publicly
              available on{" "}
              <Link
                href="https://github.com/pquline/Volr"
                className="text-foreground underline"
              >
                GitHub
              </Link>
              .
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle>Hosting</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Hosting Provider:</strong>{" "}
              <Link
                href="https://www.netcup.com/"
                className="text-foreground underline"
              >
                netcup
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle>Contributors</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              This project is maintained by its contributors. For a list of
              contributors, visit the{" "}
              <Link
                href="https://github.com/pquline/Volr/graphs/contributors"
                className="text-foreground underline"
              >
                contributors page
              </Link>
              .
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle>Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              This project is provided "as is," without warranty of any kind,
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              For inquiries or suggestions, reach out via email:{" "}
              <Link
                href="mailto:dev@volr.cc"
                className="text-foreground underline"
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
