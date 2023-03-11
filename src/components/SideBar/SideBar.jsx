import { useContext } from 'react'
import Display from '../Display'
import ButtonsPad from '../ButtonsPad'
import {Context} from '../../context'
import './SideBar.scss'

const SideBar = () => {
    
    const {isRuntimeActive, widgets, dragStartHandler, dragEndHandler} = useContext(Context)


    return (
        <div className='side-bar'>
            {widgets.map((widget, i) => {
                return <div 
                            onDragStart={e => dragStartHandler(e, widget)}
                            onDragEnd={e => dragEndHandler(e)}
                            key={i} 
                            className='widget-wrapper pointer shadow' 
                            draggable={!isRuntimeActive}
                        >
                            {widget.type === 'display' ? <Display /> : <ButtonsPad type={widget.type}/>}
                        </div>
            })}
        </div>
    )
}

export default SideBar