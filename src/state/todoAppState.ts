export enum FilterType {
  All = "All",
  Doing = "Doing",
  Complete = "Complete",
}

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

export type AddTodoModal = Readonly<{
  title: string
  open: boolean
}>

export type ErrorSnackBar = Readonly<{
  open: boolean
  message: string
}>

export type TodoAppState = Readonly<{
  todoList: {
    byId: TodoById
    allIds: ReadonlyArray<number>
  }
  selectedTodoIds: ReadonlyArray<number>
  filterType: FilterType
  bulkEditModal: BulkEditModal
  addTodoModal: AddTodoModal
  errorSnackBar: Readonly<ErrorSnackBar>
  loading: boolean
}>

export const initialState: TodoAppState = {
  todoList: {
    byId: {},
    allIds: [],
  },
  selectedTodoIds: [],
  filterType: FilterType.All,
  bulkEditModal: {
    open: false,
    title: "",
    done: false,
  },
  addTodoModal: {
    open: false,
    title: "",
  },
  errorSnackBar: {
    open: false,
    message: "",
  },
  loading: false,
}
