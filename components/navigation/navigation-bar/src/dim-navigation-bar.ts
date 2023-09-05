import {
  DimNavigationItem,
  navigationItemComponentName,
} from '@claas.dev/dim-navigation';
import { DimNavigationBar } from './DimNavigationBar.js';

/**
 * Order of registratiaon matters! (For components that depend on the lifecycle events of other components)
 */
window.customElements.define('dim-navigation-bar', DimNavigationBar);
if (!window.customElements.get(navigationItemComponentName)) {
  window.customElements.define(navigationItemComponentName, DimNavigationItem);
}
