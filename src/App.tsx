import '@styles/App.scss'
import { LandingScreen, HomeScreen, NotFound } from '@screens'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useContext } from 'react'
import { MainContext, MainContextType } from './contexts/MainContext'
import { Login, Player } from '@components'


const App: React.FC = () => {
	const { isAuthenticated }: MainContextType = useContext<any>(MainContext)


	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					{isAuthenticated ? (
						<Route>
							<Route path="/" element={<HomeScreen />} />
							<Route path="/watch/:movieId/:title" element={<Player />} />
						</Route>
					) : (
						<Route>
							<Route path="/" element={<LandingScreen />} />
							<Route path="/login" element={<Login />} />
						</Route>
					)}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
