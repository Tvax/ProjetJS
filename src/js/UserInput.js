import React, { Component } from 'react';
// import logo from '../ressources/logo.svg';
import '../css/App.css';
import 'whatwg-fetch'


class UserInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      word: '',
      title: '',
      userList: [],
      displayUser: '',
      bots: ['@first_tmrs_only@botsin.space', '@revolut@botsin.space', '9GAGTweets@botsin.space', 'autosport@botsin.space', 'autosportlive@botsin.space', 'cryptotweets@botsin.space', 'Dealabs@botsin.space', 'euronews@botsin.space', 'first_tmrs_only@botsin.space', 'LesNews@botsin.space']
    };
  }

  handleChange(value) {
    this.setState({
      word: value
    });
  }

  addToList(value) {
    var that = this;

    fetch('https://botsin.space/api/v1/accounts/search?q=' + value, {
      headers: new Headers({
        //'Content-Type': 'text/plain',
        'Authorization': 'Bearer ' + '8f532d3057374bc43d1d0a2fa4cdf3c132d848b750bee7d9e1f47ee313c3fc1e'
      })
    }).then(function(response) {
      return response.json();
    }).then(function(myJson) {
      //clean les duplicate en meme temps
      var newArray = that.state.userList.filter(function(user) { return user.name != myJson[0].username });

      newArray.push({
        name: myJson[0].username,
        followers: myJson[0].followers_count,
        avatar: myJson[0].avatar
      });

      that.setState({title: myJson[0].username + " added"})
      that.renderList(newArray);
    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ', error.message);
      alert("Username Invalid");
    });
  }

  rmFromList(username){
    //ne renvoit que ce que qui est different de username, donc ca le remove
    var tmp = this.state.userList.filter(function(user) { return user.name != username });
    this.renderList(tmp);
    this.setState({title: username + " removed"})
    this.setState({word: ''})
  }

  renderList(listTmp){
    var list = listTmp;
    var render = [];

    list.sort(function(a, b){
      const f1 = a.followers;
      const f2 = b.followers;

      const u1 = a.name.toUpperCase();
      const u2 = b.name.toUpperCase();

      //si ils ont le meme nombre de followers les trier par nom unicodement
      if(f1 == f2){
        if(u1 > u2) return 1;
        return -1;
      }
      return f2-f1;
    });

    const listItems = list.map(
      (user, i) => render.push(this.generateLayout(user, i))
    );

    this.setState({
      displayUser: render
    })

    this.setState({userList: list});

    console.log(this.state.userList);
  }

  generateLayout(user, i){
    return <tr>
    <th scope="row" class="text-center align-middle">{i}</th>
    <td class="text-center align-middle"><img src={user.avatar}/></td>
    <td class="text-center align-middle">{user.name}</td>
    <td class="text-center align-middle">{user.followers}</td>
    <td class="text-center align-middle"><button type="submit" value="Remove User" class="btn btn-info" onClick={() => this.rmFromList(user.name)}>Remove User</button></td>
    </tr>;
  }

  addBots(){
    const listItems = this.state.bots.map(
      (bot) => this.addToList(bot)
    )
  }

  render() {
    return (
      <div class="card">
      <div class="card-header">
      <ul class="nav nav-pills card-header-pills">
      <li class="nav-item margin-left">
      <input type="text" class="form-control" value={this.state.word} onChange={(event) =>this.handleChange(event.target.value)}/>
      </li>
      <li class="nav-item margin-left">
      <button type="submit" class="btn btn-info" onClick={() => this.addToList(this.state.word)}>Add User</button>
      </li>
      <li class="nav-item margin-left">
      <button type="submit" class="btn btn-info" onClick={() => this.addBots()}>Add Bots</button>
      </li>
      <li class="nav-item">

      </li>
      </ul>
      </div>

      <title>MF - { this.state.title }</title>


      <table class="table table-striped">
      <thead>
      <tr>
      <th class="text-center">#</th>
      <th class="text-center">Profile Picture</th>
      <th class="text-center">Username</th>
      <th class="text-center">Followers</th>
      <th></th>
      </tr>
      </thead>
      <tbody>

      {this.state.displayUser}

      </tbody>
      </table>
      </div>

    );
  }
}

export default UserInput;
