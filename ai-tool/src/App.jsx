import {useState} from 'react'
import './App.css'
import { URL } from './constants';
import Answer from './components/Answers';

function App() {
  
  const [question,setQuestion]=useState('');
  const [result,setResult]=useState([])


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
  let dataString =response.candidates[0].content.parts[0].text;
  dataString = dataString.split("* ");
  dataString=dataString.map((item)=>item.trim())

  // console.log(dataString);
  setResult([...result,{type:'q', text:question},{type:'a',text:dataString}]);
}
console.log(result);
  return(
    <div className='grid grid-cols-5 h-screen text-centre'>
      <div className='col-span-1 bg-zinc-800'>
      </div>  
          <div className='col-span-4 p-10'>
            <div classNmae='container h-110 overflow-scroll'>
              <div className='text-zinc-300'>
                <ul>
              {
                result.map((item,index)=>(
                  <div key={index+Math.random()} key={index+Math.random()} class={item.type=='q'?'flex justify-end':''} >
                   {  
                    item.type=='q'?
                <li key={index+Math.random()} 
                className='text-right p-1 border-8 bg-zinc-700 border-zinc-700 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl w-fit'> 
                <Answer ans={item.text} totalResult={1} index={index} type={item.type}/></li>
                :item.text.map((ansItem,ansIndex)=>(
                  <li key={ansIndex+Math.random()} className='text-left p-1'> <Answer ans={ansItem} totalResult={item.length} type={item.type} index={ansIndex}/></li >
                ))}
                  </div>
              ))
              }
              </ul>
              
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
