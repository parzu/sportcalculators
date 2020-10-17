import React from "react";
import TextField from "@material-ui/core/TextField";
import * as time from "../services/timeService.js";

class TimeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: "",
      minutes: "",
      seconds: "",
    };

    if (typeof this.props.defaultValues !== "undefined") {
      if (typeof this.props.defaultValues.hours !== "undefined") {
        this.state.hours = this.props.defaultValues.hours;
      }
      if (typeof this.props.defaultValues.minutes !== "undefined") {
        this.state.minutes = this.props.defaultValues.minutes;
      }
      if (typeof this.props.defaultValues.seconds !== "undefined") {
        this.state.seconds = this.props.defaultValues.seconds;
      }
    }
  }

  handleTimeChange(event) {
    this.setState(
      { [event.target.name]: event.target.value },
      this.timeChanged
    );
  }

  timeChanged() {
    this.props.onTimeChange(
      event.target.id,
      time.timeToSeconds(
        this.state.hours,
        this.state.minutes,
        this.state.seconds
      ),
      event.target.name
    );
  }

  buildInputField(name, shortName, tag, useShortNames, hide) {
    if (!useShortNames) {
      shortName = name;
    }
    let html = (
      <div style={{ flexBasis: "30%" }} key={name} className="timeIntputChild">
        <TextField
          id={tag}
          name={name}
          label={shortName}
          type="number"
          value={this.state[name]}
          onChange={this.handleTimeChange.bind(this)}
          style={{ verticalAlign: "inherit" }}
        />
      </div>
    );
    if (hide) {
      html = (
        <div
          style={{
            flexBasis: "30%",
            maxHeight: "40px",
            verticalAlign: "inherit",
          }}
          key={name}
          className="timeIntputChild"
        ></div>
      );
    }
    return html;
  }

  render() {
    let html = [];
    html.push(
      this.buildInputField(
        "hours",
        "hrs",
        this.props.tag,
        this.props.shortNames,
        this.props.hideHours
      )
    );
    html.push(
      this.buildInputField(
        "minutes",
        "mins",
        this.props.tag,
        this.props.shortNames
      )
    );
    html.push(
      this.buildInputField(
        "seconds",
        "secs",
        this.props.tag,
        this.props.shortNames
      )
    );

    return (
      <div className="timeInputParent">
        <style jsx>{`
          .timeInputParent {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
          }
        `}</style>
        {html}
      </div>
    );
  }
}

export default TimeInput;
