'use client';

import { Button } from "@/components/ui/button";

export default function Home() {
  async function api() {
    const res = await fetch("/api/v1")
    const data = await res.text()
    console.log(data)
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={()=>api()}>WeRank</Button>
    </main>
  );
}
