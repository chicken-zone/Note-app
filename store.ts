import create from 'zustand/react'
import { EditedNote, EditedComment } from './types/types'

// stateのデータ型と更新用関数の型を指定
type State = {
  editedNote: EditedNote
  editedComment: EditedComment
  updateEditedNote: (payload: EditedNote) => void
  updateEditedComment: (payload: EditedComment) => void
  resetEditedNote: () => void
  resetEditedComment: () => void
}

// zustandのcreateを使ったstateの管理と更新用関数の定義
const useStore = create<State>((set, _) => ({
  // 管理したいstateを定義して初期値を設定
  editedNote: { id: '', title: '', content: '' },
  editedComment: { id: '', content: '' },
  //   更新処理
  updateEditedNote: (payload) =>
    set({
      editedNote: {
        id: payload.id,
        title: payload.title,
        content: payload.content,
      },
    }),
  // 値をリセットする処理
  resetEditedNote: () =>
    set({ editedNote: { id: '', title: '', content: '' } }),
  updateEditedComment: (payload) =>
    set({
      editedComment: {
        id: payload.id,
        content: payload.content,
      },
    }),
  resetEditedComment: () => set({ editedComment: { id: '', content: '' } }),
}))

export default useStore
