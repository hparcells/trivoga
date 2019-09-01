import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Button, Paper, Typography, List, ListItem, ListItemText, Divider, ListItemIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import socket from '../../socket';

import store, { Store } from '../../store';
import { Room } from '../../../shared/types';
import { toggleReady, recieveRoomData, startGame, leaveGame } from '../../actions';

import { normalizeDifficulty, normalizeType, normalizeCategoryId } from '../../utils/normalize';

import AccountCheckIcon from '../icons/AccountCheck';
import AccountIcon from '../icons/Account';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3, 2),
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));


function Lobby(
  {
    username,
    room,
    ready,
    startButtonDisabled,
    toggleReady,
    startGame,
    leaveGame
  }:
  {
    username: string,
    room: Room | null,
    ready: boolean,
    startButtonDisabled: boolean,
    toggleReady: () => void,
    startGame: () => void,
    leaveGame: () => void
  }
) {
  const classes = useStyles();

  useEffect(() => {
    function handleRecieveRoomData(roomData: Room) {
      store.dispatch(recieveRoomData(roomData));
    }

    socket.on('recieveRoomData', handleRecieveRoomData);
    return () => {
      socket.removeListener('recieveRoomData', handleRecieveRoomData);
    };
  }, []);
  
  function handleToggleReady() {
    if(
      (room && room.players[0].ready == true) && (room && room.players[1] && room.players[1].ready === true)
      && (room && room.players[0].username === username)
    ) {
      startGame();

      return;
    }

    toggleReady();
  }

  return (
    room && (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <Paper className={classes.paper} style={{
              marginBottom: '1em'
            }}>
              <Typography variant='h5'>
                <span style={{
                  fontSize: '16px'
                }}>Join with: </span>
                {room.roomCode}
              </Typography>
            </Paper>
            <Paper className={classes.paper}>
              <Typography variant='h5'>Players</Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    {
                      room.players[0].ready
                        ? <AccountCheckIcon />
                        : <AccountIcon />
                    }
                  </ListItemIcon>
                  <ListItemText primary={room.players[0].username} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {
                      room.players[1] && room.players[1].ready
                        ? <AccountCheckIcon />
                        : <AccountIcon />
                    }
                  </ListItemIcon>
                  <ListItemText primary={room.players[1] ? room.players[1].username : '???'} />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Paper className={classes.paper}>
              <Typography variant='h5'>Game Options</Typography>

              <List className={classes.list}>
                <ListItem>
                  <ListItemText primary="Difficulty" secondary={normalizeDifficulty(room.gameOptions.difficulty)} />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Question Type" secondary={normalizeType(room.gameOptions.type)} />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Category" secondary={normalizeCategoryId(room.gameOptions.category)} />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Button
              variant="contained"
              color='secondary'
              fullWidth
              disabled={startButtonDisabled || ready || room.starting}
              onClick={leaveGame}
            >
              Leave Match
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Button variant="contained" color='primary' onClick={handleToggleReady} disabled={startButtonDisabled || room.starting} fullWidth>
              {
                room.players[0].username === username
                ? ready
                  ?  (room.players[0].ready == true) && (room.players[1] && room.players[1].ready === true)
                    ? 'Start'
                    : 'Not Ready'
                  : 'Ready'
                : ready
                  ? 'Not Ready'
                  : 'Ready'
              }
            </Button>
          </Grid>
        </Grid>
      </div>
    )
  );
}

const mapStateToProps = (state: Store) => ({
  username: state.login.username,
  room: state.game.room,
  ready: state.game.ready,
  startButtonDisabled: state.game.startButtonDisabled
});
const mapDispatchToProps = {
  toggleReady,
  startGame,
  leaveGame
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
