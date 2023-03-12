import { useContext } from 'react'
import { Context } from '../../context'
import './Button.scss'


const Button = ({inner, type}) => {
    const {isRuntimeActive} = useContext(Context)

    let btnClass = 'button ' + type + ' ' + (isRuntimeActive && 'pointer')

    if (inner === '0') {
        btnClass = btnClass + ' wide'
    }

    return (
        <div className={btnClass}>
            <span>{inner}</span>
        </div>
    )
}

export default Button