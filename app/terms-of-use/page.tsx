"use client";

import * as React from "react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function TermsOfUse() {
  return (
    <div className="grid place-items-center py-4">
      <div className="grid grid-cols-1 gap-8 sm:gap-6 max-w-2xl w-full px-6 sm:pt-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle>Terms of Use</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              By accessing or using this
              platform, you agree to these terms of use. Please read them
              carefully.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle>Purpose</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Volr is an open-source platform that enables users to report
              public transport dangers and share safety-related information.
              The project is intended for informational purposes only and is
              maintained by contributors.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle>User Responsibilities</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              By using this platform, you agree to:
            </p>
            <ul className="list-inside">
              <li><strong>Submit</strong> accurate and truthful information.</li>
              <li><strong>Not include</strong> personal, sensitive, or confidential information in reports.</li>
              <li><strong>Refrain</strong> from using the platform for malicious purposes, including but not limited to spam or harassment.</li>
              <li><strong>Comply</strong> with all applicable laws and regulations.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle>Content Ownership</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              All user-submitted content remains the property of its respective
              authors. However, by submitting content to Volr, you grant us a
              non-exclusive, royalty-free, and perpetual license to use,
              modify, and distribute the content for the purposes of the
              platform.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle>Disclaimers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The information provided on this platform is user-generated and
              may not always be accurate or up-to-date. Volr and its
              contributors are not responsible for any errors, omissions, or
              consequences arising from the use of this platform.
            </p>
            <p>
              This project is provided "as is" without any warranties of any
              kind, express or implied, including but not limited to
              merchantability, fitness for a particular purpose, and
              noninfringement.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle>Termination</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We reserve the right to terminate or restrict access to the
              platform for any user who violates these terms or engages in
              activities that compromise the integrity or purpose of the
              platform.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle>Changes to These Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              These terms may be updated periodically. Continued use of the
              platform after changes are made constitutes your acceptance of the
              updated terms.
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
