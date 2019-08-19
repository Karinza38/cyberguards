import React, { Component } from "react";
import {
  Header,
  Button,
  Checkbox,
  Form,
  Container,
  Card,
  Grid
} from "semantic-ui-react";
import Ballot from "../blockvote/deployed/ballot";
import Candidate from "../blockvote/deployed/candidate";

class Result extends Component {
  state = {
    winnerInfo: {},
    count: 0
  };

  static async getInitialProps(props) {
    const { ward } = props.query;
    return {
      ward
    };
  }

  async componentDidMount() {
    let winner = await Ballot.methods.displayelected(this.props.ward).call();
    let candidate = await Candidate(winner);
    let winnerInfo = await candidate.methods.returnCandidateInfo().call();
    console.log(winnerInfo);
    let info = {
      name: winnerInfo[0],
      aadhaar: winnerInfo[1],
      party: winnerInfo[2]
    };
    let count = await candidate.methods.returnvotecount().call();
    this.setState({ winnerInfo: info, count: count });
  }

  render() {
    return (
      <Container>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />

        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h1" textAlign="center" style={{ margin: "20px" }}>
              Result Ward Elections 2019
            </Header>
            <Header as="h2" textAlign="center" style={{ marginBottom: "20px" }}>
              Winning Candidate from Ward No. {this.props.ward}
            </Header>
            <div className="ui centered cards" style={{ margin: "20px" }}>
              <div className="ui card">
                <div className="content">
                  <Header as="h1" style={{ margin: "20px" }}>
                    {this.state.winnerInfo.name}
                  </Header>
                  <Header as="h2" style={{ margin: "20px" }}>
                    {this.state.winnerInfo.party}
                  </Header>
                  <Header as="h3" style={{ margin: "20px" }}>
                    Total Vote Count: {this.state.count}
                  </Header>
                </div>
              </div>
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Result;
