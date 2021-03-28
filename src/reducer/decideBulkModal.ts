import {
  BulkEditModal,
  Todo,
  TodoAppState,
  TodoById,
} from "../state/todoAppState"
import _ from "lodash"
import { fromArrayToObject } from "../util/fromArrayToObject"
import produce, { Draft } from "immer"
import { deprecated } from "typesafe-actions"
const { createStandardAction } = deprecated

export const decideBulkModal = createStandardAction("decideBulkModal")()

export const decideBulkModalReducer = (state: TodoAppState): TodoAppState =>
  produce(state, (draftState: Draft<TodoAppState>) => {
    draftState.todoList.byId = changeSelectedTodo(
      draftState.selectedTodoIds,
      _.toArray(draftState.todoList.byId),
      draftState.bulkEditModal
    )

    draftState.bulkEditModal = {
      ...draftState.bulkEditModal,
      open: false,
      title: "",
      done: false,
    }
  })

const changeSelectedTodo = (
  selectedIds: ReadonlyArray<number>,
  todoList: ReadonlyArray<Todo>,
  bulkEditModal: BulkEditModal
): Readonly<TodoById> =>
  fromArrayToObject(
    _.map(todoList, (todo: Todo) =>
      _.includes(selectedIds, todo.id)
        ? {
            ...todo,
            title: bulkEditModal.title,
            selected: false,
            done: bulkEditModal.done ? true : todo.done,
          }
        : todo
    )
  )
