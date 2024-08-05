import React from "react";
import SearchContainer from "../components/Search/SearchContainer";
import CardList from "../components/CardList/CardList";


interface HomeInputState {
    search: string;
}

class Home  extends React.Component<object,HomeInputState>{

    constructor(props) {
        super(props);
        this.state = {
            search: localStorage.getItem("searchText") || '',
        };
    }

    handleSearch = (inputText) => {
        this.setState({search: inputText});
        localStorage.setItem("searchText", inputText);

    };
    render() {
        return(
            <div>

                <SearchContainer search={this.state.search} onSearch={this.handleSearch} />
                <CardList search={this.state.search}/>
            </div>
        );
    }

}

export default Home;