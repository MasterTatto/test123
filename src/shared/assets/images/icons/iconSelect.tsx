import React, {FC} from 'react';

interface IType {
    children?: any
}

const IconSelect: FC<IType> = ({children}) => {
    return (
        <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 3.35758L5 8.5L10 3.35758L9.16677 2.5L5 6.78606L0.833235 2.5L0 3.35758Z" fill="#828282"/>
        </svg>

    );
};

export default IconSelect;