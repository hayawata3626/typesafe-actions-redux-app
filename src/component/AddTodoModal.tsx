import * as React from "react"
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  TextField,
  Typography
} from "@material-ui/core"
import { useCallback } from "react"

type Props = {
  open: boolean
  title: string

  onTitleChange: (title: string) => void
  onClickDecideButton: () => void
  onRequestClose: () => void
}
export const AddTodoModal = ({
  open,
  title,
  onTitleChange,
  onClickDecideButton,
  onRequestClose
}: Props) => {
  const handleDecideButtonClick = useCallback(() => {
    onClickDecideButton()
  }, [])

  const handleBackGroundClick = useCallback(() => {
    onRequestClose()
  }, [])

  const handleDialogContentClick = useCallback(e => {
    e.stopPropagation()
  }, [])

  const handleTextChange = useCallback(e => {
    onTitleChange(e.target.value)
  }, [])

  const handleCancelButtonClick = useCallback(() => {
    onRequestClose()
  }, [])

  return (
    <Dialog open={open} onClick={handleBackGroundClick}>
      <DialogContent onClick={handleDialogContentClick}>
        <TextField
          placeholder={"タイトルをクリック"}
          value={title}
          onChange={handleTextChange}
        />
        <Button color={"primary"} onClick={handleDecideButtonClick}>
          決定
        </Button>
        <Button color={"secondary"} onClick={handleCancelButtonClick}>
          キャンセル
        </Button>
      </DialogContent>
    </Dialog>
  )
}
