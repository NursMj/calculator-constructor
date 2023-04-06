import { useContext } from 'react'
import {useSelector} from 'react-redux'
import canvasImg from '../../assets/canvasImg.svg'
import Display from '../Display'
import ButtonsPad from '../ButtonsPad'
import {Context} from '../../context'
import sortWidgets from '../../utils/sortWidgets'
import './CanvasBoard.scss'



const CanvasBoard = () => {

    const { dragOverHandler, dropHandler, canvasWidgets, dragStartHandler, dragEndHandler, clickHandler, doubleClickHandler } = useContext(Context)

    const isRuntimeActive = useSelector(state => state.activeStatus.activeStatus)

    
    return (
        <div 
            className={'canvas-board ' + (!canvasWidgets.length && 'empty')} 
            onDragOver={e => dragOverHandler(e)}
            onDragLeave={e => dragEndHandler(e)}
            onDragEnd={e => dragEndHandler(e)}
            onDrop={e => dropHandler(e, 'canvas')}
            onClick={e => clickHandler(e)}
        >
            { canvasWidgets.length ? 
                <>
                    {
                        canvasWidgets.sort(sortWidgets).map((widget) => {
                            const widgetClass = 'widget-wrapper mb-8 ' + (widget.type === 'display' ? widget.type : '') + (!isRuntimeActive && ' move')

                            return <div 
                            onDragStart={e => dragStartHandler(e, widget)}
                            onDragOver={e => dragOverHandler(e, widget)}
                            onDragLeave={e => dragEndHandler(e)}
                            onDragEnd={e => dragEndHandler(e)}
                            onDrop={e => dropHandler(e, widget)}
                            key={widget.id}
                            className={widgetClass}
                            draggable={!isRuntimeActive && (widget.type !== 'display')}
                            onDoubleClick={e => doubleClickHandler(widget)}
                        >
                            {widget.type === 'display' ? <Display /> : <ButtonsPad type={widget.type}/>}
                        </div>
                        })
                    }
                </>
                :
                <div className="canvas-content" onDragOver={e => dragOverHandler(e)}>
                    <img className='canvas-img' src={canvasImg} alt="" /> 
                    <div className='canvas-title'>Перетащите сюда</div> 
                    <div className='canvas-text'>любой элемент из левой панели</div>
                </div>
            }
        </div>
    )
}

export default CanvasBoard