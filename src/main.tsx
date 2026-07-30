import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './core/app/App.tsx'
import './core/app/styles/index.scss'

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
)