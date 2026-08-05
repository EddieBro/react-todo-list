import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from '@/core/app/App.tsx'
import '@/core/app/styles/index.scss'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
)
