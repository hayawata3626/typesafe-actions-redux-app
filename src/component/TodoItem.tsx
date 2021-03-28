import * as React from "react"
import { Todo } from "../state/todoAppState"
import { TextField, Checkbox, Box } from "@material-ui/core"
import { useCallback } from "react"
import HighlightOffIcon from "@material-ui/icons/HighlightOff"
import styled from "@emotion/styled"

type Props = {
  todo: Todo
  onChangeTitle: (id: number, text: string) => void
  onCheckedChange: (id: number, selected: boolean) => void
  onItemSelect: (id: number, selected: boolean) => void
  onDeleteIconClick: (id: number) => void
}

const ItemWrapper = styled(Box)<{ selected: boolean }>`
  margin: 0 auto 20px auto;
  width: 600px;
  padding: 10px;
  border: ${(props) => (props.selected ? "2px solid blue" : "none")};
  display: flex;
  align-items: center;
`

const RemoveButton = styled(HighlightOffIcon)`
  margin-left: 10px;
  cursor: pointer;
`

export const TodoItem: React.FC<Props> = React.memo(
  ({
    todo,
    onChangeTitle,
    onCheckedChange,
    onDeleteIconClick,
    onItemSelect,
  }: Props) => {
    const handleTitleChange = useCallback(
      (e: any) => {
        onChangeTitle(todo.id, e.target!.value)
      },
      [todo, onChangeTitle]
    )

    const handleCheckedChange = useCallback(
      (e: React.ChangeEvent<{}>, checked: boolean) => {
        onCheckedChange(todo.id, checked)
      },
      [todo, onCheckedChange]
    )

    const handleItemSelect = useCallback(() => {
      onItemSelect(todo.id, !todo.selected)
    }, [onItemSelect, todo.id, todo.selected])

    const handleDeleteIconClick = useCallback(
      (e: React.ChangeEvent<{}>) => {
        e.stopPropagation()
        onDeleteIconClick(todo.id)
      },
      [onDeleteIconClick, todo.id]
    )

    return (
      <ItemWrapper
        data-testid="todo"
        selected={todo.selected}
        boxShadow={3}
        onClick={handleItemSelect}
      >
        <Checkbox checked={todo.done} onChange={handleCheckedChange} />
        <TextField
          type={"text"}
          value={todo.title}
          variant={"outlined"}
          fullWidth={true}
          onChange={handleTitleChange}
        />
        <RemoveButton color={"primary"} onClick={handleDeleteIconClick} />
      </ItemWrapper>
    )
  }
)
