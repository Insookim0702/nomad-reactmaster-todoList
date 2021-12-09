import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ThemeProvider } from 'styled-components'
import { darkMode, lightMode } from './theme'
import { RecoilRoot } from 'recoil'

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <ThemeProvider theme={darkMode}>
                <App />
            </ThemeProvider>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root')
)
