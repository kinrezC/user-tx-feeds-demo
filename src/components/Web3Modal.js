import React from 'react';
import { Dialog, Fade, Paper, Typography, Backdrop } from '@material-ui/core';

import InitWeb3Button from './InitWeb3Button';

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

export default Web3Modal;
