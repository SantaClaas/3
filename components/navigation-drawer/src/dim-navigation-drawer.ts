import { DimDivider } from './DimDivider.js';
import { DimNavigationItem } from './DimNavigationItem.js';
import { DimNavigationBar } from './DimNavigationBar.js';
import { DimNavigationRail } from './DimNavigationRail.js';
import { DimNavigationDrawer } from './DimNavigationDrawer.js';
import { DimSectionHeader } from './DimSectionHeader.js';

/**
 * Order of registratiaon matters! (For components that depend on the lifecycle events of other components)
 */
window.customElements.define('dim-navigation-bar', DimNavigationBar);
window.customElements.define('dim-navigation-rail', DimNavigationRail);
window.customElements.define('dim-navigation-drawer', DimNavigationDrawer);
window.customElements.define('dim-navigation-item', DimNavigationItem);
window.customElements.define('dim-section-header', DimSectionHeader);
window.customElements.define('dim-divider', DimDivider);
