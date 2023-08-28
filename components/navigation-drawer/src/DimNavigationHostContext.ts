import { createContext } from '@lit-labs/context';
import type { DimNavigation } from './DimNavigation.js';

export type { DimNavigation } from './DimNavigation.js';

export const dimNavigationHostContextKey = 'dim-navigation-host';
export const dimNavigationHostContext = createContext<DimNavigation>(
  dimNavigationHostContextKey
);
