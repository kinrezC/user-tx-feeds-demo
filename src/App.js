import React, { useState } from "react";
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
import { TerminalHttpProvider, SourceType } from "@terminal-packages/sdk";

const portis = new Portis("process.env.portis", "mainnet");
const apiKey = process.env.apiKey;
const projectId = process.env.projectId;

const defaultObject = {
  apiKey,
  projectId
};

const portisObject = {
  ...defaultObject,
  customHttpProvider: portis.provider,
  source: SourceType.Portis
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
  },
  web3ButtonWrapper: {
    marginTop: 50
  },
  web3Button: {
    width: 250,
    minWidth: 250
  }
});

const initWeb3 = (type, setWeb3) => {
  switch (type) {
    case "metamask":
      !window.ethereum
        ? window.ethereum.enable.then(() =>
            setWeb3(new Web3(window.terminal.ethereum))
          )
        : setWeb3(new Web3(window.terminal.ethereum));
      break;
    case "portis":
      setWeb3(Web3(new TerminalHttpProvider(portisObject)));
      break;
    default:
      throw new Error("Invalid web3 option");
  }
};

const InitWeb3Button = ({ type, name, classes, setWeb3 }) => (
  <div className={classes.web3ButtonWrapper}>
    <Button
      variant="contained"
      color="primary"
      className={classes.web3Button}
      onClick={() => {
        initWeb3(type, setWeb3);
      }}
    >
      {name}
    </Button>
  </div>
);

const Web3Modal = ({ open, handleClose, classes, setWeb3 }) => {
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
          <InitWeb3Button
            type="metamask"
            name="metamask"
            classes={classes}
            setWeb3={setWeb3}
          />
          <InitWeb3Button
            type="portis"
            name="portis"
            classes={classes}
            setWeb3={setWeb3}
          />
        </Paper>
      </Fade>
    </Dialog>
  );
};

const App = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [web3, setWeb3] = useState(null);

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
      <div style={{ marginTop: 45 }}>
        <Button
          variant="contained"
          color="primary"
          disabled={!web3}
          onClick={() => web3.eth.getBlockNumber()}
        >
          Get Block Number
        </Button>
      </div>
      <Web3Modal
        open={open}
        handleClose={handleClose}
        classes={classes}
        setWeb3={setWeb3}
      />
    </div>
  );
};

export default App;
