import React from 'react'
import {BFS, AStar, DFS} from './Grid'

const Navbar = () => {

  var algoIsActive = false;

  const [algoValue, setAlgoValue] = React.useState("");

  const handleChange = (e) => {
    setAlgoValue(e.target.id);
    document.getElementById('algoOptionsWrapper').classList.remove('notInvisible');
    document.getElementById('algo').classList.remove('dropdownActive');
  }

  const algoDrop = (e) => {
    if (!algoIsActive){
      e.target.classList.add('dropdownActive');
      document.getElementById('algoOptionsWrapper').classList.add('notInvisible');
    } else {
      e.target.classList.remove('dropdownActive');
      document.getElementById('algoOptionsWrapper').classList.remove('notInvisible');
    }

    algoIsActive = !algoIsActive;

  }

  

  return (
    <div>
        <nav className="nav--mainGrid">
            <section className="nav--leftFlex">
                <h1 className="title">PATHFINDER</h1>
            </section>
            <section className="nav--middleFlex">
            <div>
                <button id='algo' className="dropdown" onClick={algoDrop}>Algorithms
                <span className="caret"></span></button>
                <div id='algoOptionsWrapper' className="algoOptionsWrapper">
                  <button id="Breadth First Search" className="algoOptions" onClick={handleChange}> Breadth First Search </button>
                  <button id="Depth First Search" className="algoOptions" onClick={handleChange}> Depth First Search </button>
                  <button id="AStar" className="algoOptions" onClick={handleChange}> AStar </button>
                </div>
             </div>
                <button className="visualizeButton" onClick={algoValue === 'Breadth First Search' ? BFS : 
                algoValue === 'AStar' ? AStar :
                 DFS
                }>Pathfind With {algoValue} {algoValue === '' ? '...' : '!' }</button>
            </section>
        </nav>
    </div>
  )
}

export default Navbar;