import { useCallback, useMemo, useState } from 'react'
import { PlayerContext } from './PlayerContext.js'

export function PlayerProvider({ children, songs: allSongs = [] }) {
  const [state, setState] = useState({ open: false, playlist: [], index: 0 })

  const openAtIndex = useCallback((playlist, index) => {
    if (!playlist?.length) return
    setState({
      open: true,
      playlist,
      index: Math.min(Math.max(0, index), playlist.length - 1),
    })
  }, [])

  const next = useCallback(() => {
    setState((s) => {
      if (!s.open || s.playlist.length < 2) return s
      return { ...s, index: (s.index + 1) % s.playlist.length }
    })
  }, [])

  const previous = useCallback(() => {
    setState((s) => {
      if (!s.open || s.playlist.length < 2) return s
      return { ...s, index: (s.index - 1 + s.playlist.length) % s.playlist.length }
    })
  }, [])

  const close = useCallback(() => {
    setState((s) => ({ ...s, open: false }))
  }, [])

  const value = useMemo(
    () => ({
      allSongs,
      isOpen: state.open,
      playlist: state.playlist,
      currentSong: state.open ? state.playlist[state.index] : null,
      currentIndex: state.index,
      openAtIndex,
      next,
      previous,
      close,
    }),
    [allSongs, state, openAtIndex, next, previous, close],
  )

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}
