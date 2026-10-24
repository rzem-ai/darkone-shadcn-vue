import { CodeBlock, CodeBlockActions, CodeBlockContent, CodeBlockCopyButton, CodeBlockFooter, CodeBlockHeader, CodeBlockLine, CodeBlockTitle } from '@/components/ui/code-block';
import { createDarkOneControl } from './createDarkOneControl';

// The token and the highlighter carry no surface, so they keep their exact identity.
export { CodeBlockToken as DarkOneCodeBlockToken, highlightCode, loadHighlighter, useHighlightedCode } from '@/components/ui/code-block';
export type { HighlightedToken } from '@/components/ui/code-block';
// A recessed well, as a field is: the code reads as content to inspect, not a card to act on.
export const DarkOneCodeBlock = createDarkOneControl(
  CodeBlock,
  'DarkOneCodeBlock',
  'rounded-(--darkone-radius) border-darkone-field-border bg-darkone-field dark:bg-darkone-field has-[>[data-slot=code-block-content]:focus-visible]:ring-ring',
);
export const DarkOneCodeBlockHeader = createDarkOneControl(CodeBlockHeader, 'DarkOneCodeBlockHeader', 'h-(--darkone-row-height) border-b border-darkone-field-border pt-0');
export const DarkOneCodeBlockTitle = createDarkOneControl(CodeBlockTitle, 'DarkOneCodeBlockTitle', 'font-mono text-xs font-normal text-muted-foreground');
export const DarkOneCodeBlockActions = createDarkOneControl(CodeBlockActions, 'DarkOneCodeBlockActions', '[&_button]:rounded-(--darkone-radius)');
export const DarkOneCodeBlockCopyButton = createDarkOneControl(CodeBlockCopyButton, 'DarkOneCodeBlockCopyButton', 'rounded-(--darkone-radius)');
export const DarkOneCodeBlockContent = createDarkOneControl(CodeBlockContent, 'DarkOneCodeBlockContent', 'text-xs');
export const DarkOneCodeBlockLine = createDarkOneControl(CodeBlockLine, 'DarkOneCodeBlockLine', '');
export const DarkOneCodeBlockFooter = createDarkOneControl(CodeBlockFooter, 'DarkOneCodeBlockFooter', 'border-t border-darkone-field-border pt-2');
