// menggunakan expres

const express = require("express");
const app = express();
const PORT = 8000;
let movies = [
  { id: 23, title: "Moana", year: 2020 },
  { id: 24, title: "FROZEN", year: 2020 },
];
app.use(express.json());
app.get("/", (req, res) => {
  res.json("hallo ini adalah server express");
});
// get all movie
app.get("/movie", (req, res) => {
  res.json(movies);
});
// get movie by id
app.get("/movie/:id", (req, res) => {
  const { id } = req.params;
  let movie = movies.find((item) => item.id == id);
  if (movie) {
    res.json(movie);
  } else {
    res.json("movie not found");
  }
});
// add movie

app.post("/movie", (req, res) => {
  let movie = req.body;
  console.log(movie);
  movies.push(movie);
  res.json("sucses added new movie");
});

// add delete

app.delete("/movie/:id", (req, res) => {
  const { id } = req.params;

  let movie = movies.filter((item) => item.id != id);
  if (movie) {
    res.json(movie);
  } else {
    res.json("not found");
  }
});

app.put("/movie/:id", (req, res) => {
  const accountId = Number(req.params.id);
  const body = req.body;
  const account = movies.find((account) => account.id === accountId);
  const index = movies.indexOf(account);

  if (!account) {
    res.status(500).json("Account not found.");
  } else {
    const updatedAccount = { ...account, ...body };

    movies[index] = updatedAccount;

    res.json(updatedAccount);
  }
});

app.listen(PORT, () => {
  console.log("server running on post " + PORT);
});
