import React  from 'react';
import {StaggeredMotion, spring, presets} from 'react-motion';
import range from 'lodash.range';

import './static/css/chat.css';

class Chat extends React.Component {
	
	constructor(props){
    
		super(props)
		this.state = {
			x:250,
			y:300
    }
    
    this.lock = false;
	};
	
	componentDidMount(){
		
		window.addEventListener('mousemove',this.handleMouseMove);
		window.addEventListener('touchmove',this.handleTouchMove)
		
    };
  
    componentWillUnmount() {
        this.lock = false;
        window.removeEventListener('mousemove', this.handleMouseMove)
        window.removeEventListener('touchmove', this.handleTouchMove)
    }
	
	handleMouseMove = ({pageX:x,pageY:y}) =>{
		this.setState({x,y})
	};
	
	handleTouchMove = ({touches}) => {
		this.handleMouseMove(touches[0])
	};
	
	
	getStyles = (prevStyles) => {
        const endValue = prevStyles.map((_, i) => {
        return i === 0
            ? this.state
            : {
            x: spring(prevStyles[i - 1].x, presets.gentle),
            y: spring(prevStyles[i - 1].y, presets.gentle),
            };
        });
        return endValue;
    };
	
	
  render() {
    return (
      <div>
        <h1>This is Chat</h1>
        
         <StaggeredMotion
            defaultStyles={range(6).map(() => ({x: 0, y: 0}))}
            styles={this.getStyles}>
        {balls =>
          <div className="demo1">
            {balls.map(({x, y}, i) =>
              <div
                key={i}
                className={`demo1-ball ball-${i}`}
                style={{
                  WebkitTransform: `translate3d(${x - 25}px, ${y - 25}px, 0)`,
                  transform: `translate3d(${x - 25}px, ${y - 25}px, 0)`,
                  zIndex: balls.length - i,
                }} />
            )}
          </div>
        }
      </StaggeredMotion>
      </div>
    );
  }
}

export default Chat;
