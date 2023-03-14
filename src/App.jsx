import { useState } from 'react'
import SideBar from './components/SideBar'
import SwitchBar from './components/SwitchBar'
import CanvasBoard from './components/CanvasBoard'
import {Context} from './context'
import './App.scss'

const buttons = {
  operatorBtns:['/', 'x', '-', '+'],
  digitalBtns:['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'],
  equelsBtn:['='],
}

const App = () => {
  const [isRuntimeActive, setRuntimeActive] = useState(false)
  const [widgets, setWidgets] = useState([
    {id: 1,type: 'display', sideBar: true},
    {id: 2,type: 'operators', sideBar: true},
    {id: 3,type: 'digital', sideBar: true},
    {id: 4,type: 'equels', sideBar: true},
  ])
  const [currentWidget, setCurrentWidget] = useState()
  const [canvasWidgets, setCanvasWidgets] = useState([])
  const [calcState, setCalcState] = useState({
      finish: false,
      a: '',
      b: '',
      operator: '',
      display: '0',
  })

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
  }

  function doubleClickHandler(widget) {
    if (isRuntimeActive) return
 
    setCanvasWidgets(canvasWidgets.filter(w => w.id !== widget.id))
    setWidgets(widgets.map(w => w.id === widget.id ? ({...w, sideBar: true}): w))
  }

  function clickHandler(e) {
    if (!isRuntimeActive) return
    if (!e.target.closest('.button')) return

    // get clicked btn
    const key = e.target.textContent

    if (buttons.digitalBtns.includes(key)) {
      if (calcState.b === '' && calcState.operator === '') {
        setCalcState(prev => {return {...prev, a: prev.a + key}})
        setCalcState(prev => {return {...prev, display: prev.a}})
      } else if (calcState.a !== '' && calcState.b !== '' && calcState.finish) {
        // setCalcState(prev => {return {...prev, b: prev.b + key}})

      } else {
        setCalcState(prev => {return {...prev, b: prev.b + key}})
        setCalcState(prev => {return {...prev, display: prev.b}})
      }
      return
    } 

    if (buttons.operatorBtns.includes(key)) {
      setCalcState({...calcState, operator: key})
      return
    }

    if (buttons.equelsBtn.includes(key)) {
      let a = calcState.a
      let b = calcState.b
      switch (calcState.operator) {
        case "+":
          setCalcState(prev => {return {...prev, a: (+a) + (+b)}})
          break
        case "-":
          setCalcState(prev => {return {...prev, a: (+a) - (+b)}})
          break
        case "x":
          setCalcState(prev => {return {...prev, a: (+a) * (+b)}})
          break
        case "/":
          setCalcState(prev => {return {...prev, a: (+a) / (+b)}})
          break
      }
      setCalcState(prev => {return {...prev, finish: true, display: prev.a}})
    }
  }

  return (
    <Context.Provider 
      value={{
        buttons,
        isRuntimeActive,
        setRuntimeActive,  
        widgets, 
        setWidgets,
        dragOverHandler,
        dragStartHandler,
        dragEndHandler,
        dropHandler,
        canvasWidgets,
        dislay: calcState.display,
        clickHandler,
        doubleClickHandler
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
