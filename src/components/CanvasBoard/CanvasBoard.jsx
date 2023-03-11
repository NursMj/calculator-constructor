import { useContext } from 'react'
import canvasImg from '../../assets/canvasImg.svg'
import {Context} from '../../context'
import './CanvasBoard.scss'


const CanvasBoard = () => {

    const { dragEnterHandler, dragOverHandler, dragLeaveHandler, dropHandler } = useContext(Context)

    return (
        <div 
            className='canvas-board ' 
            onDragOver={e => dragOverHandler(e)}
            onDragEnter={e => dragEnterHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDrop={e => dropHandler(e)}
        >
            <div className="canvas-content" onDragOver={e => dragOverHandler(e)}>
                <img className='canvas-img' src={canvasImg} alt="" /> 
                <div className='canvas-title'>Перетащите сюда</div> 
                <div className='canvas-text'>любой элемент из левой панели</div>
            </div>
        </div>
    )
}

export default CanvasBoard