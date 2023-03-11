import Button from '../Button'
import './ButtonsPad.scss'

const ButtonsPad = ({type}) => {
    let buttonsList
    
    switch (type) {
        case 'opperators':
            buttonsList = ['/', 'x', '-', '+']
            break;
        case 'digital':
            buttonsList = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ',']
            break;
        case 'equels':
            buttonsList = ['=']
            break;
    }


    return (
        <div className="buttons-pad shadow">
            {buttonsList.map(inner => <Button inner={inner} type={type} key={inner}/>)}
        </div>
    );
};

export default ButtonsPad;