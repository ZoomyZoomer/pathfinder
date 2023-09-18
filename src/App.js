import React from 'react'
import Navbar from './components/Navbar'
import {Grid} from './components/Grid'
import Tutorial from './components/Tutorial'

const App = () => {
  return (
    <div>
      
      <div id='dimWrapper' className='dim'>
        <Navbar />
        <Grid />
      </div>
      <Tutorial />
      
    </div>
  )
}

export default App