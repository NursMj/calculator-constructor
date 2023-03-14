import { useContext } from 'react';
import { Context } from '../../context';
import './Display.scss'

const Display = () => {
    const {dislay} = useContext(Context)

    return (
        <div className="display">
            <div className="display__inner">
                {dislay}
            </div>
        </div>
    );
};

export default Display