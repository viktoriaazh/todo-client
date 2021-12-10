import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);

    this.onEditUsername = this.onEditUsername.bind(this);
    this.onEditDescription = this.onEditDescription.bind(this);
    this.onEditDuration = this.onEditDuration.bind(this);
    this.onEditDate = this.onEditDate.bind(this);
    this.onEditDueDate = this.onEditDueDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      ddate: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('https://todo-app-azhoichik.herokuapp.com/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onEditUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onEditDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onEditDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onEditDate(date) {
    this.setState({
      date: date
    })
  }

  onEditDueDate(date) {
    this.setState({
      ddate: date
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const todo = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
      ddate: this.state.ddate
    }

    console.log(todo);

    axios.post('https://todo-app-azhoichik.herokuapp.com/todos/add', todo)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Новая задача</h3>
      <form onSubmit={this.onSubmit} className="todo-form">
        <div>
          <label>Имя пользователя: </label>
          <select ref="userInput"
              required
              value={this.state.username}
              onChange={this.onEditUsername}>
              {
                this.state.users.map(function(user) {
                  return <option
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div>
          <label>Описание задачи: </label>
          <input  type="text"
              required
              value={this.state.description}
              onChange={this.onEditDescription}
              />
        </div>
        <div>
          <label>Продолжительность (минуты): </label>
          <input
              type="text"
              value={this.state.duration}
              onChange={this.onEditDuration}
              />
        </div>
        <div>
          <label>Начало выполнения: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onEditDate}
            />
          </div>
        </div>
        <div>
          <label>Окончание: </label>
          <div>
            <DatePicker
              selected={this.state.ddate}
              onChange={this.onEditDueDate}
            />
          </div>
        </div>
          <div>
          <button type="submit">Добавить задачу</button>
        </div>
      </form>
    </div>
    )
  }
}