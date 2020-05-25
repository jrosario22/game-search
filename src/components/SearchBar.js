import React from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import "../css/SearchBar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props,
      name: "",
      released: "",
      rating: "",
      website: "",
      image: "",
      isShown: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.search = this.search.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.search();
    event.preventDefault();
  }

  search = () => {
    let searchName = this.state.value.replace(/\s/g, "-");
    axios({
      method: "GET",
      url: `https://rawg-video-games-database.p.rapidapi.com/games/${searchName}`,
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
        "x-rapidapi-key": "188d36923bmsh1cbb4c7515464c7p1c4e20jsne2bf8aced8f7",
        useQueryString: true,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.data.redirect) {
          searchName = response.data.slug;
          axios({
            method: "GET",
            url: `https://rawg-video-games-database.p.rapidapi.com/games/${searchName}`,
            headers: {
              "content-type": "application/octet-stream",
              "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
              "x-rapidapi-key":
                "188d36923bmsh1cbb4c7515464c7p1c4e20jsne2bf8aced8f7",
              useQueryString: true,
            },
          }).then((response) => {
            console.log(response);
            this.setState({
              name: response.data.name,
              released: response.data.released,
              rating: response.data.rating,
              website: response.data.website,
              image: response.data.background_image,
              isShown: true,
            });
          });
        } else {
          console.log(response);
          this.setState({
            name: response.data.name,
            description: response.data.description,
            released: response.data.released,
            rating: response.data.rating,
            website: response.data.website,
            image: response.data.background_image,
            isShown: true,
          });
          console.log(this.state);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const isShown = this.state.isShown;
    let card;

    if (isShown) {
      card = (
        <Card style={{ width: "18rem" }} onClick={this.state.website}>
          <Card.Img variant="top" src={this.state.image} />
          <Card.Body>
            <Card.Title>{this.state.name}</Card.Title>
            <Card.Text>Released: {this.state.released}</Card.Text>
            <Card.Text>Rating: {this.state.rating}</Card.Text>
          </Card.Body>
        </Card>
      );
    } else {
      card = null;
    }

    return (
      <div>
        <form className="searchbar-container" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            onChange={this.handleChange}
          />
        </form>
        <div className="flex-container">{card}</div>
      </div>
    );
  }
}
export default SearchBar;
