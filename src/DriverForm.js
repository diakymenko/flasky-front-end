import {useState} from "react";
const defaultDriver = {
name: '',
country: '',
team: '',
handsome: true
};

const DriverForm = (props) => {
const [formData, setFormData] = useState(defaultDriver);

const onFormChange = (event) => {
const stateName = event.target.name;
const inputValue = event.target.value;

const newFormData = {...formData};
newFormData[stateName] = inputValue;

setFormData(newFormData)
}

const handleSumbit = (event) => {
  event.preventDefault();
  props.addDriverCallback(formData)
}
  return (
  <form onSubmit = {handleSumbit}>
  <label htmlFor = "name">Name</label> 
  <input type="text" name = "name" value={formData.name} onChange = {onFormChange}/>
  <label htmlFor = "country">Country</label> 
  <input type="text" name = "country" value={formData.country} onChange = {onFormChange}/>
  <label htmlFor = "team">Team</label> 
  <input type="text" name = "team" value={formData.team} onChange = {onFormChange}/>
  <input type = "submit" value = "Add Driver" />
  </form>
  );
};

export default DriverForm