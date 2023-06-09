export interface FinancialEntry {
  index?: number;
  name?: string;
  value?: number;
  description?: string;
}

export interface SavingsState {
  title: string;
  description: string;
  savings: FinancialEntry[];
  calculations: {
    startAmount: number;
    interestRate: number;
  };
}

export interface IncomeState {
  incomeList: IncomeEntry[];
  selectedIncome: number;
}

export interface IncomeEntry {
  index?: number;
  value: number;
  tax?: number;
}

export interface ExpensesState {
  title: string;
  description: string;
  expenses: FinancialEntry[];
}

export interface EventState {
  title: string;
  events: EventEntry[];
}

export interface EventEntry {
  index?: number;
  title: string;
  description: string;
}

export interface SettingsState {
  decimalPlaces: number;
  language: Language;
  saveTab: boolean;
  savedTab: {
    home: number;
  };
}

export interface Language {
  currency: string;
  locale: string;
}

export interface EconomyState {
  income: IncomeState;
  expenses: UndoableState<ExpensesState>;
  savings: UndoableState<SavingsState>;
  settings: SettingsState;
  version?: string;
}

export interface UndoableState<T> {
  past: T[];
  present: T;
  future: T[];
}
