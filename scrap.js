const puppeteer = require('puppeteer');
const admin = require('firebase-admin');

const serviceAccount = require('./newt.json');

//need to scrap and know page beforehand, duh
const scrapUrl =
  'https://etherscan.io/token/generic-tokenholders2?a=0xAE9CBE6eBf72A51c9Fcea3830485614486318Fd4&sid=&m=normal&s=9.99E%2b23&p=5';

//async function, run manually for now, that's okay
const scrap = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 926 });
  await page.goto(scrapUrl);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const db = admin.firestore();
  // get details
  let etherData = await page.evaluate(() => {
    let ether = [];
    // get the DOM
    let etherscanElms = document.querySelectorAll('tbody tr');
    // iterate each DOM
    etherscanElms.forEach((etherscan) => {
      let etherscanJson = {};
      try {
        etherscanJson.address = etherscan.querySelector('td span a').innerText;
        etherscanJson.balance = etherscan.querySelector(
          'td:nth-child(3)'
        ).innerHTML;
      } catch (exception) {}
      ether.push(etherscanJson);
    });

    return ether.filter((item) => {
      return item.address.split('')[0] === '0';
    });
  });

  etherData.forEach((item) => {
    db.collection('newtonian').doc(item.address).set({
      balance: item.balance,
    });
  });

  console.dir(etherData);
};

scrap();
