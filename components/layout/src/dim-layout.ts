import { DimLayout } from './DimLayout.js';

/**
 * Order of registratiaon matters! (For components that depend on the lifecycle events of other components)
 */
window.customElements.define('dim-layout', DimLayout);
