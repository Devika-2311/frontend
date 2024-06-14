import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PolicyComponent from './policy';
import PolicyComponent1 from './policycal';
import PolicyComponent2 from './policyterm';
import LoginComponent from './loginpage';
import ParentComponent from './parent';
import TermPolicyForm from './termform';
import PolicyNav from './policynav';
import AutoPolicyDetails from './autopolicy';
import TermPolicyDetails from './termpolicy';

function App() {
  return (
    <div className="App">
      {/* <PolicyComponent/> 
       <PolicyComponent1/> 
       <PolicyComponent2/> 
      <Router>
            <Routes>
                <Route exact path="/loginpage" component={LoginComponent} />
                <Route path="/policyterm" component={PolicyComponent2} />
                {/* Other routes */}
            
      
        <LoginComponent/>
        {/* <Router>
    <Routes>
      <Route path="/" element={<LoginComponent/>} />
      <Route path="/autopolicy" element={<AutoPolicyDetails />} />
      <Route path="/termpolicy" element={<TermPolicyDetails/>} />
    </Routes>
    
    </Router> */}
        {/* <Router>
          <Routes>
        <Route path="/termform" component={TermPolicyForm} />
        </Routes>
        </Router> */}
        {/* <TermPolicyForm/> */}
    </div>
  );
}

export default App;
