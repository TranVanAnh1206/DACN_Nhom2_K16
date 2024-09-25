import { useEffect, useState } from 'react';

const useDebounce = (value, delay) => {
    const [temporary, setTemporary] = useState(value);

    useEffect(() => {
        const time = setTimeout(() => {
            setTemporary(value);
        }, delay);

        return () => {
            clearTimeout(time);
        };
    }, [value, delay]);

    return temporary;
};

export default useDebounce;
