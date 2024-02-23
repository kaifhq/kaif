import Kaif from 'kaif'

document.body.innerHTML = '<div id="root"></div>'


test('Undefined prop', () => {
  const App = () => ({
    elem: 'div',
    id: 'root',
    onclick: undefined,
  })

  const root = document.getElementById('root')
  Kaif.init(root, App)
})


