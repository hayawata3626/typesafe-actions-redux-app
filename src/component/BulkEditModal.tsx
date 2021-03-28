import * as React from "react"
import { BulkEditModal as BulkEditModalType } from "../state/todoAppState"
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  TextField,
  Typography,
} from "@material-ui/core"
import { useCallback } from "react"
import styled from "@emotion/styled"

type Props = {
  bulkEditModal: BulkEditModalType
  onChangeTitle: (text: string) => void
  onChecked: (checked: boolean) => void
  onRequestClose: () => void
  onClickDecideButton: () => void
}

const DialogContentWrapper = styled(DialogContent)`
  width: 400px;
`

const ButtonActions = styled("div")`
  display: grid;
  grid-template-columns: 150px 150px;
  grid-column-gap: 30px;
  justify-content: center;
  margin-top: 20px;
`

export const BulkEditModal: React.FC<Props> = React.memo(
  ({
    bulkEditModal,
    onChangeTitle,
    onChecked,
    onRequestClose,
    onClickDecideButton,
  }: Props) => {
    const handleBackGroundClick = useCallback(() => {
      onRequestClose()
    }, [onRequestClose])

    const handleDialogContentClick = useCallback((e: React.ChangeEvent<{}>) => {
      e.stopPropagation()
    }, [])

    const handleTextChange = useCallback(
      (e: any) => {
        onChangeTitle(e.target.value)
      },
      [onChangeTitle]
    )

    const handleCheckBoxChecked = useCallback(
      (e: any, checked: boolean) => {
        onChecked(checked)
      },
      [onChecked]
    )

    const handleCancelButtonClick = useCallback(() => {
      onRequestClose()
    }, [onRequestClose])

    const handleDecideButtonClick = useCallback(() => {
      onClickDecideButton()
    }, [onClickDecideButton])

    return (
      <Dialog open={bulkEditModal.open} onClick={handleBackGroundClick}>
        <DialogContentWrapper onClick={handleDialogContentClick}>
          <Typography>選択した項目を一括編集します</Typography>
          <TextField
            placeholder={"タイトルを入力"}
            variant={"outlined"}
            fullWidth={true}
            onChange={handleTextChange}
          />
          <div>
            ステータスを完了状態にする
            <Checkbox
              checked={bulkEditModal.done}
              onChange={handleCheckBoxChecked}
            />
          </div>
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
              variant={"contained"}
              fullWidth={true}
              onClick={handleDecideButtonClick}
              disabled={bulkEditModal.title.length <= 0}
            >
              決定
            </Button>
          </ButtonActions>
        </DialogContentWrapper>
      </Dialog>
    )
  }
)
