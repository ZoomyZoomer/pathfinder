import React from 'react'
import video from './videos/demo1.mp4'




const Tutorial = () => {



  let props = {
    heading: 'Welcome to PATHFINDER!',
    subtext: 'PATHFINDER is currently in an early state of development',
    maintext: "You can get started by clicking on the 'start' and 'end' nodes to move them around",
    maintext2: "Clicking on empty spaces creates 'blocked' nodes"
  };

  const [tutorialPage, setTutorialPage] = React.useState(renderPage({...props}));

  function renderPage(props){
    return(
      <div>
        <h1>{props.heading}</h1>
        <h5 className='fyiMargin'>{props.subtext}</h5>
        <h3>{props.maintext}</h3>
        <h3>{props.maintext2}</h3>
        
        <button className='tutorial--nextButton'>Next</button>
      </div>
    )
    
  }





  return (
        <nav className='tutorial--container'>
          <div className='tutorial--contents'>
              {tutorialPage}
            
              <video 
                src={video} type="video/mp4" loop autoPlay >
              </video>            
              
          </div>
        </nav>
  )
}

export default Tutorial