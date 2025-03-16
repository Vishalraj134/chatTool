import { useEffect, useState } from "react";
import { checkHeading, replaceHeadingStars } from "../helper";


const Answer=({ans,totalResult,index,type})=>{

    const [heading,setHeading]=useState(false);
    const [answer,setAnswer]=useState(ans);
    console.log(index);

    useEffect(()=>{
       if(checkHeading(ans)){
        setHeading(true);
        setAnswer(replaceHeadingStars(ans))
       }
    },[])

    
    return(
        <>
            
            {
                index && totalResult>1?<span className="py-5 text-xl block text-white">{answer}</span>:
                heading ? <span className="py-5 block text-white">{answer}</span>
                :<span className={type=='q'?'pl-1':'pl-5'}>{answer}</span>
            }

            
        </>
    )
}

export default Answer;