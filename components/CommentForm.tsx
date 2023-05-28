import { FormEvent } from 'react'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { useMutateComment } from '../hooks/useMutateComment'
import { Spinner } from './Spinner'

// CommentForm: React.FC<{ noteId: string }> => propsでコメントに紐づいているノートのIDを受け取れるようにしておく

export const CommentForm: React.FC<{ noteId: string }> = ({ noteId }) => {
  const { editedComment } = useStore()
  const update = useStore((state) => state.updateEditedComment)
  const { createCommentMutation, updateCommentMutation } = useMutateComment()
  //   userがコメントに対するcreateのボタンをクリックした時に実行される関数
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // コメントに対するedeitedComment.idが空だった場合は、cretateMutationを実行
    // それ以外だった場合は、updateを実行
    if (editedComment.id === '') {
      createCommentMutation.mutate({
        content: editedComment.content,
        user_id: supabase.auth.user()?.id,
        note_id: noteId,
      })
    } else {
      updateCommentMutation.mutate({
        id: editedComment.id,
        content: editedComment.content,
      })
    }
  }
  if (updateCommentMutation.isLoading || createCommentMutation.isLoading) {
    return <Spinner />
  }
  return (
    <form onSubmit={submitHandler}>
      {/* userがタイピングするとzustandからupdate関数が呼び出されcontentの内容を書き換える */}
      <input
        type="text"
        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
        placeholder="new comment"
        value={editedComment.content}
        onChange={(e) => update({ ...editedComment, content: e.target.value })}
      />
      <button
        type="submit"
        className="ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        {editedComment.id ? 'Update' : 'Send'}
      </button>
    </form>
  )
}
