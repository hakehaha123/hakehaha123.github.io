export const debounce = <T extends (...args: any) => any>(
    fn: T,
    time?: number,
    immediate?: boolean
  ): ((...args: any) => any) => {
    let timeoutId: null | number |  NodeJS.Timeout
    let defaultImmediate = immediate || false
    let delay = time || 300
    return (...args: any) => {
      if (defaultImmediate) {
        fn.apply(this, args)
        defaultImmediate = false
        return
      }
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        fn.apply(this, args)
        timeoutId = null
      }, delay)
    }
  }
