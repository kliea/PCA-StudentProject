"use client"

import { TimerIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"

export default function Component() {
  return (
    <Card className="border-l-emerald-800 border-l-4 rounded-[3px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Status Name</CardTitle>
        <TimerIcon className="h-auto w-10 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">P9999999999999</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
  )
}
