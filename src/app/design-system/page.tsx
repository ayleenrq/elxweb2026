"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Mail,
  Phone,
  ExternalLink,
  Search,
  Star,
  Check,
  Plus,
  Copy,
  Sparkles,
  Palette,
  Type,
  LayoutGrid,
  Grid as GridIcon,
  Layers,
  Component,
  BookOpen,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Sidebar Navigation Items
const navItems = [
  { id: "typography", label: "Typography", icon: Type, category: "FOUNDATION" },
  { id: "colors", label: "Colors", icon: Palette, category: "FOUNDATION" },
  { id: "spacing", label: "Spacing", icon: LayoutGrid, category: "FOUNDATION" },
  { id: "border", label: "Border & Radius", icon: Layers, category: "FOUNDATION" },
  { id: "icons", label: "Icons", icon: Sparkles, category: "FOUNDATION" },
  { id: "buttons", label: "Buttons", icon: Component, category: "COMPONENTS" },
  { id: "footer-preview", label: "Footer", icon: Component, category: "COMPONENTS" },
  { id: "badges", label: "Badges & Labels", icon: Component, category: "COMPONENTS" },
  { id: "page-structure", label: "Page Structure", icon: BookOpen, category: "STRUCTURE" },
  { id: "sections", label: "Sections", icon: BookOpen, category: "STRUCTURE" },
  { id: "containers", label: "Containers", icon: BookOpen, category: "STRUCTURE" },
  { id: "flexbox", label: "Flexbox", icon: BookOpen, category: "LAYOUTS" },
  { id: "grid-system", label: "Grid System", icon: GridIcon, category: "LAYOUTS" },
];

export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState("typography");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  // Copy to clipboard helper
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Intersection Observer for highlighting sidebar item on scroll
  useEffect(() => {
    const observers = navItems.map((item) => {
      const el = document.getElementById(item.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(item.id);
          }
        },
        { rootMargin: "-20% 0px -60% 0px" }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white selection:bg-[#3B6BF7]/30 selection:text-white flex flex-col font-sans">
      {/* Decorative radial glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#7B4FE9]/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#3B6BF7]/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#1F1F1F] bg-[#0D0D0D]/80 backdrop-blur-xl px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative h-10 w-32 shrink-0">
            <Image src="/logo-elux.webp" alt="ELUX Logo" fill className="object-contain object-left" priority />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="border-[#1F1F1F] text-[#A0A0A0] px-3 py-1 font-sans">
            v1.0.0
          </Badge>
          {copiedText && (
            <div className="animate-fade-in text-xs bg-[#3B6BF7] text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#3B6BF7]/20 border border-[#3B6BF7]/30">
              <Check className="h-3.5 w-3.5" />
              Copied {copiedText}!
            </div>
          )}
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex relative">
        {/* Sticky Sidebar */}
        <aside className="w-80 border-r border-[#1F1F1F] hidden lg:block sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto bg-[#0D0D0D]/50 p-6 z-30">
          <div className="space-y-8">
            {["FOUNDATION", "COMPONENTS", "STRUCTURE", "LAYOUTS"].map((category) => (
              <div key={category} className="space-y-2">
                <h4 className="text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-[#A0A0A0] px-3">
                  {category}
                </h4>
                <div className="space-y-1">
                  {navItems
                    .filter((item) => item.category === category)
                    .map((item) => {
                      const Icon = item.icon;
                      const isActive = activeSection === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-r from-[#1F1F1F] to-transparent text-white font-medium border-l-2 border-[#3B6BF7] pl-2.5"
                              : "text-[#A0A0A0] hover:text-white hover:bg-[#1F1F1F]/40"
                          }`}
                        >
                          <Icon className={`h-4 w-4 ${isActive ? "text-[#3B6BF7]" : "text-[#A0A0A0]"}`} />
                          {item.label}
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto z-10 max-w-6xl mx-auto space-y-24 pb-32">
          
          {/* Introduction Hero */}
          <section className="space-y-4">
            <h2 className="font-heading text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-[#A0A0A0]">
              The Core Architecture
            </h2>
            <p className="text-[#A0A0A0] text-lg max-w-3xl leading-relaxed font-sans">
              This design system establishes a premium, highly cohesive visual layout for the ELX Web 2026 framework. Built upon a minimalist dark backdrop with rich interactive accents, it provides developers and designers with precise tokens and modular components.
            </p>
          </section>

          <hr className="border-[#1F1F1F]" />

          {/* FOUNDATION SECTIONS */}

          {/* 1. Typography */}
          <section id="typography" className="scroll-mt-28 space-y-6">
            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-[#3B6BF7]">01.</span> Typography
              </h3>
              <p className="text-sm text-[#A0A0A0] font-sans">
                Curated dual font system. <strong>Satoshi</strong> for crisp, bold geometric headlines, and <strong>Inter</strong> for hyper-legible body copies.
              </p>
            </div>
            
            <div className="border border-[#1F1F1F] rounded-xl bg-[#141414]/40 p-6 space-y-8 backdrop-blur-md">
              {[
                { label: "Display (Satoshi 72px bold)", class: "font-heading text-7xl font-bold tracking-tight leading-none", text: "Bold Display" },
                { label: "H1 (Satoshi 48px bold)", class: "font-heading text-5xl font-bold tracking-tight", text: "Design Systems Scale" },
                { label: "H2 (Satoshi 36px bold)", class: "font-heading text-4xl font-bold tracking-tight", text: "Premium Interface Modules" },
                { label: "H3 (Satoshi 24px bold)", class: "font-heading text-2xl font-bold", text: "Interactive Layout Blocks" },
                { label: "H4 (Satoshi 20px semibold)", class: "font-heading text-xl font-semibold", text: "Section & Subtitle Elements" },
                { label: "Body Large (Inter 18px regular)", class: "font-sans text-lg text-white/90", text: "Body Large provides highly readable paragraph content for promotional blocks and hero subtext descriptions." },
                { label: "Body (Inter 16px regular)", class: "font-sans text-base text-[#A0A0A0]", text: "Standard Body copy is carefully adjusted to 16px with customized line heights, offering absolute reading comfort on dark backgrounds." },
                { label: "Body Small (Inter 14px regular)", class: "font-sans text-sm text-[#A0A0A0]", text: "Body Small works perfectly for table headers, metadata blocks, and supplementary user interface components." },
                { label: "Caption (Inter 12px regular)", class: "font-sans text-xs text-[#A0A0A0]/80 tracking-wide", text: "CAPTION STYLE WORKS FOR LEGENDS, COPYRIGHT FOOTERS, AND TINY STICKY NOTIFICATIONS." }
              ].map((typo, idx) => (
                <div key={idx} className="space-y-2 border-b border-[#1F1F1F]/40 pb-6 last:border-0 last:pb-0">
                  <span className="text-[11px] font-mono text-[#3B6BF7] font-semibold">{typo.label}</span>
                  <div className={typo.class}>{typo.text}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 2. Colors */}
          <section id="colors" className="scroll-mt-28 space-y-6">
            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-[#3B6BF7]">02.</span> Brand Colors
              </h3>
              <p className="text-sm text-[#A0A0A0] font-sans">
                Minimalist dark-theme baseline highlighted with vibrant neon accents. Click any swatch to copy its Hex code.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Background", variable: "--background", hex: "#0D0D0D", color: "bg-[#0D0D0D] border-[#1F1F1F]" },
                { name: "Foreground", variable: "--foreground", hex: "#FFFFFF", color: "bg-[#FFFFFF] text-black" },
                { name: "Muted", variable: "--muted-foreground", hex: "#A0A0A0", color: "bg-[#A0A0A0] text-black" },
                { name: "Border", variable: "--border", hex: "#1F1F1F", color: "bg-[#1F1F1F] border-white/10" },
                { name: "Accent Blue", variable: "accent-blue", hex: "#3B6BF7", color: "bg-[#3B6BF7] text-white shadow-lg shadow-[#3B6BF7]/20" },
                { name: "Accent Purple", variable: "accent-purple", hex: "#7B4FE9", color: "bg-[#7B4FE9] text-white shadow-lg shadow-[#7B4FE9]/20" },
              ].map((swatch, idx) => (
                <button
                  key={idx}
                  onClick={() => copyToClipboard(swatch.hex, swatch.name)}
                  className="group text-left border border-[#1F1F1F] rounded-xl overflow-hidden bg-[#141414]/30 hover:border-[#3B6BF7]/40 transition-all duration-300 hover:translate-y-[-2px]"
                >
                  <div className={`h-24 w-full flex items-end p-3 font-mono text-xs font-bold ${swatch.color}`}>
                    <span className="bg-black/30 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px]">
                      {swatch.hex}
                    </span>
                  </div>
                  <div className="p-4 space-y-1">
                    <div className="font-heading font-bold text-sm group-hover:text-[#3B6BF7] transition-colors">
                      {swatch.name}
                    </div>
                    <div className="font-mono text-[10px] text-[#A0A0A0] flex items-center justify-between">
                      <span>{swatch.variable}</span>
                      <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* 3. Spacing Scale */}
          <section id="spacing" className="scroll-mt-28 space-y-6">
            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-[#3B6BF7]">03.</span> Spacing Scale
              </h3>
              <p className="text-sm text-[#A0A0A0] font-sans">
                Carefully calculated 4pt-grid system to ensure absolute precision in component spacing and layouts.
              </p>
            </div>

            <div className="border border-[#1F1F1F] rounded-xl bg-[#141414]/40 p-6 space-y-4 backdrop-blur-md">
              {[
                { px: "4px", label: "4px (0.25rem) / space-1", width: "w-1 h-4" },
                { px: "8px", label: "8px (0.5rem) / space-2", width: "w-2 h-4" },
                { px: "12px", label: "12px (0.75rem) / space-3", width: "w-3 h-4" },
                { px: "16px", label: "16px (1rem) / space-4", width: "w-4 h-4" },
                { px: "24px", label: "24px (1.5rem) / space-6", width: "w-6 h-4" },
                { px: "32px", label: "32px (2rem) / space-8", width: "w-8 h-4" },
                { px: "48px", label: "48px (3rem) / space-12", width: "w-12 h-4" },
                { px: "64px", label: "64px (4rem) / space-16", width: "w-16 h-4" },
                { px: "80px", label: "80px (5rem) / space-20", width: "w-20 h-4" },
                { px: "96px", label: "96px (6rem) / space-24", width: "w-24 h-4" },
              ].map((space, idx) => (
                <div key={idx} className="flex items-center gap-4 text-xs font-mono">
                  <div className="w-48 text-[#A0A0A0] text-[11px]">{space.label}</div>
                  <div className="flex-1 bg-[#1F1F1F] rounded-md overflow-hidden relative h-4">
                    <div className={`${space.width} bg-gradient-to-r from-[#3B6BF7] to-[#7B4FE9] h-full rounded-md shadow-md shadow-[#3B6BF7]/20`} />
                  </div>
                  <div className="w-12 text-right text-[#3B6BF7] font-semibold">{space.px}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Borders & Radius */}
          <section id="border" className="scroll-mt-28 space-y-6">
            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-[#3B6BF7]">04.</span> Borders & Radius
              </h3>
              <p className="text-sm text-[#A0A0A0] font-sans">
                Interactive scaling of borders and corner rounding rules to define visual structures.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Border Radius Card */}
              <div className="border border-[#1F1F1F] rounded-xl bg-[#141414]/40 p-6 space-y-6 backdrop-blur-md">
                <div className="font-heading font-bold text-lg text-white">Corner Radius Scale</div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "none (0px)", class: "rounded-none" },
                    { label: "sm (4px)", class: "rounded-sm" },
                    { label: "md (8px)", class: "rounded-md" },
                    { label: "lg (16px)", class: "rounded-lg" },
                    { label: "xl (24px)", class: "rounded-xl" },
                    { label: "full (9999px)", class: "rounded-full" },
                  ].map((rad, idx) => (
                    <div key={idx} className="space-y-2 text-center">
                      <div className={`h-16 w-full bg-gradient-to-tr from-[#1F1F1F] to-[#3B6BF7]/20 border border-[#1F1F1F] ${rad.class} flex items-center justify-center`} />
                      <span className="text-[10px] font-mono text-[#A0A0A0] block">{rad.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Border Width Card */}
              <div className="border border-[#1F1F1F] rounded-xl bg-[#141414]/40 p-6 space-y-6 backdrop-blur-md">
                <div className="font-heading font-bold text-lg text-white">Border Width Scale</div>
                <div className="space-y-4">
                  {[
                    { label: "1px Border Width", class: "border" },
                    { label: "2px Border Width", class: "border-2" },
                    { label: "4px Border Width", class: "border-4" },
                  ].map((border, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-32 text-xs font-mono text-[#A0A0A0]">{border.label}</div>
                      <div className={`flex-1 h-12 bg-[#0D0D0D] ${border.class} border-[#3B6BF7] rounded-lg flex items-center justify-center text-xs font-mono text-[#A0A0A0]`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 5. Icons */}
          <section id="icons" className="scroll-mt-28 space-y-6">
            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-[#3B6BF7]">05.</span> System Icons
              </h3>
              <p className="text-sm text-[#A0A0A0] font-sans">
                Uniformly designed interface icons powered by Lucide React. Click to copy the icon import snippet.
              </p>
            </div>

            <div className="border border-[#1F1F1F] rounded-xl bg-[#141414]/40 p-6 backdrop-blur-md">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {[
                  { name: "Home", component: Home },
                  { name: "ArrowRight", component: ArrowRight },
                  { name: "Menu", component: Menu },
                  { name: "X", component: X },
                  { name: "ChevronDown", component: ChevronDown },
                  { name: "Mail", component: Mail },
                  { name: "Phone", component: Phone },
                  { name: "ExternalLink", component: ExternalLink },
                  { name: "Search", component: Search },
                  { name: "Star", component: Star },
                  { name: "Check", component: Check },
                  { name: "Plus", component: Plus },
                ].map((iconObj, idx) => {
                  const IconComponent = iconObj.component;
                  return (
                    <button
                      key={idx}
                      onClick={() => copyToClipboard(`<${iconObj.name} className="h-4 w-4" />`, iconObj.name)}
                      className="group flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-[#1F1F1F] hover:border-[#3B6BF7]/50 hover:bg-[#3B6BF7]/5 bg-[#0D0D0D]/40 transition-all duration-300 hover:translate-y-[-2px]"
                    >
                      <div className="p-3 bg-[#1F1F1F]/60 rounded-xl group-hover:bg-[#3B6BF7]/20 group-hover:text-[#3B6BF7] transition-all">
                        <IconComponent className="h-5 w-5 text-[#A0A0A0] group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-[10px] font-mono text-[#A0A0A0] group-hover:text-white transition-colors text-center truncate w-full">
                        {iconObj.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <hr className="border-[#1F1F1F]" />

          {/* COMPONENTS SECTIONS */}

          {/* 6. Buttons */}
          <section id="buttons" className="scroll-mt-28 space-y-6">
            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-[#3B6BF7]">06.</span> Interactive Buttons
              </h3>
              <p className="text-sm text-[#A0A0A0] font-sans">
                Custom shadcn/ui buttons configured with premium glassmorphism, responsive triggers, and variable scales.
              </p>
            </div>

            <div className="border border-[#1F1F1F] rounded-xl bg-[#141414]/40 p-8 space-y-8 backdrop-blur-md">
              {/* Button Variants Grid */}
              <div className="space-y-4">
                <div className="text-sm font-heading font-bold text-white uppercase tracking-wider">Button Variants</div>
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#A0A0A0] block">default (gradient)</span>
                    <Button>Gradient Action</Button>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#A0A0A0] block">secondary (blue)</span>
                    <Button variant="secondary">Secondary Blue</Button>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#A0A0A0] block">outline</span>
                    <Button variant="outline" className="border-[#1F1F1F] text-white hover:bg-[#1F1F1F]">Outline Action</Button>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#A0A0A0] block">ghost</span>
                    <Button variant="ghost" className="text-[#A0A0A0] hover:text-white">Ghost Action</Button>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#A0A0A0] block">destructive</span>
                    <Button variant="destructive">Destructive Action</Button>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#A0A0A0] block">link</span>
                    <Button variant="link" className="text-[#3B6BF7] hover:text-[#3B6BF7]/80">Link Action</Button>
                  </div>
                </div>
              </div>

              {/* Button Sizes */}
              <div className="space-y-4">
                <div className="text-sm font-heading font-bold text-white uppercase tracking-wider">Button Sizes</div>
                <div className="flex flex-wrap gap-4 items-end">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#A0A0A0] block">xs (Extra Small)</span>
                    <Button size="xs">Mini Action</Button>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#A0A0A0] block">sm (Small)</span>
                    <Button size="sm">Small Action</Button>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#A0A0A0] block">default</span>
                    <Button size="default">Default Action</Button>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#A0A0A0] block">lg (Large)</span>
                    <Button size="lg" className="px-6 py-5 text-base">Hero Action</Button>
                  </div>
                </div>
              </div>

              {/* Button States */}
              <div className="space-y-4">
                <div className="text-sm font-heading font-bold text-white uppercase tracking-wider">States & Interactions</div>
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#A0A0A0] block">default state</span>
                    <Button>Normal Button</Button>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#A0A0A0] block">hover effect (simulated)</span>
                    <Button className="shadow-lg shadow-[#3B6BF7]/35 scale-[1.03] brightness-110">Hover Glow</Button>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#A0A0A0] block">disabled state</span>
                    <Button disabled>Disabled Button</Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 7. Footer */}
          <section id="footer-preview" className="scroll-mt-28 space-y-6">
            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-[#3B6BF7]">07.</span> Dark Footer Component
              </h3>
              <p className="text-sm text-[#A0A0A0] font-sans">
                Premium dark footer designed for comprehensive multi-page layouts and social brand anchors.
              </p>
            </div>

            <div className="border border-[#1F1F1F] rounded-xl overflow-hidden backdrop-blur-md">
              <footer className="bg-[#0D0D0D] border-t border-[#1F1F1F] px-8 py-12 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* Branding Column */}
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="relative h-8 w-24 shrink-0">
                        <Image src="/logo-elux.webp" alt="ELUX Logo" fill className="object-contain object-left" />
                      </div>
                    </div>
                    <p className="text-xs text-[#A0A0A0] leading-relaxed max-w-xs font-sans">
                      Building gorgeous immersive websites and digital experiences built for extreme performance.
                    </p>
                  </div>

                  {/* Nav links column */}
                  <div className="space-y-3">
                    <h5 className="font-heading text-xs font-bold tracking-widest text-[#A0A0A0] uppercase">Site</h5>
                    <ul className="space-y-2 text-xs font-sans text-[#A0A0A0] hover:text-white transition-colors">
                      <li><a href="#" className="hover:text-white">Services</a></li>
                      <li><a href="#" className="hover:text-white">Case Studies</a></li>
                      <li><a href="#" className="hover:text-white">Blog</a></li>
                      <li><a href="#" className="hover:text-white">Contact</a></li>
                    </ul>
                  </div>

                  {/* Social links column */}
                  <div className="space-y-3">
                    <h5 className="font-heading text-xs font-bold tracking-widest text-[#A0A0A0] uppercase">Social</h5>
                    <ul className="space-y-2 text-xs font-sans text-[#A0A0A0]">
                      <li><a href="#" className="hover:text-[#3B6BF7] transition-colors">Dribbble</a></li>
                      <li><a href="#" className="hover:text-[#3B6BF7] transition-colors">Instagram</a></li>
                      <li><a href="#" className="hover:text-[#3B6BF7] transition-colors">Behance</a></li>
                      <li><a href="#" className="hover:text-[#3B6BF7] transition-colors">LinkedIn</a></li>
                    </ul>
                  </div>

                  {/* Newsletter */}
                  <div className="space-y-3">
                    <h5 className="font-heading text-xs font-bold tracking-widest text-[#A0A0A0] uppercase">Connect</h5>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="Your email"
                        className="bg-[#141414] border border-[#1F1F1F] text-xs px-3 py-2 rounded-lg text-white outline-none focus:border-[#3B6BF7] w-full font-sans"
                      />
                      <Button size="sm">
                        Go
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#1F1F1F]/60 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A0A0A0]/65 font-sans">
                  <div>© 2026 ELX Web. All rights reserved. Built with Next.js & Tailwind CSS.</div>
                  <div className="flex gap-4 mt-4 sm:mt-0">
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Terms of Use</a>
                  </div>
                </div>
              </footer>
            </div>
          </section>

          {/* 8. Badges & Labels */}
          <section id="badges" className="scroll-mt-28 space-y-6">
            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-[#3B6BF7]">08.</span> Badges & Label Variants
              </h3>
              <p className="text-sm text-[#A0A0A0] font-sans">
                Status indicators, tagging labels, and typographic layouts for system metadata.
              </p>
            </div>

            <div className="border border-[#1F1F1F] rounded-xl bg-[#141414]/40 p-6 space-y-8 backdrop-blur-md">
              {/* Badge variants */}
              <div className="space-y-3">
                <div className="text-sm font-heading font-bold text-white">Badge System</div>
                <div className="flex flex-wrap gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#A0A0A0] block">default</span>
                    <Badge className="bg-[#3B6BF7] text-white font-sans px-2.5 py-0.5 rounded-full border border-transparent">Active Status</Badge>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#A0A0A0] block">outline</span>
                    <Badge variant="outline" className="border-[#1F1F1F] text-[#A0A0A0] font-sans px-2.5 py-0.5 rounded-full">Archived</Badge>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#A0A0A0] block">secondary</span>
                    <Badge variant="secondary" className="bg-[#1F1F1F] text-white font-sans px-2.5 py-0.5 rounded-full border border-white/5">Beta Build</Badge>
                  </div>
                </div>
              </div>

              {/* Label Typography styles */}
              <div className="space-y-3">
                <div className="text-sm font-heading font-bold text-white">Label Variations</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-1 p-3 bg-[#0D0D0D] border border-[#1F1F1F] rounded-lg">
                    <span className="text-[9px] font-mono text-[#3B6BF7] uppercase">Regular Style</span>
                    <div className="text-sm text-[#A0A0A0] font-sans">System Notification</div>
                  </div>
                  <div className="space-y-1 p-3 bg-[#0D0D0D] border border-[#1F1F1F] rounded-lg">
                    <span className="text-[9px] font-mono text-[#3B6BF7] uppercase">Semibold Style</span>
                    <div className="text-sm font-semibold text-white font-sans">User Verification</div>
                  </div>
                  <div className="space-y-1 p-3 bg-[#0D0D0D] border border-[#1F1F1F] rounded-lg">
                    <span className="text-[9px] font-mono text-[#3B6BF7] uppercase">Uppercase Tracking</span>
                    <div className="text-xs font-bold uppercase tracking-widest text-[#7B4FE9] font-heading">LATEST RELEASE</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-[#1F1F1F]" />

          {/* STRUCTURE & LAYOUTS */}

          {/* 9. Page Structure */}
          <section id="page-structure" className="scroll-mt-28 space-y-6">
            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-[#3B6BF7]">09.</span> System Page Structure
              </h3>
              <p className="text-sm text-[#A0A0A0] font-sans">
                Architectural mapping representing the modular stack of the website pages.
              </p>
            </div>

            <div className="border border-[#1F1F1F] rounded-xl bg-[#141414]/40 p-6 backdrop-blur-md">
              <div className="max-w-md mx-auto space-y-3 font-mono text-center">
                {/* Navbar Node */}
                <div className="border border-[#3B6BF7]/50 bg-[#3B6BF7]/10 p-3 rounded-lg shadow-md shadow-[#3B6BF7]/5">
                  <div className="text-xs text-[#3B6BF7] font-bold">NAVBAR</div>
                  <div className="text-[10px] text-[#A0A0A0]">Logo + Navigation Links + CTA Button</div>
                </div>
                {/* Arrow */}
                <div className="h-4 flex justify-center items-center">
                  <div className="w-0.5 h-full bg-[#1F1F1F]" />
                </div>
                {/* Hero Node */}
                <div className="border border-[#7B4FE9]/50 bg-[#7B4FE9]/10 p-4 rounded-lg shadow-md shadow-[#7B4FE9]/5">
                  <div className="text-xs text-[#7B4FE9] font-bold">HERO SECTION</div>
                  <div className="text-[10px] text-[#A0A0A0]">Bold Display Heading + Brand Subtext + Dynamic CTAs</div>
                </div>
                {/* Arrow */}
                <div className="h-4 flex justify-center items-center">
                  <div className="w-0.5 h-full bg-[#1F1F1F]" />
                </div>
                {/* Section Node */}
                <div className="border border-[#1F1F1F] bg-[#141414] p-4 rounded-lg">
                  <div className="text-xs text-white font-bold">MODULAR SECTIONS</div>
                  <div className="text-[10px] text-[#A0A0A0]">Grid / Feature Cards / Text Layouts / Content Areas</div>
                </div>
                {/* Arrow */}
                <div className="h-4 flex justify-center items-center">
                  <div className="w-0.5 h-full bg-[#1F1F1F]" />
                </div>
                {/* Footer Node */}
                <div className="border border-[#1F1F1F] bg-[#0D0D0D] p-3 rounded-lg">
                  <div className="text-xs text-[#A0A0A0] font-bold">FOOTER</div>
                  <div className="text-[10px] text-[#A0A0A0]/80">Copyright + Site Directory Links + Social Anchors</div>
                </div>
              </div>
            </div>
          </section>

          {/* 10. Modular Section */}
          <section id="sections" className="scroll-mt-28 space-y-6">
            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-[#3B6BF7]">10.</span> Modular Section Sample
              </h3>
              <p className="text-sm text-[#A0A0A0] font-sans">
                A highly optimized section blueprint ready for structural landing page placement.
              </p>
            </div>

            <div className="border border-[#1F1F1F] rounded-xl overflow-hidden backdrop-blur-md relative">
              <div className="absolute inset-0 bg-[radial-gradient(#1F1F1F_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />
              <div className="relative py-16 px-8 max-w-4xl mx-auto text-center space-y-6">
                <div className="inline-block text-[11px] font-heading font-bold uppercase tracking-[0.25em] text-[#3B6BF7] bg-[#3B6BF7]/10 px-3 py-1 rounded-full border border-[#3B6BF7]/20">
                  DEVELOPER ECOSYSTEM
                </div>
                <h2 className="font-heading text-4xl font-bold tracking-tight text-white leading-tight">
                  High-Performance Web Infrastructure Built For 2026
                </h2>
                <p className="text-sm text-[#A0A0A0] max-w-2xl mx-auto leading-relaxed font-sans">
                  Deploy rapid web frameworks configured with bleeding edge tools. Fully accessible out of the box, meticulously detailed, and gorgeous by default.
                </p>
                <div className="pt-4 flex justify-center gap-4">
                  <Button>Start Project</Button>
                  <Button variant="outline" className="border-[#1F1F1F] hover:bg-[#1F1F1F]">Documentation</Button>
                </div>
              </div>
            </div>
          </section>

          {/* 11. Container Scale */}
          <section id="containers" className="scroll-mt-28 space-y-6">
            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-[#3B6BF7]">11.</span> Container Scales
              </h3>
              <p className="text-sm text-[#A0A0A0] font-sans">
                Defines default horizontal boundaries across standard responsive layout grid breakpoints.
              </p>
            </div>

            <div className="border border-[#1F1F1F] rounded-xl bg-[#141414]/40 p-6 space-y-4 backdrop-blur-md">
              {[
                { name: "sm (640px)", class: "max-w-[15%]" },
                { name: "md (768px)", class: "max-w-[30%]" },
                { name: "lg (1024px)", class: "max-w-[55%]" },
                { name: "xl (1280px)", class: "max-w-[75%]" },
                { name: "2xl (1536px)", class: "max-w-[100%]" },
              ].map((container, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-[#A0A0A0]">
                    <span>{container.name}</span>
                  </div>
                  <div className="w-full bg-[#1F1F1F]/40 h-8 rounded-lg overflow-hidden relative border border-[#1F1F1F]">
                    <div className={`${container.class} bg-gradient-to-r from-[#3B6BF7]/20 to-[#7B4FE9]/20 h-full border-r border-[#3B6BF7]/50 flex items-center pl-3`}>
                      <span className="text-[10px] font-mono text-[#3B6BF7] font-semibold">Active Boundary</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 12. Flexbox Implementations */}
          <section id="flexbox" className="scroll-mt-28 space-y-6">
            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-[#3B6BF7]">12.</span> Flexbox Archetypes
              </h3>
              <p className="text-sm text-[#A0A0A0] font-sans">
                Highly common alignment blueprints optimized for robust and quick layout assembly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Row with Gap */}
              <div className="border border-[#1F1F1F] rounded-xl bg-[#141414]/40 p-6 space-y-4 backdrop-blur-md">
                <div className="font-heading font-bold text-sm text-white">Row Layout (with gap-4)</div>
                <div className="flex gap-4 p-4 bg-[#0D0D0D] border border-[#1F1F1F] rounded-lg">
                  <div className="h-10 w-16 bg-[#3B6BF7]/10 border border-[#3B6BF7]/30 text-[#3B6BF7] flex items-center justify-center font-mono text-xs rounded-md">Item 1</div>
                  <div className="h-10 w-16 bg-[#3B6BF7]/10 border border-[#3B6BF7]/30 text-[#3B6BF7] flex items-center justify-center font-mono text-xs rounded-md">Item 2</div>
                  <div className="h-10 w-16 bg-[#3B6BF7]/10 border border-[#3B6BF7]/30 text-[#3B6BF7] flex items-center justify-center font-mono text-xs rounded-md">Item 3</div>
                </div>
              </div>

              {/* Space Between */}
              <div className="border border-[#1F1F1F] rounded-xl bg-[#141414]/40 p-6 space-y-4 backdrop-blur-md">
                <div className="font-heading font-bold text-sm text-white">Row Layout (space-between)</div>
                <div className="flex justify-between items-center p-4 bg-[#0D0D0D] border border-[#1F1F1F] rounded-lg">
                  <div className="h-10 w-16 bg-[#7B4FE9]/10 border border-[#7B4FE9]/30 text-[#7B4FE9] flex items-center justify-center font-mono text-xs rounded-md">Left</div>
                  <div className="h-10 w-16 bg-[#7B4FE9]/10 border border-[#7B4FE9]/30 text-[#7B4FE9] flex items-center justify-center font-mono text-xs rounded-md">Right</div>
                </div>
              </div>

              {/* Centered layout */}
              <div className="border border-[#1F1F1F] rounded-xl bg-[#141414]/40 p-6 space-y-4 backdrop-blur-md md:col-span-2">
                <div className="font-heading font-bold text-sm text-white">Centered Alignment (justify-center items-center)</div>
                <div className="flex justify-center items-center h-28 bg-[#0D0D0D] border border-[#1F1F1F] rounded-lg">
                  <div className="px-6 py-3 bg-[#3B6BF7] text-white font-sans text-xs font-semibold rounded-lg shadow-lg shadow-[#3B6BF7]/15">
                    Centered Component Block
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 13. Grid System */}
          <section id="grid-system" className="scroll-mt-28 space-y-6">
            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-[#3B6BF7]">13.</span> Modular Grid Columns
              </h3>
              <p className="text-sm text-[#A0A0A0] font-sans">
                Responsive grid columns with interactive placeholder cards for structured layouts.
              </p>
            </div>

            <div className="space-y-8">
              {/* 2 columns grid */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-[#A0A0A0]">2-Column Layout (grid-cols-1 md:grid-cols-2 gap-6)</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-[#1F1F1F] rounded-xl bg-[#141414]/40 p-6 hover:border-[#3B6BF7]/30 transition-all duration-300 backdrop-blur-sm">
                    <div className="h-6 w-6 rounded-lg bg-[#3B6BF7]/20 text-[#3B6BF7] flex items-center justify-center font-mono text-[10px] font-bold mb-3">01</div>
                    <h5 className="font-heading font-bold text-base text-white mb-2">Alpha Architecture</h5>
                    <p className="text-xs text-[#A0A0A0] font-sans leading-relaxed">
                      Deploy premium grids configured for multi-device outputs and responsiveness.
                    </p>
                  </div>
                  <div className="border border-[#1F1F1F] rounded-xl bg-[#141414]/40 p-6 hover:border-[#3B6BF7]/30 transition-all duration-300 backdrop-blur-sm">
                    <div className="h-6 w-6 rounded-lg bg-[#3B6BF7]/20 text-[#3B6BF7] flex items-center justify-center font-mono text-[10px] font-bold mb-3">02</div>
                    <h5 className="font-heading font-bold text-base text-white mb-2">Beta Optimization</h5>
                    <p className="text-xs text-[#A0A0A0] font-sans leading-relaxed">
                      Minimize CSS footprint while maintaining maximum layout design flexibility.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 columns grid */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-[#A0A0A0]">3-Column Layout (grid-cols-1 md:grid-cols-3 gap-6)</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="border border-[#1F1F1F] rounded-xl bg-[#141414]/40 p-5 hover:border-[#7B4FE9]/30 transition-all duration-300 backdrop-blur-sm">
                      <div className="h-6 w-6 rounded-lg bg-[#7B4FE9]/20 text-[#7B4FE9] flex items-center justify-center font-mono text-[10px] font-bold mb-3">{`0${num}`}</div>
                      <h5 className="font-heading font-bold text-sm text-white mb-2">{`Feature Block ${num}`}</h5>
                      <p className="text-[11px] text-[#A0A0A0] font-sans leading-relaxed">
                        Extremely customizable structural elements designed for minimal modern apps.
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4 columns grid */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-[#A0A0A0]">4-Column Layout (grid-cols-2 lg:grid-cols-4 gap-4)</div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="border border-[#1F1F1F] rounded-xl bg-[#141414]/30 p-4 backdrop-blur-sm">
                      <div className="text-[10px] font-mono text-[#3B6BF7] mb-2">{`0${num}`}</div>
                      <h5 className="font-heading font-semibold text-xs text-white mb-1">{`Grid Card ${num}`}</h5>
                      <div className="h-1 bg-[#1F1F1F] rounded-full overflow-hidden mt-3">
                        <div className="h-full bg-gradient-to-r from-[#3B6BF7] to-[#7B4FE9] w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
