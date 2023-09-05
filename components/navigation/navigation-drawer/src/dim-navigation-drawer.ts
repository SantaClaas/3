import {
  DimNavigationItem,
  navigationItemComponentName,
} from '@claas.dev/dim-navigation';
import { DimDivider } from './DimDivider.js';
import { DimNavigationDrawer } from './DimNavigationDrawer.js';
import { DimSectionHeader } from './DimSectionHeader.js';

/**
 * Order of registratiaon matters! (For components that depend on the lifecycle events of other components)
 */
window.customElements.define('dim-navigation-drawer', DimNavigationDrawer);
window.customElements.define('dim-section-header', DimSectionHeader);
window.customElements.define('dim-divider', DimDivider);

if (!window.customElements.get(navigationItemComponentName)) {
  window.customElements.define(navigationItemComponentName, DimNavigationItem);
}
