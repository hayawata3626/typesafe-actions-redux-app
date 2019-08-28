import { reducerWithInitialState } from "typescript-fsa-reducers"
import { todoAppActions } from "../actions/todoAppActions"
import { changeTaskTitleReducer } from "../reducer/changeTaskTitle"
import { changeSelect } from "../reducer/changeSelect"
import { openBulkEditModalReducer } from "../reducer/openBulkEditModal"
import { closeBulkEditModalReducer } from "../reducer/closeBulkEditModal"

export type Todo = Readonly<{
  id: number
  title: string
  done: boolean
  selected: boolean
}>

export type TodoById = Readonly<{
  [Key: number]: Todo
}>

export type BulkEditModal = Readonly<{
  open: boolean
  title: string
  done: boolean
}>

export type TodoAppState = Readonly<{
  todoList: {
    byId: TodoById
    allIds: ReadonlyArray<number>
  }
  selectedTodoIds: ReadonlyArray<number>
  bulkEditModal: BulkEditModal
}>

export const initialState: TodoAppState = {
  todoList: {
    byId: {
      1: {
        id: 1,
        title: "ラーメン食べる",
        selected: false,
        done: false
      },
      2: {
        id: 2,
        title: "髪を切る",
        selected: false,
        done: false
      }
    },
    allIds: [1, 2]
  },
  selectedTodoIds: [],
  bulkEditModal: {
    open: false,
    title: "",
    done: false
  }
}

export const todoReducer = reducerWithInitialState(initialState)
  .case(todoAppActions.changeTodoTitle, changeTaskTitleReducer)
  .case(todoAppActions.changeSelect, changeSelect)
  .case(todoAppActions.openBulkEditModal, openBulkEditModalReducer)
  .case(todoAppActions.closeBulkEditModal, closeBulkEditModalReducer)
