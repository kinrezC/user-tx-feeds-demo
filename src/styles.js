import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  modal: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    maxWidth: 550,
    maxHeight: 600,
    width: 550,
    height: 600,
  },
  web3ButtonWrapper: {
    marginTop: 50,
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'center',
    marginTop: 20,
  },
  web3Button: {
    width: 250,
    minWidth: 250,
  },
  dappStatus: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'center',
  },
});

export default useStyles;
