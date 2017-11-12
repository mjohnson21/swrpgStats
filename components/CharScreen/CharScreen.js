import React, { PropTypes } from 'react'
import { Grid, Cell } from 'react-mdl';
import s from './CharScreen.css';

const CharScreen = (props) => {
  console.log(props);
  return (
    <section className={s.Character}>
      <h2>{props.name}</h2>
      <Grid>
        <Cell col={4}>
          <h3>Strain</h3>
          <h2>{props.smax}/{props.scur}</h2>
        </Cell>
        <Cell col={4}>
          <h4>Soak: {props.soak}</h4>
          <h4>Melee Def: {props.defMelee}</h4>
          <h4>Range Def: {props.defRanged}</h4>
        </Cell>
        <Cell col={4}>
          <h3>Health</h3>
          <h2>{props.hmax}/{props.hcur}</h2>
        </Cell>
      </Grid>
    </section>
  )
}

export default CharScreen;
