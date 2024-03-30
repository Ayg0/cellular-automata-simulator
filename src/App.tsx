import { Flip, ToastContainer } from 'react-toastify'
import './App.css'
import Playground from './components/playground'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    	<Playground/>
		<ToastContainer
			position="top-center"
			autoClose={500}
			hideProgressBar
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="dark"
			transition={Flip}
		/>
    </>
  )
}

export default App