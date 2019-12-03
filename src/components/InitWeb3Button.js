import React from 'react';
import { Button } from '@material-ui/core';
import Web3 from 'web3';
import Portis from '@portis/web3';
import { TerminalHttpProvider, SourceType } from '@terminal-packages/sdk';

const apiKey = 'o9HM6pbVw0Dt7XDwSDXGxw==';
const projectId = 'POREbWlJGDVArgmw';
const ethereum = window.ethereum;
const portis = new Portis('8027dc2b-d250-4ab6-b5f5-9c732a5b131b', 'kovan');

const defaultObject = {
  apiKey,
  projectId,
};

const portisObject = {
  ...defaultObject,
  customHttpProvider: portis.provider,
  source: SourceType.Portis,
};

const initWeb3 = (type, setWeb3, handleClose, setCurrentProvider) => {
  switch (type) {
    case 'metamask':
      !ethereum.selectedAddress
        ? window.ethereum.enable.then(() => {
            setWeb3(new Web3(window.terminal.ethereum));
          })
        : setWeb3(new Web3(window.terminal.ethereum));
      setCurrentProvider('MetaMask');
      break;
    case 'portis':
      setWeb3(new Web3(new TerminalHttpProvider(portisObject)));
      setCurrentProvider('Portis');
      break;
    default:
      throw new Error('Invalid web3 option');
  }
};

const InitWeb3Button = ({
  type,
  name,
  classes,
  setWeb3,
  handleClose,
  setCurrentProvider,
}) => (
  <div className={classes.web3ButtonWrapper}>
    <Button
      variant="contained"
      color="primary"
      className={classes.web3Button}
      onClick={() => {
        initWeb3(type, setWeb3, handleClose, setCurrentProvider);
      }}
    >
      {name}
    </Button>
  </div>
);

export default InitWeb3Button;
