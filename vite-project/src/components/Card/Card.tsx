import React, { Component } from "react";
import styles from "./Card.module.css";
import { CardProps } from "../../types/types";
import img from "../../assets/react.svg"
class Card extends Component<CardProps, object> {
  render() {

      {/*`${this.props.img}`*/}
    return (
      <div className={styles.card}>
        <img src={this.props.image || img} alt="" />
        <h2>{this.props.title}</h2>
          <p>{this.props.date_display}</p>
        <p>{this.props.artist_display}</p>
      </div>
    );
  }
}

export default Card;
