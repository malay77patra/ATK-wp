const {Client, RemoteAuth } = require('whatsapp-web.js');
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
const url = process.env.URL;
const MONGO = process.env.MONGO;
const qrcode = require('qrcode-terminal');

mongoose.connect(MONGO).then(() => {
  const store = new MongoStore({ mongoose: mongoose });
  const client = new Client({
    authStrategy: new RemoteAuth({
      store: store,
      backupSyncIntervalMs: 300000
    }),
    puppeteer: {
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
  });
  client.on('qr', (qr) => {
    console.log("qr received", qr);
    qrcode.generate(qr, {small:true});
    //axios.po
  });
  client.on('ready', () => {
    console.log("<<:Client Ready:>>");
  });
  client.on('message', async msg => {
    const body = await msg.body;
    const type = await msg.type;
    const hasQT = await msg.hasQuotedMsg;
    if (msg.fromMe) {
      console.log("message from me: " + msg.body);
    }
  });
  console.log("<<:Cliend Initialized:>>");
  client.initialize();
});
