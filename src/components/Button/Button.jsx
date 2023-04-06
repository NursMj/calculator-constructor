import { useSelector } from 'react-redux'
import './Button.scss'


const Button = ({inner, type}) => {
    const isRuntimeActive = useSelector(state => state.activeStatus.activeStatus)

    let btnClass = 'button ' + type + ' ' + (isRuntimeActive && 'pointer button-active')

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