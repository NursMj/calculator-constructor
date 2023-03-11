import SideBar from './components/SideBar'
import SwitchBar from './components/SwitchBar'
import CanvasBoard from './components/CanvasBoard'
import './App.scss'

const App = () => {

  return (
    <div className="app">
      <div className="app__content">
        <div className='switch-bar_wrapper'>
          <SwitchBar/>
        </div>
        <SideBar />
        <CanvasBoard />
      </div>
    </div>
  )
}

export default App
