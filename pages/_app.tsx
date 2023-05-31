import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabase'

// React queryのClient作成
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

//

function MyApp({ Component, pageProps }: AppProps) {
  // supabaseの認証関係の処理
  // ログインが成功した時の遷移先はnotes
  const { push, pathname } = useRouter()

  const validateSession = async () => {
    const user = supabase.auth.user()
    if (user && pathname === '/') {
      push('/notes')
    } else if (!user && pathname !== '/') {
      await push('/')
    }
  }

  // userのセッションを監視する処理
  supabase.auth.onAuthStateChange((event, _) => {
    if (event === 'SIGNED_IN' && pathname === '/') {
      push('/notes')
    }
    if (event === 'SIGNED_OUT') {
      push('/')
    }
  })
  useEffect(() => {
    validateSession()
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
