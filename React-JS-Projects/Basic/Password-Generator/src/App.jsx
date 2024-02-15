import { useState, useCallback, useEffect, useRef } from 'react'




function App() {


  // Using useState() Hooks for all the variables
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")


  // Using useCallback() Hooks : This password generator method is called everytime number, characters, length are altered.
  // So ise baar baar call krne mein resources waste honge therefore hum isko memoiz krlete hai and humesha iska memoized version aayega until one of the dependancies is changed.
  const passwordGenerator = useCallback(() => {              // useCallback Hook : Read notes.md
    let pass = ""
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"

    if(numberAllowed) str += "1234567890"
    if(charAllowed) str += "!@#$%^&*-_~/\|;:.<>(){}[]"

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random()*str.length+1)

      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])


  // Used useEffect() Hooks as it is used to perform side effects in functional components.
  // The effect will only re-run if one of the dependencies has changed since the last render.
  useEffect(()=>{          // useEffect Hook : Read notes.md
  passwordGenerator() 
  }, [length, numberAllowed, charAllowed, passwordGenerator])


  // Used the useRef() Hook to create a reference of the password
  const passwordRef = useRef(null)     // useRef Hook : read notes.md


  // Code for copying the generated password in the clipboard
  // use notes.md to know whats happening in these lines
  const copyPass = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 25)
    window.navigator.clipboard.writeText(password)
  }, [password])




  return (

    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">

      <h1 className='text-white text-center my-3'>Password generator</h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input type="text"
        value={password}
        placeholder="Password"
        ref={passwordRef}      // passed the referance of the password
        readOnly 
        className="outline-none w-full py-1 px-3"
       />
        <button onClick={copyPass} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>

      <div className='flex text-sm gap-x-2'>

        <div className='flex items-center gap-x-1'>
          <input 
            type="range"
            min={8}
            max={25}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
          />
            <label>Length: {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {setNumberAllowed((prev) => !prev)}}
        />
        <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
        <input
          type="checkbox"
          defaultChecked={charAllowed}
          id="characterInput"
          onChange={() => {setCharAllowed((prev) => !prev)}}
        />
        <label htmlFor="characterInput">Characters</label>
        </div>

      </div>
    </div>


  )
}

export default App