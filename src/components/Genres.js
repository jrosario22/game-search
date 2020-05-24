import React from "react";
import axios from "axios";
import Results from "./Results";
import "../index.css";
import "../css/Genres.css";

class Genres extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
    };
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.search();
  }

  search = () => {
    axios({
      method: "GET",
      url: "https://rawg-video-games-database.p.rapidapi.com/genres",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
        "x-rapidapi-key": "188d36923bmsh1cbb4c7515464c7p1c4e20jsne2bf8aced8f7",
        useQueryString: true,
      },
    })
      .then((response) => {
        console.log(response);
        console.log(response.data.results);
        this.setState({
          genres: response.data.results,
        });
        console.log(this.state);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const info = this.state.genres.map((genre) => <Results display={genre} />);
    return (
      <div>
        <div>
          <h1>Genres</h1>
        </div>
        <div className="flex-container">{info}</div>
      </div>
    );
  }
}
export default Genres;
