

const PlayersInfo = ({formData, setFormData, countries})=>{

    if (!countries){
        return
    }

    const calculateAge = (dob) =>{
        const birthDay = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDay.getFullYear();
        let month = today.getMonth() - birthDay.getMonth();
        if(month < 0 || (month === 0 && today.getDate() < birthDay.getDate())){
            age--;
        }
        return age;
    }

    const allCountries = () => {
        return(
            <datalist id = "searchCountries">
                {countries.map((country) => {
                    return <option key={country.cca3} value = {country.name.common}/>
                })}
            </datalist>
        )
    }

    const handleChange = (event)=>{
        if (event.target.name === "birth_date"){
            setFormData({...formData, age: calculateAge(event.target.value)})
            return  setFormData({...formData, [event.target.name]: event.target.value})
        }else if(event.target.name ==="name" ){
            return setFormData({...formData, [event.target.name]: event.target.value})
        }else if (event.target.name === "nationality"){
            if (countries.some((country) => country.name.common === event.target.value)){
                setFormData({...formData, nationality_image: countries.filter((country) => country.name.common === event.target.value)[0].flags.png})
            }
            return setFormData({...formData, [event.target.name]: event.target.value})
        }
        return setFormData({...formData, [event.target.name]: parseInt(event.target.value)})
    }

    return(
        <div>
             <label>
                <div className="form-control">
                  <label className="input-group">
                    <span className="w-24">Name</span>
                    <input type="text" placeholder="Enter the name" className="input input-bordered w-52" name="name" value={formData.name} onChange={handleChange} required/>
                  </label>
                </div>
              </label>
              <br />
              <label>
                <div className="form-control">
                  <label className="input-group">
                    <span className="w-24">DoB</span>
                    <input type="date"  className="input input-bordered w-52" name="birth_date" value={formData.birth_date} onChange={handleChange} min="1990-01-01" max="2007-12-31" required/>
                  </label>
                </div>
              </label>
              <br />
              <br />
              <label>
                <div className="form-control">
                  <label className="input-group">
                    <span className="w-24">Nationality</span>
                    <input type="search" list="searchCountries" placeholder="Enter the nationality" className="input input-bordered w-52" name="nationality" value={formData.nationality} onChange={handleChange} required/>
                   {allCountries()}
                  </label>
                </div>
              </label>
              <br />
              <label>
                <div className="form-control">
                  <label className="input-group">
                    <span className="w-24">Height</span>
                    <input type="number"  className="input input-bordered w-52" name="height" value={formData.height} onChange={handleChange} min="155" max="210" required/>
                    <span className="w-12">cm</span>
                  </label>
                </div>
              </label>
              <br />
              <label>
                <div className="form-control">
                  <label className="input-group">
                    <span className="w-24">Weight</span>
                    <input type="number"  className="input input-bordered w-52" name="weight" value={formData.weight} onChange={handleChange} min="70" max="105" required/>
                    <span className="w-12">kg</span>
                  </label>
                </div>
              </label>
              <br />
        </div>
    )
}
export default PlayersInfo