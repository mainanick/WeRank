"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { KeywordRequest, keywords } from "@/lib/api";
import { FormEvent, useState } from "react";

export default function Home() {
  const [formState, onFormStateChange] = useState<KeywordRequest>({
    keywords: [],
    location_name: "United States",
  });
  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const res = await keywords({ ...formState });
    console.log(res);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          onChange={(v) =>
            onFormStateChange({ ...formState, keywords: [v.target.value] })
          }
          placeholder="Keyword or URL "
        />
        <Button type="submit">WeRank</Button>
      </form>

      <ResultCard />
      <KeywordCard />
      <SerpCard />
    </main>
  );
}

function SerpCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>SERP Analysis</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}

function KeywordCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Keyword</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}

function ResultCard() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
