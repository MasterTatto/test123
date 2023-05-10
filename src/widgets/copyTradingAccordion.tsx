import React, {FC, useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Grid,
    Pagination,
    Stack,
    useMediaQuery
} from "@mui/material";
import NickName from "../shared/components/nickName";
import CustomAreaChart from "../entities/components/chart/customAreaChart";
import {chartData} from "../data/chart";
import CurrentValues from "../entities/components/currentValues";
import IconConnected from "../shared/assets/images/icons/iconConnected";
import HeaderChart from "../shared/components/headerChart";
import CopyTradingModal from "../entities/components/modal/copyTradingModal";
import {Link} from "react-router-dom";
import {useGetAllUserTradersQuery} from "../store/API/tradersUserApi";
import imgStrategyGrid from "../shared/assets/images/strategy.png";
import imgStrategyStopLoss from "../shared/assets/images/strategys-stop-loss.png";


interface IType {
    children?: any
}

const CopyTradingAccordion: FC<IType> = ({children}) => {
    const mediaQuery = useMediaQuery('(min-width:900px)');
    const [page, setPage] = useState(1);
    const {data, isLoading, error} = useGetAllUserTradersQuery(page)
    console.log(data)
    const [expanded, setExpanded] = useState<string | false>('panel1');
    const [openModal, setOpenModal] = useState(false);
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };
    const handleOpenModal = (event: React.SyntheticEvent) => {
        event.stopPropagation()
        setOpenModal(true)
    };

    return (
        <div>
            {
                data &&
                data?.data?.map((item: any, index: any) =>
                    <Accordion
                        key={item.id}
                        sx={{p: `0 28px`, mb: 7}}
                        expanded={mediaQuery ? expanded === `panel${index + 1}` : false}
                        onChange={handleChange(`panel${index + 1}`)}
                    >
                        <AccordionSummary>
                            <Grid container spacing={10} columns={12} wrap="wrap" alignItems="center">
                                <Grid item xs={12} md={3}>
                                    <NickName
                                        name={item.name}
                                        number={item.id}
                                        avatar={item.strategy === 'grid' ? imgStrategyGrid : imgStrategyStopLoss}
                                        direction="row-reverse"
                                        justifyContent="flex-end"/>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    {
                                        (expanded !== `panel${index + 1}` || !mediaQuery) ?
                                            <CustomAreaChart
                                                height={64}
                                                data={item.graph}
                                                dataArea={[{
                                                    dataKey: "uv",
                                                    stroke: "#6FCF97",
                                                    fill: "#29312C"
                                                },]}/>
                                            : null
                                    }
                                </Grid>

                                <Grid item xs={12} md={6} flexDirection="row" justifyContent="flex-end">
                                    <Stack width='100%' direction={mediaQuery ? "row" : "column"} alignItems="center"
                                           justifyContent="flex-end" spacing={7}>
                                        <Stack
                                            className="subHeaders yellow"
                                            alignItems="center"
                                            justifyContent="center"
                                            sx={{
                                                width: 34,
                                                height: 34,
                                                border: ` 0.5px solid #3C3C3C`,
                                                borderRadius: `50%`,
                                                position: !mediaQuery ? 'absolute' : 'static',
                                                right: 14,
                                                top: 14,
                                            }}
                                        >10%</Stack>
                                        {/*{(expanded !== `panel${index+1}` || !mediaQuery) ? <CurrentValues/> : null}*/}
                                        {
                                            (expanded === `panel${index + 1}` || !mediaQuery) && item.connected ?
                                                <Button
                                                    fullWidth={!mediaQuery}
                                                    onClick={(e) => handleOpenModal(e)}
                                                    variant="gardient"
                                                    color="warning"
                                                    startIcon={<IconConnected/>}
                                                    sx={{ml: 'auto', mb: 7}}
                                                >
                                                    Подключение
                                                </Button>

                                                : <IconConnected/>
                                        }
                                        {
                                            !mediaQuery &&
                                            <Button fullWidth={!mediaQuery} color="neutral" component={Link}
                                                    to="/trader-dashboard">
                                                <span className="h2">Подробнее</span>
                                            </Button>
                                        }
                                    </Stack>
                                </Grid>
                            </Grid>
                        </AccordionSummary>
                        <AccordionDetails sx={{mb: 7}}>
                            <Grid container spacing={10} columns={12} wrap="wrap">
                                <Grid item xs={4}>
                                    <Stack
                                        spacing={7}
                                        sx={{height: '100%', border: `0.5px solid #3C3C3C`, borderRadius: 2.5}}
                                        justifyContent="space-between"
                                    >
                                        <Stack spacing={7} p={7}>
                                            <HeaderChart title="Рост баланса" number="+22.49%"/>
                                        </Stack>
                                        <CustomAreaChart height={64} data={item.graph}
                                                         dataArea={[{
                                                             dataKey: "uv",
                                                             stroke: "#6FCF97",
                                                             fill: "#29312C"
                                                         },]}/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={8}>
                                    <Stack spacing={7}>
                                        <Stack direction="row" spacing={7}>
                                            <Stack spacing={7}
                                                   sx={{p: `14px`, border: `0.5px solid #3C3C3C`, borderRadius: 2.5}}>
                                                <Stack direction="row" alignItems="center"
                                                       justifyContent="space-between">
                                                    <span className="subHeaders white-90">Начало торгов</span>
                                                    <span className="subHeadersBold">24.12.2019</span>
                                                </Stack>
                                                <Stack direction="row" alignItems="center"
                                                       justifyContent="space-between">
                                                    <span className="subHeaders white-90">Сделок за неделю</span>
                                                    <span className="subHeadersBold">1 075</span>
                                                </Stack>
                                                <Stack flexWrap="wrap" direction="row" alignItems="center"
                                                       justifyContent="space-between">
                                                    <span className="subHeaders white-90">Время последней сделки:</span>
                                                    <span className="subHeadersBold">2022-12-24 10:58:48</span>
                                                </Stack>
                                            </Stack>
                                            <Stack spacing={7}
                                                   sx={{p: `14px`, border: `0.5px solid #3C3C3C`, borderRadius: 2.5}}>
                                                <Stack direction="row" alignItems="center"
                                                       justifyContent="space-between">
                                                    <span className="subHeaders white-90">Начало торгов</span>
                                                    <span className="subHeadersBold">24.12.2019</span>
                                                </Stack>
                                                <Stack flexWrap="wrap" direction="row" alignItems="center"
                                                       justifyContent="space-between">
                                                    <span className="subHeaders white-90">Сделок за неделю</span>
                                                    <span className="subHeadersBold">1 075</span>
                                                </Stack>
                                                <Stack flexWrap="wrap" direction="row" alignItems="center"
                                                       justifyContent="space-between">
                                                    <span className="subHeaders white-90">Время последней сделки:</span>
                                                    <span className="subHeadersBold">2022-12-24 10:58:48</span>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                        <Button color="neutral" component={Link} to="/trader-dashboard">
                                            <span className="h2">Подробнее</span>
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                )
            }


            {
                data?.meta?.pagination?.total_pages > 1 &&
                <Pagination
                    page={page}
                    onChange={handleChangePage}
                    color="primary"
                    count={data?.meta?.pagination?.total_pages}
                    variant="outlined"
                    shape="rounded"
                    sx={{mr: 'auto'}}
                />

            }
            {/*<Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>*/}
            {/*    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">*/}
            {/*    </AccordionSummary>*/}
            {/*    <AccordionDetails>*/}

            {/*    </AccordionDetails>*/}
            {/*</Accordion>*/}
            <CopyTradingModal openModal={openModal} closeModal={setOpenModal}/>
        </div>
    );
}

export default CopyTradingAccordion;