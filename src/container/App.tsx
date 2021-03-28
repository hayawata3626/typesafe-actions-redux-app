import React, { useCallback, useEffect } from "react"
import { TodoList } from "../component/TodoList"
import { useDispatch, useSelector } from "react-redux"
import {
  bulkEditModalSelector,
  errorSnackBarSelector,
  loadingSelector,
  openAddTodoModalSelector,
  selectedTodoIdsSelector,
  taskFilterSelector,
  todoListSelector,
} from "../selector"
import _ from "lodash"
import AppBar from "@material-ui/core/AppBar"
import { Button, Fab, Toolbar } from "@material-ui/core"
import { BulkEditModal } from "../component/BulkEditModal"
import {
  changeTaskFilter,
  changeTitleOfBulkEditModal,
  checkedChangeOfBulkEditModal,
  closeAddTodoModal,
  closeBulkEditModal,
  decideBulkModal,
  loadInitialData,
  openAddTodoModal,
  openBulkEditModal,
} from "../reducer"
import { ErrorSnackBar } from "../component/ErrorSnackBar"
import AddIcon from "@material-ui/icons/Add"
import EditIcon from "@material-ui/icons/Edit"
import { AddTodoModal } from "../component/AddTodoModal"
import { changeTitleOfAddTodoModal } from "../reducer/changeTitleOfAddTodoModal"
import { decideAddTodo } from "../reducer/decideAddTodo"
import { FilterType } from "../state/todoAppState"
import { Loading } from "../component/Loading"

export const App: React.FC = React.memo(() => {
  const dispatch = useDispatch()
  const todoList = useSelector(todoListSelector)
  const loading = useSelector(loadingSelector)
  const selectedTodoIds = useSelector(selectedTodoIdsSelector)
  const bulkEditModal = useSelector(bulkEditModalSelector)
  const errorSnackBar = useSelector(errorSnackBarSelector)
  const addTodoModal = useSelector(openAddTodoModalSelector)
  const filterType = useSelector(taskFilterSelector)

  useEffect(() => {
    ;(async () => {
      await dispatch(loadInitialData())
    })()
  }, [dispatch])

  const handleBulkEditButtonClick = useCallback(() => {
    dispatch(openBulkEditModal())
  }, [dispatch])

  const handleCloseButtonClick = useCallback(() => {
    dispatch(closeBulkEditModal())
  }, [dispatch])

  const handleTitleChange = useCallback(
    (text) => {
      dispatch(changeTitleOfBulkEditModal({ text: text }))
    },
    [dispatch]
  )

  const handleCheckedChange = useCallback(
    (checked) => {
      dispatch(checkedChangeOfBulkEditModal({ checked: checked }))
    },
    [dispatch]
  )

  const handleDecide = useCallback(() => {
    dispatch(decideBulkModal())
  }, [dispatch])

  const handleAddTodoModalDecideButtonClick = useCallback(() => {
    dispatch(decideAddTodo())
  }, [dispatch])

  const handleAddTodoModalRequestClose = useCallback(() => {
    dispatch(closeAddTodoModal())
  }, [dispatch])

  const addTodoButtonClick = useCallback(() => {
    dispatch(openAddTodoModal())
  }, [dispatch])

  const handleTitleOfAddTodoModalChange = useCallback(
    (title: string) => {
      dispatch(changeTitleOfAddTodoModal({ title }))
    },
    [dispatch]
  )

  const handleChangeTaskFilter = useCallback(
    (e) => {
      dispatch(changeTaskFilter({ filterType: e.target.textContent }))
    },
    [dispatch]
  )

  return (
    <div className="App">
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: "fixed", bottom: "10px", right: "20px" }}
      >
        <AddIcon onClick={addTodoButtonClick} />
      </Fab>
      <Fab
        color="secondary"
        style={{
          position: "fixed",
          bottom: "80px",
          right: "20px",
        }}
        disabled={selectedTodoIds.length === 0}
      >
        <EditIcon color="inherit" onClick={handleBulkEditButtonClick}>
          一括編集
        </EditIcon>
      </Fab>
      {loading ? (
        <Loading />
      ) : (
        <>
          <AppBar position="sticky">
            <Toolbar>
              <div style={{ display: "flex", margin: "0 auto" }}>
                <Button
                  onClick={handleChangeTaskFilter}
                  value={FilterType.All}
                  style={{ color: getColor(filterType, FilterType.All) }}
                >
                  {FilterType.All}
                </Button>
                <Button
                  onClick={handleChangeTaskFilter}
                  value={FilterType.Doing}
                  style={{ color: getColor(filterType, FilterType.Doing) }}
                >
                  {FilterType.Doing}
                </Button>
                <Button
                  onClick={handleChangeTaskFilter}
                  value={FilterType.Complete}
                  style={{ color: getColor(filterType, FilterType.Complete) }}
                >
                  {FilterType.Complete}
                </Button>
              </div>
            </Toolbar>
          </AppBar>
          <TodoList
            filterType={filterType}
            todoList={_.toArray(todoList.byId)}
          />
          <BulkEditModal
            bulkEditModal={bulkEditModal}
            onChangeTitle={handleTitleChange}
            onChecked={handleCheckedChange}
            onRequestClose={handleCloseButtonClick}
            onClickDecideButton={handleDecide}
          />
          <AddTodoModal
            open={addTodoModal.open}
            title={addTodoModal.title}
            onTitleChange={handleTitleOfAddTodoModalChange}
            onClickDecideButton={handleAddTodoModalDecideButtonClick}
            onRequestClose={handleAddTodoModalRequestClose}
          />
          <ErrorSnackBar
            open={errorSnackBar.open}
            message={errorSnackBar.message}
          />
        </>
      )}
    </div>
  )
})

const getColor = (selectedType: FilterType, filterType: FilterType) =>
  selectedType === filterType ? "yellow" : "white"
