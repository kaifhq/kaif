import Kaif from 'kaif'

document.body.innerHTML = '<div id="root"></div>'


test('Object prop', () => {
  const App = () => ({
    elem: 'div',
    id: 'root',
    style: { color: 'red' },
  })

  const root = document.getElementById('root')
  Kaif.init(root, App)

  expect(root.style.color).toEqual('red')
})



