import { useContext } from 'react'
import {useSelector} from 'react-redux'
import Display from '../Display'
import ButtonsPad from '../ButtonsPad'
import {Context} from '../../context'
import './SideBar.scss'

const SideBar = () => {
    
    const {widgets, dragStartHandler} = useContext(Context)

    const isRuntimeActive = useSelector(state => state.activeStatus.activeStatus)



    return (
        <div className='side-bar'>
            {!isRuntimeActive && widgets.map((widget, i) => {
                return <div 
                            onDragStart={e => dragStartHandler(e, widget)}
                            key={i} 
                            className={'widget-wrapper shadow mb-8 ' + (!widget.sideBar && 'transparent') + (!isRuntimeActive && ' move')}
                            draggable={!isRuntimeActive && widget.sideBar}
                        >
                            {widget.type === 'display' ? <Display /> : <ButtonsPad type={widget.type}/>}
                        </div>
            })}
        </div>
    )
}

export default SideBar