# React Toolbox

React Toolbox is a collection of editable components that preserves the appearance and behavior of Google's original Material Design. Its language distinguishes what people use, what they install, and how they customize it.

## Language

**Material 1**:
The original Material Design language that defines the collection's visual and interaction reference.
_Avoid_: Material 3, Material You, or an unspecified "Material" when identifying the design generation.

**Component family**:
A group of related components installed and documented together, such as Button, IconButton, and BrowseButton.
_Avoid_: Component when referring to the entire family.

**Registry item**:
A named installation unit containing a component family, shared foundations, or a collection of other items.
_Avoid_: Package when referring to source installed from the registry.

**Foundation**:
A shared visual or behavioral capability used by several component families, such as typography, theme scoping, or overlay placement.
_Avoid_: Utilities as a catch-all for unrelated family-specific behavior.

**Theme**:
A coordinated set of visual choices, including colors, typography, dimensions, and motion, applied to a component collection or scope.
_Avoid_: Theme when referring only to classes assigned to individual component parts.

**Style slot**:
A named component part that accepts presentation overrides, such as a button's icon or a field's label.
_Avoid_: Theme for an individual part override.

**Source release**:
An identified edition of the component collection made available for installation, with changes that consumers can review against their customized copies.
_Avoid_: Deployment when referring to the edition itself.

**Reference baseline**:
The preserved rendering and behavior used to check Material 1 fidelity, including explicitly reviewed corrections to the original implementation.
_Avoid_: Legacy code when referring to the independent evidence protecting visual fidelity.
