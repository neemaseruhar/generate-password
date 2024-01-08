
import  {useCallback, useEffect, useRef, useState} from 'react'

function App() {

const [password,setPassword] = useState('');
const [length,setlength] = useState(8);
const [charAllowed,setCharAllowed] = useState(false)
const [numAllowed,setNumAllowed]= useState(false)
const refInput = useRef();

const generatedPassword= useCallback(() => {

  let pass= '';
  let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  if(charAllowed) str+= "!@#$%^&*()_+";
  if(numAllowed) str+="1234567890";

  for(let i=0; i<length; i++){
    let char = Math.floor(Math.random() * str.length + 1);
    pass += str.charAt(char)
  }
  setPassword(pass)
  },[charAllowed,numAllowed,length])

  useEffect(() => {
    generatedPassword()
  },[charAllowed,numAllowed,length])

  const HandleCopyPassword = () => {
    window.navigator.clipboard.writeText(password)
    refInput.current.select()
  }

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500 h-full'>
    <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type='text' value={password} placeholder='password' readOnly ref={refInput}/>
        <button onClick={HandleCopyPassword}
       
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
      </div>
       <div
      className='flex text-sm gap-x-2'
      >
        <div className='flex items-center gap-x-1  text-white'>
          <input type='range' value={length} onChange={(e) => setlength(e.target.value)} min={6} max={20}></input>
          <label htmlFor='length'>length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1 text-white'>
          <input type="checkbox" defaultChecked={numAllowed} onChange={(e) =>setNumAllowed(prevVal => !prevVal)} />
          <label htmlFor='number'>Number</label>
        </div>
        <div className='flex items-center gap-x-1 text-white'>
          <input type="checkbox" defaultChecked={charAllowed} onChange={(e) => {setCharAllowed(prev =>!prev)}} />
          <label htmlFor='charinput'>character</label>
        </div>
        
      </div>
    </div>
  );
}

export default App;
