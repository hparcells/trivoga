import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';

import socket from '../../../socket';

import { Store } from '../../../store';
import { toggleCreationWindow, changeRoomCode, joinRoom } from '../../../actions';

import CreationWindow from './CreationWindow';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      margin: theme.spacing(1)
    },
    title: {
      flexGrow: 1
    }
  })
);

function Menu(
  {
    roomCode,
    toggleCreationWindow,
    changeRoomCode,
    joinRoom
  }:
  {
    roomCode: string,
    toggleCreationWindow: () => void
    changeRoomCode: (roomCode: string) => void,
    joinRoom: () => void
  }
) {
  const classes = useStyles();

  useEffect(() => {
    function handleNonExistentRoom() {
      // TODO:
    }

    socket.on('roomNoExist', handleNonExistentRoom);

    return () => {
      socket.removeListener('roomNoExist', handleNonExistentRoom);
    };
  }, []);

  function handleRoomCodeChange(event: any) {
    changeRoomCode(event.target.value);
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant='h5'>Create Room</Typography>
            <Typography paragraph>Create a room for someone to join.</Typography>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              onClick={toggleCreationWindow}
            >
              Create Room
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant='h5'>Join Room</Typography>
            <Typography paragraph>Join a room with a room code.</Typography>
            <FormGroup row>
              <TextField
                label='Room Code'
                // className={classes.textField}
                value={roomCode}
                onChange={handleRoomCodeChange}
                margin='dense'
                variant='outlined'
                fullWidth
              />
              <Button
                variant='contained'
                color='primary'
                onClick={joinRoom}
              >
                Join
              </Button>

            </FormGroup>
          </Paper>
        </Grid>
      </Grid>

      <CreationWindow />
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  roomCode: state.menu.roomCode
});
const mapDispatchToProps = {
  toggleCreationWindow,
  changeRoomCode,
  joinRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
