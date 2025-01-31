// Import required modules
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

// Initialize the app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const connection = mysql.createConnection({
  host: "ucka.veleri.hr",
  user: "fstefanac",
  password: "11",
  database: "fstefanac",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database!");
});

// Endpoints

// 1. Get all users (Korisnik)
app.get("/api/korisnici", (req, res) => {
  const query = "SELECT * FROM Korisnik";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Error fetching users" });
    }
    res.json(results);
  });
});

// 2. Get all meal plans (Planovi)
app.get("/api/planovi", (req, res) => {
  const { searchQuery, searchByCategory, searchByName } = req.query;

  let query = "SELECT * FROM Planovi";
  let queryParams = [];

  if (searchQuery) {
    // If searchQuery is provided, add condition for search
    const conditions = [];
    if (searchByCategory === "true") {
      conditions.push("opisPlana LIKE ?");
      queryParams.push(`%${searchQuery}%`);
    }
    if (searchByName === "true") {
      conditions.push("nazivPlana LIKE ?");
      queryParams.push(`%${searchQuery}%`);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" OR ");
    }
  }

  connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("Error fetching plans:", err);
      return res.status(500).json({ error: "Error fetching plans" });
    }
    res.json(results);
  });
});

// 3. Get a specific user by ID
app.get("/api/korisnici/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM Korisnik WHERE ID_korisnika = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Error fetching user" });
    }
    res.json(results[0]);
  });
});

// 4. Get a specific meal plan by ID
app.get("/api/planovi/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM Planovi WHERE sifraPlana = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching plan:", err);
      return res.status(500).json({ error: "Error fetching plan" });
    }
    res.json(results[0]);
  });
});

// 5. Add a new user (Korisnik)
app.post("/api/korisnik", (req, res) => {
  const {
    Ime_korisnika,
    Prezime_korisnika,
    Email_korisnika,
    Lozinka_korisnika,
    Adresa_korisnika,
    Kontakt_korisnika,
  } = req.body;
  const query = `INSERT INTO Korisnik (Ime_korisnika, Prezime_korisnika, Email_korisnika, Lozinka_korisnika, Adresa_korisnika, Kontakt_korisnika) VALUES (?, ?, ?, ?, ?, ?)`;

  connection.query(
    query,
    [
      Ime_korisnika,
      Prezime_korisnika,
      Email_korisnika,
      Lozinka_korisnika,
      Adresa_korisnika,
      Kontakt_korisnika,
    ],
    (err, results) => {
      if (err) {
        console.error("Greška pri dodavanju korisnika:", err);
        res.status(500).json({ error: "Greška pri dodavanju korisnika" });
      } else {
        res
          .status(200)
          .json({ id: results.insertId, message: "Korisnik uspješno dodan" });
      }
    }
  );
});

// 6. Add a new meal plan (Planovi)
app.post("/api/planovi", (req, res) => {
  const { nazivPlana, opisPlana, cijena } = req.body;

  // Validate input
  if (!nazivPlana || !opisPlana || !cijena) {
    return res
      .status(400)
      .json({ error: "Naziv plana, opis i cijena su obavezni!" });
  }

  // Validate cijena as a number
  if (isNaN(cijena) || cijena <= 0) {
    return res.status(400).json({ error: "Cijena mora biti pozitivni broj!" });
  }

  const query =
    "INSERT INTO Planovi (nazivPlana, opisPlana, cijena) VALUES (?, ?, ?)";

  connection.query(query, [nazivPlana, opisPlana, cijena], (err, results) => {
    if (err) {
      console.error("Error adding plan:", err);
      return res.status(500).json({ error: "Error adding plan" });
    }
    res
      .status(201)
      .json({ message: "Plan added successfully", id: results.insertId });
  });
});

// 7. Delete a user by ID
app.delete("/api/korisnici/:id", (req, res) => {
  const { id } = req.params;

  console.log("Primljen zahtev za brisanje korisnika sa ID:", id); // Dodajte ovaj log

  const query = "DELETE FROM Korisnik WHERE ID_korisnika = ?";

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Greška prilikom brisanja korisnika:", err);
      return res.status(500).json({ error: "Greška prilikom brisanja korisnika" });
    }
    if (results.affectedRows === 0) {
      console.log("Korisnik sa datim ID nije pronađen:", id); // Dodajte ovaj log
      return res.status(404).json({ message: "Korisnik nije pronađen" });
    }
    console.log("Korisnik uspešno obrisan:", id); // Dodajte ovaj log
    res.json({ message: "Korisnik uspešno obrisan" });
  });
});

// 8. Delete a meal plan by ID
app.delete("/api/planovi/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM Planovi WHERE sifraPlana = ?";

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting plan:", err);
      return res.status(500).json({ error: "Error deleting plan" });
    }
    res.json({ message: "Plan deleted successfully" });
  });
});

// 9. Login user (LogIn korisnika)
app.get("/api/login", (req, res) => {
  const { ID_korisnika, Lozinka_korisnika } = req.query;

  const query =
    "SELECT Ime_korisnika, Prezime_korisnika, Role FROM Korisnik WHERE ID_korisnika = ? AND Lozinka_korisnika = ?";
  connection.query(query, [ID_korisnika, Lozinka_korisnika], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Greška pri prijavi korisnika" });
    }

    if (results.length > 0) {
      const korisnik = results[0];
      
      // Ako je korisnik administrator, prebacujemo ga u admin ulogu
      if (korisnik.Role === "admin") {
        return res.json({
          success: true,
          message: `Uspješno ste logirani kao admin! Ime i prezime: ${korisnik.Ime_korisnika} ${korisnik.Prezime_korisnika}`,
          role: "admin",
        });
      } else {
        return res.json({
          success: true,
          message: `Uspješno ste logirani! Ime i prezime: ${korisnik.Ime_korisnika} ${korisnik.Prezime_korisnika}`,
          role: "user",
        });
      }
    } else {
      res.status(404).json({ error: "Neispravan ID ili lozinka." });
    }
  });
});

// ENDPOINT - dodavanje narudzbe

app.post("/api/dodavanjenarudzbe", (req, res) => {
  const { nazivPlana, ID_korisnika, sifraPlana } = req.body;

  // SQL upit za dodavanje narudžbe
  const query = `
    INSERT INTO Kosarica (nazivPlana, ID_korisnika, sifraPlana)
    VALUES (?, ?, ?)
  `;

  connection.query(
    query,
    [nazivPlana, ID_korisnika, sifraPlana],
    (err, results) => {
      if (err) {
        console.error("Greška prilikom dodavanja plana:", err);
        return res
          .status(500)
          .json({ error: "Greška prilikom dodavanja plana" });
      }

      res.status(201).json({
        message: "Plan prehrane uspješno dodan!",
        narudzbaId: results.insertId,
      });
    }
  );
});

// ENDPOINT - Brisanje narudžbe prema ID-u
app.delete("/api/brisanjenarudzbe/:ID_Kosarice", (req, res) => {
  const ID_Kosarice = req.params.ID_Kosarice; // Correctly reference the URL parameter
  const query = "DELETE FROM Kosarica WHERE ID_Kosarice = ?";

  connection.query(query, [ID_Kosarice], (err, results) => {
    if (err) {
      console.error("Greška prilikom brisanja narudžbe:", err);
      return res.status(500).json({ error: "Greška prilikom brisanja plana" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Plan prehrane nije pronađen" });
    }
    res.json({ message: "Plan prehrane uspješno obrisan" });
  });
});



app.get("/api/narudzbe", (request, response) => {
  connection.query("SELECT * FROM Kosarica", (error, results) => {
    if (error) throw error;
    response.send(results);
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
