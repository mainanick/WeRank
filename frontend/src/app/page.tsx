"use client";

import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingFn,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { API, KeywordRequest } from "@/lib/api";
import { FormEvent, useMemo, useState } from "react";
import { KeywordResult } from "@/lib/types";
import { KeywordTable } from "@/components/keyword-table";

export default function Home() {
  const [formState, onFormStateChange] = useState<KeywordRequest>({
    keywords: [],
    location_name: "United States",
  });
  const [keywordResults, setKeywordResults] = useState<{results: KeywordResult[]}>({results:[]})

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!formState.keywords.length){
      return 
    }
    const res = await API.keywords({ ...formState });
    console.log(res)
    setKeywordResults(res)
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={onSubmit}>
        <div className="flex space-x-1">
        <Input
          type="text"
          onChange={(v) =>
            onFormStateChange({ ...formState, keywords: [v.target.value] })
          }
          placeholder="Keyword or URL "
        />
        <Button type="submit">WeRank</Button>
        </div>
        
      </form>

      <KeywordTable results={keywordResults.results}/>
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

