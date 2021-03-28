import * as React from "react"
import { Button, Dialog, DialogContent, TextField } from "@material-ui/core"
import { useCallback } from "react"
import styled from "@emotion/styled"

type Props = {
  open: boolean
  title: string

  onTitleChange: (title: string) => void
  onClickDecideButton: () => void
  onRequestClose: () => void
}

const DialogContentWrapper = styled(DialogContent)`
  width: 400px;
  padding: 30px;
`

const ButtonActions = styled("div")`
  display: grid;
  grid-template-columns: 150px 150px;
  grid-column-gap: 30px;
  justify-content: center;
  margin-top: 20px;
`

export const AddTodoModal: React.FC<Props> = React.memo(
  ({
    open,
    title,
    onTitleChange,
    onClickDecideButton,
    onRequestClose,
  }: Props) => {
    const handleDecideButtonClick = useCallback(() => {
      onClickDecideButton()
    }, [onClickDecideButton])

    const handleBackGroundClick = useCallback(() => {
      onRequestClose()
    }, [onRequestClose])

    const handleDialogContentClick = useCallback((e) => {
      e.stopPropagation()
    }, [])

    const handleTextChange = useCallback(
      (e) => {
        onTitleChange(e.target.value)
      },
      [onTitleChange]
    )

    const handleCancelButtonClick = useCallback(() => {
      onRequestClose()
    }, [onRequestClose])

    return (
      <Dialog open={open} onClick={handleBackGroundClick}>
        <DialogContentWrapper onClick={handleDialogContentClick}>
          <TextField
            placeholder={"タイトルを入力"}
            value={title}
            onChange={handleTextChange}
            variant={"outlined"}
            fullWidth={true}
          />
          <ButtonActions>
            <Button
              color={"secondary"}
              onClick={handleCancelButtonClick}
              variant={"contained"}
            >
              キャンセル
            </Button>
            <Button
              color={"primary"}
              onClick={handleDecideButtonClick}
              variant={"contained"}
              disabled={title.length <= 0}
            >
              決定
            </Button>
          </ButtonActions>
        </DialogContentWrapper>
      </Dialog>
    )
  }
)
