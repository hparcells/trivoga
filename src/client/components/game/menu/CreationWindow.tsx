import React from 'react';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormGroup from '@material-ui/core/FormGroup';

import { Store } from '../../../store';
import { changeDifficulty, changeType, changeCategory, createRoom, toggleCreationWindow } from '../../../actions';
import { Difficulty, Type, CategoryId } from '../../../reducers/menu-reducer';
import { GameOptions } from '../../../../shared/types';
import { DialogContentText } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
);

const SlideUpTransition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function CreationWindow(
  {
    difficulty,
    type,
    category,
    creationWindowOpen,
    changeDifficulty,
    changeType,
    changeCategory,
    createRoom,
    toggleCreationWindow
  }:
  {
    difficulty: Difficulty,
    type: Type,
    category: CategoryId,
    creationWindowOpen: boolean
    changeDifficulty: (difficulty: Difficulty) => void,
    changeType: (newType: Type) => void,
    changeCategory: (category: CategoryId) => void,
    createRoom: (gameOptions: GameOptions) => void,
    toggleCreationWindow: () => void
  }
) {
  const classes = useStyles();

  function handleDifficultyChange(event: any) {
    changeDifficulty(event.target.value);
  }
  function handleChangeType(event: any) {
    changeType(event.target.value);
  }
  function handleChangeCategory(event: any) {
    changeCategory(event.target.value);
  }
  function handleCreateRoom() {
    createRoom({ difficulty, type, category });
    toggleCreationWindow();
  }

  return (
    <div>
      <Dialog
        open={creationWindowOpen}
        TransitionComponent={SlideUpTransition}
        keepMounted
        onClose={toggleCreationWindow}
      >
        <DialogTitle>Create Game</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Configure options for your game. You will not be able to change this once you create the game.
          </DialogContentText>
          <FormGroup row>
            <FormControl className={classes.formControl}>
              <InputLabel shrink>Difficulty</InputLabel>
              <Select
                value={difficulty}
                onChange={handleDifficultyChange}
                input={<Input />}
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value='any'>Any</MenuItem>
                <MenuItem value='easy'>Easy</MenuItem>
                <MenuItem value='medium'>Medium</MenuItem>
                <MenuItem value='hard'>Hard</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
          <FormGroup row>
            <FormControl className={classes.formControl}>
              <InputLabel shrink>Type</InputLabel>
              <Select
                value={type}
                onChange={handleChangeType}
                input={<Input />}
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value='any'>Any</MenuItem>
                <MenuItem value='multiple'>Multiple Choice</MenuItem>
                <MenuItem value='boolean'>True / False</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
          <FormGroup row>
            <FormControl className={classes.formControl}>
              <InputLabel shrink>Category</InputLabel>
              <Select
                value={category}
                onChange={handleChangeCategory}
                input={<Input />}
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value='any'>Any Category</MenuItem>
                <MenuItem value='9'>General Knowledge</MenuItem>
                <MenuItem value='10'>Entertainment: Books</MenuItem>
                <MenuItem value='11'>Entertainment: Film</MenuItem>
                <MenuItem value='12'>Entertainment: Music</MenuItem>
                <MenuItem value='13'>Entertainment: Musicals and Theatres</MenuItem>
                <MenuItem value='14'>Entertainment: Television</MenuItem>
                <MenuItem value='15'>Entertainment: Video Games</MenuItem>
                <MenuItem value='16'>Entertainment: Board Games</MenuItem>
                <MenuItem value='17'>Science and Nature</MenuItem>
                <MenuItem value='18'>Science: Computers</MenuItem>
                <MenuItem value='19'>Science: Mathematics</MenuItem>
                <MenuItem value='20'>Mythology</MenuItem>
                <MenuItem value='21'>Sports</MenuItem>
                <MenuItem value='22'>Geography</MenuItem>
                <MenuItem value='23'>History</MenuItem>
                <MenuItem value='24'>Politics</MenuItem>
                <MenuItem value='25'>Art</MenuItem>
                <MenuItem value='26'>Celebrities</MenuItem>
                <MenuItem value='27'>Animals</MenuItem>
                <MenuItem value='28'>Vehicles</MenuItem>
                <MenuItem value='29'>Entertainment: Comics</MenuItem>
                <MenuItem value='30'>Science: Gadgets</MenuItem>
                <MenuItem value='31'>Entertainment: Japanese Anime and Manga</MenuItem>
                <MenuItem value='32'>Entertainment: Cartoon and Animations</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleCreationWindow} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleCreateRoom} color='primary' variant='contained'>
            Go!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  difficulty: state.menu.difficulty,
  type: state.menu.type,
  category: state.menu.category,
  creationWindowOpen: state.menu.creationWindowOpen
});
const mapDispatchToProps = {
  changeDifficulty,
  changeType,
  changeCategory,
  createRoom,
  toggleCreationWindow
};

export default connect(mapStateToProps, mapDispatchToProps)(CreationWindow);
