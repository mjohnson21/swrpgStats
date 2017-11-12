import React, {PropTypes} from 'react';
import { Button, Textfield } from 'react-mdl';
import s from './CharacterEdit.css';

export default class CharacterEdit extends React.Component {

  constructor(props, refs) {
    super(props, refs);

    this.state = {

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, target) {
    let newValue = {};
    newValue[target]
    this.setState({[target]: event.target.value});
  }

  handleSubmit() {
    console.log('submitting ======');
    // console.log(this.state);
    console.log(this.refs);
    const newChar = this.state;
    newChar.hcur = newChar.hmax;
    newChar.scur = newChar.smax;

    this.props.handleSubmit(newChar);

    this.refs.name.value = '';
  }

  render() {
    console.log(this.state);
    return (
      <section className="Characteredit">
        <div>
          <Textfield floatingLabel
            ref="name"
            value={this.state.name}
            onChange={(event) => this.handleChange(event, 'name')}
            label="Name" />
          <br/>
          <Textfield floatingLabel
            className={s.field}
            value={this.state.health}
            onChange={(event) => this.handleChange(event, 'hmax')}
            label="Health"
            pattern="-?[0-9]*(\.[0-9]+)?"
            error="Number" />
          <Textfield floatingLabel
            className={s.field}
            value={this.state.strain}
            onChange={(event) => this.handleChange(event, 'smax')}
            label="Strain"
            pattern="-?[0-9]*(\.[0-9]+)?"
            error="Number" />
          <Textfield floatingLabel
            className={s.field}
            value={this.state.soak}
            onChange={(event) => this.handleChange(event, 'soak')}
            label="Soak"
            pattern="-?[0-9]*(\.[0-9]+)?"
            error="Number" />
          <Textfield floatingLabel
            className={s.field}
            value={this.state.defMelee}
            onChange={(event) => this.handleChange(event, 'defMelee')}
            label="Melee Def"
            pattern="-?[0-9]*(\.[0-9]+)?"
            error="Number" />
          <Textfield floatingLabel
            className={s.field}
            value={this.state.defRanged}
            onChange={(event) => this.handleChange(event, 'defRanged')}
            label="Ranged Def"
            pattern="-?[0-9]*(\.[0-9]+)?"
            error="Number" />
        </div>

        <Button raised onClick={this.handleSubmit}>Submit</Button>

      <br/><br/>
      </section>
    );
  }
}

CharacterEdit.propTypes = {
  handleSubmit: PropTypes.func,
};
