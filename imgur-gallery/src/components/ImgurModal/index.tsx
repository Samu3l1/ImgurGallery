import Backdrop from "@mui/material/Backdrop";
// @ts-ignore
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import * as React from "react";
import {IconButton, Modal} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ImgurModalInterface {
    children: React.ReactNode;
    open: boolean;
    setOpen: (value: boolean) => void;
    title?: string;
    description?: string;
    width?: string;
}

const ImgurModal = ({ children, open, setOpen, title, description, width }: ImgurModalInterface) => {
    const handleClose = () => setOpen(false);

    /**
     * The styles of the general modal
     */
    const style = {
        position: "absolute" as "absolute",
        top: "10%",
        left: "50%",
        transform: "translate(-50%, 0)",
        width: width ? width : "50%",
        maxWidth: !width ? 600 : 3000,
        minWidth: 300,
        maxHeight: "75%",
        overflowY: "auto",
        bgcolor: "background.paper",
        borderRadius: 5,
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            disableAutoFocus={true}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3 style={{ marginBottom: title ? "5px" : "0px", marginTop: title ? "0px" : "0px" }}>
                            {title}
                        </h3>
                        <IconButton onClick={() => setOpen(false)}>
                            <CloseIcon />

                        </IconButton>
                    </div>

                    <p style={{ margin: description ? "auto" : "0px", fontSize: "12px" }}>{description}</p>
                    {children}
                </Box>
            </Fade>
        </Modal>
    );
};

export default ImgurModal;
