import * as React from "react";
import axios, { AxiosResponse } from "axios";

import "./InfoEntry.less";
import BookListing from "./BookListing";

interface ResponseObj {
    ref: string,
    score: number
}

export default class InfoEntry extends React.Component<{payloadFunc: Function},{searchArea: string, recentSearch: ResponseObj[], books: any[]}> {

    constructor(props: any) {
        super(props);
        this.state = {
            searchArea: "",
            recentSearch: [],
            books: []
        }
    }

    handleSearchChange(event: any) {
        this.setState({
            searchArea: event.target.value
        });
    }

    searchBooks() {
        console.log("SearchBooks")
        this.removeBooks();
        axios.post(
            `/search/${this.state.searchArea}`,
        ).then((response: AxiosResponse) => {
            // console.log("Response: " + JSON.stringify(response.data));
            this.setState({
                recentSearch: response.data
            })
            this.searchToBooks();
        });
    }

    searchToBooks() {
        const queryLim = 10;
        for(let i = 0; i < queryLim; i++) {
            axios.post(
                `/books/${this.state.recentSearch[i].ref}`,
            ).then((response: AxiosResponse) => {
                this.addBook(response.data, this.state.recentSearch[i]);
            });
        }
    }

    addBook(bookObj: any, searchResults: ResponseObj) {
        this.setState({
            books: [
                ...this.state.books,
                {
                    ...bookObj[0],
                    score: searchResults.score
                }
            ]
        });
    }

    removeBooks() {
        this.setState({
            books: []
        })
    }

    render() {
        return (
            <div className="InfoEntryPage">
                <div className="InfoContainer">
                    <div className="InfoTitleSection">
                        <h1>Cover This</h1>
                    </div>
                    <div className="InfoDataSection">
                        <h3>Search Books</h3>
                        <input 
                            type="text" 
                            title="bookTitle" 
                            value={this.state.searchArea} 
                            onChange={this.handleSearchChange.bind(this)}
                            onSubmit={()=>{this.searchBooks()}}
                        ></input>
                        <button onClick={()=>{this.searchBooks()}}>Submit</button>
                    </div>
                    <div className="InfoSearchedBooks">
                        <h3>Books</h3>
                        {this.state.books.map((val: any[]) => {
                            // val.map((val2: any) => {
                                console.log("Rendering Book Listings");
                                return(<BookListing bookObj={val} callBackFunction={this.props.payloadFunc}/>);
                            // });
                        })}
                    </div>
                </div>
            </div>
        );
    }
}