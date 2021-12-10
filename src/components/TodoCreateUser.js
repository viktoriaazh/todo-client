import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onEditUsername = this.onEditUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: ''
    }
  }

  onEditUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    }

    console.log(user);

    axios.post('https://todo-app-azhoichik.herokuapp.com/users/add', user)
      .then(res => console.log(res.data));

    this.setState({
      username: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Создать нового пользователя</h3>
        <form onSubmit={this.onSubmit} className="login-form">
          <div>
            <label>Имя пользователя: </label>
            <input  type="text"
                required
                value={this.state.username}
                onChange={this.onEditUsername}
                />
          </div>
            <button type="submit">Создать пользователя</button>
        </form>
      </div>
    )
  }
}