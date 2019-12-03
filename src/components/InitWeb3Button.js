import React from 'react';
import { Button } from '@material-ui/core';
import Web3 from 'web3';
import Portis from '@portis/web3';
import { TerminalHttpProvider, SourceType } from '@terminal-packages/sdk';

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

export default InitWeb3Button;
