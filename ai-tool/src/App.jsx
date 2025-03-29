import {useState} from 'react'
import './App.css'
import { URL } from './constants';
import Answer from './components/Answers';

function App() {
  
  const [question,setQuestion]=useState('');
  const [result,setResult]=useState([]);
  const [recentHistory,setRecentHistory]=useState(JSON.parse(localStorage.getItem('history')))


 const payload={
    "contents": [{
    "parts":[{"text":question}]
    }]
  }

  const askQuestio=async()=>{

    if(localStorage.getItem('history')){
      let history =JSON.parse(localStorage.getItem('history'))
      history=[question,...history]
      localStorage.setItem('history',JSON.stringify(history))
      setRecentHistory(history)
    }else{
      localStorage.setItem('history',JSON.stringify[question])
      setRecentHistory([question])
    }

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

console.log(recentHistory);

const clearHistory=()=>{
  localStorage.clear();
  setRecentHistory([])
}

  return(
    <div className='grid grid-cols-5 h-screen text-centre'>
      <div className='col-span-1 bg-zinc-800'>
        <h1 classname='text-xl text-white flex  text-center justify-center'>
          <span>Recent Search</span>
          <button onClick={clearHistory} className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
        </h1>
        <ul className='text-left overflow-auto mt-2'>
          {
            recentHistory && recentHistory.map((item)=>(
              <li className='p-1 pl-5 truncate text-zinc-400 cursor-pointer hover:bg-zinc-700 hover:text-zinc-200'>{item}</li>
            ))
          }
        </ul>
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
