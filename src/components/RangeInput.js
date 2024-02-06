import { useState } from 'react';
import styles from './RangeInput.module.css';

export const useRangeInput = () => {
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    return {min, setMin, max, setMax}
}

const RangeInput = (props) => {
    return (<div className={styles.main}>
        <span className={styles.title}>{props.title}</span>
        <input
            className={styles.input}
            onChange={e => props.setMin(e.target.value)}
            value={props.min}/>
        -
        <input
            className={styles.input}
            onChange={e => props.setMax(e.target.value)}
            value={props.max}/>
    </div>)
}

export default RangeInput;
