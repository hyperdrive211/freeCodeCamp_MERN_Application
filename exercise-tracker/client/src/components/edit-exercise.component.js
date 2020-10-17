import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class EditExercises extends Component {
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
    axios
      .get("http://localhost:5000/exercises/" + this.props.match.params.id)
      .then((res) => {
        console.log(res);
        this.setState({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date),
        });
      })
      .catch((err) => console.log(err));

    axios.get("http://localhost:5000/users/").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((u) => u.username),
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
    axios
      .post(
        "http://localhost:5000/exercises/update/" + this.props.match.params.id,
        exercise
      )
      .then((res) => console.log(res.data));
  };
  render() {
    return (
      <div>
        <h3>Edit Existing Exercise Log</h3>
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
              value={this.state.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration (minutes): </label>
            <input
              type="text"
              name="duration"
              className="form-control"
              onChange={this.onChange}
              value={this.state.duration}
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
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </form>
      </div>
    );
  }
}
