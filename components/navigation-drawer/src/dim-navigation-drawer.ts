import { DimNavigationDrawer } from './DimNavigationDrawer.js';
import { DimDivider } from './DimDivider.js';
import { DimNavigationSection } from './DimNavigationSection.js';
import { DimNavigationItem } from './DimNavigationItem.js';

/**
 * Order of registratiaon matters! A navigation host must be registered before the navigation item.
 * Otherwise it seems like the navigation item is sending the "context-request" event before the navigation host has
 * initialized the provider listening. In this case the host is the navigation drawer
 */
window.customElements.define('dim-navigation-drawer', DimNavigationDrawer);
window.customElements.define('dim-navigation-item', DimNavigationItem);
window.customElements.define('dim-navigation-section', DimNavigationSection);
window.customElements.define('dim-divider', DimDivider);
