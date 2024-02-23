# Kaif

Kaif is a JavaScript library for building user interfaces.

* Less than 1kb size
* Supports jsx
* 100% test code coverage

## Usage

```js
/** @jsx Kaif.h @jsxFrag Kaif.Fragment */
import Kaif from 'kaif'

let count = 0
function Counter() {
  return (
    <>
      <h1>{count}</h1>
      <button onclick={() => count++}>
        Increment
      </button>
    </>
  )
}

const App = () => {
  return <div id="root"><Counter/></div>
}

const root = document.getElementById('root')
Kaif.init(root, App)
```

## Usage without jsx


```js
import Kaif from 'kaif'

let count = 0
function Counter() {
  return [
    {
      elem: 'h1',
      innerText: count.toString(),
    },
    {
      elem: 'button',
      innerText: 'Increment',
      onclick: () => count++,
    },
  ]
}

const App = () => {
  return {
    elem: 'div',
    id: 'root',
    children: Counter(), 
  }
}

const root = document.getElementById('root')
Kaif.init(root, App)
```
