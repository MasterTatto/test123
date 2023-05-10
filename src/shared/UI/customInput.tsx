import React, {FC, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import IconPassword from "../assets/images/icons/iconPassword";
import IconSearch from "../assets/images/icons/iconSearch";

interface T {
    label?: string;
    isRequired?: boolean;
    search?: boolean;
    dataInput?:any;
    errorInput?:boolean;
    inputType?:string;

}

const CustomInput: FC<T> = ({
                                label,
                                isRequired,
                                search,
                                dataInput,
                                errorInput,
                                inputType,}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <>
            {
                inputType ==='text' ?
                    <TextField
                        {...dataInput}
                        required={isRequired ? true : undefined}
                        fullWidth
                        helperText={(dataInput?.error || errorInput) && "Поле обязательно к заполнению"}
                        label={label}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    :
                    <TextField
                        {...dataInput}
                        required={isRequired ? true : undefined}
                        fullWidth
                        // error={errorInput}
                        // onChange={()=>{}}
                        helperText={(dataInput?.error || errorInput) && "Поле обязательно к заполнению"}
                        label={label}
                        type={showPassword ? 'text' : 'password'}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            endAdornment:
                                <IconButton size="small"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                >
                                    <IconPassword visible={showPassword}/>
                                </IconButton>
                        }}
                    />
            }

        </>
    );
};

export default CustomInput;