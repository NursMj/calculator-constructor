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

let calcState = {
  a: '',
  b: '',
  operator: '',
  finish: false,
}

function cutLongNumber(num) {
  if (num.toString().length > 17) {
    num = Number(num.toPrecision(15));
  }

  return num
}

let currentWidget

const App = () => {
  const [isRuntimeActive, setRuntimeActive] = useState(false)
  const [widgets, setWidgets] = useState([
    {id: 1,type: 'display', sideBar: true},
    {id: 2,type: 'operators', sideBar: true},
    {id: 3,type: 'digital', sideBar: true},
    {id: 4,type: 'equels', sideBar: true},
  ])
  const [canvasWidgets, setCanvasWidgets] = useState([])
  const [display, setDisplay] = useState('0')

  function resetCalc() {
    setDisplay('0')
    calcState = {
      a: '',
      b: '',
      operator: '',
      finish: false,
    }
  }


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
    currentWidget = widget
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

      if (e.target.closest('.widget-wrapper').classList.contains('display')) {
        return
      } else {
        setCanvasWidgets(canvasWidgets.map(w => {
          if(w.type === widget.type) {
            return {...w, order: currentWidget.order}
          }
          if (w.type === currentWidget.type) {
            return {...w, order: widget.order}
          }
          return w
        }))
      }
    
    }
    if (currentWidget.sideBar) {
      const currentIndex = widgets.indexOf(currentWidget)

      setWidgets(widgets.map((w, i) => {
        if (i === currentIndex) {
          w.sideBar = false
        }
        return w
      }))
  
      if (currentWidget.type === 'display') {
        const newCanvasWidgets = canvasWidgets.map(w => ({ ...w, order: w.order + 1 }))
        newCanvasWidgets.unshift({ ...currentWidget, order: 1 })

        setCanvasWidgets(newCanvasWidgets)
      } else {
        setCanvasWidgets([...canvasWidgets, {...currentWidget, order: canvasWidgets.length + 1}])
      }
    }
  }

  function doubleClickHandler(widget) {
    if (isRuntimeActive) return

    let deletedWidgetIndex

    setCanvasWidgets(canvasWidgets.map((w, i) => {
      if (w.id === widget.id) {
        deletedWidgetIndex = i
        return null
      } else if (i > deletedWidgetIndex) {
        return {...w, order: w.order - 1}
      } else {
        return w
      }
    }).filter(Boolean))
    setWidgets(widgets.map(w => w.id === widget.id ? ({...w, sideBar: true}): w))
  }

  function clickHandler(e) {
    if (!isRuntimeActive) return
    if (!e.target.closest('.button')) return

    // get clicked btn
    const key = e.target.textContent

    if (buttons.digitalBtns.includes(key)) {
      if (calcState.b === '' && calcState.operator === '') {
        if (key === '.' && calcState.a.includes('.')) return

        calcState.a += key
        setDisplay(calcState.a)
      } else if (calcState.a !== '' && calcState.b !== '' && calcState.finish) {
        calcState.b = key
        calcState.finish = false
        setDisplay(calcState.b)
      } else {
        if (key === '.' && calcState.b.includes('.')) return

        calcState.b  += key
        setDisplay(calcState.b)
      }
      return
    } 

    if (buttons.operatorBtns.includes(key)) {
      calcState.operator = key
      return
    }

    if (buttons.equelsBtn.includes(key)) {
      let a = calcState.a
      let b = calcState.b
      if (b === '') b = a
      switch (calcState.operator) {
        case "+":
          calcState.a = cutLongNumber((+a) + (+b))
          break
        case "-":
          calcState.a = cutLongNumber((+a) - (+b))
          break
        case "x":
          calcState.a = cutLongNumber((+a) * (+b))
          break
        case "/":
          if (b === '0') {
            calcState.a = '0'
            calcState.b = ''
            calcState.operator = ''
            setDisplay('Не определено')
            return
          }
          calcState.a = cutLongNumber((+a) / (+b))
          break
        default:
          console.log(calcState)
      }
      calcState.finish = true
      setDisplay(calcState.a)
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
        display,
        clickHandler,
        doubleClickHandler,
        resetCalc
        }}>
        <div className="app">
          <div className="app__content">
            <div className='switch-bar_wrapper'>
              <SwitchBar/>
            </div>
            <SideBar />
            <CanvasBoard />
            <div className='description'>
              <h3 className='description__title'>Описание</h3>
              <p className="description__text">
                Это небольшое веб приложение, в котором вы можете сконструировать калькулятор. <br /> <br /> 
                Можно переключатся между режимом конструктора и runtime <br /> <br /> 
                В режиме конструктора можно собирать интерфейс, перетаскивая компоненты с левой панели на холст, но при нажатии на кнопки, они ничего не делают. При двойном нажатии мыши на компонент, дабавленный на холст, он удаляется от туда. Так же можно ранжировать компонеты на холсте, перетаскивая их, кроме дисплея, он всегда становится в начало. (Режим конструктора не одаптирован под мобильные устройства) 
                <br /> <br /> В режиме runtime перетаскивать ничего нельзя, полностью скрывается левая панель, но работает калькулятор. Нажимаем на кнопки и видим результат на дисплее.
              </p>
            </div>
          </div>

      </div>
    </Context.Provider>
  )
}

export default App
