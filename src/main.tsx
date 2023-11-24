import '@styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { MainContextProvider, FetchContextProvider, initialMainContextState } from '@contexts'


ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MainContextProvider {...initialMainContextState}>
			<FetchContextProvider>
				<App />
			</FetchContextProvider>
		</MainContextProvider>
	</React.StrictMode>,
)
