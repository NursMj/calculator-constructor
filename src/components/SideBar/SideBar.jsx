import Display from '../Display'
import ButtonsPad from '../ButtonsPad'
import './SideBar.scss'

const SideBar = () => {

    return (
        <div className='side-bar'>
            <Display />
            <ButtonsPad type='opperators'/>
            <ButtonsPad type='digital'/>
            <ButtonsPad type='equels'/>
        </div>
    )
}

export default SideBar