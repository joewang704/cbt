export default class Obj {
  static values = (obj={}) => Object.keys(obj).map(k => obj[k])
  // Keep only keys specified in object
  static pick = (obj, keys) =>
    Object.keys(obj).filter(k => keys.includes(k)).reduce((acc, curr) => {
      acc[curr] = obj[curr]
      return acc
    }, {})
  static setDefault = (obj, defaultVal) => {
    /*Object.keys(obj).map(k => {
      if (obj[k] === null || obj[k] === undefined) {
      }
    })*/
  }
  static map = (obj, fn) => {
    Object.keys(obj).forEach(k => {
      const newValue = fn(k, obj[k])
      if (newValue === undefined) {
        delete obj[k]
      } else {
        obj[k] = newValue
      }
    })
    return obj
  }
}
