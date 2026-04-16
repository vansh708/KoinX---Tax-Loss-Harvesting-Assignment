import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useTaxHarvesting } from '@/context/TaxHarvestingContext';
import { formatCurrency, formatCrypto } from '@/lib/utils';
import Image from 'next/image';

export const HoldingsTable = () => {
  const { holdings, selectedHoldingCoins, toggleSelection, selectAll, deselectAll } = useTaxHarvesting();
  const [showAll, setShowAll] = useState(false);

  const displayedHoldings = showAll ? holdings : holdings.slice(0, 5);
  const isAllSelected = displayedHoldings.length > 0 && displayedHoldings.every(h => selectedHoldingCoins.has(h.coin));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      selectAll(displayedHoldings.map(h => h.coin));
    } else {
      deselectAll();
    }
  };

  const formatWithSignAndColor = (val: number) => {
    const isNegative = val < 0;
    const absVal = Math.abs(val);
    const formatted = formatCurrency(absVal);
    const colorClass = isNegative ? 'text-[#E53935] dark:text-[#FF5252]' : 'text-[#00A650] dark:text-[#00E676]';
    return <span className={`${colorClass} font-medium`}>{isNegative ? `- ${formatted}` : `+ ${formatted}`}</span>;
  };

  return (
    <div className="w-full bg-card dark:bg-brand-card-dark rounded-xl border border-border overflow-hidden">
      <div className="px-6 py-5 border-b border-border">
        <h3 className="font-semibold text-lg">Holdings</h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-12 pl-6">
                <Checkbox 
                  checked={isAllSelected} 
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="w-[200px]">Asset</TableHead>
              <TableHead className="text-right">
                Holdings<br/>
                <span className="text-[10px] font-normal text-muted-foreground">Current Market Rate</span>
              </TableHead>
              <TableHead className="text-right">Total Current Value</TableHead>
              <TableHead className="text-right">Short-term</TableHead>
              <TableHead className="text-right">Long-term</TableHead>
              <TableHead className="text-right pr-6">Amount to Sell</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedHoldings.map((holding) => {
              const isSelected = selectedHoldingCoins.has(holding.coin);
              const isDummySvg = holding.logo.endsWith('DefaultCoin.svg');
              
              const totalCurrentValue = holding.totalHolding * holding.currentPrice;

              return (
                <TableRow 
                  key={holding.coin}
                  className={`border-border transition-colors hover:bg-muted/50 ${isSelected ? 'bg-primary/5 dark:bg-primary/10' : ''}`}
                >
                  <TableCell className="pl-6">
                    <Checkbox 
                      checked={isSelected}
                      onCheckedChange={() => toggleSelection(holding.coin)}
                      aria-label={`Select ${holding.coinName}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {!isDummySvg ? (
                         // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={holding.logo} 
                          alt={holding.coin} 
                          className="w-8 h-8 rounded-full"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg";
                          }}
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border border-border">
                          <span className="text-[10px] font-bold">{holding.coin.slice(0, 2)}</span>
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm max-w-[120px] truncate" title={holding.coinName}>
                          {holding.coinName}
                        </span>
                        <span className="text-xs text-muted-foreground uppercase">{holding.coin}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col">
                      <span className="font-medium">{formatCrypto(holding.totalHolding)} {holding.coin}</span>
                      <span className="text-xs text-muted-foreground">{formatCurrency(holding.currentPrice)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(totalCurrentValue)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatWithSignAndColor(holding.stcg.gain)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatWithSignAndColor(holding.ltcg.gain)}
                  </TableCell>
                  <TableCell className="text-right pr-6 font-medium">
                    {isSelected ? (
                      <span className="animate-in fade-in duration-300">
                        {formatCrypto(holding.totalHolding)} {holding.coin}
                      </span>
                    ) : (
                      <span className="text-muted-foreground/30">-</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {holdings.length > 5 && (
        <div className="p-4 border-t border-border bg-card">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-primary text-sm font-medium hover:underline px-2"
          >
            {showAll ? 'View less' : `View all (${holdings.length})`}
          </button>
        </div>
      )}
    </div>
  );
};
