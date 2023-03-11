import './CanvasBoard.scss'
import canvasImg from '../../assets/canvasImg.svg'

const CanvasBoard = () => {
    return (
        <div className='canvas-board'>
            <div className="canvas-content">
                <img className='canvas-img' src={canvasImg} alt="" /> 
                <div className='canvas-title'>Перетащите сюда</div> 
                <div className='canvas-text'>любой элемент из левой панели</div>
            </div>
        </div>
    )
}

export default CanvasBoard