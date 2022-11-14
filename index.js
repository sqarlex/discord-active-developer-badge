const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const client = new Client({
    intents: INTENTS,
    allowedMentions: {
        parse: ["users"]
    },
    partials: PARTIALS,
    retryLimit: 3
});

global.client = client;
client.commands = (global.commands = []);

const { readdirSync } = require("fs")


/* Slash Komutları Yüklüyoruz */

readdirSync('./commands').forEach(f => {
  if(!f.endsWith(".js")) return;

 const props = require(`./commands/${f}`);

 client.commands.push({
       name: props.name.toLowerCase(),
       description: props.description,
       options: props.options,
       dm_permission: props.dm_permission,
       type: 1
 });

console.log(`[sqarlex - KOMUT] ${props.name} komutu yüklendi.`)

});


/* Slash Komutları Yüklüyoruz */
/* Eventleri Yüklüyoruz */

readdirSync('./events').forEach(e => {

  const eve = require(`./events/${e}`);
  const name = e.split(".")[0];

  client.on(name, (...args) => {
            eve(client, ...args)
        });

console.log(`[sqarlex - EVENT] ${name} eventi yüklendi.`)

});


/* Eventleri Yüklüyoruz */

client.login(process.env.token).then(app => {
  console.log(`[sqarlex - BOT] Token girişi başarılı.`)
}).catch(app => {
  console.log(`[sqarlex - BOT] Token girişi başarısız.`)
})
