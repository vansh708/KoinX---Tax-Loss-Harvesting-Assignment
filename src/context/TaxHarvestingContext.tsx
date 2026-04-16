"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { fetchHoldings, fetchCapitalGains, Holding, CapitalGains } from '@/lib/api';

interface StateGains {
  shortTerm: { profits: number; losses: number; net: number };
  longTerm: { profits: number; losses: number; net: number };
  realised: number;
}

interface TaxHarvestingContextType {
  holdings: Holding[];
  selectedHoldingCoins: Set<string>;
  toggleSelection: (coin: string) => void;
  selectAll: (coins: string[]) => void;
  deselectAll: () => void;
  isLoading: boolean;
  preHarvestData: StateGains | null;
  postHarvestData: StateGains | null;
}

const TaxHarvestingContext = createContext<TaxHarvestingContextType | undefined>(undefined);

export const TaxHarvestingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [capitalGains, setCapitalGains] = useState<CapitalGains | null>(null);
  const [selectedHoldingCoins, setSelectedHoldingCoins] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [holdingsData, gainsData] = await Promise.all([fetchHoldings(), fetchCapitalGains()]);
        setHoldings(holdingsData);
        setCapitalGains(gainsData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const toggleSelection = (coin: string) => {
    setSelectedHoldingCoins(prev => {
      const next = new Set(prev);
      if (next.has(coin)) {
        next.delete(coin);
      } else {
        next.add(coin);
      }
      return next;
    });
  };

  const selectAll = (coins: string[]) => {
    setSelectedHoldingCoins(new Set(coins));
  };

  const deselectAll = () => {
    setSelectedHoldingCoins(new Set());
  };

  const preHarvestData = useMemo((): StateGains | null => {
    if (!capitalGains) return null;
    
    const { stcg, ltcg } = capitalGains;
    const stNet = stcg.profits - stcg.losses;
    const ltNet = ltcg.profits - ltcg.losses;
    
    return {
      shortTerm: { profits: stcg.profits, losses: stcg.losses, net: stNet },
      longTerm: { profits: ltcg.profits, losses: ltcg.losses, net: ltNet },
      realised: stNet + ltNet,
    };
  }, [capitalGains]);

  const postHarvestData = useMemo((): StateGains | null => {
    if (!capitalGains || !preHarvestData) return null;

    let newStProfits = capitalGains.stcg.profits;
    let newStLosses = capitalGains.stcg.losses;
    let newLtProfits = capitalGains.ltcg.profits;
    let newLtLosses = capitalGains.ltcg.losses;

    holdings.forEach(holding => {
      if (selectedHoldingCoins.has(holding.coin)) {
        // Short term logic
        if (holding.stcg.gain > 0) {
          newStProfits += holding.stcg.gain;
        } else if (holding.stcg.gain < 0) {
          newStLosses += Math.abs(holding.stcg.gain);
        }

        // Long term logic
        if (holding.ltcg.gain > 0) {
          newLtProfits += holding.ltcg.gain;
        } else if (holding.ltcg.gain < 0) {
          newLtLosses += Math.abs(holding.ltcg.gain);
        }
      }
    });

    const stNet = newStProfits - newStLosses;
    const ltNet = newLtProfits - newLtLosses;

    return {
      shortTerm: { profits: newStProfits, losses: newStLosses, net: stNet },
      longTerm: { profits: newLtProfits, losses: newLtLosses, net: ltNet },
      realised: stNet + ltNet,
    };
  }, [capitalGains, selectedHoldingCoins, holdings, preHarvestData]);

  return (
    <TaxHarvestingContext.Provider
      value={{
        holdings,
        selectedHoldingCoins,
        toggleSelection,
        selectAll,
        deselectAll,
        isLoading,
        preHarvestData,
        postHarvestData,
      }}
    >
      {children}
    </TaxHarvestingContext.Provider>
  );
};

export const useTaxHarvesting = () => {
  const context = useContext(TaxHarvestingContext);
  if (!context) {
    throw new Error('useTaxHarvesting must be used within a TaxHarvestingProvider');
  }
  return context;
};
