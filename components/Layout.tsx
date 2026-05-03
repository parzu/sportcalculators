// PHASE 6: Complete rewrite replacing MUI (AppBar, Drawer, List, Typography, etc.) with
// Tailwind CSS + shadcn/ui Sheet.
//
// Old structure: MUI AppBar (fixed) + MUI Drawer (temporary on mobile, permanent on desktop)
// New structure: Tailwind sticky header + CSS fixed sidebar + shadcn Sheet for mobile overlay
//
// Navigation logic preserved:
//   - Desktop (md+): permanent left sidebar 240px wide, content offset to the right
//   - Mobile: sticky AppBar with hamburger → shadcn Sheet slides in from the left
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Info, Mail, Shield } from 'lucide-react';
// shadcn Sheet — replaces MUI Drawer for the mobile overlay
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// shadcn Button — replaces MUI IconButton for the hamburger toggle
import { Button } from '@/components/ui/button';
// shadcn Separator — replaces MUI Divider
import { Separator } from '@/components/ui/separator';
import { calculators } from '../src/calculators';

interface Props {
  children: React.ReactNode;
}

// The sidebar nav content — shared between the permanent desktop sidebar and the mobile Sheet
function SidebarNav({ onLinkClick }: { onLinkClick?: () => void }) {
  return (
    // h-full + overflow-y-auto: sidebar scrolls independently from the main content
    <div className="flex h-full flex-col overflow-y-auto">
      {/* Sidebar header — matches the AppBar height and style */}
      <div className="flex h-16 shrink-0 items-center bg-primary px-4 shadow-sm">
        <span className="text-sm font-bold tracking-widest text-primary-foreground">MENU</span>
      </div>

      {/* Calculator groups — each sport is a section with a bold header + child links */}
      <nav className="flex-1 px-2 py-4">
        {calculators.map((group, i) => (
          <div key={i} className="mb-5">
            {/* Sport group header — was ListItemText with fontWeight:'bold' in MUI */}
            <div className="flex items-center gap-2 px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-wider text-foreground">
              <span className="text-primary">{group.icon}</span>
              {group.sport}
            </div>
            {/* Individual calculator links — was ListItem with ListItemLink in old code */}
            {group.calculators.map((calc, j) => (
              <Link
                key={j}
                href={`/${calc.href}`}
                onClick={onLinkClick}
                // hover:bg-sidebar-accent gives the light indigo hover matching the old MUI selected state
                className="flex items-center rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                {calc.title}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <Separator />

      {/* Footer nav — About, Contact, Privacy. Was MUI List with ListItemIcon in old code */}
      <div className="px-2 py-3">
        {[
          { href: '/about',          label: 'About',   icon: <Info   className="size-4" /> },
          { href: '/contact',        label: 'Contact', icon: <Mail   className="size-4" /> },
          { href: '/privacy-policy', label: 'Privacy', icon: <Shield className="size-4" /> },
        ].map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onLinkClick}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            {icon}
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Layout({ children }: Props) {
  // Controls the mobile Sheet open/closed state — same as old mobileOpen useState
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    // flex row: sidebar on left, main content on right
    <div className="flex min-h-screen overflow-x-clip bg-background">

      {/* ─── Desktop sidebar ─────────────────────────────────────────────────
          fixed: stays put while content scrolls (same as MUI Drawer variant="permanent")
          hidden on mobile (hidden md:flex), visible on md+ screens
          w-60 = 240px = old drawerWidth constant */}
      <aside className="hidden md:flex md:fixed md:inset-y-0 md:left-0 md:w-60 md:flex-col md:border-r md:border-sidebar-border md:bg-sidebar">
        <SidebarNav />
      </aside>


      {/* ─── Main content area ────────────────────────────────────────────── */}
      {/* md:ml-60 offsets the content right by the sidebar width on desktop */}
      <div className="flex min-w-0 flex-1 flex-col md:ml-60">

        {/* ─── AppBar ───────────────────────────────────────────────────────
            Replaces MUI AppBar position="fixed".
            sticky top-0 z-40: stays at top when scrolling (simpler than fixed + offset)
            bg-primary text-primary-foreground: indigo background, white text */}
        <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center gap-3 bg-primary px-4 text-primary-foreground shadow-sm md:left-60">

          {/* Mobile hamburger — visible only on mobile (md:hidden) */}
          {/* Replaces MUI IconButton + MenuIcon */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            {/* base-ui SheetTrigger uses render prop (not asChild) to replace the trigger element */}
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="md:hidden text-primary-foreground hover:bg-primary-hover hover:text-primary-foreground"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>

            {/* Mobile Sheet drawer — slides in from left, replaces MUI Drawer variant="temporary" */}
            <SheetContent side="left" className="w-60 p-0 bg-sidebar" showCloseButton={false}>
              <SidebarNav onLinkClick={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>

          {/* Site title / home link */}
          <Link
            href="/"
            className="text-lg font-semibold text-primary-foreground hover:text-primary-foreground/90 no-underline"
          >
            SportCalculators
          </Link>
        </header>

        {/* Page content — padding matches old MUI Container + Toolbar spacer */}
        <main className="mt-16 flex-1 overflow-x-clip px-4 py-6 md:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
