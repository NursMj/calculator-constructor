import { useState } from 'react'
import SideBar from './components/SideBar'
import SwitchBar from './components/SwitchBar'
import CanvasBoard from './components/CanvasBoard'
import {Context} from './context'
import './App.scss'

const App = () => {

  const [isRuntimeActive, setRuntimeActive] = useState(false)
  const [widgets, setWidgets] = useState([
    {type: 'display', order:1, sideBar: true},
    {type: 'operators', order:2, sideBar: true},
    {type: 'digital', order:3, sideBar: true},
    {type: 'equels', order:4, sideBar: true},
  ])
  const [currentWidget, setCurrentWidget] = useState()
  const [canvasWidgets, setCanvasWidgets] = useState([])


  function dragEndHandler(e) {
    e.preventDefault()
    e.stopPropagation()
    if(e.target.classList.contains('canvas-board')) {
      if(canvasWidgets.length === 0) {
        e.target.classList.remove('green')
      } else {
        const childs = e.target.querySelectorAll('.widget-wrapper')
        childs[childs.length - 1].classList.remove('dragged-on-after')
      }
    } 
    if (e.target.classList.contains('widget-wrapper')) {
      e.target.classList.remove('dragged-on')
    }
  }

  function dragOverHandler(e) {
    e.preventDefault()
    e.stopPropagation()
    if(e.target.classList.contains('canvas-board')) {
      if (!canvasWidgets.length) {
        e.target.classList.add('green')
      } else {
        const childs = e.target.querySelectorAll('.widget-wrapper')
        childs[childs.length - 1].classList.add('dragged-on-after')
      }
    }
    if (e.target.closest('.widget-wrapper') && !e.target.closest('.widget-wrapper').classList.contains('display')) {
      e.target.closest('.widget-wrapper').classList.add('dragged-on')
      const childs = e.target.closest('div.canvas-board').querySelectorAll('.widget-wrapper')
      childs[childs.length - 1].classList.remove('dragged-on-after')
    }
  }

  function dragStartHandler(e, widget) {
    e.stopPropagation()
    setCurrentWidget(widget)

    console.log('drag', widget);
  }

  function dropHandler(e, widget) {
    e.preventDefault()
    e.stopPropagation()
    e.target.classList.remove('green')
    if (e.target.classList.contains('canvas-board') && canvasWidgets.length > 0) {
      const childs = e.target.querySelectorAll('.widget-wrapper')
      childs[childs.length - 1].classList.remove('dragged-on-after')
    }
    if (e.target.closest('.widget-wrapper')) {
      e.target.closest('.widget-wrapper').classList.remove('dragged-on')

      setCanvasWidgets(canvasWidgets.map(w => {
        if (w.type === 'display') {
          return {...w, order: 1}
        }
        if(w.type === widget.type) {
          return {...w, order: currentWidget.order}
        }
        if (w.type === currentWidget.type) {
          return {...w, order: widget.order}
        }
        return w
      }))
    
    }
    if (currentWidget.sideBar) {
      const currentIndex = widgets.indexOf(currentWidget)

      widgets[currentIndex].sideBar = false
  
      setCanvasWidgets([...canvasWidgets, {...currentWidget, order: canvasWidgets.length + 1}])
    }

    console.log('drop',widget)
  }

  return (
    <Context.Provider 
      value={{
        isRuntimeActive,
        setRuntimeActive,  
        widgets, 
        setWidgets,
        dragOverHandler,
        dragStartHandler,
        dragEndHandler,
        dropHandler,
        canvasWidgets
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
