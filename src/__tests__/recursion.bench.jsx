/** @jsx Kaif.h @jsxFrag Kaif.Fragment */
import Kaif from 'kaif'

document.body.innerHTML = '<div id="root"></div>'

const rec = (n) => {
  return {
    elem: 'div',
    children: new Array(1).fill(0).map((_, i) => {
      if (n === 0) {
        return <div>{i}</div>
      }
      return rec(n-1)
    })
  }
}
const App = () => (
  <div id="root">{rec(100)}</div>
)

import { bench } from 'vitest'
bench('Benchmark', () => {
  const root = document.getElementById('root')
  Kaif.init(root, App)
}, {
  iterations: 5000,
  warmupIterations: 1000,
})
