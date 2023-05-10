import React, {FC, useState} from 'react';
import {Chip, Paper, Slider, Stack, Switch} from "@mui/material";

interface IType {
    title?: string;
    required?: boolean;
    minValue?: number;
    maxValue?: number;
    defaultValue?: number;
    step?: number;
    isSwitch?: boolean;
    isSliderRange?: boolean;
    onChange?:(value:any)=>void;
    onChangeSwift?:(value:any)=>void;
}

const CustomRange: FC<IType> = ({
                                    title,
                                    required,
                                    minValue,
                                    maxValue,
                                    isSwitch,
                                    step,
                                    defaultValue,
                                    isSliderRange,
                                    onChange,
                                    onChangeSwift
                                }) => {
    const [marks, setMarks] = useState([
        {value: minValue!==undefined ? minValue : 0, label: minValue ? minValue : 0},
        {value:maxValue!==undefined ? maxValue : 1, label: maxValue ? maxValue : 1 },
    ]);
    const [value, setValue] = useState(0);
    const [invisible, setInvisible] = useState(false);

    const handleBadgeVisibility = () => {
        setInvisible(!invisible);
      if(onChangeSwift) onChangeSwift(invisible)
    };

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setValue(newValue);
            if (onChange) {
                onChange(newValue)
            }
        }

    };

    return (

        <Paper sx={{p: 4,borderRadius: `5px`}}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" >
                <span className="subHeaders">{title} {required && <span className="red">*</span>}</span>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    {isSliderRange && <Chip label={value} variant="filled" color="neutral" sx={{height:23}}/>}

                    {
                        isSwitch &&
                        <Switch
                            defaultChecked
                            size="small"
                            onChange={handleBadgeVisibility}
                        />
                    }
                </Stack>
            </Stack>
            {
                isSliderRange &&
                <Stack sx={{m: 7, mb:0}}>
                    <Slider
                        size="small"
                        defaultValue={defaultValue ? defaultValue : 0}
                        min={minValue ?minValue :0}
                        max={maxValue ? maxValue :1}
                        step={step ?step : 0.01}
                        onChange={handleChange}
                        valueLabelDisplay="off"
                        marks={marks}
                        disabled={invisible}
                    />
                </Stack>
            }
        </Paper>
    );
};

export default CustomRange;