import { useState, useEffect, useCallback } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [allowedNumber, setAllowedNumber] = useState(true);
  const [allowedChar, setAllowedChar] = useState(false);
  const [password, setPassword] = useState("adklfjdskj");


  const passwordGenerator = useCallback(()=>{
    let pwd ="";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(allowedChar) str+="@#$%&";
    if(allowedNumber) str+="1234567890";

    for(let i=1; i<=length; i++){
      pwd +=str.charAt(Math.floor(Math.random()*str.length+1));
    }

    setPassword(pwd);
  }, [length, allowedChar, allowedNumber, setPassword])

useEffect(()=>{
  passwordGenerator();
}, 
[length,allowedChar,allowedNumber, passwordGenerator])

  return (
   <>
   
    <div className='  bg-white  shadow-md p-20 rounded-lg w-1/2 m-auto'>
      {/* display  flied */}
      <div style={{boxShadow:"0 0 10px 1px black"}} className='rounded-lg flex items-stretch'>
        <input className='size-full px-3 py-2  rounded-s-lg  outline-none' type="text" readOnly value={password} />
        
        <button
        type="button"
        className="  rounded-e-md bg-blue-600 px-3 py-2  font-semibold text-white hover:bg-blue-600/80"
      >
        Copy
      </button>
      </div>

      {/* button sestion */}
       

      <div className='mt-10 flex justify-between' >
        
      <span>
      <input type="range" min={8} max={16} value={length} id='range' onChange={(event)=>setLength(event.target.value)}  />
     <label htmlFor="range"> Length {length}</label>
      </span>
      <span >
     <input type="checkbox" id='numberAllowed' defaultChecked={allowedNumber} onChange={()=>{setAllowedNumber((prev)=>!prev)}} />
     <label htmlFor="numberAllowed">Number</label>
     </span>
     <span>
     <input type="checkbox" id='charAllowed'  onChange={()=>{setAllowedChar((prev)=>!prev)}} />
     <label htmlFor="charAllowed">Character</label></span>
      </div>


    </div>


   </>
  )
}

export default App
