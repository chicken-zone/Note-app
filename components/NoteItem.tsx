import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { useMutateNote } from '../hooks/useMutateNote'
import { Spinner } from './Spinner'
import { Note } from '../types/types'

// NoteItemはpropsで表示したいnoteの情報を受けとる為、データ型
// useState => 現在のユーザーIDを格納
// Zustandからupdateとdeleteの関数を読み込む
// useEffect => ページがマウントされたときにsupabase.auth.useridを評価しuseStateのuseridに格納する
// deleteNoteMutationが実行中Spinnerが表示されるようにする
export const NoteItem: React.FC<
  Omit<Note, 'created_at' | 'note_id' | 'comments'>
> = ({ id, title, content, user_id }) => {
  const [userId, setUserId] = useState<string | undefined>('')
  const update = useStore((state) => state.updateEditedNote)
  const { deleteNoteMutation } = useMutateNote()
  useEffect(() => {
    setUserId(supabase.auth.user()?.id)
  }, [])
  if (deleteNoteMutation.isLoading) {
    return <Spinner />
  }
  return (
    <li className="my-3">
      {/* Linkに個別ページへ遷移するリンクを張る */}
      {/* prefetchをfalseにし対象のタイトルをホバリングしたときにprefetchが効くようにしている */}
      <Link href={`/note/${id}`} prefetch={false}>
        <a className="cursor-pointer hover:text-pink-600">{title}</a>
      </Link>
      {/* loginUserと表示しようとしているnoteのuserID一致する場合だけアイコンを表示させる */}
      {userId === user_id && (
        <div className="float-right ml-20 flex">
          <PencilAltIcon
            className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              update({
                id: id,
                title: title,
                content: content,
              })
            }}
          />
          <TrashIcon
            className="h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              deleteNoteMutation.mutate(id)
            }}
          />
        </div>
      )}
    </li>
  )
}
