import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Loader, Card, Container, Grid
} from "semantic-ui-react";
import _ from "lodash";
import * as dataActions from "./CharacterList.actions";
import styles from "./CharacterList.module.scss";
import ListItem from "./CharacterList.Item.view";


class CharacterList extends Component {
  state = {
    prevYCoordinate: 0
  };

  componentDidMount() {
    this.props.actions.getCharacterListStart(this.state.page);

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };

    this.observer = new IntersectionObserver(
      this.handleObserverForInfiniteScroll,
      options
    );

    this.observer.observe(this.loadingRef);
  }

  handleObserverForInfiniteScroll = (entities, observer) => {
    const { page, actions, isLoading } = this.props;
    const y = entities[0].boundingClientRect.y;
    if (!isLoading && this.state.prevYCoordinate > y) {
      actions.triggerGetCharacterList(page + 1);
    }
    this.setState({ prevYCoordinate: y });
  }

  render() {
    const { characterList = [], isLoading } = this.props;
    return (
      <div>
        <Container className={styles.bodyContainer}>
          <Card.Group>
            <Grid>
              <Grid.Row>
                {!!characterList &&
                  _.map(characterList, (listItem, index) => (
                    <Grid.Column
                      className={styles.listColumn} mobile={8} tablet={8}
                      computer={4} key={index}>
                      <ListItem item={listItem} />
                    </Grid.Column>
                  ))}
              </Grid.Row>
              <div
                ref={loadingRef => (this.loadingRef = loadingRef)}
                className={styles.loadingContainer}>
                {isLoading && <Loader active inline="centered" content="Characters loading" />}
              </div>
            </Grid>
          </Card.Group>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ characterList }) => ({
  ...characterList
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(dataActions, dispatch)
});

CharacterList.propTypes = {
  actions: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  characterList: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  errorMessage: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterList);
