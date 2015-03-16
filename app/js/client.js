'use strict';

var React = require('react');
var ajax = require('jquery').ajax;

var unicornsData = [
  {unicornName: 'Pointy', unicornAge: '420', _id: 1},
  {unicornName: 'Freddy', unicornAge: '100', _id: 2}
];

var UnicornForm = React.createClass({
  getInitialState: function () {
    return {newUnicorn: {unicornName:'', unicornAge: ''}};
  },
  handleChange: function(event){
    event.preventDefault();

    var stateCopy = this.state;
    if (event.target.name === 'newUnicornName')
      stateCopy.newUnicorn.unicornName = event.target.value;
    if (event.target.name === 'newUnicornAge')
      stateCopy.newUnicorn.unicornAge = event.target.value;

    this.setState(stateCopy);
  },
  handleSubmit: function(event) {
    event.preventDefault();
    console.log(this.state.newUnicorn);
    var newUnicorn = this.state.newUnicorn;
    ajax({
      url: this.props.url,
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify(newUnicorn),
      success: function(data) {
        this.props.onNewUnicornSubmit(data);
        this.setState({newUnicorn: {unicornBody: ''}});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
      <label htmlFor="newUnicorn">New Unicorn</label>
        <input id="newUnicornName" type="text" value={this.state.newUnicorn.unicornName} name = "newUnicornName" onChange={this.handleChange} />
        <input id="newUnicornAge" type="text" value={this.state.newUnicorn.unicornAge} name = "newUnicornAge" onChange={this.handleChange} />
        <button type="submit">Create Unicorn</button>
      </form>
    )
  }
});

var Unicorn = React.createClass({
  render: function() {
    return (
      <ul>
        <li>
          {this.props.data.unicornName}
        </li>
        <li>
          {this.props.data.unicornAge}
        </li>
      </ul>
    )
  }
});

var UnicornList = React.createClass({
  render: function() {
    var unicorns = this.props.data.map(function(unicorn) {
      return <Unicorn data={unicorn} key={unicorn._id}/>
    });
    return (
      <section>
        <h1>Unicorns:</h1>
        <ul>
          {unicorns}
        </ul>
      </section>
    )
  }
});

var UnicornsApp = React.createClass({
  getInitialState: function() {
    return {unicornsData: []};
  },
  onNewUnicorn: function(unicorn) {
    unicorn._id = this.state.unicornsData.length
    var stateCopy = this.state;
    stateCopy.unicornsData.push(unicorn);
    this.setState(stateCopy);
  },
  componentDidMount: function() {
    ajax({
      url:this.props.unicornsBaseUrl,
      dataType: 'json',
      success: function(data) {
        var state = this.state;
        state.unicornsData = data;
        this.setState(state);
      }.bind(this),
      error: function(xhr, status) {
          console.log(xhr, status);
      }
    });
  },
  render: function() {
    return (
      <main>
        <UnicornForm onNewUnicornSubmit={this.onNewUnicorn} url={this.props.unicornsBaseUrl}/>
        <UnicornList data={this.state.unicornsData} />
      </main>
    )
  }
});

React.render(<UnicornsApp unicornsBaseUrl={'/api/unicorns'} />, document.body);
