// An immutable function to create a new object c from a and b
export function merge(a, b) {
  return Object.assign({}, a, b)
}

export function copy(obj) {
  return Object.assign({}, obj);
}
