import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { decodeHTML } from 'entities';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { LineChart } from 'react-chartkick';
import 'chart.js';
import toPercent from 'decimal-to-percent';

import { Store } from '../../../../store';
import { Room } from '../../../../../shared/types';

const useStyles = makeStyles(theme => ({
  tablePaper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
  table: {
    minWidth: 650
  }
}));

function Scorecard({ room }: { room: Room | null }) {
  const classes = useStyles();

  const [playerOne, setPlayerOne] = useState('');
  const [playerTwo, setPlayerTwo] = useState('');

  useEffect(() => {
    setPlayerOne(room && room.players[0].username as any);
    setPlayerTwo(room && room.players[1].username as any);
  }, []);

  return (
    <div>
      {room && playerOne && playerTwo && (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper className={classes.tablePaper}>
              <Table className={classes.table} size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Question</TableCell>
                    <TableCell>Correct Answer</TableCell>
                    <TableCell>{playerOne}'s Answer</TableCell>
                    <TableCell>{playerTwo}'s Answer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {room.scorecard.rounds.map((round, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{decodeHTML(round.question)}</TableCell>
                        <TableCell>{decodeHTML(round.answer)}</TableCell>
                        <TableCell
                          style={{
                            color: round.playerData[round.playerData.findIndex((player) => {
                              return player.username === playerOne;
                            })].providedAnswer === round.answer
                              ? 'green'
                              : 'red'
                          }}
                        >
                          {decodeHTML(round.playerData[round.playerData.findIndex((player) => {
                            return player.username === playerOne;
                          })].providedAnswer)}
                        </TableCell>
                        <TableCell
                          style={{
                            color: round.playerData[round.playerData.findIndex((player) => {
                              return player.username === playerTwo;
                            })].providedAnswer === round.answer
                              ? 'green'
                              : 'red'
                          }}
                        >
                          {decodeHTML(round.playerData[round.playerData.findIndex((player) => {
                            return player.username === playerTwo;
                          })].providedAnswer)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Paper>
              <LineChart
                data={[
                  {'name': playerOne, 'data': {...[0, ...room.scorecard.rounds.map((round) => {
                    const playerIndex = round.playerData.findIndex((player) => {
                      return player.username === playerOne;
                    });

                    return round.playerData[playerIndex].score;
                  })]}},
                  {'name': playerTwo, 'data': {...[0, ...room.scorecard.rounds.map((round) => {
                    const playerIndex = round.playerData.findIndex((player) => {
                      return player.username === playerTwo;
                    });

                    return round.playerData[playerIndex].score;
                  })]}}
                ]}
                xtitle='Question'
                ytitle='Points'
                download={true}
                min={0}
                max={10}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Paper className={classes.paper}>
              <Typography variant='h5' gutterBottom>Stats</Typography>
              <Typography paragraph>{playerOne}: {toPercent(Number(room.scorecard.rounds.map((round) => {
                const playerIndex = round.playerData.findIndex((player) => {
                  return player.username === playerOne;
                });

                return round.playerData[playerIndex].providedAnswer === round.answer;
              }).filter((result) => {
                return result;
              }).length / room.scorecard.rounds.length))} of Answers Correct</Typography>
              <Typography paragraph>{playerTwo}: {toPercent(Number((room.scorecard.rounds.map((round) => {
                const playerIndex = round.playerData.findIndex((player) => {
                  return player.username === playerTwo;
                });

                return round.playerData[playerIndex].providedAnswer === round.answer;
              }).filter((result) => {
                return result;
              }).length / room.scorecard.rounds.length)))} of Answers Correct</Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </div>
    );
  }

const mapStateToProps = (state: Store) => ({
  room: state.game.room
});

export default connect(mapStateToProps, {})(Scorecard);
