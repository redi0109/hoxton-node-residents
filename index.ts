import express from "express";
import cors from "cors";
import { housesData, residentsData } from "./data";

let houses = housesData;
let residents = residentsData;

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

app.get("/", (req, res) => {
  res.send(`
      <h1> Hello! </h1>
      <ul>
      <li> <a href='/houses'> Houses  </a> </li>
      <li> <a href='/residents'> Residents </a> </li>
      </ul>`);
});

app.get("/houses", (req, res) => {
  let housesToSend = houses.map((house) => {
    let resident = residents.filter(
      (resident) => resident.id === house.residentId
    );
    return { ...house, residents: resident };
  });
  res.send(housesToSend);
});

app.post("/houses", (req, res) => {
  let errors: string[] = [];

  if (typeof req.body.address !== "string") {
    errors.push("It's not a valid address");
  }

  if (typeof req.body.type !== "string") {
    errors.push("It's not a valid type");
  }

  if (typeof req.body.residentId !== "number") {
    errors.push("It's not a valid ID");
  }

  if (errors.length === 0) {
    const newHouse = {
      id: houses.length === 0 ? 1 : houses[houses.length - 1].id + 1,
      address: req.body.address,
      type: req.body.type,
      residentId: req.body.residentId,
    };

    houses.push(newHouse);
    res.send(newHouse);
  } else {
    res.status(400).send({ errors });
  }
});

app.patch("/houses/:id", (req, res) => {
  let id = Number(req.params.id);
  let match = houses.find((house) => house.id === id);

  if (match) {
    if (req.body.type) {
      match.type = req.body.type;
    }

    if (req.body.address) {
      match.address = req.body.address;
    }

    if (req.body.residentId) {
      match.residentId = req.body.residentId;
    }
    res.send(match);
  } else {
    res.status(404).send({ error: "No house here!" });
  }
});

app.delete("/houses/:id", (req, res) => {
  const id = Number(req.params.id);
  const indexToDelete = houses.findIndex((house) => house.id === id);

  if (indexToDelete > -1) {
    houses = houses.filter((house) => house.id !== id);

    res.send({ message: "The house was successfully deleted" });
  } else {
    res.status(404).send({ error: "No house here!" });
  }
});

app.get("/residents", (req, res) => {
  let residentsToSend = residents.map((resident) => {
    let housesOfResident = houses.filter(
      (house) => house.residentId === resident.id
    );
    return { ...resident, houses: housesOfResident };
  });

  res.send(residentsToSend);
});

app.post("/residents", (req, res) => {
  let errors: string[] = [];

  if (typeof req.body.name !== "string") {
    errors.push("It's not a valid name (string)");
  }
  if (typeof req.body.age !== "number") {
    errors.push("Age type must be number");
  }
  if (typeof req.body.gender !== "string") {
    errors.push("Gender type must be string");
  }
  if (errors.length === 0) {
    const newResident = {
      id: residents.length === 0 ? 1 : residents[residents.length - 1].id + 1,
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
    };
    residents.push(newResident);
    res.send(newResident);
  } else {
    res.status(400).send({ errors });
  }
});

app.patch("/residents/:id", (req, res) => {
  let id = Number(req.params.id);
  let match = residents.find((resident) => resident.id === id);

  if (match) {
    if (req.body.name) {
      match.name = req.body.name;
    }
    if (req.body.age) {
      match.age = req.body.age;
    }
    if (req.body.gender) {
      match.gender = req.body.gender;
    }
    res.send(match);
  } else {
    res.status(404).send({ error: "Resident not Found!!!" });
  }
});

app.delete("/residents/:id", (req, res) => {
  const id = Number(req.params.id);
  const indexTodelete = residents.findIndex((resident) => resident.id === id);

  if (indexTodelete > -1) {
    residents = residents.filter((resident) => resident.id !== id);
    res.send({ message: "The resident was successfully deleted" });
  } else {
    res.status(404).send({ erros: "resident not Found!" });
  }
});

app.listen(port, () => {
  console.log(`Go to: http://localhost:${port}`);
});
