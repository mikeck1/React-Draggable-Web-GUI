import React, { Component } from "react";

import Sidebar from "./Layouts/Sidebar";

import Widget from "./Layouts/Widget";

import Draggable from "react-draggable";

class App extends Component {
  constructor(props) {
    super(props);

    var handleToUpdateFromSidebar = this.handleToUpdateFromSidebar.bind(this);
    var removeWidgetByID = this.removeWidgetByID.bind(this);

    this.state = {
      arg1: "",
      viewIt: true,
      widgets: [],
      jasper: { name: "jasper", age: 28 }
    };
  }

  handleToUpdateFromSidebar(someArg) {
    if (this.checkIfAlreadyExists(someArg.key)) {
      alert("This application already exists");
    } else {
      let application = someArg;
      application.priority = this.state.widgets.length;
      this.state.widgets.push(application);
      this.setState({ arg1: application.key });

      this.forceUpdate();
    }
  }

  searchForIndexOfObjectByNameKey(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].key === nameKey) {
        // console.log("searchforindex returned " + i);
        return i;
      }
      // console.log("searchforindex returned " + myArray[i].key);
    }
    // console.log("searchforindex returned nthing" + nameKey);
  }
  checkIfAlreadyExists(nameOfApplication) {
    for (var x = 0; x < this.state.widgets.length; x++) {
      if (this.state.widgets[x].key === nameOfApplication) {
        return true;
      }
    }
    return false;
  }
  removeWidgetByID(key) {
    let index = this.searchForIndexOfObjectByNameKey(key, this.state.widgets);
    if (index > -1) {
      let widgetCpy = this.state.widgets;
      widgetCpy.splice(index, 1);
      this.setState({ widgets: widgetCpy });
      // console.log("in remove widget +");
      // console.log(widgetCpy);
    }
  }

  eventLogger = (e: MouseEvent, data: Object) => {
    // console.log("Event: ", e);
    // console.log("Data: ", data);
  };

  handleDrag = (deltaX, deltaY) => {
    this.setState({
      left: this.state.left + deltaX,

      top: this.state.top + deltaY
    });
  };

  handleShow = () => this.setState({ show: true });

  turnOnWidget = (e: MouseEvent, data: Object) => {
    this.priority = 1;

    // console.log(this.priority);

    // console.log("Event: ", e);

    // console.log("Data: ", data);
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (false) {
      return false;
    }

    this.forceUpdate();

    return true;
  }

  activateLasers = () => {
    this.setState({ viewIt: "false" });

    this.setState({ priority: "10" });

    this.shouldComponentUpdate(this.props, this.state);
  };

  changeZIndexHelper = (prevState, key) => {
    let widgetsCopy = this.state.widgets;
    let nextLowest = { priority: 0, index: 0 };
    let first = false;
    for (var x = 0; x < widgetsCopy.length; x++) {
      for (var y = 0; y < widgetsCopy.length; y++) {
        if (widgetsCopy[y].key === key && !false) {
          widgetsCopy[y].priority = widgetsCopy.length - 1;
          nextLowest.priority = widgetsCopy[y].priority - 1;
          nextLowest.index = y;

          first = true;
          continue;
        }

        if (
          y != nextLowest.index &&
          nextLowest.priority + 1 === widgetsCopy[y].priority &&
          first
        ) {
          widgetsCopy[y].priority = nextLowest.priority;
          nextLowest.index = y;
          nextLowest.priority -= 1;
        }
      }
    }
    this.setState({ widgets: widgetsCopy });
  };

  render() {
    for (var x in this.state.widgets) {
    }
    var removeWidgetByID = this.removeWidgetByID;

    var handleToUpdateFromSidebar = this.handleToUpdateFromSidebar;

    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };

    if (this.state.widgets.length === 0) {
      return (
        <div id="header">
          <Sidebar
            handleToUpdateFromSidebar={handleToUpdateFromSidebar.bind(this)}
          />
        </div>
      );
    } else {
      // console.log("all widgets");
      // for (var x = 0; x < this.state.widgets.length; x++) {
      //   console.log(this.state.widgets[x]);
      // }
      return (
        <div id="box">
          <Sidebar
            handleToUpdateFromSidebar={handleToUpdateFromSidebar.bind(this)}
          />
          {this.state.widgets.map(obj => {
            return (
              <Draggable
                onMouseDown={() => this.changeZIndexHelper(this.state, obj.key)}
                onDrag={this.turnOnWidget}
                grid={[25, 25]}
                {...dragHandlers}
              >
                <div
                  style={{
                    zIndex: obj.priority,
                    position: "absolute",
                    top: 0,
                    left: 0
                  }}
                >
                  <Widget
                    removeWidgetByID={removeWidgetByID.bind(this)}
                    show={this.state.viewIt}
                    title={obj.key}
                  />
                </div>
              </Draggable>
            );
          })}
        </div>
      );
    }
  }
}

export default App;
