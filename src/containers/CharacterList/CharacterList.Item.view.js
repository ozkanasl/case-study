import React from "react";
import {
  Card, CardContent
} from "semantic-ui-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LazyImage from "../../components/LazyImage/LazyImage";
import styles from "./CharacterList.module.scss";

const ListItem = ({
  item
}) => {
  return (
    <Link to={{ pathname: `/${item.id}` }}>
      <Card className={styles.listCard}>
        <LazyImage
          src={item.image}
          className={styles.cardImage}
          alt={item.id} />
        <CardContent className={styles.cardContent}>
          <Card.Meta>
            <span className="date">{item.releaseYear}</span>
          </Card.Meta>
          <Card.Description className={styles.cardDescription}>
            {item.name}
          </Card.Description>
        </CardContent>
      </Card>
    </Link>
  );
};


ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string,
    releaseYear: PropTypes.string
  }).isRequired
};



export default ListItem;
