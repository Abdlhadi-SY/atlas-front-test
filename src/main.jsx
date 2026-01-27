import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ItemContext from './Context/ItemContext.jsx'
import ChangeItemContext from './Context/ChangeItems.jsx'
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ItemContext>
          <ChangeItemContext>
            <Toaster position="bottom-right" richColors/>
                <App />
            <Toaster/>
          </ChangeItemContext>
        </ItemContext>
      </BrowserRouter>
  </StrictMode>,
)
