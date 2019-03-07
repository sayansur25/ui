/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Helmet from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Home from '../Home';
import Header from '../Header';
import Footer from '../Footer';
import Player from '../Player';
import Guild from '../Guild';
import constants from '../constants';

const muiTheme = {
  fontFamily: constants.fontFamily,
  card: { fontWeight: constants.fontWeightNormal },
  badge: { fontWeight: constants.fontWeightNormal },
  subheader: { fontWeight: constants.fontWeightNormal },
  raisedButton: { fontWeight: constants.fontWeightNormal },
  flatButton: { fontWeight: constants.fontWeightNormal },
  inkBar: {
    backgroundColor: constants.colorBlue,
  },
  palette: {
    textColor: constants.textColorPrimary,
    primary1Color: constants.colorBlue,
    canvasColor: constants.primarySurfaceColor,
    borderColor: constants.dividerColor,
  },
  tabs: {
    backgroundColor: 'transparent',
    textColor: constants.colorMuted,
    selectedTextColor: constants.textColorPrimary,
  },
  button: { height: 38 },
};

const StyledDiv = styled.div`
  transition: ${constants.normalTransition};
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  left: ${props => (props.open ? '256px' : '0px')};
  background-image: ${props => (props.location.pathname === '/' ? 'url("/assets/home-background.png")' : '')};
  background-position: ${props => (props.location.pathname === '/' ? 'center top' : '')};
  background-repeat: ${props => (props.location.pathname === '/' ? 'no-repeat' : '')};
  
   #back2Top {
    position: fixed;
    left: auto;
    right: 0px;
    top: auto;
    bottom: 20px;
    outline: none;
    color: rgb(196, 196, 196);
    text-align: center;
    outline: none;
    border: none;
    background-color: rgba(0,0,0,0.3);
    width: 40px;
    font-size: 14px;
    border-radius: 2px;
    cursor: pointer;
    z-index: 999999;
    opacity: 0;
    display: block;
    pointer-events: none;
    -webkit-transform: translate3d(0,0,0);
    padding: 3px;
    transition: opacity 0.3s ease-in-out;
    & #back2TopTxt {
      font-size: 10px;
      line-height: 12px;
      text-align: center;
      margin-bottom: 3px;
    }
  }
  #back2Top:hover {
    background-color: rgb(26, 108, 239);
  }
`;

const StyledBodyDiv = styled.div`
  padding: 25px;
  flex-grow: 1;
  @media only screen and (min-width: ${constants.appWidth}px) {
    width: ${constants.appWidth}px;
    margin: auto;
  }
`;

class App extends React.Component {
  static propTypes = {
    params: PropTypes.shape({}),
    width: PropTypes.number,
    location: PropTypes.shape({
      key: PropTypes.string,
    }),
    strings: PropTypes.shape({}),
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.key !== prevProps.location.key) {
      window.scrollTo(0, 0);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  setBack2TopRef = (node) => {
    this.back2Top = node;
  };

  handleScroll = () => {
    const { style } = this.back2Top;
    if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
      style.opacity = 1;
      style.pointerEvents = 'auto';
    } else {
      style.opacity = 0;
      style.pointerEvents = 'none';
    }
  };

  handleBack2TopClick = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  render() {
    const {
      width, location, strings,
    } = this.props;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme, muiTheme)}>
        <StyledDiv {...this.props}>
          <Helmet
            defaultTitle={strings.title_default}
            titleTemplate={strings.title_template}
          />
          <Header location={location} />
          <StyledBodyDiv {...this.props}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/players/:playerId/:info?" component={Player} />
              <Route exact path="/guilds/player/:playerId" component={Guild} />
            </Switch>
          </StyledBodyDiv>
          <Footer location={location} width={width} />
          <button ref={this.setBack2TopRef} id="back2Top" title={strings.back2Top} onClick={this.handleBack2TopClick} type="button">
            <div>&#9650;</div>
            <div id="back2TopTxt">{strings.back2Top}</div>
          </button>
        </StyledDiv>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(App);
