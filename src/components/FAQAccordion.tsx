import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FAQEntry {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQEntry[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-slate-200 border border-slate-200 rounded-2xl bg-white overflow-hidden">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer"
            >
              <span className="font-display text-sm sm:text-base font-semibold text-[#10233F]">
                {item.question}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-150 ${
                  isOpen ? 'rotate-180 text-[#10233F]' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
