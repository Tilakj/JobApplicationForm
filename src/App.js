import React from 'react';
import './App.css';
import { Link, Route, BrowserRouter } from 'react-router-dom'
import JobForm from './components/JobForm';
import Admin from './components/Admin';


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: '',
    }
  }

  toggleActive = (e) => {
    this.setState({ active: e.target.id })
  }
  render() {
    return (
      <BrowserRouter>
        <ul className="nav nav-tabs mt-3">
          <li className="nav-item">
            <Link to='/apply' className={`nav-link ${this.state.active === 'apply' && 'active'}`} onClick={this.toggleActive} id="apply" >Apply Job</Link>
          </li>
          <li className="nav-item">
            <Link to='/admin' className={`nav-link ${this.state.active === 'admin' && 'active'}`} onClick={this.toggleActive} id="admin">Admin</Link>
          </li>
        </ul>

        <Route path='/' render={() => <h1 className="mt-3">Job Portal</h1>} exact={true} />
        <Route path='/apply' render={() => <JobForm/>} />
        <Route path='/admin' component={Admin} />
      </BrowserRouter>
    )
  }
}

export default App;
