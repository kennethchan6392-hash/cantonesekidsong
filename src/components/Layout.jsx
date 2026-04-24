import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import PlayerModal from './PlayerModal'

export default function Layout() {
  return (
    <div className="flex min-h-svh flex-col">
      <a href="#main" className="skip-link">
        跳到主要內容
      </a>
      <Navbar />
      <main
        className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 pb-12 sm:py-8 md:px-6"
        id="main"
        tabIndex={-1}
      >
        <Outlet />
      </main>
      <PlayerModal />
    </div>
  )
}
