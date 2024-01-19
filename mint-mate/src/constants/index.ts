import { Budget } from '../models/budget';
import { Base } from '../models/base';
import { Presets } from '../models/budget';

// 50 to fixed expenses, 30 to variable expenses, 20 to savings


//CAN MAYBE ADD A TYPE TO THE BUDGET ITEM FOR THE GENERATION OF BUDGETS??
//OR CAN MAYBE HAVE PRESET COSTS THAT THE USER SELECTS WHEN ENTERING THEIR BUDGET
//THOSE PRESETS WILL HAVE A TYPE AND VALUE ATTATCHED TO THEM 

const fixedExpenses: string[] = [ //.5
  'Rent/Housing', //.25
  'Insurance',//.075
  'Utilities',//.05
  'Bank Fees',//.025
  'Subscriptions',//.025
  'Vehicle', //.075
];
const variableExpenses: string[] = [
  'Groceries',
  'Data',
  'Petrol',
  'Toiletries',
  'Going out',
  'Entertainment',
  'Shopping',
];

const presetCosts: Presets[] = [
//   {
//     name: 'Rent/Housing',
//     value: 0.2,
//   },
//   {
//     name: 'Vehicle',
//     value: 0.05,
//   },
//   {
//     name: 'Insurance',
//     value: 0.05,
//   },
//   {
//     name: 'Utilities',
//     value: 0.025
//   },
];
