import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)// for length
  const [numberAllowed, setnumberAllowed] = useState(false);//for numbers
  const [charAllowed, setcharAllowed] = useState(false)//for characters

  //now for password section
  const [password, setPassword] = useState("")//here we can although use any default password, but we have to generate the password like when app is run, any api should be called or any method should be called, from which data is taken and thus pass is generated

  //making password generator//read docs (usecallback(useCallback is a React Hook that lets you cache a function definition between re-renders.) in react) to have optimum method which can run again as there is some activity //

  //useref hook//for copy to clipboard
   const passwordRef=useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*-_+=[]{}~`"
    for(let i=1;i<=length;i++)
    {
      let char = Math.floor(Math.random() * str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard= useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,20);
    window.navigator.clipboard.writeText(password)
  },[password])

  // passwordGenerator()// will not work
  //use another hook : useEffect 
  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
    
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-white-500 bg-gray-900'>
      <h1 className='text-white text-center'>Password Generator</h1>
      <div className='classname="flex shadow rounded-lg overflow-hidden mb-4"'>
        <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly 
        ref={passwordRef}
        />
        <button 
         onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 rounded-lg text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2 '>
        <div className='flex items-center gap-x-1 '>
          <input type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=> {setLength(e.target.value)}} />
          <label >length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked= {numberAllowed}
          id="numberInput"
          onChange={()=>{
            setnumberAllowed((prev)=> !prev);
          }}
           />
          <label >Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked= {charAllowed}
          id="characterInput"
          onChange={()=>{
            setcharAllowed((prev)=> !prev);
          }}
           />
          <label >Characters</label>
        </div>
        
      </div>
      </div>
    </>
  )
}

export default App
