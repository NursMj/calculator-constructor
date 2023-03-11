import { useState } from 'react'
import SideBar from './components/SideBar'
import SwitchBar from './components/SwitchBar'
import CanvasBoard from './components/CanvasBoard'
import {Context} from './context'
import './App.scss'


const App = () => {

  const [isRuntimeActive, setRuntimeActive] = useState(false)
  const [widgets, setWidgets] = useState([
    {type: 'display', sideBar: true},
    {type: 'operators', sideBar: true},
    {type: 'digital', sideBar: true},
    {type: 'equels', sideBar: true},
  ])
  const [currentWidget, setCurrentWidget] = useState()
  const [canvasWidgets, setCanvasWidgets] = useState([])

  
  function dragEnterHandler(e) {
    e.preventDefault()
    e.stopPropagation()
    if(e.target.classList.contains('canvas-board')) {
      e.target.classList.add('green')
    }
  }

  function dragLeaveHandler(e) {
    e.preventDefault()
    e.stopPropagation()
    if(e.target.classList.contains('canvas-board')) {
      e.target.classList.remove('green')
    }
  }

  function dragOverHandler(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  function dragStartHandler(e, widget) {
    e.stopPropagation()
    setCurrentWidget(widget)
  }

  function dragEndHandler(e) {

  }

  function dropHandler(e) {
    e.preventDefault()
    e.stopPropagation()

    const currentIndex = widgets.indexOf(currentWidget)

    widgets[currentIndex].sideBar = false

    setCanvasWidgets([...canvasWidgets, currentWidget])

    console.log(currentWidget);
    console.log('canvas', canvasWidgets);
    console.log('widgets', widgets);
  }

  return (
    <Context.Provider 
      value={{
        isRuntimeActive,
        setRuntimeActive,  
        widgets, 
        setWidgets,
        dragEnterHandler,
        dragLeaveHandler,
        dragOverHandler,
        dragStartHandler,
        dragEndHandler,
        dropHandler
        }}>
        <div className="app">
          <div className="app__content">
            <div className='switch-bar_wrapper'>
              <SwitchBar/>
            </div>
            <SideBar />
            <CanvasBoard />
          </div>
      </div>
    </Context.Provider>
  )
}

export default App
