import { useDispatch, useSelector } from "react-redux"
import { changeLanguage } from '../../store/languageSlice'
import './SwitchLanguage.scss'



const SwitchLanguage = () => {

    const language = useSelector(state => !state.language.language)
    const dispatch = useDispatch()

    const activeClass = 'switch__btn_active'

    function clickHandler(e){
        if (e.target.closest('div').classList.contains(activeClass)) return

        dispatch(changeLanguage())   
    }

    return (
        <div className='switch-language pointer' onClick={clickHandler}>
            <div 
                className={`switch__btn ${!language && activeClass}`}
            >
                Ru
            </div>
            <div 
                className={`switch__btn ${language && activeClass}`}
            >
                En
            </div>
        </div>
    )
}

export default SwitchLanguage