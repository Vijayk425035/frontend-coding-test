import React from "react";
import "./style.css";
import Episodes from "./Episodes";

class App extends React.Component {
  state = {
    searchResult: null,
    keyword: "The office",
    selectedShow: null
  };

  componentDidMount() {
    this.updateSearch(this.state.keyword);
  }

  updateSearch = keyword => {
    fetch("https://api.tvmaze.com/search/shows?q=" + keyword)
      .then(res => res.json())
      .then(result => {
        console.log(result);
        this.setState({
          searchResult: result,
          selectedShow: null
        });
      });
  };

  onSelectShow = show => {
    this.setState({
      selectedShow: show,
      keyword: ""
    });
  };

  render() {
    return (
      <div>
        <nav>Show Finder</nav>
        <div className="search-form">
          <input
            value={this.state.keyword}
            placeholder="search show titles"
            onChange={e => {
              this.setState({ keyword: e.target.value });
            }}
            onKeyDown={e => {
              e.key === "Enter" && this.updateSearch(this.state.keyword);
            }}
          />
          <button
            onClick={() => {
              this.updateSearch(this.state.keyword);
            }}
          >
            Search
          </button>
        </div>
        <div>
          {!this.state.selectedShow && (
            <ul>
              {this.state.searchResult &&
                this.state.searchResult.map((el, i) => (
                  <li key={i}>
                    <div>
                      {el.show.image && el.show.image.medium && (
                        <img
                          src={el.show.image.medium.toString().substring(5)}
                        />
                      )}
                    </div>
                    <div>
                      <h1>{el.show.name}</h1>
                      <div
                        dangerouslySetInnerHTML={{ __html: el.show.summary }}
                      />
                      <button onClick={() => this.onSelectShow(el.show)}>
                        Show Episodes
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          )}
          {this.state.selectedShow && (
            <Episodes show={this.state.selectedShow} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
