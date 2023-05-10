import React, {FC} from 'react';

interface T {
    active?: boolean
}

const IconProducts: FC<T> = ({active}) => {
    return (
        <>
            {
                active ?
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 20C3.664 20 0 17.965 0 15.556V4.444C0 2.035 3.664 0 8 0C12.336 0 16 2.035 16 4.444V15.556C16 17.965 12.337 20 8 20ZM2 12.9V15.559C2.07 16.112 4.309 17.781 8 17.781C11.691 17.781 13.931 16.107 14 15.553V12.9C12.1794 13.9554 10.1039 14.4905 8 14.447C5.89607 14.4906 3.82058 13.9554 2 12.9ZM2 7.341V10C2.07 10.553 4.309 12.222 8 12.222C11.691 12.222 13.931 10.548 14 9.994V7.341C12.1795 8.39678 10.104 8.93226 8 8.889C5.89596 8.93231 3.82046 8.39683 2 7.341ZM8 2.222C4.308 2.222 2.069 3.896 2 4.451C2.07 5 4.311 6.666 8 6.666C11.689 6.666 13.931 4.992 14 4.438C13.93 3.887 11.689 2.222 8 2.222Z" fill="url(#paint0_linear_979_54725)"/>
                        <defs>
                            <linearGradient id="paint0_linear_979_54725" x1="8" y1="0" x2="8" y2="20" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#F2C94C"/>
                                <stop offset="1" stopColor="#F2994A"/>
                            </linearGradient>
                        </defs>
                    </svg>

                    :
                    null
            }
        </>
    );
};

export default IconProducts;