const https = require('https');
const fs = require('fs');
const path = require('path');

// Dossier de destination pour v15
const outputDir = './src/assets/fonts/open-sans-v15/';

// URLs des fichiers Latin uniquement (Open Sans v15)
const fonts = [
  {
    url: 'https://fonts.gstatic.com/s/opensans/v15/memnYaGs126MiZpBA-UFUKWyV9hrIqM.woff2',
    filename: 'open-sans-v15-latin-300italic.woff2'
  },
  {
    url: 'https://fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UN_r8OUuhp.woff2',
    filename: 'open-sans-v15-latin-300.woff2'
  },
  {
    url: 'https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFVZ0b.woff2',
    filename: 'open-sans-v15-latin-regular.woff2'
  },
  {
    url: 'https://fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UNirkOUuhp.woff2',
    filename: 'open-sans-v15-latin-600.woff2'
  },
  {
    url: 'https://fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UN8rsOUuhp.woff2',
    filename: 'open-sans-v15-latin-800.woff2'
  }
];

// Créer le dossier si nécessaire
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`Dossier créé: ${outputDir}\n`);
}

console.log('Téléchargement des fonts Open Sans v15 (Latin)...\n');

// Fonction de téléchargement avec retry
function downloadFont(fontInfo, retries = 3) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(outputDir, fontInfo.filename);
    const file = fs.createWriteStream(filePath);
    
    const request = https.get(fontInfo.url, {
      timeout: 10000, // 10 secondes de timeout
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    }, (response) => {
      if (response.statusCode !== 200) {
        fs.unlink(filePath, () => {});
        reject(new Error(`Status: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(` ${fontInfo.filename}`);
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(filePath, () => {});
        reject(err);
      });
    });
    
    request.on('error', (err) => {
      fs.unlink(filePath, () => {});
      if (retries > 0) {
        console.log(`Erreur sur ${fontInfo.filename}, nouvelle tentative... (${retries} restantes)`);
        setTimeout(() => {
          downloadFont(fontInfo, retries - 1).then(resolve).catch(reject);
        }, 2000);
      } else {
        reject(err);
      }
    });
    
    request.on('timeout', () => {
      request.destroy();
      fs.unlink(filePath, () => {});
      reject(new Error('Timeout'));
    });
  });
}

// Télécharger les fichiers UN PAR UN (séquentiel)
async function downloadAllFonts() {
  for (const font of fonts) {
    try {
      await downloadFont(font);
      // Pause de 500ms entre chaque téléchargement
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (err) {
      console.error(`Échec définitif: ${font.filename}`, err.message);
      return;
    }
  }
  
  console.log('\nTéléchargement terminé !');
  console.log('\nCréation du fichier CSS...');
  
  // Générer le fichier CSS
  const cssContent = `/* Open Sans v15 - Latin only */

/* open-sans-300italic - latin */
@font-face {
  font-display: swap;
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: 300;
  src: local('Open Sans Light Italic'), local('OpenSans-LightItalic'),
       url('./open-sans-v15-latin-300italic.woff2') format('woff2');
}

/* open-sans-300 - latin */
@font-face {
  font-display: swap;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 300;
  src: local('Open Sans Light'), local('OpenSans-Light'),
       url('./open-sans-v15-latin-300.woff2') format('woff2');
}

/* open-sans-regular - latin */
@font-face {
  font-display: swap;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  src: local('Open Sans Regular'), local('OpenSans-Regular'),
       url('./open-sans-v15-latin-regular.woff2') format('woff2');
}

/* open-sans-600 - latin */
@font-face {
  font-display: swap;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  src: local('Open Sans SemiBold'), local('OpenSans-SemiBold'),
       url('./open-sans-v15-latin-600.woff2') format('woff2');
}

/* open-sans-800 - latin */
@font-face {
  font-display: swap;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 800;
  src: local('Open Sans ExtraBold'), local('OpenSans-ExtraBold'),
       url('./open-sans-v15-latin-800.woff2') format('woff2');
}
`;

  fs.writeFileSync(path.join(outputDir, 'open-sans-v15.css'), cssContent);
  console.log('Fichier open-sans-v15.css créé !');
  console.log(`\nStructure créée:`);
  console.log(`   ${outputDir}`);
  console.log(`open-sans-v15.css`);
  console.log(`open-sans-v15-latin-300italic.woff2`);
  console.log(`open-sans-v15-latin-300.woff2`);
  console.log(`open-sans-v15-latin-regular.woff2`);
  console.log(`open-sans-v15-latin-600.woff2`);
  console.log(`open-sans-v15-latin-800.woff2`);
  console.log('\nProchaine étape: Importez dans votre styles.css:');
  console.log("@import 'assets/fonts/open-sans-v15/open-sans-v15.css';");
}

// Lancer le téléchargement
downloadAllFonts().catch(err => {
  console.error('\nErreur lors du téléchargement:', err);
});