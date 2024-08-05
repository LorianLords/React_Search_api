import React from "react";
import styles from "./Search.module.css";
import {fetchData} from "../../services/apiService";

interface searchInputState {
  inputText: string;
}

interface SearchContainerProps {
  onSearch: (searchItem: string) => void;
  search: string
}

class SearchContainer extends React.Component<SearchContainerProps, searchInputState> {
  constructor(props: SearchContainerProps) {
    super(props);
    this.state = {
      inputText: this.props.search,
    };
  }

  handleChange = (e) => {
    this.setState({ inputText: e.target.value });

  };


handleSubmit = (e) => {
  e.preventDefault();
  console.log(this.state.inputText)
  this.props.onSearch(this.state.inputText)
}
  render() {
    return (
      <header className={styles.container}>
        <h1>Search Container</h1>
        <div>
          <input
            type="text"
            value={this.state.inputText}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>Search</button>
        </div>
      </header>
    );
  }
}

export default SearchContainer;
