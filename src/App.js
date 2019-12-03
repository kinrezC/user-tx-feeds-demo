import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Paper,
  Button,
  Dialog,
  Backdrop,
  Fade,
} from '@material-ui/core';
import Web3 from 'web3';
import Portis from '@portis/web3';
import { TerminalHttpProvider, SourceType } from '@terminal-packages/sdk';
import { data, abi } from './data';
import useStyles from './styles';

const portis = new Portis('process.env.portis', 'mainnet');
const apiKey = process.env.apiKey;
const projectId = process.env.projectId;
const ethereum = window.ethereum;

const defaultObject = {
  apiKey,
  projectId,
};

const portisObject = {
  ...defaultObject,
  customHttpProvider: portis.provider,
  source: SourceType.Portis,
};

const initWeb3 = (type, setWeb3, handleClose) => {
  switch (type) {
    case 'metamask':
      !ethereum.selectedAddress
        ? window.ethereum.enable.then(() => {
            setWeb3(new Web3(window.terminal.ethereum));
            handleClose();
          })
        : setWeb3(new Web3(window.terminal.ethereum));
      break;
    case 'portis':
      setWeb3(Web3(new TerminalHttpProvider(portisObject)));
      handleClose();
      break;
    default:
      throw new Error('Invalid web3 option');
  }
};

const InitWeb3Button = ({ type, name, classes, setWeb3, handleClose }) => (
  <div className={classes.web3ButtonWrapper}>
    <Button
      variant="contained"
      color="primary"
      className={classes.web3Button}
      onClick={() => {
        initWeb3(type, setWeb3, handleClose);
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
            handleClose={handleClose}
          />
          <InitWeb3Button
            type="portis"
            name="portis"
            classes={classes}
            setWeb3={setWeb3}
            handleClose={handleClose}
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
  const [contractInstance, setContractInstance] = useState(null);
  const [dappStatus, setDappStatus] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deployContract = () => {
    web3.eth
      .sendTransaction({
        from: window.ethereum.selectedAddress,
        data: data,
        gasLimit: '800000',
      })
      .then(r => {
        setContractInstance(new web3.eth.Contract(abi, r.contractAddress));
        setDappStatus('Contract Deployed Successfully!');
      });
  };

  const readContract = () => {
    contractInstance.methods
      .getValue()
      .call()
      .then(r => setDappStatus(r));
  };

  const sendTransaction = () => {
    const max = Math.ceil(2000);
    const min = Math.floor(2);
    contractInstance.methods
      .setNumber(Math.random() * max - min + min)
      .send({ from: window.ethereum.selectedAddress })
      .then(setDappStatus('Successfully Called SetValue!'));
  };

  return (
    <div className={classes.root}>
      <div style={{ marginTop: '7%' }}>
        <Typography variant="h2">Sample Dapp</Typography>
      </div>
      <div style={{ marginTop: '5%' }}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          OPEN MODAL
        </Button>
      </div>
      <div style={{ marginTop: 45 }}>
        <Button
          variant="contained"
          color="primary"
          disabled={!web3}
          onClick={() => web3.eth.getBlockNumber().then(r => setDappStatus(r))}
        >
          Get Block Number
        </Button>
        <div className={classes.buttonWrapper}>
          <Button
            variant="contained"
            color="primary"
            disabled={!web3}
            onClick={() => deployContract()}
          >
            Deploy Contract
          </Button>
        </div>
        <div className={classes.buttonWrapper}>
          <Button
            variant="contained"
            color="primary"
            disabled={!web3 || !contractInstance}
            onClick={() => readContract()}
          >
            Read Contract
          </Button>
        </div>
        <div className={classes.buttonWrapper}>
          <Button
            variant="contained"
            color="primary"
            disabled={!web3 || !contractInstance}
            onClick={() => sendTransaction()}
          >
            Send Transaction
          </Button>
        </div>
        <div className={classes.buttonWrapper}>
          <Typography variant="h4">{dappStatus}</Typography>
        </div>
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
