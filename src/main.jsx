import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Itemcontext from './Context/ItemContext.jsx'
import ItemContext from './Context/ItemContext.jsx'
import ChangeItemContext from './Context/ChangeItems.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ItemContext>
          <ChangeItemContext>
              <App />
          </ChangeItemContext>
        </ItemContext>
      </BrowserRouter>
  </StrictMode>,
)
