import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Typography,
  Paper,
  Button,
  Dialog,
  Backdrop,
  Fade
} from "@material-ui/core";
import Web3 from "web3";
import Portis from "@portis/web3";
import { TerminalHttpProvider, SourceTypes } from "@terminal-packages/sdk";

const portis = new Portis("process.env.portis", "mainnet");

const apiKey = process.env.apiKey;
const projectId = process.env.projectId;

const defaultObject = {
  apiKey,
  projectId
};

const portisObject = {
  ...defaultObject
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  modal: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    maxWidth: 450,
    maxHeight: 600,
    width: 450,
    height: 600
  }
});

const initWeb3 = type => {
  switch (type) {
    case "metamask":
      window.ethereum.enable.then(() => new Web3(window.terminal.ethereum));
    case "portis":
      return new Web3(new TerminalHttpProvider(portisObject));
  }
};

const InitWeb3Button = ({ type, name, classes }) => (
  <Button className={classes.web3Button} onClick={() => initWeb3(type)}>
    {name}
  </Button>
);

const Web3Modal = ({ open, handleClose, classes }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
      closeAfterTransition
    >
      <Fade in={open}>
        <Paper className={classes.modal}>
          <Typography variant="h4" style={{ marginTop: 50 }}>
            Select Web3 Provider
          </Typography>
        </Paper>
      </Fade>
    </Dialog>
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
    <div className={classes.root}>
      <div style={{ marginTop: "15%" }}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          OPEN MODAL
        </Button>
      </div>
      <Web3Modal open={open} handleClose={handleClose} classes={classes} />
    </div>
  );
};

export default App;
