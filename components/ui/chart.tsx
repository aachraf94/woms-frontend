"use client"

import type * as React from "react"

// Composant simplifié pour éviter les erreurs de compilation
export function ChartContainer({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { config?: any }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export function ChartTooltip({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>
}

export function ChartTooltipContent({
  payload,
  label,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { payload?: any; label?: string }) {
  if (!payload?.length) {
    return null
  }

  return (
    <div {...props}>
      <div>{label}</div>
      <div>
        {payload.map((item: any, index: number) => (
          <div key={index}>
            <span>{item.name}: </span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
