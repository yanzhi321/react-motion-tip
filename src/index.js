import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//引入react-router
import { Router, Route,browserHistory,IndexRoute } from 'react-router';

import Simple from './components/Simple';
import Chat from './components/Chat';
import Ball from './components/Ball';
import Mvclist from './components/Mvclist';
import Gallery from './components/Gallery';
import Chooser from './components/Chooser';
import Water from './components/Water';
import Draglist from './components/Draglist';

//配置路由  history={browserHistory} 可以让路由变得又优美一些
//IndexRoute默认加载的是主页
//这是配置路由

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Simple}/>
            <Route path="simple" component={Simple} />
            <Route path="chat" component={Chat}></Route>
            <Route path="Ball" component={Ball}></Route>
            <Route path="mvclist" component={Mvclist}></Route>
            <Route path="gallery" component={Gallery}></Route>
            <Route path="chooser" component={Chooser}></Route>
            <Route path="water" component={Water}></Route>
            <Route path="draglist" component={Draglist}></Route>
         </Route>
    </Router>),
    document.getElementById('app')
);

registerServiceWorker();
