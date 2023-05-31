// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// revalidateが成功したかをtrue|falseで返す
type Data = {
  revalidated: boolean
}
type Msg = {
  message: string
}

// APIのエンドポイントが呼び出されたときにrevalidateが実行中だとわかるようにconsoleを追加
// revalidatedを初期化した後にISRの処理を行う
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Msg>
) {
  console.log('Revalidating notes page...')
  // APIのエンドポイントで誰でもアクセス出来る為、シークレットキーを使って、
  // 正規のリクエストの時だけ、ISRを実行させる
  // process.env.REVALIDATE_SECRET　⇒　リクエスト時に特殊なシークレットキーを含んでるリクエストだけ受け付ける処理
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Your secret is invalid !' })
  }
  let revalidated = false
  try {
    await res.revalidate('/notes')
    revalidated = true
  } catch (err) {
    console.log(err)
  }
  res.json({
    revalidated,
  })
}
