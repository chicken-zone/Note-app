import { useEffect, useState } from 'react'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { useMutateComment } from '../hooks/useMutateComment'
import { Spinner } from './Spinner'
import { Comment } from '../types/types'

// 表示したいコメントの内容をpropsで受け取る
// React.FC<Omit<Comment, 'created_at' | 'note_id'>>  ＝＞　コメントのタイプからcreated,noteを除いたデータをpropsで受け取る

export const CommentItem: React.FC<Omit<Comment, 'created_at' | 'note_id'>> = ({
  id,
  content,
  user_id,
}) => {
  const [userId, setUserId] = useState<string | undefined>('')
  const update = useStore((state) => state.updateEditedComment)
  const { deleteCommentMutation } = useMutateComment()
  useEffect(() => {
    setUserId(supabase.auth.user()?.id)
  }, [])
  if (deleteCommentMutation.isLoading) {
    return <Spinner />
  }
  return (
    <li className="my-3">
      <span>{content}</span>
      {/* LoginUserとコメントの表示しているuserIdが一致する場合のみ下記を表示 */}
      {userId === user_id && (
        <div className="float-right ml-20 flex">
          <PencilAltIcon
            className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              update({
                id: id,
                content: content,
              })
            }}
          />
          <TrashIcon
            className="h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              deleteCommentMutation.mutate(id)
            }}
          />
        </div>
      )}
    </li>
  )
}
