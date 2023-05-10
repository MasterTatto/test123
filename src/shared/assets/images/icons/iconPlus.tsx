import React, {FC} from 'react';

interface IType {
    size?: any;
    color?:string;
}

const IconPlus: FC<IType> = ({size,color}) => {
    return (
        <svg width={size ? size :"14"} height={size ? size :"14"} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 8.55556H8.62473V14H5.37527V8.55556H0V5.44445H5.37527V0H8.62473V5.44445H14V8.55556Z" fill={color ? color:"#828282"}/>
        </svg>
    );
};

export default IconPlus;