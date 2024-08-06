import React, {FC, useState} from "react";
import SearchContainer from "../components/Search/SearchContainer";
import CardList from "../components/CardList/CardList";
import ErrorBoundary from "../services/ErrorBoundary";
import {constructor} from "@typescript-eslint/eslint-plugin";

const Home: FC = () =>{

    const [search, setSearch] = useState(localStorage.getItem("searchText") || "")

    return (
        <div>
            <SearchContainer
                search={search}
                setSearch={setSearch}
            />
            <hr />

            <ErrorBoundary>
                <CardList search={search}  setSearch={setSearch}/>
            </ErrorBoundary>
        </div>
    );
  }



export default Home;
