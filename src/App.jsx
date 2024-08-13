import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLenght] = useState(4)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // use ref hook

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "@#$%*!"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 10)
    window.navigator.clipboard.writeText(password)
  }, [password])

  // passwordGenerator()
  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg p-4 mt-20 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3 text-2xl'>Password Generator</h1>
        <div className='flex rounded-lg overflow-hidden mb-4 flex-col'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3 my-3 rounded'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button
            className='bg-blue-900 text-white px-3 py-1 rounded-lg w-20 mx-auto font-semibold'
            onClick={copyPassword}
          >Copy</button>
        </div>
        <div className='flex text-sm gap-x-1'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={4} max={15} value={length}
              className='cursor-pointer'
              onChange={(e) => { setLenght(e.target.value) }}
            />
            <label>Length {length}</label>
          </div>
          <div className='flex items-center gap-x-1 mx-3'>
            <input type="checkbox" defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charAllowed}
              id='charInput'
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
