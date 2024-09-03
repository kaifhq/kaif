/** @jsx Kaif.h @jsxFrag Kaif.Fragment */
import Kaif from 'kaif'

document.body.innerHTML = '<div id="root"></div>'

const htmlWithNumber = (n) => 
  `<div id="root"><h1><span>${n}</span></h1><button><span>Increment</span></button></div>`

test('Counter', () => {
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

  expect(document.body.innerHTML).toEqual(
    htmlWithNumber(0)
  )

  const button = document.querySelector('button')
  button.click()

  expect(document.body.innerHTML).toEqual(
    htmlWithNumber(1)
  )

  // this tests the fact that button didn't get
  // replaced with another button on rerender
  button.click()

  expect(document.body.innerHTML).toEqual(
    htmlWithNumber(2)
  )
})
