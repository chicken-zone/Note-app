// APIのエンドポイントにフェッチを行う関数
export const revalidateList = () => {
  fetch('/api/revalidate')
}
// 引数で受け取ったIDをフェッチしパラメーターとして渡す関数
export const revalidateSingle = (id: string) => {
  fetch(`/api/revalidate/${id}`)
}
