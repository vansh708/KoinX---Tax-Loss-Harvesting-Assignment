"use client";

import React from 'react';
import { InfoAccordion } from './InfoAccordion';
import { GainsCard } from './GainsCard';
import { HoldingsTable } from './HoldingsTable';
import { useTaxHarvesting } from '@/context/TaxHarvestingContext';
import { Skeleton } from '@/components/ui/skeleton';

export const Dashboard = () => {
  const { isLoading } = useTaxHarvesting();

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-2">
        <h1 className="text-2xl font-bold tracking-tight">Tax Harvesting</h1>
        <a href="#" className="text-sm font-medium text-primary hover:underline">How it works?</a>
      </div>

      <InfoAccordion />

      {isLoading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-[280px] w-full rounded-2xl" />
            <Skeleton className="h-[280px] w-full rounded-2xl" />
          </div>
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GainsCard type="pre" />
            <GainsCard type="post" />
          </div>
          <HoldingsTable />
        </div>
      )}
    </div>
  );
};
