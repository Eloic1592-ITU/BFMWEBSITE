async function generateChartFromAPI(apiUrl, chartElementId) {
  const periode = [];
  const tauxFPM = [];
  const tauxFDD = [];
  const tauxTXD = [];
  const tauxREF = [];

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const items = data.data.data[0];
    console.log(items);

    for (let i = items.length - 1; i >= 0; i--) {
      const dateStr = items[i].D_DATE;

      periode.push(dateStr);
      tauxREF.push(parseFloat(items[i].TAUX));

      const autreTaux = await getAutreTaux(dateStr);
      console.log(autreTaux);

      // Initialiser les valeurs à null pour éviter les décalages
      let fpm = null;
      let fdd = null;
      let txd = null;

      autreTaux.forEach(item => {
        const type = item.TYPE.trim();
        const taux = parseFloat(item.TAUX.trim());

        switch (type) {
          case "FPM":
            fpm = taux;
            break;
          case "FDD":
            fdd = taux;
            break;
           case "TXD":
            txd = taux;
            break;  
        }
      });

      tauxFPM.push(fpm);
      tauxFDD.push(fdd);
      tauxTXD.push(txd);
    }

    // Récupérer toutes les valeurs valides
    const allTaux = [...tauxREF, ...tauxFPM, ...tauxFDD, ...tauxTXD].filter(v => v !== null && !isNaN(v));

    const minTaux = Math.floor(Math.min(...allTaux));
    const maxTaux = Math.max(...allTaux);
    const yMin = minTaux;
    const yMax = maxTaux;

    // Création du graphique
    const config = {
      type: "line",
      data: {
        labels: periode,
        datasets: [
          {
            label: "TAUX DIRECTEUR",
            data: tauxTXD,
            fill: false,
            borderColor: "green",
            borderWidth: 2,
            pointRadius: 1,
          },
          {
            label: "TAUX DES FACILITES DE PRET MARGINAL",
            data: tauxFPM,
            fill: false,
            borderColor: "#2f62bd",
            borderWidth: 2,
            pointRadius: 1,
          },
          {
            label: "TAUX DES FACILITES DES DEPOTS",
            data: tauxFDD,
            fill: false,
            borderColor: "#cf8a00",
            borderWidth: 2,
            pointRadius: 1,
          },
          {
            label: "TAUX DE REFERENCE",
            data: tauxREF,
            fill: false,
            borderColor: "#a4a4a4",
            borderWidth: 2,
            pointRadius: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
            position: "top",
          },
        },
        elements: {
          line: {
            tension: 0,
          },
        },
        layout: {
          padding: {
            left: 50,
            right: 50,
            top: 10,
            bottom: 10,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              stepSize: 1,
            },
            min: yMin,
            max: yMax,
          },
        },
      },
    };

    const ctx = document.getElementById(chartElementId).getContext("2d");
    new Chart(ctx, config);
  } catch (error) {
    console.log("Erreur lors du chargement du graphique :" + error);
  }
}


async function getAutreTaux(date) {
const baseUrl = `${window.APP_CONFIG.API_URL}/wp-json/bfm/autres_taux_pomi_by_date`;
  const items = [];
  try {
    // Restriction simple: le backend attend un format de date "YYYY-MM-DD"
    const dateStr = typeof date === "string" ? date.trim() : String(date ?? "");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      console.log(`Date invalide fournie à getAutreTaux: "${dateStr}"`);
      return items;
    }

    const url = new URL(baseUrl);
    url.searchParams.set("date", dateStr);
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const result = data?.data?.data?.[0];

    return result;
  } catch (error) {
    console.log(`Erreur lors de la récupération du taux pour la date ${dateStr} : ${error}`);
    return items;
  }
}

// Appel principal



function convertirFormatDate(date){
	// Découper la date en jour, mois et année
	let elementsDate = date.split('-');
	
	// Tableau des noms de mois en anglais
	const moisEnAnglais = {
		"JAN": "01", "FEB": "02", "MAR": "03", "APR": "04",
		"MAY": "05", "JUN": "06", "JUL": "07", "AUG": "08",
		"SEP": "09", "OCT": "10", "NOV": "11", "DEC": "12"
	};

	// Convertir le mois en format numérique
	let mois = moisEnAnglais[elementsDate[1]];

	// Concaténer la nouvelle date dans le format désiré
	let nouvelleDate = elementsDate[0] + " | " + mois + " | " + "20" + elementsDate[2];
	
	return nouvelleDate;
  }

function dateFrToEngDate(dateStr){
	// Séparer les parties du jour, du mois et de l'année
	let [day, month, year] = dateStr.split('/');

	// Recréer une date au format 'yyyy-mm-dd' que JavaScript comprend
	let formattedDateStr = `${year}-${month}-${day}`;

	return formattedDateStr;
} 
