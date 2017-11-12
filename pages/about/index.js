import React from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import Rebase from 're-base';
import CharSelector from '../../components/CharSelector';
import CharScreen from '../../components/CharScreen';

const config = {
  apiKey: 'AIzaSyA_DL81OnvfeNgor2CxtmBzEN9GdhmvG44',
  authDomain: 'swstats-6c00f.firebaseapp.com',
  databaseURL: 'https://swstats-6c00f.firebaseio.com',
  storageBucket: 'swstats-6c00f.appspot.com',
  messagingSenderId: '881671477456',
};

const base = Rebase.createClass(config);

class AboutPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      chars: [],
    };

    this.handleSelect = this.handleSelect.bind(this);
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

  handleSelect(i) {
    const chars = this.state.chars;
    chars[i].current = !chars[i].current;


    this.setState({
      chars,
    });
  }

  render() {
    return (
      <Layout className={s.content}>
        <section className={s.selectedCol}>
          {this.state.chars.map((char, i) => {
            return char.current ? <CharScreen {...char} key={i} /> : null;
          })}
        </section>
        <section className={s.charCol}>
          <CharSelector chars={this.state.chars} handleSelect={this.handleSelect} />
        </section>
      </Layout>
    );
  }

}

export default AboutPage;
