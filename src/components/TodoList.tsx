import { 
  atom, 
  useRecoilValue 
} from "recoil"
import { TodoItem } from "./TodoItem"
import { TodoItemCreator } from "./TodoItemCreator"

const todoListState = atom<any[]>({
  key: 'todoListState',
  default: []
})

function TodoList() {
  const todoList = useRecoilValue(todoListState)

  return(
    <>
      {/* <TodoListStats /> */}
      {/* <TodoListFilters /> */}
      <TodoItemCreator />

      {todoList.map((todoItem: any) => (
        <TodoItem key={todoItem?.id} item={todoItem} />
      ))}
    </>
  )
}

export { 
  TodoList,
  todoListState
}