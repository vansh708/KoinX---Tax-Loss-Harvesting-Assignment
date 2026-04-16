import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InfoIcon } from "lucide-react";

export const InfoAccordion = () => {
  return (
    <Accordion className="w-full bg-brand-card-light dark:bg-brand-card-dark rounded-xl border border-border mt-4 mb-6">
      <AccordionItem value="item-1" className="border-0">
        <AccordionTrigger className="px-4 py-3 hover:no-underline text-sm font-medium">
          <div className="flex items-center gap-2 text-primary">
            <InfoIcon className="w-4 h-4" />
            <span>Important Notes & Disclaimers</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4 text-xs text-muted-foreground bg-muted/20">
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.</li>
            <li>Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.</li>
            <li>Price and market value data is fetched from CoinGecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.</li>
            <li>Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.</li>
            <li>Only realized losses are considered for harvesting, Unrealized losses in held assets are not counted.</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
