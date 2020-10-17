import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDateChange = this.onDateChange.bind(this);

    this.state = {
      username: "",
      description: "",
      duration: "",
      date: new Date(),
      users: [],
    };
  }

  componentDidMount = () => {
    axios.get("http://localhost:5000/users/").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((u) => u.username),
          username: res.data[0].username,
        });
      }
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onDateChange = (date) => {
    this.setState({
      date: date,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };
    console.log(exercise);
    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => console.log(res.data));
  };

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <select
              name="username"
              className="form-control"
              value={this.state.username}
              onChange={this.onChange}
            >
              {this.state.users.map((u) => {
                return (
                  <option key={u} value={u}>
                    {u}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              className="form-control"
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration (minutes): </label>
            <input
              type="text"
              name="duration"
              className="form-control"
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date: </label>
            <div>
              <DatePicker
                name="date"
                selected={this.state.date}
                onChange={this.onDateChange}
              />
            </div>
          </div>
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </form>
      </div>
    );
  }
}
