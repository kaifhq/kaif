import Kaif from 'kaif'

document.body.innerHTML = '<div id="root"></div>'

const htmlWithTodos = (...values) => {
  const todos = values.map((innerText) => {
    return `<li>${innerText}</li>`
  }).join('')
  return `<div id="root"><button id="add">+</button><button id="remove">-</button><ol>${todos}</ol></div>`
}

test('Todo', () => {
  let todos = []
  function Todos() {
    const ts = todos.map((innerText, i) => ({
      elem: 'li',
      innerText,
      onclick: () => todos.splice(i, 1)
    }))
    return [
      {
        elem: 'button',
        id: 'add',
        innerText: '+',
        onclick: () => todos.push(todos.length.toString()),
      },
      {
        elem: 'button',
        id: 'remove',
        innerText: '-',
        onclick: () => todos.pop(),
      },
      {
        elem: 'ol',
        children: ts,
      },
    ]
  }

  const App = () => ({
    elem: 'div',
    id: 'root',
    children: Todos(), 
  })

  const root = document.getElementById('root')
  Kaif.init(root, App)

  expect(document.body.innerHTML).toEqual(
    htmlWithTodos()
  )

  const buttonAdd = document.querySelector('button#add')
  const buttonRemove = document.querySelector('button#remove')
  buttonAdd.click()

  expect(document.body.innerHTML).toEqual(
    htmlWithTodos('0')
  )

  buttonAdd.click()

  expect(document.body.innerHTML).toEqual(
    htmlWithTodos('0', '1')
  )

  buttonAdd.click()
  expect(document.body.innerHTML).toEqual(
    htmlWithTodos('0', '1', '2')
  )

  buttonRemove.click()
  expect(document.body.innerHTML).toEqual(
    htmlWithTodos('0', '1')
  )

  const firstTodo = document.querySelector('li:first-child')
  firstTodo.click()

  expect(document.body.innerHTML).toEqual(
    htmlWithTodos('1')
  )
})

