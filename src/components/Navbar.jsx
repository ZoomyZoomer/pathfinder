import React from 'react'
import {BFS, AStar, DFS, clearTiles} from './Grid'

const Navbar = () => {

  var algoIsActive = false;

  const [algoValue, setAlgoValue] = React.useState("");

  const handleChange = (e) => {
    setAlgoValue(e.target.id);
    document.getElementById('algoOptionsWrapper').classList.remove('notInvisible');
    document.getElementById('algo').classList.remove('dropdownActive');
    var element = document.getElementById('algoOptionsWrapper');
      element.classList.remove('notInvisible');
      element.classList.remove('pointerEvent');
  }

  const algoDrop = (e) => {
    if (!algoIsActive){
      e.target.classList.add('dropdownActive');
      var element = document.getElementById('algoOptionsWrapper');
      element.classList.add('notInvisible');
      element.classList.add('pointerEvent');
    } else {
      e.target.classList.remove('dropdownActive');
      var element = document.getElementById('algoOptionsWrapper');
      element.classList.remove('notInvisible');
      element.classList.remove('pointerEvent');
      

    }

    algoIsActive = !algoIsActive;

  }

  

  return (
    <div id='navWrapper' className='noEvent'>
        <nav id='navMain' className="nav--mainGrid">
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
                  <button id="A*" className="algoOptions" onClick={handleChange}> A* </button>
                </div>
             </div>
              <div className='visualizeButtonHolder'>
              <button className="visualizeButton" onClick={algoValue === 'Breadth First Search' ? BFS : 
                algoValue === 'A*' ? AStar :
                algoValue === 'Depth First Search' ? DFS : ''
                }>Pathfind With {algoValue} {algoValue === '' ? '...' : '!' }</button>
              </div>
            </section>
        </nav>
        <div className='clearFlex'>
          <button id='clear' className="clearButton" onClick={() => clearTiles(true)}>Clear</button>
        </div>
        
    </div>
  )
}

export default Navbar;













