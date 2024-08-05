import React from "react";
import Card from "../Card/Card";
import styles from "./CardList.module.css";

import { CardProps } from "../../types/types";
import { fetchData } from "../../services/apiService";

/*
const items: CardProps[] = [
  /!*{ cardName: "Pepe", description: "you know what it is", img: cardImage },
  { cardName: "Lanfan", description: "you know what it is", img: cardImage },
  { cardName: "Peter", description: "you know what it is", img: cardImage },
  { cardName: "Goshua", description: "you know what it is", img: cardImage },
  { cardName: "Goshua", description: "you know what it is", img: cardImage },*!/
];
*/
interface CardListState {
  data: CardProps[] | [];
  loading: boolean;
  error: string | null;
  search: string | null;
}

interface CardListProps {
  search: string | null;
}
class CardList extends React.Component<CardListProps, CardListState> {
  constructor(props: CardListProps) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: null,
      search: this.props.search,
    };
    this.errorHandle = this.errorHandle.bind(this);
  }

  componentDidMount() {
    fetchData(this.state.search)
      .then((response) => {
        this.setState({
          ...this.state,
          data: response,
          loading: false,
        });
        console.log("Component did mount, state:", this.state);
      })
      .catch((error) => {
        this.setState({
          ...this.state,
          error: error.message,
          loading: false,
          data: [],
        });
        console.error("Error fetching data:", error);
      });
  }

  componentDidUpdate(prevProps: CardListProps) {
    if (prevProps.search !== this.props.search) {
      console.log("Component did update, new search:", this.props.search);
      fetchData(this.props.search)
        .then((response) => {
          this.setState({
            ...this.state,
            data: response,
            loading: false,
            search: this.props.search,
          });
          console.log("Updated state after fetch:", this.state);
        })
        .catch((error) => {
          this.setState({
            ...this.state,
            error: error.message,
            loading: false,
            data: [],
          });
          console.error("Error fetching data:", error);
        });
    }
  }
  errorHandle = () => {
    console.log("Error button clicked");

    this.setState({ ...this.state, error: "error" });
  };

  render() {
    const { data, loading, error } = this.state;

    if (error) {
      throw new Error("I crashed!");
    }
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div className={styles.cardList}>
        <div>
          <button onClick={this.errorHandle}>Error button</button>
        </div>

        {data.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            date_display={item.date_display}
            artist_display={item.artist_display}
            image={item.image}
          />
        ))}
      </div>
    );
  }
}

export default CardList;
