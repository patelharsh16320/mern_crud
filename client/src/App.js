import React, { createContext, useReducer } from 'react'
import Navbar from './components/Navbar'
import Routing from './Routing'
import './css/style.css'
import { reducer } from './reducer/reducer.js'
import { initialState } from './reducer/initial'


export const userContext = createContext();

const App = () => {
const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <userContext.Provider value={{ state, dispatch }} >
        <Navbar />
        <Routing />
      </userContext.Provider>
    </>
  )
}

export default App