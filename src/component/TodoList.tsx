import * as React from "react"
import { FilterType, Todo } from "../state/todoAppState"
import { TodoItemContainer } from "../container/TodoItemContainer"
import _ from "lodash"
import { Typography } from "@material-ui/core"

type Props = {
  filterType: FilterType
  todoList: ReadonlyArray<Todo>
}

export const TodoList: React.FC<Props> = React.memo(
  ({ filterType, todoList }: Props) => (
    <div style={{ marginTop: "90px" }}>
      {filterType === FilterType.All &&
        todoList.map((todo, index) => (
          <TodoItemContainer todo={todo} key={index} />
        ))}
      {filterType === FilterType.Doing &&
        todoList
          .filter((todo) => !todo.done)
          .map((todo, index) => <TodoItemContainer todo={todo} key={index} />)}
      {filterType === FilterType.Complete &&
        todoList
          .filter((todo, index) => todo.done)
          .map((todo, index) => <TodoItemContainer todo={todo} key={index} />)}
      {_.isEmpty(todoList) && <Typography>タスクがありません</Typography>}
    </div>
  )
)
