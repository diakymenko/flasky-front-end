import { useEffect, useState } from "react";
import DriverList from "./components/DriverList";
import axios from "axios";
import DriverForm from "./DriverForm";

function App() {
  const [drivers, setDrivers] = useState([]);

  const URL = 'http://localhost:5000/drivers';
  
  const fetchDrivers = () => {
    axios.get(URL)
    .then((res) => {
      const newDrivers = res.data.map((driver) => {
        return {
          id: driver.id,
          name: driver.name,
          country: driver.country,
          team: driver.team,
          cars: driver.cars,
          handsome: driver.handsome
        };
      });
      setDrivers(newDrivers);
    })
    .catch((err) => {
      console.log(err);
    })
  };
  useEffect(fetchDrivers, []);

  const flipHandsome = (id) => {
    axios
      .patch(`${URL}/${id}/fliphandsome`)
      .then(() => {
        const newDrivers = [];
        for (const driver of drivers) {
          const newDriver = {...driver};
          if (newDriver.id === id) {
            newDriver.handsome = !newDriver.handsome;
          }
          newDrivers.push(newDriver);
        }
        setDrivers(newDrivers);
      })
      .catch((err) => {
        console.log(err);
      });

    
  };

  const deleteDriver = (id) => {
    axios
      .delete(`${URL}/${id}`)
      .then(() => {
        const newDrivers = [];
        for (const driver of drivers) {
          if (driver.id !== id) {
            newDrivers.push(driver);
          }
        }
        setDrivers(newDrivers);
       })
       .catch((err) => {
          console.log(err);
      });
  };
 const addDriver = (driverInfo) => {
  axios.post(URL, driverInfo)
  .then((response) => {
    fetchDrivers();
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })
 };
  return (
    <div>
      <DriverList
        drivers={drivers}
        handsomeCallback={flipHandsome}
       deleteCallback={deleteDriver}
      />
      <DriverForm addDriverCallback = {addDriver}></DriverForm>
    </div>
  );
}

export default App;
