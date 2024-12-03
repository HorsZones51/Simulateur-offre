
document.getElementById('simulateur-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect inputs
    const offreType = document.getElementById('offre-type').value;
    const engagement = parseInt(document.getElementById('engagement').value);
    const lignes = parseInt(document.getElementById('lignes').value || 0);
    const jeuneCreateur = document.getElementById('jeune-createur').checked;
    const adslFibre = document.getElementById('adsl-fibre').checked;
    const marge = parseFloat(document.getElementById('marge').value);

    // Example data (normally from JSON)
    const tarifs = {
        adsl: 45,
        fibre: 55,
        mobiles: {
            "12": { "5go": 21, "30go": 28.5, "200go": 38.5 },
            "24": { "5go": 24, "30go": 38.5, "200go": 44.5 }
        },
        remises: {
            fibre: 7,
            jeuneCreateur: 0.3,
            marges: [4, 10, 12]
        }
    };

    // Calculations
    let tarifFixe = tarifs[offreType];
    if (adslFibre) tarifFixe -= tarifs.remises.fibre;

    if (jeuneCreateur) {
        tarifFixe *= 1 - tarifs.remises.jeuneCreateur;
    } else {
        tarifFixe -= marge;
    }

    let mobileTarif = 0;
    if (lignes > 0) {
        for (let i = 0; i < lignes; i++) {
            mobileTarif += tarifs.mobiles[engagement]["5go"]; // Defaulting to 5go for simplicity
        }
    }

    const total = tarifFixe + mobileTarif;

    // Display results
    document.getElementById('resultats').innerHTML = `
        <h2>Résultats :</h2>
        <p>Tarif fixe : ${tarifFixe.toFixed(2)} €/mois</p>
        <p>Tarif mobiles : ${mobileTarif.toFixed(2)} €/mois</p>
        <p>Total mensuel : ${total.toFixed(2)} €/mois</p>
    `;
});
