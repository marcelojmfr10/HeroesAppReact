import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { HeroesApp } from './HeroesApp'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroesApp />
  </StrictMode>,
)
