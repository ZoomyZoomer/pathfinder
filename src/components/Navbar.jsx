import React from 'react'
import {BFS} from './Grid'

const Navbar = () => {
  return (
    <div>
        <nav className="nav--mainGrid">
            <section className="nav--leftFlex">
                <h1 className="title">PATHFINDER</h1>
            </section>
            <section className="nav--middleFlex">
                <button className="visualizeButton" onClick={BFS}>Visualize</button>
            </section>
        </nav>
    </div>
  )
}

export default Navbar