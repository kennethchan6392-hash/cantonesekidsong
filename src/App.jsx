import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import songsData from './data/songs.json'
import { PlayerProvider } from './context/PlayerProvider'
import Layout from './components/Layout'
import Home from './pages/Home'
import Songs from './pages/Songs'

function App() {
  return (
    <HashRouter>
      <PlayerProvider songs={songsData}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="songs" element={<Songs />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </PlayerProvider>
    </HashRouter>
  )
}

export default App
