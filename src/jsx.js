const Fragment = Symbol()
function h(elem, props, ...children) {
  if (elem === Fragment) return children
  if (typeof elem === 'function') return elem({...props, children})
  return { ...props, elem, children }
}

export { Fragment, h }
