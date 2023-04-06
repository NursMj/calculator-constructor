import { useContext } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { changeActiveStatus } from '../../store/activeStatusSlice'
import './SwitchBar.scss'
import eye from '../../assets/eye.svg'
import eyeActive from '../../assets/eyeActive.svg'
import arrows from '../../assets/arrows.svg'
import arrowsActive from '../../assets/arrowsActive.svg'
import {Context} from '../../context'


const SwitchBar = () => {
    let {resetCalc} = useContext(Context)
    const isRuntimeActive = useSelector(state => !state.activeStatus.activeStatus)
    const dispatch = useDispatch()

    const activeClass = 'switch__btn_active'

    const switchChange = (e) => {
        if (e.target.closest('div').classList.contains(activeClass)) return

        dispatch(changeActiveStatus())
        resetCalc()        
    }

    return (
        <div className='switch-bar pointer'>
            <div 
                className={`switch__btn ${isRuntimeActive && activeClass}`}
                onClick={switchChange}
            >
                <img 
                    className='switch__img' 
                    src={isRuntimeActive ? eyeActive : eye} 
                    alt="" />
                Runtime
            </div>
            <div 
                className={`switch__btn ${!isRuntimeActive && activeClass}`}
                onClick={switchChange}
            >
                <img 
                    className='switch__img' 
                    src={isRuntimeActive ? arrowsActive : arrows}
                    alt="" />
                Constructor
            </div>
        </div>
    )
}

export default SwitchBar