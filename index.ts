import { whatIs, SubResult, Categories } from './analyser/analyser';

import * as colors from 'colors/safe';

function additionalInformation(res: SubResult) {
  let text = '    ';

  if (res.confidence !== null) {
    if (res.confidence > 90) {
      text += `${colors.bgGreen(` Confidence ${res.confidence}% `)}  `;
    } else if (res.confidence < 50) {
      text += `${colors.bgRed(` Confidence ${res.confidence}% `)}  `;
    } else {
      text += `${colors.bgYellow(` Confidence ${res.confidence}% `)}  `;
    }
  }
  if (res.version !== null) {
    text += `${colors.bgCyan(` Version: ${res.version} `)}  `;
  }

  return text;
}

async function main() {
  console.log(`What is ${target}? 🤔`);
  console.log();

  try {
    const res = await whatIs(target);

    if (res.application !== null) {
      console.log(
        `That's a ${colors.bgBlue(res.application.name)} ${
          res.application.category === Categories.CMS ||
          res.application.category === Categories.STATIC_SITE_GENERATOR
            ? 'site'
            : 'instance'
        }!${additionalInformation(res.application)}`
      );
      if (res.server !== null) {
        console.log(
          `Running on a ${colors.bgBlue(
            res.server.name
          )} server.${additionalInformation(res.server)}`
        );
        if (res.programmingLanguage !== null) {
          console.log(
            `With ${colors.bgBlue(
              res.programmingLanguage.name
            )} running on it.${additionalInformation(res.programmingLanguage)}`
          );
        } else {
          console.log(`Unsure about the server side language used though...`);
        }
      } else {
        console.log("Can't tell which server its running though...");
        if (res.programmingLanguage !== null) {
          console.log(
            `But it's definitly running ${colors.bgBlue(
              res.programmingLanguage.name
            )} on the server.${additionalInformation(res.programmingLanguage)}`
          );
        } else {
          console.log(`Also no idea about the server side language running.`);
        }
      }
    } else {
      console.log(
        'Not sure what kind of application that is. Something custom, perhaps?'
      );
      if (res.server !== null) {
        console.log(
          `But its ${
            res.server.confidence > 75 ? 'definity' : ''
          } running on a ${colors.bgBlue(
            res.server.name
          )}.${additionalInformation(res.server)}`
        );
        if (res.programmingLanguage !== null) {
          console.log(
            `With ${colors.bgBlue(
              res.programmingLanguage.name
            )} running on it.${additionalInformation(res.programmingLanguage)}`
          );
        } else {
          console.log(`Unsure about the server side language used though...`);
        }
      } else {
        console.log(`Also no idea about the server side language running.`);
        if (res.programmingLanguage !== null) {
          console.log(
            `But it's definitly running ${colors.bgBlue(
              res.programmingLanguage.name
            )} on the server.${additionalInformation(res.programmingLanguage)}`
          );
        } else {
          console.log(`Also no idea about the server side language running.`);
        }
      }
    }
  } catch (error) {
    console.error(`Some went really wrong.`);
    console.error(`Is the site reachable?`);

    console.error(error);
  }
}

const target = process.argv[2];

main();