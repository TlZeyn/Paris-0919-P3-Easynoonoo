import React from 'react'
import { Switch, Route } from 'react-router-dom'

import SimForm from './components/SimForm'
import FamilyForm from './components/FamilyForm'
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/familyform' component={FamilyForm}/>
        <Route path='/simform' component={SimForm}/>
      </Switch>
      <Footer />
     
    </div>
  )
}

export default App
