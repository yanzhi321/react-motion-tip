import React, { Component } from 'react';

//引入react-router link模块
import {Link,IndexLink} from 'react-router';
//import './components/static/css/basic.css';
import './App.css'
import './components/static/css/basic.css';

/*class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
*/
class App extends Component {
	
		render(){
			
			return (
				
				<div className="App">
						<div className = "header">
						
								<ul className="header_nav"> 
											{/*<li><IndexLink to="/" activeClassName="active">home</IndexLink></li>*/}
											<li><Link to="/"  activeClassName="active" onlyActiveOnIndex={true}>Simple</Link></li>
	                    <li><Link to="/chat" activeClassName="active" >Chat</Link></li>
	                    <li><Link to="/ball" activeClassName="active" >Ball</Link></li>
	                    <li><Link to="/mvclist" activeClassName="active">Mvclist</Link></li>
	                    <li><Link to="/gallery" activeClassName="active">Gallery</Link></li>
	                    <li><Link to="/chooser" activeClassName="active" >Chooser</Link></li>
	                    <li><Link to="/water" activeClassName="active" >Water</Link></li>
	                    <li><Link to="/draglist" activeClassName="active">Draglist</Link></li>
								</ul>
						
						</div>
						
						<div className="content">
                   {this.props.children}
            </div>
						
				</div>
				
				
			)
			
		}
		
}	

export default App;