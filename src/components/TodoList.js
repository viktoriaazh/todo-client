import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';



const Todo = props => (
  <tr>
    <td>{props.todo.username}</td>
    <td>{props.todo.description}</td>
    <td>{props.todo.duration}</td>
    <td>{props.todo.date.substring(0,10)}</td>
    <td>{props.todo.ddate.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.todo._id}><TiEdit className="icon-edit" /></Link>  <RiCloseCircleLine className="icon-delete" onClick={() => { props.deleteTodo(props.todo._id) }} />
    </td>
  </tr>
)

export default class TodosList extends Component {
  constructor(props) {
    super(props);

    this.deleteTodo = this.deleteTodo.bind(this)

    this.state = {todos: []};
  }

  componentDidMount() {
    axios.get('https://todo-app-azhoichik.herokuapp.com/todos/')
      .then(response => {
        this.setState({ todos: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteTodo(id) {
    axios.delete('https://todo-app-azhoichik.herokuapp.com/todos/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      todos: this.state.todos.filter(el => el._id !== id)
    })
  }

  todoList() {
    return this.state.todos.map(currenttodo => {
      return <Todo todo={currenttodo} deleteTodo={this.deleteTodo} key={currenttodo._id}/>;
    })
  }

  render() {
    return (

      <div className="table-wrap">
        <h3>Активные задачи</h3>
        <table className="table-2">
          <thead>
            <tr>
              <th>Пользователь</th>
              <th>Описание задачи</th>
              <th>Продолжительность (мин)</th>
              <th>Начало</th>
              <th>Окончание</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            { this.todoList() }
          </tbody>
        </table>
      </div>
    )
  }
}