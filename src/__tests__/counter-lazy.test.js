import Kaif from 'kaif'

document.body.innerHTML = '<div id="root"></div>'

const htmlWithNumber = (n) => 
  `<div id="root"><h1>${n}</h1><button>Increment</button></div>`

test('Lazy counter', () => {
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
        onclick: async () => count++,
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

  expect(document.body.innerHTML).toEqual(
    htmlWithNumber(0)
  )

  const button = document.querySelector('button')
  button.click()

  expect(document.body.innerHTML).toEqual(
    htmlWithNumber(0)
  )
})

