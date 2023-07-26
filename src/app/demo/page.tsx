import Content from './Content'
import Header from './components/Header'

export default function Demo() {
  return (
    <main className="flex min-h-screen flex-col items-center h-full">
        <Header />
        <Content />
    </main>
  )
}