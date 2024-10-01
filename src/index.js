const functionKeyword = 'function'
const childrenKeyword = 'children'
const cleanupKeyword = 'clean'
const Fragment = 'frag'

const h = (elem, props, ...children) => {
  if (typeof elem == functionKeyword) return elem({...props, [childrenKeyword]:children})
  return { ...props, elem, [childrenKeyword]:children }
}

// $ represents attached dom node
const init = ($, fn) => {
  let prevTree = {$, elem: $.nodeName.toLowerCase()}, tmp

  const deleteRecursive = (oldTree) => {
    for (let queue = [oldTree], t;t = queue.shift();) {
      if (t[childrenKeyword]) {
        queue = queue.concat(t[childrenKeyword])
      }

      if (!t.repaint) {
        t = t.$.remove()
      }
    }
  }

  const render = () => {
    let tree = null

    for (
      let queue = [[prevTree, fn(), $]], o;
      o = queue.shift();
      ) {
      let [prev, cur, root, father] = o

      if (Array.isArray(cur)) {
        cur = { [childrenKeyword]: cur, elem: Fragment }
      }
      if (
        ['string', 'number'].includes(typeof cur)
      ) {
        cur = { innerText: cur.toString() }
      }

      let curelem = cur.elem = cur.elem || 'span'

      if (!prev || (tmp = prev.elem != curelem)) {
        if (prev && tmp) deleteRecursive(prev)
        if (curelem == Fragment) {
          cur.$ = root
        } else {
          cur.$ = document.createElement(curelem)
          root.append(cur.$)
        }
      } else {
        prev.repaint = true
        cur.$ = prev.$
        cur[cleanupKeyword] = prev[cleanupKeyword]
      }


      let {
        $,
        elem,
        [childrenKeyword]:children,
        [cleanupKeyword]:cleanup,
        ...rest
      } = cur

      for (let key in cleanup || {}) {
        $.removeEventListener(
          key.substring(2),
          cur[cleanupKeyword][key]
        )
      }

      cur[cleanupKeyword] = {}

      for (let key in rest) {
        if (typeof (tmp = rest[key]) == 'undefined') {
          continue
        }

        if (key.indexOf('on') != 0) {
          if (typeof tmp == 'object') {
            Object.assign($[key], tmp)
          } else {
            $[key] = tmp
          }
        } else {
          $.addEventListener(
            key.substring(2),
            cur[cleanupKeyword][key] = e =>
              ((tmp = rest[key](e)) && typeof tmp.then == functionKeyword) || render()
          )
        }
      }

      if (children) {
        children.map((child, i) => queue.push([
          prev
            && prev[childrenKeyword]
            && prev[childrenKeyword][i],
          child,
          $,
          cur,
        ]))
        cur[childrenKeyword] = []
      }

      if (father) {
        father[childrenKeyword].push(cur)
      } else {
        tree = cur
      }
    }

    deleteRecursive(prevTree)
    prevTree = tree
  }

  render()

  return render
}

export default { init, h, Fragment }
