import Decision from "../../logic/Decision"
import { useState } from "react"


const  DisplayDecisions = ({getDecisionEndPoint})=>{
    const callDecisions = new Decision()
    const [decision,setDecision] = useState("s1")
    const [title, setTitle] = useState(callDecisions.getTitles(decision))
    const [options, setOptions] = useState(callDecisions.getChildren(decision))


    const onClickDecision=(event)=>{
    
        console.log(event)
        setDecision(event.target.name)
        setTitle(callDecisions.getTitles(event.target.name))
        setOptions(callDecisions.getChildren(event.target.name))
        console.log(event.target.name)
        if(callDecisions.getTitles(event.target.name) === "Shoot"  || callDecisions.getTitles(event.target.name) === "Pass"){
            getDecisionEndPoint(callDecisions.getTitles(event.target.name));
        }

    }

    return (
       
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center">
            <div className=" bg-transparent p-2 rounded">
            <p className="p-2">{title}</p>
            <div className=" flex gap">
            <button className="btn border-solid" name={options[0].node} onClick={onClickDecision}>{options[0].title}</button>
            <button className="btn border-solid" name={options[1].node} onClick={onClickDecision}>{options[1].title}</button>
            </div>
             </div>
        </div>
        
    )

}

export default DisplayDecisions
