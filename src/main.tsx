import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.scss'
import {HomePage} from './pages'
import store from "./store/store.ts";
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <HomePage />
        </Provider>
    </StrictMode>,
)
