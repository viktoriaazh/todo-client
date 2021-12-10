import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav>
        <ul className="site-nav">
          
          <li>
          <Link to="/">ToDo List</Link>
          </li>
          <li>
          <Link to="/create">Создать ToDo</Link>
          </li>
          <li>
          <Link to="/user">Создать пользователя</Link>
          </li>
        </ul>
      </nav>
    );
  }
}