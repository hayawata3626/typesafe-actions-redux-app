import { storiesOf } from "@storybook/react"
import React from "react"
import { TodoList } from "../component/TodoList"
import { FilterType } from "../state/todoAppState"
import { Provider } from "react-redux"
import { store } from "../store"
import { TodoItemFactory } from "../factory"

storiesOf("TodoList", module)
  .addDecorator((story) => <Provider store={store}>{story()}</Provider>)
  .add("通常", () => {
    const taskList = TodoItemFactory.buildList(2)
    return <TodoList todoList={taskList} filterType={FilterType.Doing} />
  })
