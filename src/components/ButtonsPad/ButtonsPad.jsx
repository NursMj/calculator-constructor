import { useContext } from 'react'
import Button from '../Button'
import {Context} from '../../context'
import './ButtonsPad.scss'

const ButtonsPad = ({type}) => {
    const {buttons} = useContext(Context)    
    let buttonsList
    
    switch (type) {
        case 'operators':
            buttonsList = buttons.operatorBtns
            break;
        case 'digital':
            buttonsList = buttons.digitalBtns
            break;
        case 'equels':
            buttonsList = buttons.equelsBtn
            break;
    }


    return (
        <div 
            className="buttons-pad">
            {buttonsList.map(inner => <Button inner={inner} type={type} key={inner}/>)}
        </div>
    );
};

export default ButtonsPad;