export type Comment = {
  id: string
  content: string
  created_at: string
  note_id: string
  user_id: string | undefined
}
// Noteとcommentを一対多でリレーションする為、Noteに[omments:]フィールドを作成し、 Commentが配列で入ってくるように型を指定する
export type Note = {
  id: string
  title: string
  content: string
  created_at: string
  user_id: string | undefined
  comments: Comment[]
}

export type EditedComment = Omit<Comment, 'created_at' | 'user_id' | 'note_id'>
export type EditedNote = Omit<Note, 'created_at' | 'user_id' | 'comments'>
