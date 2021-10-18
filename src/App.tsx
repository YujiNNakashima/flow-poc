import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Layouting from './flow-pages/layouting-with-dagre'
import formatTreeToGraph, {data} from './treeToGraph'

function App() {

  const res = formatTreeToGraph(data)

  console.log(res)
  return (
   <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Layouting</Link>
            </li>
   
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>

          <Route path="/">
            <Layouting data={res}/>
          </Route>
        </Switch>
      </div>
   </Router>
  );
}

export default App;
