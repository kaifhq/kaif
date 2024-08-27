const init = ($e, fn) => {
  /* $e === $element, R === repaint, C === cleanup */
  let prevTree = {$e, elem: $e.nodeName.toLowerCase()}, tmp, L = 'toLowerCase'

  const render = () => {
    tmp = El(prevTree, fn(), $e)
    deleteRecursive(prevTree)
    prevTree = tmp
  }

  const deleteRecursive = (oldTree) => {
    (oldTree.children??[]).map(deleteRecursive)
    if (!oldTree.R) {
      oldTree = oldTree.$e.remove()
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
      cur.$e = document.createElement(cur.elem)
      root.append(cur.$e)
    } else {
      prev.R = true
      cur.$e = prev.$e
      cur.C = prev.C
    }

    let {
      $e, elem, children, C, ...rest
    } = cur

    if (C) for (let key in C) {
      $e.removeEventListener(key.substring(2)[L](), cur.C[key])
    }

    cur.C = {}

    for (let key in rest) {
      if (typeof (tmp = rest[key]) == 'undefined') {
        continue
      }

      if (key.indexOf('on') != 0) {
        if (typeof tmp == 'object') {
          Object.assign($e[key], tmp)
        } else {
          $e[key] = tmp
        }
      } else {
        $e.addEventListener(
          key.substring(2)[L](),
          cur.C[key] = e => {
            rest[key](e)
            if (key[2][L]() === key[2]) {
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
          $e
        ))
      }

    return cur
  }

  render()

  return render
}

import { h, Fragment } from './jsx'
export default { init, h, Fragment }
