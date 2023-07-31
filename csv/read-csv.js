const fs = require('fs');
const path = require('path');

const cheminFichierCSVArray = {
  solution: './solution.csv',
  question: './question.csv',
};

const express = require('express');
const app = express();
const port = 3000;

// Récupérer le chemin du fichier CSV à partir du paramètre d'URL 'path'
app.get('/csv', (req, res) => {
  const { path: csvPath } = req.query;

  if (!csvPath || !cheminFichierCSVArray.hasOwnProperty(csvPath)) {
    // Gérer l'erreur si le paramètre 'path' n'est pas fourni dans l'URL ou n'est pas valide
    res.status(400).send("Le chemin du fichier CSV n'est pas spécifié ou n'est pas valide.");
    return;
  }

  const cheminFichierCSV = cheminFichierCSVArray[csvPath];

  // Vérifier si le fichier existe avant de le lire
  if (fs.existsSync(cheminFichierCSV)) {
    // Lire le contenu du fichier CSV
    const contenuCSV = fs.readFileSync(cheminFichierCSV, 'utf-8');

    // Diviser le contenu CSV en lignes pour créer un tableau
    const tableauCSV = contenuCSV.split("\n");

    // Parcourir chaque ligne du CSV et diviser les valeurs pour créer un tableau 2D
    const donnees = tableauCSV.map((ligne) => ligne.split(','));

    // Envoyer le tableau au client (JavaScript)
    res.json(donnees);
  } else {
    // Gérer l'erreur si le fichier n'existe pas
    res.status(404).send("Le fichier CSV n'existe pas");
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
