import { DimDivider } from './DimDivider.js';
import { DimNavigationItem } from './DimNavigationItem.js';
import { DimNavigationBar } from './DimNavigationBar.js';
import { DimNavigationRail } from './DimNavigationRail.js';
import { DimNavigationDrawer } from './DimNavigationDrawer.js';
import { DimSectionHeader } from './DimSectionHeader.js';

/**
 * Order of registratiaon matters! A navigation host must be registered before the navigation item.
 * Otherwise it seems like the navigation item is sending the "context-request" event before the navigation host has
 * initialized the provider listening. In this case the host is the navigation drawer
 */
window.customElements.define('dim-navigation-bar', DimNavigationBar);
window.customElements.define('dim-navigation-rail', DimNavigationRail);
window.customElements.define('dim-navigation-drawer', DimNavigationDrawer);
window.customElements.define('dim-navigation-item', DimNavigationItem);
window.customElements.define('dim-section-header', DimSectionHeader);
window.customElements.define('dim-divider', DimDivider);
