import { render } from '@testing-library/react';
import React, { useRef } from 'react';
import './App.css';

// Adding a ref to a DOM element 
class CustomTextInput extends React.Component{
  constructor(props){
    super(props)
    // Ref to store the text element, created using createRef
    this.textInput = React.createRef()
  
  }

  // When the button is clicked, the text box is focussed and DUMMY TEXT is displayed
  focusTextInput = () => {
    this.textInput.current.value = 'Dummy text'.toUpperCase()
    this.textInput.current.focus()
  }

  // Associate the input ref with the created ref using this.<refName> 
  render(){
    return(
      <div>
        <input type='text' ref={this.textInput}/>
        <input type='button' value='Focus on text input' onClick={this.focusTextInput}/>
      </div>
    )
  }
}

// Adding ref to a class component 
class AutoFocusCustomText extends React.Component{
  constructor(props){
    super(props)
    this.textInput = React.createRef()
  }

  // When the component is rendered, the text box is focussed and DUMMY TEXT is displayed
  componentDidMount(){
    this.textInput.current.focusTextInput()
  }

  render(){
    return(
      <CustomTextInput ref={this.textInput}/>
    )
  }
}

// Cannot use refs on function components - only on DOM elements or class components
// But refs can be called inside function components as long as they are used on DOM elements or class components
function CustomTextIp(){
  const textInput = useRef(null)

  function handleClick(){
    textInput.current.value = 'DUMMY TEXT 1'
    textInput.current.focus()
  }

  return(
    <div>
      <input type='text' ref={textInput}/>
      <input type='button' onClick={handleClick} value='Click to focus'/>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <CustomTextIp/>  
    </div>
  );
}

export default App;
