import {useState} from 'react'
import './App.css'
import { URL } from './constants';

function App() {
  
  const [question,setQuestion]=useState('');
  const [result,setResult]=useState(undefined)

 const payload={
    "contents": [{
    "parts":[{"text":question}]
    }]
  }

  const askQuestio=async()=>{
    let response =await fetch(URL,{
    method:"POST",
    body:JSON.stringify(payload)
  })

  response =await response.json();
  // console.log(response.candidates[0].text)
  setResult(response.candidates[0].content.parts[0].text)
}

  return(
    <div className='grid grid-cols-5 h-screen text-centre'>
      <div className='col-span-1 bg-zinc-800'>
      </div>  
          <div className='col-span-4 p-10'>
            <div classNmae='container h-110 overflow-scroll'>
              <div className='text-amber-50'>
              {result}
              </div>
            </div>
            <div className='bg-zinc-800 w-1/2 p-1 pr-5 text-white m-auto rounded-2xl border-zinc-400 flex h-16'>
              <input type="text" value={question} onChange={(event)=>setQuestion(event.target.value)}className='w-full h-full p-3 outline-none' placeholder="Ask me anything"></input>
              <button onClick={askQuestio} >Ask</button>
            </div>
          </div>
    </div>
  )
}

export default App
