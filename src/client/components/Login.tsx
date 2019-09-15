import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Store } from '../store';
import { updateUsername, submitUsername } from '../actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    button: {
      margin: theme.spacing(1)
    },
    inputWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    imageWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  })
);

function Login(
  {
    username,
    online,
    loginError,
    updateUsername,
    submitUsername
  }:
  {
    username: string,
    online: number,
    loginError: string,
    updateUsername: (name: string) => void,
    submitUsername: () => void
  }
) {
  const classes  = useStyles();

  function handleUsernameChange(event: any) {
    updateUsername(event.target.value);
  }

  return (
    <div style={{
      marginTop: '1em'
    }}>
      <div className={classes.imageWrapper}>
        <img
          src='/assets/img/icon/banner.png'
          style={{
            width: '100%',
            maxWidth: '350px'
          }}
        />
        <Typography color='primary' variant='button' gutterBottom>Online: {online || 'Fetching...'}</Typography>
      </div>
      <div className={classes.inputWrapper}>
        <TextField
          label="Username"
          className={classes.textField}
          margin='dense'
          variant='outlined'

          onChange={handleUsernameChange}
          value={username}
          helperText={loginError || 'The name that is displayed in-game.'}
          error={!!loginError}
        />
        <Button variant="contained" color="primary" className={classes.button} onClick={submitUsername}>
          Play!
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  username: state.login.username,
  online: state.game.online,
  loginError: state.login.loginError
});
const mapDispatchToProps = {
  updateUsername,
  submitUsername
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
