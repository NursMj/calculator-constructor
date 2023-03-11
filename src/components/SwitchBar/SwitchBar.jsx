import { useState } from 'react'
import './SwitchBar.scss'
import eye from '../../assets/eye.svg'
import eyeActive from '../../assets/eyeActive.svg'
import arrows from '../../assets/arrows.svg'
import arrowsActive from '../../assets/arrowsActive.svg'

const SwitchBar = () => {
    let [isRuntimeActive, setRuntimeActive] = useState(false)
    const activeClass = 'switch__btn_active'

    const switchChange = (e) => {
        if (!e.target.closest('div').classList.contains(activeClass)) {
            setRuntimeActive(isRuntimeActive = !isRuntimeActive)
        }        
    }

    return (
        <div className='switch-bar'>
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