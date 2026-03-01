"use client"

import { ArrowRight } from "lucide-react"

export function AnnouncementBar() {
  return (
    <div className="bg-[#1a1a1a] border-b-2 border-primary">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground text-sm font-bold px-2.5 py-0.5 rounded">
            NUEVO
          </span>
          <span className="text-[15px] font-semibold text-foreground">
            {"Servidores de Hytale ya disponibles."}
          </span>
          <ArrowRight className="h-4 w-4 text-foreground" />
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a href="/proximamente" className="text-[15px] font-semibold text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
            Panel de Juegos
          </a>
          <a href="/proximamente" className="text-[15px] font-semibold text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            Area de Cliente
          </a>
          <a href="/proximamente" className="text-[15px] font-semibold text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1"/><circle cx="6" cy="18" r="1"/></svg>
            Portal VPS
          </a>
          <a href="/proximamente" className="text-[15px] font-semibold text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            CPanel
          </a>
        </div>
      </div>
    </div>
  )
}
