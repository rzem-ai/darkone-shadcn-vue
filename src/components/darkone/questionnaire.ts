import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from '@/components/ui/questionnaire';
import { createDarkOneControl } from './createDarkOneControl';

// The descriptions only carry text, and the contexts are read as they are.
export {
  QuestionnaireChoiceDescription as DarkOneQuestionnaireChoiceDescription,
  QuestionnaireDescription as DarkOneQuestionnaireDescription,
  injectQuestionnaireItemContext,
  injectQuestionnaireRootContext,
} from '@/components/ui/questionnaire';
export type {
  QuestionnaireChoiceDefinition,
  QuestionnaireInputType,
  QuestionnaireItemDefinition,
  QuestionnaireItemStatus,
  QuestionnaireShortcutMode,
} from '@/components/ui/questionnaire';

/** As DarkOneButton draws itself. The vendor sizes these for touch with min-h-11, which the action height replaces. */
const action = (props: Record<string, unknown>) => [
  'h-(--darkone-action-height) min-h-0 gap-1.5 rounded-(--darkone-radius) px-2.5 py-0 text-xs tracking-(--darkone-tracking) shadow-none disabled:opacity-40',
  props.variant === 'default' && 'border border-primary',
];

export const DarkOneQuestionnaire = createDarkOneControl(Questionnaire, 'DarkOneQuestionnaire', 'gap-4');
export const DarkOneQuestionnaireItem = createDarkOneControl(QuestionnaireItem, 'DarkOneQuestionnaireItem', 'gap-3');
export const DarkOneQuestionnaireTitle = createDarkOneControl(QuestionnaireTitle, 'DarkOneQuestionnaireTitle', 'text-sm [&:not(:has(~[data-slot=questionnaire-description]))]:mb-1');
export const DarkOneQuestionnaireProgress = createDarkOneControl(QuestionnaireProgress, 'DarkOneQuestionnaireProgress', 'tracking-(--darkone-tracking) uppercase');
export const DarkOneQuestionnaireChoices = createDarkOneControl(QuestionnaireChoices, 'DarkOneQuestionnaireChoices', 'gap-1.5');
// The indicator and the shortcut key are the choice's own spans, so they are squared from here.
// Only their radius and shadow: checked colours stay the vendor's.
export const DarkOneQuestionnaireChoice = createDarkOneControl(
  QuestionnaireChoice,
  'DarkOneQuestionnaireChoice',
  [
    'min-h-(--darkone-action-height) gap-2 rounded-(--darkone-radius) border-darkone-field-border bg-darkone-field dark:bg-darkone-field px-2.5 py-1.5 text-xs tracking-(--darkone-tracking) shadow-none',
    'dark:hover:bg-muted/50 has-[>input:focus-visible]:ring-1 has-[>input:focus-visible]:ring-ring',
    '[&_[data-slot=questionnaire-choice-indicator]]:rounded-(--darkone-radius) [&_[data-slot=questionnaire-choice-indicator-dot]]:rounded-(--darkone-radius)',
    '[&_[data-slot=questionnaire-choice-shortcut]]:rounded-(--darkone-radius) [&_[data-slot=questionnaire-choice-shortcut]]:shadow-none',
  ],
);
// Sized to sit among the choices, which are text-xs at action height.
export const DarkOneQuestionnaireInput = createDarkOneControl(
  QuestionnaireInput,
  'DarkOneQuestionnaireInput',
  'h-(--darkone-field-height) min-h-0 rounded-(--darkone-radius) border-darkone-field-border bg-darkone-field dark:bg-darkone-field px-2.5 text-xs md:text-xs shadow-none',
);
export const DarkOneQuestionnaireError = createDarkOneControl(QuestionnaireError, 'DarkOneQuestionnaireError', 'text-xs');
export const DarkOneQuestionnaireActions = createDarkOneControl(QuestionnaireActions, 'DarkOneQuestionnaireActions', 'min-h-(--darkone-action-height) sm:min-h-(--darkone-action-height) gap-1.5');
export const DarkOneQuestionnairePrevious = createDarkOneControl(QuestionnairePrevious, 'DarkOneQuestionnairePrevious', action);
export const DarkOneQuestionnaireSkip = createDarkOneControl(QuestionnaireSkip, 'DarkOneQuestionnaireSkip', action);
export const DarkOneQuestionnaireNext = createDarkOneControl(QuestionnaireNext, 'DarkOneQuestionnaireNext', action);
export const DarkOneQuestionnaireSubmit = createDarkOneControl(QuestionnaireSubmit, 'DarkOneQuestionnaireSubmit', action);
