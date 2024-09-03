'use client'

import { FormEvent, useState } from 'react'

import { API, KeywordRequest } from '@/lib/api'
import { KeywordResult } from '@/lib/types'

import { KeywordTable } from '@/components/keyword-table'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function Home() {
  const [formState, onFormStateChange] = useState<KeywordRequest>({
    keywords: [],
    location_name: 'United States',
  })
  const [keywordResults, setKeywordResults] = useState<{
    results: KeywordResult[]
  }>({ results: [] })

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!formState.keywords.length) {
      return
    }
    const res = await API.keywords({ ...formState })
    console.log(res)
    setKeywordResults(res)
  }
  return (
    <main className="flex min-h-screen flex-col">
      {/* TODO: Reserved for account & setting buttons*/}
      <div className="min-h-14 bg-red-500"></div>
      <div className="flex flex-col justify-center">
        <div className="flex items-center justify-center">
          <p className="suez-one-regular text-5xl">WeRank</p>
        </div>
        <div className="bg-green-400">
          <div className="max-w-[600px]">
            <form onSubmit={onSubmit}>
              <div className="flex space-x-1">
                <Input
                  type="text"
                  onChange={(v) =>
                    onFormStateChange({
                      ...formState,
                      keywords: [v.target.value],
                    })
                  }
                  placeholder="Type a Keyword or Domain"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
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
  )
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
  )
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
  )
}
