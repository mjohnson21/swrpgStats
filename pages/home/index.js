import React, { PropTypes } from 'react';
import { Card, CardTitle, CardActions, CardMenu, Button, IconButton } from 'react-mdl';
import Layout from '../../components/Layout';
import CharacterEdit from '../../components/CharacterEdit';
import Rebase from 're-base';
import s from './styles.css';
// import { title, html } from './index.md';

const config = {
  apiKey: 'AIzaSyA_DL81OnvfeNgor2CxtmBzEN9GdhmvG44',
  authDomain: 'swstats-6c00f.firebaseapp.com',
  databaseURL: 'https://swstats-6c00f.firebaseio.com',
  storageBucket: 'swstats-6c00f.appspot.com',
  messagingSenderId: '881671477456',
};

const base = Rebase.createClass(config);

class HomePage extends React.Component {

  static propTypes = {
    articles: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      chars: [],
      title: 'prev title',
      loading: true,
      showNewCharacterForm: false,
    };

    this.handleAddItem = this.handleAddItem.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  componentDidMount() {
    this.ref = base.syncState('content/chars', {
      context: this,
      state: 'chars',
      asArray: true,
      then() {
        this.setState({ loading: false });
      },
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  toggleForm() {
    this.setState({ showNewCharacterForm: !this.state.showNewCharacterForm });
  }

  handleIncrement(index, stat, newValue) {
    const chars = this.state.chars;
    chars[index][stat] = chars[index][stat] + newValue;

    this.setState(
      {
        chars,
      }
    );
  }

  handleAddItem(newItem) {
    this.setState({
      chars: this.state.chars.concat([newItem]),
    });
  }

  handleRemoveItem(index) {
    const newList = this.state.chars;
    newList.splice(index, 1);
    this.setState({
      chars: newList,
    });
  }

  render() {
    const renderCharForm = this.state.showNewCharacterForm
      ? <CharacterEdit handleSubmit={this.handleAddItem} />
      : null;

    return (
      <Layout className={s.content}>
        <h4>Characters
          <button onClick={this.toggleForm}>new</button>
        </h4>

        {renderCharForm}

        <section className={s.wrap}>

          {Object.keys(this.state.chars).map((char, i) => {
            const item = this.state.chars[char];
            return (
              <Card shadow={0} key={i} className={s.char}>
                <CardTitle className={s.title}>
                  <h4>{item.name}</h4>
                </CardTitle>

                <CardActions>
                  <IconButton
                    onClick={() => this.handleIncrement(i, 'hcur', 1)}
                    name="add_circle"
                  />
                  <IconButton
                    onClick={() => this.handleIncrement(i, 'hcur', -1)}
                    name="remove_circle"
                  />
                  Health: {item.hmax} / {item.hcur}
                </CardActions>

                <CardActions>
                  <IconButton
                    onClick={() => this.handleIncrement(i, 'scur', 1)}
                    name="add_circle"
                  />
                  <IconButton
                    onClick={() => this.handleIncrement(i, 'scur', -1)}
                    name="remove_circle"
                  />
                  Strain: {item.smax} / {item.scur}
                </CardActions>

                <CardMenu>
                  <Button>Edit</Button>
                </CardMenu>

              </Card>
            );
          }
          )}
        </section>

      </Layout>
    );
  }

}

export default HomePage;
