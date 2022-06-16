import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

//Creating a class component 
// class Hello extends React.Component{
//   render() {
//     return <h1>Hello, {this.props.name}</h1>
//   }
// }

//Creating a function component 
// function App(props) {
//   return <div>
//     <Hello name='Chris'/>
//     <Hello name='Eric'/>
//     <Hello name='Duke'/>
//   </div>
// }
//const root = ReactDOM.createRoot(document.getElementById('root'));
//const elem = <App/>
//root.render(elem)

// Example of local state 
class Clock extends React.Component{
  constructor(props){
    super(props)
    this.state={date: new Date(),
                isHidden: true}
  }

  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(), 1000
    )
  }
  componentWillUnmount(){
    clearInterval(this.timerID)
  }
  tick(){
    this.setState({
      date: new Date()
    })
  }

  // Arrow notation for binding 
  handleClick = () => {
    console.log(`Clock button clicked. State is now ${this.state.isHidden}`)
    this.setState({
      isHidden: !this.state.isHidden
    })
  }
  render() {
    if(!this.state.isHidden){
      return <div>
      <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      <button onClick={this.handleClick}>Click Me!</button>
      </div>
    }
    else{
      return <div>
      <button onClick={this.handleClick}>Click Me!</button>
      </div>
    }

  }
}


//Conditonal rendering 
function UserGreeting(props){
  return <h1>You are now logged in!</h1>
}

function GuestGreeting(props){
  return <h1>Please log in!</h1>
}

function Greeting(props){
  if(props.isLoggedIn)
    return <UserGreeting />
  return <GuestGreeting />
}

function LoginButton(props){
  return <button onClick={props.onClick}>
    Login
  </button>
}

function LogoutButton(props){
  return <button onClick={props.onClick}>
    Logout 
  </button>
}

class LoginControl extends React.Component{
  constructor(props){
    super(props)
    this.state= {isLoggedIn : false, isClockHidden: true}
  }

  handleLoginClick = () => {
    this.setState({isLoggedIn : true})
  }

  handleLogoutClick = () => {
    this.setState({isLoggedIn : false})
  }

  render(){
    const loggedIn = this.state.isLoggedIn
    let elems
    if(loggedIn){
      elems = (
                <div>
                  <Greeting isLoggedIn={loggedIn}/>
                  <Clock />
                  <LogoutButton onClick={this.handleLogoutClick}/>
                </div>
                )
    }
    else{
      elems = (
                <div>
                  <Greeting isLoggedIn={loggedIn}/>
                  <LoginButton onClick = {this.handleLoginClick}/>
                </div>
      )
    }
    return (
      elems
    )
  }
}

//Lists and Keys 

function ListItem(props){
  return <li>{props.value}</li>
}
class ListItems extends React.Component{
  constructor(props){
    super(props)
    this.setState = {numbers : props.numbers}
  }

  render(){
    const listItems = this.props.numbers.map((num) => <ListItem key={num.toString()} value={num}/>)
    return <ul>{listItems}</ul>
  }
}

// Forms - Controlled components
class TextTag extends React.Component{
  constructor(props){
    super(props)
    this.state={value: ''}
  }
  handleChange = (event) => {
    this.setState({value: event.target.value})
    this.props.textCB(event.target.value)
  }
  render(){
    return <label>NAME: <input type='text' value={this.state.value} onChange={this.handleChange}></input><br/></label>
  }
}

class TextAreaTag extends React.Component{
  constructor(props){
    super(props)
    this.state={value: 'Please write something about you...'}
  }
  handleChange = (event) => {
    this.setState({value: event.target.value})
    this.props.textAreaCB(event.target.value)
  }
  render(){
    return <label>ABOUT: <textarea value={this.props.textAreaValue} onChange={this.handleChange}></textarea><br/></label>
  }
  
}

class SelectTag extends React.Component{
  constructor(props){
    super(props)
    this.state={value: 'Male'}
  }

  handleChange = (event) => {
    this.setState({value: event.target.value})
    this.props.selectCB(event.target.value) 
    console.log(event.target.value)
  }
  render(){
    return (
      <label>GENDER: <br/>
        <select value={this.state.value} onChange={this.handleChange}>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='Not Specified'>Not-Specified</option>
          <option value='Non Binary'>Non-Binary</option>
        </select>
        <br/>
      </label>
    )
  }

}
class NameForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {textValue: '', textAreaValue: '', selectValue: ''}
  }

  handleTextCallback = (textData) => {
    this.setState({textValue: textData})
  }

  handleTextAreaCallback = (textAreaData) => {
    this.setState({textAreaValue: textAreaData})
  }

  handleSelectCallback = (selectData) => {
    this.setState({selectValue: selectData})
  }
  handleSubmit = (event) => {
    console.log('Logged text: ' + this.state.textValue)
    console.log('Logged text area: ' + this.state.textAreaValue)
    console.log('Logged select: ' + this.state.selectValue)
    alert(`A name and about was submitted : ${this.state.textValue} and ${this.state.textAreaValue}`)
    event.preventDefault()
  }

  render(){
    return <form onSubmit={this.handleSubmit}>
        <TextTag textCB={this.handleTextCallback}/>
        <TextAreaTag textAreaCB={this.handleTextAreaCallback}/>
        <SelectTag selectCB={this.handleSelectCallback}/>
        <input type='submit' value='Submit'></input>
    </form>
  }
}

// Handling multiple inputs 
class MultipleInputs extends React.Component{
  constructor(props){
    super(props)
    this.state = {isGoing: false, noOfGuests: 0}
  }
  
  handleChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    this.setState({
      [target.name] : value
    })
  }

  handleSubmit = (event) => {
    alert('Form has been submitted!')
    event.preventDefault()
  }

  render(){
    if(this.state.isGoing){
      return (<form onSubmit={this.handleSubmit}>
        <label>Is going?  
          <input name='isGoing' type='checkbox' checked={this.state.isGoing} onChange={this.handleChange}></input><br/>
        </label>
        <label>Number of Guests: 
        <input name='noOfGuests' type='number' value={this.state.noOfGuests} onChange={this.handleChange}></input><br/>
      </label>
        <input type='submit' value='Submit'></input>
      </form>)
    }
    else {
      return (<form onSubmit={this.handleSubmit}>
        <label>Is going?  
          <input name='isGoing' type='checkbox' checked={this.state.isGoing} onChange={this.handleChange}></input><br/>
        </label>
       <input type='submit' value='Submit'></input>
      </form>)
    }

  }
}

// Lifting state up - State is maintained only in the top level component, all the child components receive and operate on the state values through this.props
function WillBoil(props){
  if(props.temp >= 100)
    return <p>The water will boil</p>
  return <p>The water will not boil</p>
}

const scales = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

function toCelsius(fah){
  return (fah -32) * 5 / 9
}

function toFahrenheit(cel){
  return (cel * 9 /5) + 32
}

function tryConvert(temperature, converter){
  const input = parseFloat(temperature)
  if(Number.isNaN(input)) return ''
  const output = converter(input)
  const rounded = Math.round(output * 1000) / 1000
  return rounded
}

class TempInput extends React.Component{
  constructor(props){
    super(props)
  }

  handleChange = (event) => {
    this.props.onTempChange(event.target.value)
  }

  render(){
    const t = this.props.temp
    const scale = this.props.scale
    return (<fieldset>
      <legend>Enter temperature in {scales[scale]}</legend>
      <input value={t} onChange={this.handleChange}></input>
    </fieldset>)
  }
}

class Calculator extends React.Component{
  constructor(props){
    super(props)
    this.state = {temp: '', scale: 'c'}
  }

  handleCelsiusChange = (toSet) => {
    this.setState({scale: 'c', temp: toSet}) 
  }

  handleFahrenheitChange = (toSet) => {
    this.setState({scale: 'f', temp: toSet}) 
  }

  render(){
    const scale = this.state.scale
    const temperature = this.state.temp
    const celsius = scale === 'c' ? temperature : tryConvert(temperature, toCelsius)
    const fahrenheit = scale === 'f' ? temperature : tryConvert(temperature, toFahrenheit)
    return(<div>
      <TempInput scale='c' temp={celsius} onTempChange={this.handleCelsiusChange}/>
      <TempInput scale='f' temp={fahrenheit} onTempChange={this.handleFahrenheitChange}/>
      <WillBoil temp={this.state.temp}/>
    </div>)    
  }
}

// React composition model 
function DoesNotKnowChildren(props) {
  return (<div>{props.children}</div>)
}

function RenderChildren(){
  return(<DoesNotKnowChildren color='blue'>
    <h1>This is rendered on the fly</h1>
    <p>The parent did not know that this is gonna be rendered</p>
    </DoesNotKnowChildren>)
}

function App(){
  return <RenderChildren/>
}
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(App());


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
