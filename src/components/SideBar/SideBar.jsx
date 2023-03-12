import { useContext } from 'react'
import Display from '../Display'
import ButtonsPad from '../ButtonsPad'
import {Context} from '../../context'
import './SideBar.scss'

const SideBar = () => {
    
    const {isRuntimeActive, widgets, dragStartHandler} = useContext(Context)


    return (
        <div className='side-bar'>
            {!isRuntimeActive && widgets.map((widget, i) => {
                return <div 
                            onDragStart={e => dragStartHandler(e, widget)}
                            key={i} 
                            className={'widget-wrapper shadow mb-12 ' + (!widget.sideBar && 'transparent') + (!isRuntimeActive && ' move')}
                            draggable={!isRuntimeActive && widget.sideBar}
                        >
                            {widget.type === 'display' ? <Display /> : <ButtonsPad type={widget.type}/>}
                        </div>
            })}
        </div>
    )
}

export default SideBar