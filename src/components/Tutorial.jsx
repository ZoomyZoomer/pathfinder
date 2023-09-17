import React from 'react'
import video from './videos/demo1.mp4'



let props = {
  heading: 'Welcome to PATHFINDER!',
  subtext: 'PATHFINDER is currently in an early state of development',
  maintext: "You can get started by clicking on the 'start' and 'end' nodes to move them around",
  maintext2: "Clicking on empty spaces creates 'blocked' nodes",
  videolink: video
};




const Tutorial = () => {

let pageNum = 0;

  const [tutorialPage, setTutorialPage] = React.useState(renderPage({...props}));

  function newPage(){
    switch (pageNum){
      case 0:
        pageNum++;
        props.heading = 'Select an ALGORITHM from the dropbox above';
        props.subtext = 'More ALGORITHMS are a work-in-progress';
        props.maintext = '';
        props.maintext2 = '';
        return setTutorialPage(renderPage({...props}))
      case 1:
        pageNum++;
        return setTutorialPage(renderPage({...props}))
    }
  
    }

    function clearPage(){
      setTutorialPage();
    }

  function renderPage(props){
    console.log(props.heading);
    return(
      <nav className='tutorial--container'>
        <div className='tutorial--contents'>
          <h1>{props.heading}</h1>
          <h5 className='fyiMargin'>{props.subtext}</h5>
          <h3>{props.maintext}</h3>
          <h3>{props.maintext2}</h3>
          <video 
            className='demoVideo' src={props.videolink} type="video/mp4" loop autoPlay >
          </video> 
          
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