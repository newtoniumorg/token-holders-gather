# Holders SnapShot
Token Holders Data Gather

This program use puppeter.js to scrap token holders, and save it to firebase.
Simply change the url with specific token contract address if you want to take a snapshot other than newtonium.

# How to install:
$ npm install

# Run the program
$ node scrap

Don't forget to modify/change the database connection with your own firebase database.
You might need to provide your google service account key (json format), in this program stored at /newt.json.

Because the program use puppeteer.js, you need to specify which page you want to scrap.
Better yet, you can implement some kind of looping for it.
