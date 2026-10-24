import { AccordionContent, AccordionTrigger } from '@/components/ui/accordion';
import { createDarkOneControl } from './createDarkOneControl';

// The root and the item carry no surface beyond the vendor rule, so they keep their exact identity and context.
export { Accordion as DarkOneAccordion, AccordionItem as DarkOneAccordionItem } from '@/components/ui/accordion';
// A trigger is a section heading, so it reads as the tracked labels do, at row height rather than the vendor's py-4.
export const DarkOneAccordionTrigger = createDarkOneControl(
  AccordionTrigger,
  'DarkOneAccordionTrigger',
  'min-h-(--darkone-row-height) items-center rounded-(--darkone-radius) py-1 text-xs tracking-(--darkone-tracking) text-muted-foreground uppercase hover:text-foreground hover:no-underline data-[state=open]:text-foreground [&>svg]:translate-y-0',
);
// The class lands on the vendor's inner padding box, not the animated region.
export const DarkOneAccordionContent = createDarkOneControl(AccordionContent, 'DarkOneAccordionContent', 'pb-3');
