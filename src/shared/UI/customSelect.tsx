import React, {FC, useEffect, useState} from 'react';
import {
    Checkbox, FormControl, FormHelperText, InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    useMediaQuery
} from "@mui/material";

interface IType {
    width?: any;
    title?: string;
    multiple?: boolean;
    defaultValue?: string;
    options?: any;
    optionValue?: any;
    isError?: boolean;
}

const CustomSelect: FC<IType> = ({
                                     width,
                                     title,
                                     multiple,
                                     defaultValue,
                                     options,
                                     optionValue,
                                     isError
                                 }) => {
    const mediaQuery = useMediaQuery('(min-width:1270px)');
    const [variantName, setVariantName] = useState<any>([]);
    const [error, setError] = useState(false);


    useEffect(() => {
        isError && setError(isError)
    }, [isError])

    const handleChange = (e: SelectChangeEvent<typeof variantName>) => {

        const {target: {value}} = e;
        setVariantName(
            typeof value === 'string' ? value.split(',') : value,
        );
        optionValue && optionValue(value)

        if (value !== '') setError(false)
    };
    return (

        <FormControl fullWidth error={error} sx={{width: width ? width : 'unset'}}>
            <InputLabel shrink={false}
                        sx={{left: 24, top: -8, opacity: (variantName.length ==0 || variantName == '') ? 1 : 0}}>
                {defaultValue}
            </InputLabel>
            <Select
                IconComponent={"select"}
                fullWidth
                multiple={multiple}
                value={variantName}
                onChange={handleChange}
                renderValue={multiple ? (selected) => selected.join(', ') : undefined}
            >

                {
                    (options !== undefined && options?.length > 0) &&
                    options?.map((option: any) => (
                        <MenuItem key={option.id} value={option.id} title={option.title}>
                            {multiple && <Checkbox checked={variantName.indexOf(option.id) > -1}/>}
                            {option.title}
                        </MenuItem>
                    ))
                }
            </Select>
            {error && <FormHelperText>Поле обязательно к заполнению</FormHelperText>}
        </FormControl>
    );
};

export default CustomSelect;
