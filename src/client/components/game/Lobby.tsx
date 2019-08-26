import React from 'react';
import { connect } from 'react-redux';

import { Store } from '../../store';

function Lobby() {
  return (
    <p>Lobby</p>
  );
}

const mapStateToProps = (state: Store) => ({
  room: state.game.room
});
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
