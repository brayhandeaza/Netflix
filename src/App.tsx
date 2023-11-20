import '@styles/App.css'
import { LandingScreen } from '@screens'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SignUp } from '@components'

const App: React.FC = () => {

	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LandingScreen />} />
					<Route path="/login" element={<SignUp />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
