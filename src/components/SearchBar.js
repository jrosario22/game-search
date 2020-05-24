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
      description: "",
      released: "",
      rating: "",
      website: "",
      image: "",
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
              description: response.data.description,
              released: response.data.released,
              rating: response.data.rating,
              website: response.data.website,
              image: response.data.background_image,
            });
          });
        }
      })
      .then((response) => {
        console.log(response);
        this.setState({
          name: response.data.name,
          description: response.data.description,
          released: response.data.released,
          rating: response.data.rating,
          website: response.data.website,
          image: response.data.background_image,
        });
        console.log(this.state);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  // redirect = () => {
  //   searchName = response.data.slug;
  //   axios({
  //     method: "GET",
  //     url: `https://rawg-video-games-database.p.rapidapi.com/games/${searchName}`,
  //     headers: {
  //       "content-type": "application/octet-stream",
  //       "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
  //       "x-rapidapi-key": "188d36923bmsh1cbb4c7515464c7p1c4e20jsne2bf8aced8f7",
  //       useQueryString: true,
  //     },
  //   }).then((response) => {
  //     console.log(response);
  //     this.setState({
  //       name: response.data.name,
  //       description: response.data.description,
  //       released: response.data.released,
  //       rating: response.data.rating,
  //       website: response.data.website,
  //       image: response.data.background_image,
  //     });
  //     console.log(this.state);
  //   });
  // };

  render() {
    return (
      <div>
        <form className="searchbar-container" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Seach" onChange={this.handleChange} />
        </form>
        <div>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={this.state.image} />
            <Card.Body>
              <Card.Title>{this.state.name}</Card.Title>
              <Card.Body>{this.state.description}</Card.Body>
              <Card.Text>{this.state.released}</Card.Text>
              <Card.Text>{this.state.rating}</Card.Text>
              {/* <Card.Text>
                <a
                  href={this.state.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Site
                </a>
              </Card.Text> */}
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
export default SearchBar;
