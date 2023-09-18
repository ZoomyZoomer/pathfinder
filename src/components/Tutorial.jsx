import React from 'react'
import video from './videos/demo1.mp4'
import video2 from './videos/demo2.mp4'
import video3 from './videos/demo3.mp4'
import video4 from './videos/demo4.mp4'



let props = {
  heading: 'Welcome to PATHFINDER!',
  subtext: 'PATHFINDER is currently in an early state of development',
  maintext: "This program is designed to help VISUALIZE algorithms in an interactive environment",
  maintext2: "Click 'next' to continue with the tutorial or click 'exit tutorial' if you've been here before",
  videolink: ''
};


const Tutorial = () => {

let pageNum = 0;

  const [tutorialPage, setTutorialPage] = React.useState(renderPage({...props}));

  function newPage(){
    switch (pageNum){
      case 0:
        pageNum++;

        Object.assign(props, {
          heading: "Let's go over MOVEMENT", 
          subtext: '', 
          maintext: "You can get started by clicking on the 'start' and 'end' nodes to move them around",
          maintext2: "Clicking on empty spaces creates 'blocked' nodes which prevent MOVEMENT", 
          videolink: video
      });
      
        return setTutorialPage(renderPage({...props}))
      case 1:
        pageNum++;

        Object.assign(props, {
          heading: 'Select an ALGORITHM from the dropbox above and PATHFIND', 
          subtext: 'More ALGORITHMS are a work-in-progress', 
          maintext: "Each ALGORITHM has a unique way to find its node counterpart",
          maintext2: "", 
          videolink: video2
      });

        return setTutorialPage(renderPage({...props}))
      case 2:
        pageNum++;

        Object.assign(props, {
          heading: 'Once your ALGORITHM has finished running, you can move the nodes around to display alternative paths ', 
          subtext: "You can even add 'blocked' nodes and the paths will adapt!", 
          maintext: "",
          maintext2: "", 
          videolink: video3
      });

        return setTutorialPage(renderPage({...props}))
      case 3:
        pageNum++;

        Object.assign(props, {
          heading: "When you're doing PATHFINDING, clicking the 'clear' button will give you a fresh start!", 
          subtext: "The 'clear' button will show up after an ALGORITHM is run or a 'blocked' node is placed", 
          maintext: "",
          maintext2: "", 
          videolink: video4
      });

        return setTutorialPage(renderPage({...props}))
      case 4:
        pageNum++;

        Object.assign(props, {
          heading: "That's the TUTORIAL!", 
          subtext: "Have fun placing nodes and PATHFINDING :)", 
          maintext: "",
          maintext2: "", 
          videolink: ''
      });
    
        return setTutorialPage(renderPage({...props}))
      case 5:

      return clearPage();
        
    }
  
    }

    function clearPage(){
      document.getElementById('dimWrapper').classList.remove('dim');
      document.getElementById('gridWrapper').classList.remove('noEvent');
      document.getElementById('navWrapper').classList.remove('noEvent');
      setTutorialPage();
    }

  function renderPage(props){
  

    return(
      <nav className='tutorial--container'>
        <div className='tutorial--contents'>
          <h1>{props.heading}</h1>
          <h5 className='fyiMargin'>{props.subtext}</h5>
          <h3>{props.maintext}</h3>
          <h3 className='spacing'>{props.maintext2}</h3>
          <div className = 'videoContainer'>
            <video 
              className='demoVideo' src={props.videolink} type="video/mp4" loop autoPlay >
            </video> 
          </div>
        
          
          <button className='tutorial--nextButton' onClick={() => newPage()}>Next</button>
          <button className='tutorial--exitButton' onClick={() => clearPage()}>Exit Tutorial</button>
        </div>
      </nav>
    )
    
  }

  
    return (
    <div>
      {tutorialPage}
    </div>
       
  )
    }
  


export default Tutorial