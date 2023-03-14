import { useContext } from 'react';
import { Context } from '../../context';
import './Display.scss'

const Display = () => {
    const {display} = useContext(Context)
    let classes = 'display__inner '

    if (display === 'Не определено') {
        classes += ' fz-24'
    } else if (display.length > 9) {
        classes += ' fz-19'
    }

    return (
        <div className={'display'}>
            <div className={classes}>
                {display}
            </div>
        </div>
    );
};

export default Display