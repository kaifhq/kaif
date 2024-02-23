import Kaif from 'kaif'

document.body.innerHTML = '<div id="root"></div>'

const html = (isLinkShown) => {
  if (isLinkShown) {
    return `<div id="root"><a></a></div>`
  } else {
    return `<div id="root"><button>click me</button></div>`
  }
}

test('Replace with different element type', () => {
  let isLinkShown = false

  const App = () => ({
    elem: 'div',
    id: 'root',
    children: isLinkShown
      ? [{
        elem: 'a',
      }] : [{
        elem: 'button',
        onclick: () => isLinkShown = true,
        innerText: 'click me'
      }],
  })

  const root = document.getElementById('root')
  Kaif.init(root, App)

  expect(document.body.innerHTML).toEqual(
    html(false)
  )

  const button = document.querySelector('button')
  button.click()

  expect(document.body.innerHTML).toEqual(
    html(true)
  )
})

