import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import converter from 'json-2-csv';
import players from './players.json';
import './App.css';
import { formatPercent, filter, sortFormattedNumber } from './helpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.copy = this.copy.bind(this);
    this.write = this.write.bind(this);
    this.state = {
      players: players,
      sort: ''
    };
  }
  copy() {
    const csv = converter.json2csv(players, this.write);
  }
  write(e, csv) {
    this.setState({ csv });
  }
  render() {
    return (
      <>
        <ReactTable
          defaultPageSize={10}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
          className='-striped -highlight'
          data={this.state.players}
          columns={[
            {
              Header: 'Games Played',
              accessor: 'gamesPlayed',
              filterMethod: filter.greaterThan
            },
            {
              Header: '#',
              accessor: 'number'
            },
            {
              Header: 'Name',
              accessor: 'name',
              filterMethod: filter.contains
            },
            {
              Header: 'Team',
              accessor: 'team'
            },
            {
              Header: 'G',
              accessor: 'goals',
              filterMethod: filter.greaterThan
            },
            {
              Header: 'A',
              accessor: 'assists',
              filterMethod: filter.greaterThan
            },
            {
              Header: 'P',
              accessor: 'points',
              filterMethod: filter.greaterThan
            },
            {
              Header: 'SoG',
              accessor: 'shotsOnGoal',
              filterMethod: filter.greaterThan
            },
            {
              Header: 'GF',
              accessor: 'goalsFor',
              filterMethod: filter.greaterThan
            },
            {
              Header: 'GA',
              accessor: 'goalsAgainst',
              filterMethod: filter.greaterThan
            },
            {
              id: 'gf%',
              Header: 'GF%',
              accessor: s => formatPercent(s.goalsForPct),
              sortMethod: sortFormattedNumber,
              filterMethod: filter.greaterThan
            },
            {
              id: 'shotPct',
              Header: 'Shot %',
              accessor: s => formatPercent(s.shotPct),
              sortMethod: sortFormattedNumber,
              filterMethod: filter.greaterThan
            }
          ]}
        />
        <a
          href={`data:text/plain;charset=utf-8, ${encodeURIComponent(
            this.state.csv
          )}`}
          download='players.csv'
        >
          <button onClick={this.copy}>Download</button>
        </a>
      </>
    );
  }
}

export default App;
