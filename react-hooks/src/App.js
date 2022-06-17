import { useEffect, useState } from 'react';
import './App.css';

// Hooks let you use React without classes 
function Welcome(){
  // useState hook maintains the state of the counter variable and updates
  // it using setCount whenever the button is clicked, handled by the onChange event.
  const[counter, setCount] = useState(0)

  //Multiple state variables
  const[age, setAge] = useState(10)
  const[fruit, setFruit] = useState('Apple')

  // Hooks do not work inside classes, lets to hook into state and 
  // lifecycle features from function components 
  // useEffect allows to perfom side effects using function components 
  // useEffect can be used multiple times

  // Rendering is done first and then useEffect is called. This can be verified by the order in which
  // the log statements in useEffect and counter button appear. The statement useState is updated is logged first 
  // after which the statement useEffect is updated is logged
  // Adding optional optimization by skipping the effect if the value of the state variable has not changed. 
  // You can also define custom hooks 
  function useTitleUpdate(){
    useEffect(() => {
      console.log('useEffect is updated')
      document.title = `Clicked ${counter} times`
    }, [counter])
  }
  useTitleUpdate()
  return (<div><p>You clicked the button {counter} times</p>
  <button onClick={()=> {
    console.log('useState is updated')
    setCount(counter+1)
  }}>Click Me</button>
  <br/>
  <label>{fruit}</label><br/>
  <input type='input' placeholder='Type to change' onChange={(e) => 
  setFruit(e.target.value)}></input><br/>
  <label>{age}</label><br/>
  <input type='number' onChange={(e) => setAge(e.target.value)}></input><br/>
  </div>)
}

// How does React know which useState call corresponds to which state variable? 
// The order in which the useState calls are defined matters 
// During first render, the name is set first followed by the surname and then the document title 
// For conditional rendering put the condition inside the hook
function Form(){
  const[name, setName] = useState('')

  const[surname, setSurname] = useState('')

  useEffect(function updateTitle(){
    if(name === 'John')
      document.title = name + ' ' + surname
    else
      document.title = surname
  }, [name, surname])

  return(<div>
    <label>Name is </label>
    <input type='text' onChange={(e) => setName(e.target.value)} value={name}></input><br/>
    <label>Surname is </label>
    <input type='text' onChange={(e) => setSurname(e.target.value)} value={surname}></input><br/>
  </div>)
}
function App() {
  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;
