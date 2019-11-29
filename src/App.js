import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Button, Modal, Backdrop, Fade } from "@material-ui/core";
import Web3 from "web3";
import Portis from "@portis/web3";
import { TerminalHttpProvider, SourceTypes } from "@terminal-packages/sdk";

const portis = new Portis("486b2a54-3e4a-43fe-be5e-827a33750d0e", "mainnet");

const useStyles = makeStyles({});

const Web3Modal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
      closeAfterTransition
    >
      <Fade in={open}>
        <Typography variant="h3">TEST MODAL</Typography>
      </Fade>
    </Modal>
  );
};

const App = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        OPEN MODAL
      </Button>
      <Web3Modal open={open} handleClose={handleClose} />
    </div>
  );
};

export default App;
