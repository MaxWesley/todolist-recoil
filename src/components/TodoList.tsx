import { 
  atom, 
  selector, 
  useRecoilValue 
} from "recoil"

import { TodoItem } from "./TodoItem"
import { TodoItemCreator } from "./TodoItemCreator"
import { TodoListFilters } from "./TodoListFilters"

const todoListState = atom<any[]>({
  key: 'todoListState',
  default: [
    {
      id: 0,
      text: 'Varrer a casa',
      isComplete: false,
    },
    {
      id: 1,
      text: 'Estudar',
      isComplete: true,
    },
  ]
})

const todoListFilterState = atom({
  key: 'todoListFilterState',
  default: 'Show All'
})

const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const filter = get(todoListFilterState)
    const list = get(todoListState)

    switch(filter) {
      case 'Show Completed':
        return list.filter((item) => item.isComplete);
      case 'Show Uncompleted':
        return list.filter((item) => !item.isComplete);
      default: 
        return list;
    }
  }
})

function TodoList() {
  const todoList = useRecoilValue(filteredTodoListState)

  return(
    <>
      {/* <TodoListStats /> */}
      <TodoListFilters />
      <TodoItemCreator />

      {todoList.map((todoItem: any) => (
        <TodoItem key={todoItem?.id} item={todoItem} />
      ))}
    </>
  )
}

export { 
  TodoList,
  todoListState,
  todoListFilterState
}