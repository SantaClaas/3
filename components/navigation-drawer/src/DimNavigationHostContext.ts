import { createContext } from '@lit-labs/context';
import NavigationHost from './NavigationHost.js';

export const dimNavigationHostContextKey = 'dim-navigation-host';
export const dimNavigationHostContext = createContext<NavigationHost>(
  dimNavigationHostContextKey
);
