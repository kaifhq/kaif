const init = ($el, fn) => {
  /* $el === $ellement */
  let prevTree = {$el, elem: $el.nodeName.toLowerCase()}, tmp

  const render = () => {
    tmp = El(prevTree, fn(), $el)
    deleteRecursive(prevTree)
    prevTree = tmp
  }

  const deleteRecursive = (oldTree) => {
    (oldTree.children??[]).map(deleteRecursive)
    if (!oldTree.repaint) {
      oldTree = oldTree.$el.remove()
    }
  }

  const El = (prev, cur, root) => {
    if (Array.isArray(cur)) {
      cur = { children: cur }
    }
    if (
      typeof cur === 'string'
      || typeof cur === 'number'
    ) {
      cur = { innerText: cur.toString() }
    }

    cur.elem = cur.elem || 'span'

    if (!prev || (tmp = prev.elem !== cur.elem)) {
      if (prev && tmp) deleteRecursive(prev)
      cur.$el = document.createElement(cur.elem)
      root.append(cur.$el)
    } else {
      prev.repaint = true
      cur.$el = prev.$el
      cur.cleanup = prev.cleanup
    }

    let {
      $el, elem, children, cleanup, ...rest
    } = cur

    if (cleanup) for (let key in cleanup) {
      $el.removeEventListener(key.substring(2), cur.cleanup[key])
    }

    cur.cleanup = {}

    for (let key in rest) {
      if (typeof (tmp = rest[key]) == 'undefined') {
        continue
      }

      if (key.indexOf('on') != 0) {
        if (typeof tmp == 'object') {
          Object.assign($el[key], tmp)
        } else {
          $el[key] = tmp
        }
      } else {
        $el.addEventListener(
          key.substring(2),
          cur.cleanup[key] = e => {
            let r = rest[key](e)
            if (!(r && typeof r.then == 'function')) {
              render()
            }
          }
        )
      }
    }

    if (children)
      return {
        ...cur,
        children: children.map((child, i) => El(
          prev && prev.children && prev.children[i],
          child,
          $el
        ))
      }

    return cur
  }

  render()

  return render
}

import { h, Fragment } from './jsx'
export default { init, h, Fragment }
