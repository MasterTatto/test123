const IconAccount = ({icon, active}: any) => {

    return (
        <>
            {
                active ?
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 16H2C0.89543 16 0 15.1046 0 14V2C0 0.89543 0.89543 0 2 0H18C19.1046 0 20 0.89543 20 2V14C20 15.1046 19.1046 16 18 16ZM2 8V14H18V8H2ZM2 2V4H18V2H2Z" fill="url(#paint0_linear_979_56447)"/>
                        <defs>
                            <linearGradient id="paint0_linear_979_56447" x1="10" y1="0" x2="10" y2="16" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#6FCF97"/>
                                <stop offset="1" stopColor="#27AE60"/>
                            </linearGradient>
                        </defs>
                    </svg>


                    :
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 16H2C0.89543 16 0 15.1046 0 14V2C0 0.89543 0.89543 0 2 0H18C19.1046 0 20 0.89543 20 2V14C20 15.1046 19.1046 16 18 16ZM2 8V14H18V8H2ZM2 2V4H18V2H2Z" fill="#828282"/>
                    </svg>
            }

        </>

    );
};

export default IconAccount;