import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import songsData from './data/songs.json'
import { PlayerProvider } from './context/PlayerProvider'
import Layout from './components/Layout'
import Home from './pages/Home'
import Songs from './pages/Songs'
import { getRouterBasename } from './lib/routerBasename'

function App() {
  return (
    <BrowserRouter basename={getRouterBasename()}>
      <PlayerProvider songs={songsData}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="songs" element={<Songs />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </PlayerProvider>
    </BrowserRouter>
  )
}

export default App
