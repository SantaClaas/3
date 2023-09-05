import {
  navigationItemComponentName,
  DimNavigationItem,
} from '@claas.dev/dim-navigation';
import { DimNavigationRail } from './DimNavigationRail.js';

/**
 * Order of registratiaon matters! (For components that depend on the lifecycle events of other components)
 */
window.customElements.define('dim-navigation-rail', DimNavigationRail);

if (!window.customElements.get(navigationItemComponentName)) {
  window.customElements.define(navigationItemComponentName, DimNavigationItem);
}
