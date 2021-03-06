import React from "react";
import axios from "axios";
import Results from "./Results";
import "../index.css";
import "../css/Platforms.css";

class Platforms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      platforms: [],
    };
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.search();
  }

  search = () => {
    axios({
      method: "GET",
      url: "https://rawg-video-games-database.p.rapidapi.com/platforms",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        useQueryString: true,
      },
    })
      .then((response) => {
        console.log(response);
        console.log(response.data.results);
        this.setState({
          platforms: response.data.results,
        });
        console.log(this.state);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const info = this.state.platforms.map((platform) => (
      <Results display={platform} />
    ));
    return (
      <div>
        <div>
          <h1>Platforms</h1>
        </div>
        <div className="flex-container">{info}</div>
      </div>
    );
  }
}
export default Platforms;
