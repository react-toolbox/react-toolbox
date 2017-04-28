let customChecker;

/**
 *  Sets customChecker which will be used for all components.
 *
 * @param providedChecker {Function} - Checker function
 */
export function overrideComponentTypeChecker(providedChecker) {
  customChecker = providedChecker;
}

/**
 * Returns true if the provided element is a component of the provided type.
 *
 * @param classType {ReactElement class} - the class of a React Element
 * @param reactElement {ReactElement} - any React Element (not a real DOM node)
 */
export function defaultChecker(classType, reactElement) {
  return reactElement && reactElement.type === classType;
}

/**
 * Executes customChecker if it's set or defaultChecker.
 *
 * @param classType {ReactElement class} - the class of a React Element
 * @param reactElement {ReactElement} - any React Element (not a real DOM node)
 */
export default function isComponentOfType(classType, reactElement) {
  return customChecker
    ? customChecker(classType, reactElement)
    : defaultChecker(classType, reactElement);
}
