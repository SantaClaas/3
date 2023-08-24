import { createContext } from '@lit-labs/context';
import type { DimNavigationDrawer } from './DimNavigationDrawer.js';

export type { DimNavigationDrawer } from './DimNavigationDrawer.js';

export const dimNavigationHostContextKey = 'dim-navigation-host';
export const dimNavigationHostContext = createContext<DimNavigationDrawer>(
  dimNavigationHostContextKey
);
