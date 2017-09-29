import React from 'react';
import {Motion, spring, TransitionMotion, presets} from 'react-motion';
import range from 'lodash.range';

import './static/css/draglist.css'



function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, val);
  return _arr;
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

//drag animate
const springConfig = {stiffness: 300, damping: 50};

let todosInit  = [
		        {time: 't1', data: {text: 'Board the plane', isDone: false}},
		        {time: 't2', data: {text: 'Sleep', isDone: false}},
		        {time: 't3', data: {text: 'Try to finish conference slides', isDone: false}},
		        {time: 't4', data: {text: 'Eat cheese and drink wine', isDone: false}},
					]
class  Draglist extends React.Component{
	
	
	constructor(props){
		super(props);
		
		this.state = {
			value:'',
			list:[],
			todos:todosInit,
			order: range(todosInit.length),
			topDeltaY: 0,
     	mouseY: 0,
      isPressed: false,
      originalPosOfLastPressed: 0,
		};
		
		this.lock = false;
	}
	
	
	componentDidMount(){
		
			window.addEventListener('touchmove', this.handleTouchMove);
	    window.addEventListener('touchend', this.handleMouseUp);
	    window.addEventListener('mousemove', this.handleMouseMove);
	    window.addEventListener('mouseup', this.handleMouseUp);
	    
	}
	
	//tempelets 
    componentWillUnmount(){  
        this.lock = true;  
    } 
	
	
	//input
	inputChange = ( {target: {value}} ) => {
		this.setState({value})
	}
	
	//keyBind
	keyBind = (e) =>{
		
		console.log("222")
		
		if(e.keyCode == 13 && this.state.order.length >= 0){
			
			if(this.state.value == ''){
				alert("Please input")
				return;
			}
			
			 e.preventDefault();
		    const newItem = {
		      time: 't' + Date.now(),
		      data: {text: this.state.value, isDone: false},
		    };
		    
            this.state.todos = [...this.state.todos, newItem];
		    e.target.value = '';
		    // append at head
		    this.setState({
		    	todos: this.state.todos,
		    	order:[this.state.todos.length - 1, ...this.state.order],
		    	value:e.target.value
		    });
		    console.log("33333")
		    //console.log(newItem)
		}
	}
	
	//add
	addData = (e) =>{
		
		//input is ''
			/*if(this.state.value == ''){
				alert("Please input")
				return;
			}*/
			
	    const newItem = {
	      time: 't'+ Date.now(),
	      data: {text: this.state.value, isDone: false},
	    };
	    
	    this.state.todos = [...this.state.todos, newItem];
	   
	  const input = this.refs.myInput;
	  input.value =this.state.value = '';

	   this.setState({
	    	todos:this.state.todos,
	    	order:[this.state.todos.length - 1, ...this.state.order],
	    	value:input.value
	    })
	    
	    // append at head
	   // this.setState({todos: [newItem].concat(this.state.todos)});
	    //添加之后为空
	  	//const input = this.refs.myInput;
	  	//input.value ='';
	  	
	}
	
	
	//romove
	removeData = () =>{
		
		this.setState({
			todos: this.state.todos.filter( ({data}) => data.isDone ),
			order: range(this.state.length)
		})
		console.log(this.state.todos.map((con,i) => {
			return i;
		}));
	}
	
	//delete
	deleteData = (date) =>{
		
		let index = -1;
		this.state.todos.forEach(({time}, i) => {
			if (time === date) {
				index = i;
			}
		});
		const newTodos = [...this.state.todos.slice(0, index), ...this.state.todos.slice(index + 1, this.state.todos.length)];

		const inOrderIndex = this.state.order.indexOf(index);
		let newOrder = [...this.state.order.slice(0, inOrderIndex), ...this.state.order.slice(inOrderIndex + 1, this.state.order.length)];
		newOrder = newOrder.map(i => {
			if (i > index) {
				return i - 1;
			}
			return i;
		});
		
		this.setState({
			todos:newTodos,
			order:newOrder
		})
		
	}
	
	//touch
	 handleTouchStart = (time, pressLocation, e) => {
    	this.handleMouseDown(time, pressLocation, e.touches[0]);
  	};
  

  handleTouchMove = (e) => {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  };

	
	handleMouseDown = (pos, pressY, {pageY}) => {
	    this.setState({
	      topDeltaY: pageY - pressY,
	      mouseY: pressY,
	      isPressed: true,
	      originalPosOfLastPressed: pos,
	    });
  };

  
  handleMouseMove = (e) => {
    const {isPressed, topDeltaY, order, originalPosOfLastPressed,todos} = this.state;
    //console.log({todos})
    //console.log({pageY})
    //console.log({topDeltaY})//距离顶部距离
    
    e.preventDefault();
    
    if (isPressed) {
      const mouseY = e.pageY - topDeltaY;
      const currentRow = clamp(Math.round(mouseY / 100), 0, order.length - 1);
      
      console.log('mouseY----'+mouseY);
      console.log('topDeltaY---'+topDeltaY)
      
      let newOrder = order;

      if (currentRow !== order.indexOf(originalPosOfLastPressed)){
        newOrder = reinsert(order, order.indexOf(originalPosOfLastPressed), currentRow);
        
      }
      this.setState({mouseY: mouseY, order: newOrder});
    }
    
  };

  handleMouseUp = () => {
    this.setState({isPressed: false, topDeltaY: 0});
  };
	
	
	render(){
  		const {mouseY, isPressed, topDeltay,  originalPosOfLastPressed, order, value ,todos} = this.state;
  		//console.log("order--- ", order)
  		//console.log({isPressed, topDeltay, order, originalPosOfLastPressed, todos})
  	let num =0;
        let that = this;
		return(
			<div>
				<h2>This is Todolist</h2>
				<div className="out-box">
					
						<div className="input-text">
							<input type="text" placeholder='Enter data' autoFocus onKeyUp = {this.keyBind} onChange = {this.inputChange} ref="myInput" />
							<button onClick={this.addData}>Add+{this.state.todos.length}</button>
							<button onClick={this.removeData}>Remove</button>
						</div>
						
						
						{/*<ul className="add-list" id="list-drag">
						
							{
								this.state.todos.map( (con,i) => {
										
									return <li key={con.key}>{i} --- {con.data.text} <button onClick={this.deleteData.bind(null,con.key)}> delete</button></li>
										
								})
							}
							
						</ul>*/}
						
						
						<ul className="demo8">
							{
								order.map( i => {
									const style = originalPosOfLastPressed === i && isPressed
							            ? {
							                scale: spring(1.1, springConfig),
							                shadow: spring(16, springConfig),//springConfig = {stiffness: 300, damping: 50};
							                y: mouseY,
							              }
							            : {
							                scale: spring(1, springConfig),
							                shadow: spring(1, springConfig),
							                y: spring( order.indexOf(i) * 100, springConfig),
							              };	
							              
									 return (
				
							            <Motion  style={style} key={todos[i].time}>
							              {({scale, shadow, y}) =>
							                <li
							                	
							                  onMouseDown={this.handleMouseDown.bind(null, i, y)}
							                   onTouchStart={this.handleTouchStart.bind(null, i, y)}
							                  className="demo8-item"
							                  style={{
							                    boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
							                    transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
							                    WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
							                    zIndex: i === originalPosOfLastPressed ? 99 : i,
							                   	
							                  }}>
							                
							                   {order.indexOf(i)}---{todos[i].data.text} -- <button className="destroy"  onClick={that.deleteData.bind(that,todos[i].time)}></button>
							                </li>
							              }
							            </Motion>
					          		)})
										}
							
						</ul>
						
					</div>
			</div>
		)
	}
	
}

export default Draglist;