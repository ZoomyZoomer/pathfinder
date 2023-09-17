import React from 'react'
import Navbar from './components/Navbar'
import {Grid} from './components/Grid'
import Tutorial from './components/Tutorial'

const App = () => {
  return (
    <div>
      <Tutorial />
      <Navbar />
      <Grid />
    </div>
  )
}

export default App