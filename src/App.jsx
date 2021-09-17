import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route} from 'react-router-dom';

import Feed from './components/Feed';
import Detail from './components/Detail';
import BottomNav from './BottomNav'


import Header from './Header.jsx';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

const App = () => {
    return ( <div className = 'container' >
                <Header / >
                
                    <div className = "container-view" > 
                            <Switch>
                                <Route exact path={["/", "/activities"]} component={Feed} />
                                <Route path="/activities/:id" component={Detail} />
                            </Switch>
                            
                    </div>
                    
                    
        </div>
    );
};

ReactDOM.render(<BrowserRouter>< App / > </BrowserRouter> , document.getElementById('app'));

export default App;