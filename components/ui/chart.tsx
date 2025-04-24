"use client"

import type * as React from "react"

export function ChartContainer({
  children,
  className,
  config = {},
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  config?: Record<
    string,
    {
      label: string
      color: string
    }
  >
}) {
  // Créer des variables CSS pour les couleurs des séries
  const style: React.CSSProperties = {
    ...props.style,
  }

  // Ajouter les variables CSS pour les couleurs des séries
  Object.entries(config).forEach(([key, value]) => {
    style[`--color-${key}`] = value.color
  })

  return (
    <div className={className} style={style} {...props}>
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
    <div className="rounded-lg border bg-background p-2 shadow-md" {...props}>
      <div className="font-medium">{label}</div>
      <div className="mt-1 flex flex-col gap-0.5">
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color || item.stroke }} />
            <span className="font-medium">{item.name}: </span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
