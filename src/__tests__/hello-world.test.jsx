/** @jsx Kaif.h @jsxFrag Kaif.Fragment */
import Kaif from 'kaif'

document.body.innerHTML = '<div id="root"></div>'

test('Hello world', () => {
  const root = document.getElementById('root')
  const App = () => <div>Hello world</div>
  const component = Kaif.init(root, App)

  expect(document.body.innerHTML).toEqual(
    '<div id="root">Hello world</div>'
  )
})
