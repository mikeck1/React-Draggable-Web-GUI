import React from "react";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";
import Cardpage from "./Cardpage";
import "bootstrap/dist/css/bootstrap.min.css";

class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
  }

  render() {
    var removeWidgetByID = this.props.removeWidgetByID;
    // console.log("In Widget: " + this.props.title);
    return (
      <Toast
        onClose={() => removeWidgetByID(this.props.title)}
        dismissible="true"
      >
        <Toast.Header>
          <strong className="mr-auto">{this.props.title}</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>
          <Cardpage />
        </Toast.Body>
      </Toast>
    );
  }
}

export default Widget;
