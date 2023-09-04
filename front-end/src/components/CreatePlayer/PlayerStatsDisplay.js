import {TbArrowBadgeRightFilled, TbArrowBadgeLeftFilled} from 'react-icons/tb'

const PlayerStatsDisplay = ({stats, player, setFormData, formData, points, setPoints}) =>{

    const colourToSkills = (skillNumber) => {
        if (skillNumber >= 0 && skillNumber < 60) {
            return "bg-red-500"
        } else if (skillNumber >= 60 && skillNumber < 70) {
            return "bg-orange-500"
        } else if (skillNumber >= 70 && skillNumber < 80) {
            return "bg-yellow-400"
        } else if (skillNumber >= 80 && skillNumber < 90) {
            return "bg-lime-400"
        } else {
            return "bg-green-700"
        }
    };
    
    const handleClick = (event) =>{
        console.log("event ", event.currentTarget.name)
        console.log("points", points)
        if(event.currentTarget.name === "decrease"){
            const tempFormData = {...formData}
            tempFormData[stats]--
            setFormData(tempFormData)
            let tempPoints = points
            tempPoints ++
            setPoints(tempPoints)
            return
        }
        const tempFormData = {...formData}
        tempFormData[stats]++
        setFormData(tempFormData)
        let tempPoints = points
        tempPoints --
        setPoints(tempPoints)
        return
    }

    return(
        <>
            <div className="mt-auto mb-auto">
                <p>{stats.charAt(0).toUpperCase() + stats.slice(1)}</p>
            </div>
            <div className={"border-solid  rounded-lg w-15 h-10 text-white  text-center items-center flex  " + colourToSkills(formData[stats])} id={`${stats}`} >
                
                    <button className=" m-0 p-0 h-10 border-solid border-white border-r-4 rounded-l-lg bg-gray-400"  disabled = {formData[stats] === player[stats]} name = "decrease" onClick={handleClick}> <TbArrowBadgeLeftFilled color='gray' size={20} /> </button>
                        <p className=" p-2">{formData[stats]}</p>
                    <button className=" m-0 p-0 h-10 border-solid border-white border-l-4 rounded-r-lg bg-gray-400 " disabled = {points === 0} name = "increase" onClick={handleClick}><TbArrowBadgeRightFilled color='gray' size={20}/></button>
            
            </div>
           

        </>
    )
}

export default PlayerStatsDisplay