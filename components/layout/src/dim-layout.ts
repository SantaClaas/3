import { DimLayout } from './DimLayout.js';
import { DimTopAppBar } from './DimTopAppBar.js';

/**
 * Order of registratiaon matters! (For components that depend on the lifecycle events of other components)
 */
window.customElements.define('dim-top-app-bar', DimTopAppBar);
window.customElements.define('dim-layout', DimLayout);
