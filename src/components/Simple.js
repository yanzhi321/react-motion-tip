import React from 'react';
import {Motion, spring} from 'react-motion'

import './static/css/simple.css'

class Simple extends React.Component {
	
	constructor(props) {
    super(props);
    this.state = {
    	open: false,
    	hour:0,
    	minute:0,
    	second:0,
    	time:0
    };
    this.lock = false;
  };
	
	
	componentWillUnmount(){
		//移除dom及组件操作
		this.locak = true;
	}
	
	componentDidMount(){
		
		var func = function(){
			
			var date = new Date();
			var hours = date.getHours();
			var minutes = date.getMinutes();
			var seconds = date.getSeconds();
			
			this.setState({
				hour: hours < 10 ? '0' + hours : hours,
	    		minute: minutes <10 ? '0' + minutes : minutes,
	    		second: seconds <10 ? '0' + seconds : seconds
			})
		}.bind(this);
		
		func();
		setInterval(func,1000);
		
	}

	
  handleMouseDown = () => {
    this.setState({open: !this.state.open});
  };

  handleTouchStart = (e) => {
    e.preventDefault();
    this.handleMouseDown();
  };
	
	
  render() {
    return (
      <div>
	        <h1>This is simple</h1>
	        <h2>{new Date().toLocaleDateString()}</h2>
	        <h2>{new Date().toTimeString()}</h2>
	        
	        <h2>{new Date().toLocaleTimeString()}</h2> 
	        
	        <h1>{this.state.hour}:{this.state.minute}:{this.state.second}</h1>
	        
	        {/*触发事件按钮*/}
	       <button
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}>
          Toggle
        </button>

        <Motion style={{x: spring(this.state.open ? 400 : 0)}}>
          {({x}) =>
            // children is a callback which should accept the current value of
            // `style`
            <div className="demo0">
              <div className="demo0-block" style={{
                WebkitTransform: `translate3d(${x}px, 0, 0)`,
                transform: `translate3d(${x}px, 0, 0)`,
              }} />
            </div>
          }
        </Motion>
        	
      </div>
    );
  }
}

export default Simple;
