import React, { PropTypes } from 'react';
import { Map, List } from 'immutable';

import { SCALE } from '../utils';

/*  Components  */
import ItemIcon from './ItemIcon';
import SpellIcon from './SpellIcon';
import ChampionIcon from './ChampionIcon';
import MatchStats from './MatchStats';

const Match = ({ data: match }) => {
  const spells = match.get('spells', List());
  const items = match.get('items', List());
  const trinket = match.get('trinket', null);
  const champion = match.get('champion', null);
  const stats = match.get('stats', null);

  const spellsJSX = spells.map((spell, index) => (
    <SpellIcon key={index} data={spell} />
  ));

  const itemsJSX = items.map((item, index) => (
    <ItemIcon key={index} data={item}/>
  ));

  const didWin = match.getIn(['info', 'didWin'], false);

  return (
    <div className="flex rounded mb1" style={{
      ...styles.shadows[didWin],
      ...styles.base,
    }}>
      <ChampionIcon data={champion} />
      <div className="flex flex-justify flex-center flex-grow px3">
        <MatchStats data={stats}/>
        <div className="flex flex-grow px3" style={{
          ...styles.items,
        }}>
          <div> {itemsJSX} </div>
          <div className="ml2">
            <ItemIcon data={trinket} />
          </div>
        </div>
        <div> {spellsJSX} </div>
      </div>
    </div>
  );
};

Match.propTypes = {
  data: PropTypes.instanceOf(Map).isRequired,
};


const styles = {
  base: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  shadows: {
    true: {
      boxShadow: `0 0 ${SCALE(-1)} ${SCALE(-100)} green`,
    },
    false: {
      boxShadow: `0 0 ${SCALE(-1)} ${SCALE(-100)} red`,
    },
  },
  items: {
    justifyContent: 'flex-end',
  },
};

export default Match;
