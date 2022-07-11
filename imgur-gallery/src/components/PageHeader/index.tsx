import style from "../../pages/home/style.module.css";
import {Button, Menu, MenuItem, Typography} from "@mui/material";
import {useState} from "react";
import {PageHeaderType, SortParamType} from "../../types";


/**
 * this function renders a dropdown menu for the window paramanater
 * @param setWindow
 * @constructor
 */
const WindowButton = ({setWindow}: {setWindow: (s: string) => void}) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [windowLabel, setWindowLabel] = useState("Window")
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeWindow = (window: string) => {
        setWindowLabel(window);
        setWindow(`/${window}`)
        handleClose();
    }

    return (
        <div className={style.sortContainer}>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{color:"white"}}
            >
                {windowLabel}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => changeWindow("day")}>Day</MenuItem>
                <MenuItem onClick={() => changeWindow("week")}>Week</MenuItem>
                <MenuItem onClick={() => changeWindow("month")}>Month</MenuItem>
                <MenuItem onClick={() => changeWindow("year")}>Year</MenuItem>
                <MenuItem onClick={() => changeWindow("all")}>All</MenuItem>
            </Menu>
        </div>
    )
}

const PageHeader = ({setSection, setViral, viral, setSort, setWindow}: PageHeaderType) => {

    const [anchorElSort, setanchorElSort] = useState(null);
    const [sortLabel, setSortLabel] = useState<SortParamType | "sort">("sort")
    const open = Boolean(anchorElSort);

    const handleClickSort = (event: any) => {
        setanchorElSort(event.currentTarget);
    };
    const handleCloseSort = () => {
        setanchorElSort(null);
    };

    const changeSort = (sort: any) => {
        setSortLabel(sort)
        setSort(`/${sort}`)
        handleCloseSort();
    }

    return (
        <div className={style.actions}>
            <div className={style.section}>
                <Button onClick={() => setSection("/hot")}>
                    <Typography style={{color:"white"}}>
                        hot
                    </Typography>
                </Button>
                <Button onClick={() => setSection("/top")}>
                    <Typography style={{color:"white"}}>
                        top
                    </Typography>
                </Button>
                <Button onClick={() => setSection("/user")}>
                    <Typography style={{color:"white"}}>
                        User
                    </Typography>
                </Button>
            </div>
            <div style={{display:"flex"}}>
                <Button onClick={() => setViral(!viral)}>
                    <Typography style={{color:"white"}}>
                        {viral ? "Viral Images" : "Images"}
                    </Typography>
                </Button>
                <div className={style.sortContainer}>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        style={{color:"white"}}
                        onClick={handleClickSort}
                    >
                        {sortLabel}
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorElSort}
                        open={open}
                        onClose={handleCloseSort}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => changeSort("viral")}>Viral</MenuItem>
                        <MenuItem onClick={() => changeSort("top")}>Top</MenuItem>
                        <MenuItem onClick={() => changeSort("time")}>Time</MenuItem>
                    </Menu>
                </div>
                <WindowButton setWindow={setWindow}/>
            </div>

        </div>
    )
}

export default PageHeader;