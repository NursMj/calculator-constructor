import './Button.scss'

const Button = ({inner, type}) => {
    let btnClass = 'button pointer ' + type

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