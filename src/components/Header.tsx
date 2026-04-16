"use client";

import React from 'react';
import { Menu } from 'lucide-react';
import { useTheme } from 'next-themes';

export const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex justify-between items-center py-4 px-6 border-b border-border bg-card/50 backdrop-blur top-0 sticky z-50">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold tracking-tight text-primary">Koin<span className="text-[#FF8A00]">X</span></span>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-sm text-muted-foreground mr-2 hover:text-foreground"
        >
          Toggle Theme
        </button>
        <button className="p-2 -mr-2">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};
