import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class TodoEdit extends Component {
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
    if (this.props.match && this.props.match.params.id) {
    axios.get('https://todo-app-azhoichik.herokuapp.com/todos/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
          ddate: new Date(response.data.ddate)
        })
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    axios.get('https://todo-app-azhoichik.herokuapp.com/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
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
    
    //if (this.props.match && this.props.match.params.id) {
    axios.post('https://todo-app-azhoichik.herokuapp.com/todos/update/' + this.props.match.params.id, todo)
      .then(res => console.log(res.data));
    
    window.location = '/';
    
  }

  render() {
    return (
    <div>
      <h3>Редактировать задачу</h3>
      <form onSubmit={this.onSubmit} className="todo-form">
        <div className="form-group">
          <label>Имя пользователя: </label>
          <select ref="userInput"
              required
              className="form-control"
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
              className="form-control"
              value={this.state.description}
              onChange={this.onEditDescription}
              />
        </div>
        <div>
          <label>Продолжительность (мин): </label>
          <input
              type="text"
              className="form-control"
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
        <button type="submit">Редактировать задачу</button>
        </div>
      </form>
    </div>
    )
  }
}