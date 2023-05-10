import {Stack} from "@mui/material";
import logo from '../shared/assets/images/logoFooter.svg'
import Button from "@mui/material/Button";


const Footer = () => {
    return (
        <footer className="footer">
            <Stack spacing={4} sx={{mb: 10}}>
                <span className="h2 white-80">CopyTen System</span>
                <span className="subHeaders white-70">
                    Velit nunc ultrices sit est et varius. Tellus accumsan pretium sollicitudin elit purus morbi.
                    Euismod fames ullamcorper eget eget mi nisi aliquet tortor. Etiam aenean mauris integer maecenas et in.
                    Volutpat dolor id vulputate non sed arcu. Justo ut nisl non elit odio cursus auctor. Aliquam tincidunt nunc ultricies dignissim aenean montes feugiat.
                </span>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={4} sx={{mb:10}}>
                <img src={logo} alt={logo}/>
                <Stack direction="row" alignItems="center" justifyContent="space-between"spacing={4}>
                    <Button color="neutral">About</Button>
                    <Button color="neutral">History</Button>
                    <Button color="neutral">And more</Button>
                </Stack>
            </Stack>
            <Stack className="subHeaders white-70" direction="row" alignItems="center" justifyContent="space-between"
                   spacing={4}>
                <span>Copyright 2023 All rights reserved</span>
                <span>Copyten System</span>
            </Stack>
        </footer>
    );
};

export default Footer;