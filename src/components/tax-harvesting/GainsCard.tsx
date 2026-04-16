import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTaxHarvesting } from '@/context/TaxHarvestingContext';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { PartyPopper } from 'lucide-react';

interface GainsCardProps {
  type: 'pre' | 'post';
}

export const GainsCard: React.FC<GainsCardProps> = ({ type }) => {
  const { preHarvestData, postHarvestData } = useTaxHarvesting();
  
  const isPost = type === 'post';
  const data = isPost ? postHarvestData : preHarvestData;
  const originalRealized = preHarvestData?.realised || 0;
  
  // Calculate if there's a tax saving. "You're going to save X only if Pre-harvesting realised > Post-harvesting"
  const potentialSavings = isPost && data ? originalRealized - data.realised : 0;
  const showSavings = isPost && potentialSavings > 0;

  if (!data) return null;

  const bgClass = isPost 
    ? "bg-[#0A53FF] text-white border-none shadow-lg" 
    : "bg-card border-border dark:bg-[#1A1D2B]";

  const formatWithSign = (val: number) => {
    const isNegative = val < 0;
    const absVal = Math.abs(val);
    const formatted = formatCurrency(absVal);
    return isNegative ? `- ${formatted}` : formatted;
  };

  const getTextColor = (val: number, isPostType: boolean) => {
    if (isPostType) return 'text-white';
    if (val > 0) return 'text-[#00A650]';
    if (val < 0) return 'text-[#E53935]';
    return 'text-foreground';
  };

  return (
    <Card className={`${bgClass} rounded-2xl overflow-hidden`}>
      <CardHeader className="pb-4 pt-5 px-6">
        <div className="flex justify-between items-end">
          <CardTitle className="text-lg font-medium">
            {isPost ? 'After Harvesting' : 'Pre Harvesting'}
          </CardTitle>
          <div className="flex gap-8 text-xs font-medium opacity-80">
            <span>Short-term</span>
            <span>Long-term</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6 space-y-4">
        {/* Profits */}
        <div className="flex justify-between items-center text-sm">
          <span>Profits</span>
          <div className="flex gap-8 font-medium">
            <span className={`w-16 text-right ${getTextColor(data.shortTerm.profits, isPost)}`}>
              {formatWithSign(data.shortTerm.profits)}
            </span>
            <span className={`w-16 text-right ${getTextColor(data.longTerm.profits, isPost)}`}>
              {formatWithSign(data.longTerm.profits)}
            </span>
          </div>
        </div>

        {/* Losses */}
        <div className="flex justify-between items-center text-sm">
          <span>Losses</span>
          <div className="flex gap-8 font-medium">
            <span className={`w-16 text-right ${getTextColor(-data.shortTerm.losses, isPost)}`}>
              {formatWithSign(-data.shortTerm.losses)}
            </span>
            <span className={`w-16 text-right ${getTextColor(-data.longTerm.losses, isPost)}`}>
              {formatWithSign(-data.longTerm.losses)}
            </span>
          </div>
        </div>

        <div className="h-px bg-border/40 my-2" />

        {/* Net Capital Gains */}
        <div className="flex justify-between items-center text-sm font-medium">
          <span>Net Capital Gains</span>
          <div className="flex gap-8">
            <span className={`w-16 text-right ${getTextColor(data.shortTerm.net, isPost)}`}>
              {formatWithSign(data.shortTerm.net)}
            </span>
            <span className={`w-16 text-right ${getTextColor(data.longTerm.net, isPost)}`}>
              {formatWithSign(data.longTerm.net)}
            </span>
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-border/40 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">
              {isPost ? 'Effective Capital Gains:' : 'Realised Capital Gains:'}
            </span>
            <span className="text-lg font-bold">
              {formatWithSign(data.realised)}
            </span>
          </div>
          
          {showSavings && (
            <div className="flex items-center gap-2 text-sm font-medium text-[#FF8A00] animate-in fade-in slide-in-from-bottom-2">
              <PartyPopper className="w-4 h-4" />
              <span>You are going to save upto {formatCurrency(potentialSavings)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
