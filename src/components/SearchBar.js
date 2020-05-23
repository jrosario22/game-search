import React from "react";
import axios from "axios";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props,
      name: "",
      description: "",
      released: "",
      rating: "",
      website: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.search = this.search.bind(this);
  }

  //For when input is being placed
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  //For when search field is empty
  handleSubmit(event) {
    this.search();
    event.preventDefault();
  }

  search = () => {
    axios({
      method: "GET",
      url: `https://rawg-video-games-database.p.rapidapi.com/games/${this.state.value}`,
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
        "x-rapidapi-key": "188d36923bmsh1cbb4c7515464c7p1c4e20jsne2bf8aced8f7",
        useQueryString: true,
      },
    })
      .then((response) => {
        console.log(response);
        this.setState({
          name: response.data.name,
          description: response.data.description,
          released: response.data.released,
          rating: response.data.rating,
          website: response.data.website,
        });
        console.log(this.state);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="" onChange={this.handleChange} />
          <button type="submit"></button>
        </form>
        <div>
          {this.state.name}
          {this.state.description}
          {this.state.released}
          {this.state.rating}
          {this.state.website}
        </div>
      </div>
    );
  }
}
export default SearchBar;
