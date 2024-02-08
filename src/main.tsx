import '@styles/index.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { MainContextProvider, initialMainContextState } from '@contexts'


ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MainContextProvider {...initialMainContextState}>
			<App />
		</MainContextProvider>
	</React.StrictMode>,
)
