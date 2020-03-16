import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Loader, Image, Button, Card, Container, List, Table, Message } from "semantic-ui-react";
import _ from "lodash";
import * as dataActions from "./CharacterDetails.actions";
import LazyImage from "../../components/LazyImage/LazyImage";
import styles from "./CharacterDetails.module.scss";


class CharacterDetails extends Component {

  componentDidMount() {
    const { match, actions } = this.props;
    const { id } = match.params;
    actions.getCharacterDetailsStart(id);
  }

  backToCharacterPage = () => {
    const { history } = this.props;
    history.push("/");
  }

  render() {
    const { characterDetails, getEpisodesDetails, isLoading } = this.props;

    if (isLoading) {
      return <div><Loader style={{ display: "block" }} content="Character loading" /></div>;
    }
    return (
      <div>
        <Container className={styles.bodyContainer}>
          <div className={styles.buttonContainer}>
            <Button
              onClick={this.backToCharacterPage} color="red" content="Back To Character Page"
              size="big" icon="left arrow" labelPosition="left" />
          </div>
          <Card centered className="stock-card">
            <LazyImage
              src={characterDetails.image}
              alt={characterDetails.id} />
            <Card.Content>
              <Table unstackable basic="very">
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Name:</Table.Cell>
                    <Table.Cell textAlign="right">{characterDetails.name}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Origin:</Table.Cell>
                    <Table.Cell textAlign="right">{_.get(characterDetails.origin, "name")}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Status:</Table.Cell>
                    <Table.Cell textAlign="right">{characterDetails.status}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Gender:</Table.Cell>
                    <Table.Cell textAlign="right">{characterDetails.gender}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              Last Episodes:
              <List as="ul">
                {
                  !!getEpisodesDetails && _.map(getEpisodesDetails, (episodeItem, index) =>
                    <List.Item as="li" key={index}>{episodeItem.data.name} / {episodeItem.data.episode}</List.Item>
                  )}
              </List>
            </Card.Content>
          </Card>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ characterDetails }) => ({
  ...characterDetails
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(dataActions, dispatch)
  };
};


CharacterDetails.propTypes = {
  getEpisodesDetails: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  errorMessage: PropTypes.string,
  characterDetails: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    origin: PropTypes.object,
    status: PropTypes.string,
    gender: PropTypes.string,
    image: PropTypes.string
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetails);
