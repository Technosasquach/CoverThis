import * as React from "react";

export default class SearchContainer extends React.Component<{searchBooks: Function},{searchArea: string}> {

    constructor(props: any) {
        super(props);
        this.state = {
            searchArea: ""
        }
    }

    handleSearchChange(event: any) {
        this.setState({
            searchArea: event.target.value
        });
    }

    render() {
        return (
            <div className="InfoDataSection">
                <h3>Search Books</h3>
                <input 
                    type="text" 
                    title="bookTitle" 
                    value={this.state.searchArea} 
                    onChange={this.handleSearchChange.bind(this)}
                    onSubmit={()=>{this.props.searchBooks(this.state.searchArea)}}
                ></input>
                <button onClick={()=>{this.props.searchBooks(this.state.searchArea)}}>Submit</button>
            </div>
        );
    }
}