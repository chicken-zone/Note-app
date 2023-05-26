// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// revalidateが成功したかをtrue|falseで返す
type Data = {
  revalidated: boolean
}

// APIのエンドポイントが呼び出されたときにrevalidateが実行中だとわかるようにconsoleを追加
// revalidatedを初期化した後にISRの処理を行う
// 個別のページにもオンデマンドでHTMLを再生成するためのAPIのエンドポイントを作成
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('Revalidating detail page...')
  //   APIのエンドポイントが呼び出された時にapi/revalidate/[id]となるように末尾のqueryを取得する
  const {
    query: { id },
  } = req
  let revalidated = false
  try {
    await res.revalidate(`/notes/${id}`)
    revalidated = true
  } catch (err) {
    console.log(err)
  }
  res.json({
    revalidated,
  })
}
