import { DimNavigation } from './DimNavigation.js';
import { DimDivider } from './DimDivider.js';
import { DimNavigationSection } from './DimNavigationSection.js';
import { DimNavigationItem } from './DimNavigationItem.js';
import { DimNavigationBar } from './DimNavigationBar.js';
import { DimNavigationRail } from './DimNavigationRail.js';

/**
 * Order of registratiaon matters! A navigation host must be registered before the navigation item.
 * Otherwise it seems like the navigation item is sending the "context-request" event before the navigation host has
 * initialized the provider listening. In this case the host is the navigation drawer
 */
window.customElements.define('dim-navigation-bar', DimNavigationBar);
window.customElements.define('dim-navigation-rail', DimNavigationRail);
window.customElements.define('dim-navigation', DimNavigation);
window.customElements.define('dim-navigation-item', DimNavigationItem);
window.customElements.define('dim-navigation-section', DimNavigationSection);
window.customElements.define('dim-divider', DimDivider);
