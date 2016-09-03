export function isComponentOfType (classType, reactElement) {
  return reactElement && reactElement.type === classType;
}
