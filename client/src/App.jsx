import {Routes,Route} from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Navbar from './components/Navbar'
import ContactUs from './components/ContactUs'
import About from './components/About'
// import Settings from './components/Settings'
// import Profile from './components/Profile'
import Home from './components/Home'
import Chat from './components/Chat'
import Dashboard from './components/Dashboard'
import DetectDisease from './components/detectDisease'
import News from './components/News'
// import Task from './components/Task'

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home title="Home"/>} />
        <Route exact path="/signin" element={<SignIn title="Log in"/>} />
        <Route exact path="/signup" element={<SignUp title="Sign Up"/>} />
        <Route exact path="/contact" element={<ContactUs title="Contact Us"/>} />
        <Route exact path="/about" element={<About title="About"/>} />
        <Route exact path="/chat" element={<Chat title="Chat With Us"/>} />
        <Route exact path="/detect" element={<DetectDisease title="Detect Disease"/>} />
        <Route exact path="/dashboard" element={<Dashboard title="Dashboard"/>} />
        <Route exact path="/news" element={<News title="Health News"/>} />
        {/* <Route exact path="/settings" element={<Settings title="Settings"/>} />
        <Route exact path="/profile" element={<Profile title="Profile"/>} />
        <Route exact path="/task" element={<Task title="Tasks"/>} /> */}
      </Routes>
    </div>
  )
}

export default App
