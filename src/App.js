import React, { useState } from 'react';
import { Typography, Button } from '@material-ui/core';

import { data, abi } from './data';
import Web3Modal from './components/Web3Modal';
import useStyles from './styles';

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
        setDappStatus(r.contractAddress);
      });
  };

  const readContract = () => {
    contractInstance.methods
      .getValue()
      .call()
      .then(r => setDappStatus(`Current Value: ${r}`));
  };

  const sendTransaction = () => {
    const max = Math.ceil(2000);
    const min = Math.floor(2);
    contractInstance.methods
      .setNumber(Math.round(Math.random() * max - min + min))
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
          onClick={() =>
            web3.eth
              .getBlockNumber()
              .then(r => setDappStatus(`Block Number: ${r}`))
          }
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
      </div>
      <div className={classes.buttonWrapper}>
        <Typography variant="h4">{dappStatus}</Typography>
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
