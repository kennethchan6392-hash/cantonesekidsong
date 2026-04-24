import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { err: null }
  }

  static getDerivedStateFromError(err) {
    return { err }
  }

  render() {
    if (this.state.err) {
      return (
        <div
          role="alert"
          style={{
            padding: '2rem',
            fontFamily: 'system-ui, sans-serif',
            maxWidth: '40rem',
            margin: '0 auto',
          }}
        >
          <h1 style={{ fontSize: '1.25rem' }}>網頁遇到錯誤</h1>
          <pre
            style={{
              marginTop: '1rem',
              padding: '1rem',
              background: '#fee',
              overflow: 'auto',
              fontSize: '0.875rem',
            }}
          >
            {String(this.state.err)}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
