const Fragment = 'frag'
const h = (elem, props, ...children) => {
  if (typeof elem == 'function') return elem({...props, children})
  return { ...props, elem, children }
}

export { Fragment, h }
