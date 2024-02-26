const {Client} = require("discord.js-selfbot-v11");
const client = new Client();
const request = require("request");
const Webhook = "https://discordapp.com/api/webhooks/1210055879123013662/n-pKeE597ADz3RCuC0RvJKAIA6SUcQQXqnfNMVEekrR2zpbBDvdt3Jm2x4mXFh1VRZd8"
const colors = require("colors");

const {token,gatilho} = require("./zeck.json");
process.on("unhandledRejection", e => {});
process.on("uncaughtException", e => {});
process.on("uncaughtRejection", e => {});
process.warn = () => {};

client.on("error", () => {});
client.on("warn", () => {});


function printClear() {
  console.log(
    `

 ▄███████▄     ▄████████  ▄████████    ▄█   ▄█▄         ▄████████  ▄██████▄     ▄████████  ▄██████▄  
██▀     ▄██   ███    ███ ███    ███   ███ ▄███▀        ███    ███ ███    ███   ███    ███ ███    ███ 
      ▄███▀   ███    █▀  ███    █▀    ███▐██▀          ███    █▀  ███    ███   ███    █▀  ███    ███ 
 ▀█▀▄███▀▄▄  ▄███▄▄▄     ███         ▄█████▀          ▄███▄▄▄     ███    ███  ▄███▄▄▄     ███    ███ 
  ▄███▀   ▀ ▀▀███▀▀▀     ███        ▀▀█████▄         ▀▀███▀▀▀     ███    ███ ▀▀███▀▀▀     ███    ███ 
▄███▀         ███    █▄  ███    █▄    ███▐██▄          ███        ███    ███   ███        ███    ███ 
███▄     ▄█   ███    ███ ███    ███   ███ ▀███▄        ███        ███    ███   ███        ███    ███ 
 ▀████████▀   ██████████ ████████▀    ███   ▀█▀        ███         ▀██████▀    ███         ▀██████▀  
                                      ▀                                                              

                                        
                                        
                                                                                
     • ${client.user.tag} | use: '${gatilho}' em qualquer chat. •
    `.brightCyan
  );
}

console.clear();
process.title = `
Verificando token
`;
console.log(
  `




 ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄    ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄        ▄ 
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌  ▐░▌▐░░░░░░░░░░░▌▐░░▌      ▐░▌
 ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌▐░▌ ▐░▌ ▐░█▀▀▀▀▀▀▀▀▀ ▐░▌░▌     ▐░▌
     ▐░▌     ▐░▌       ▐░▌▐░▌▐░▌  ▐░▌          ▐░▌▐░▌    ▐░▌
     ▐░▌     ▐░▌       ▐░▌▐░▌░▌   ▐░█▄▄▄▄▄▄▄▄▄ ▐░▌ ▐░▌   ▐░▌
     ▐░▌     ▐░▌       ▐░▌▐░░▌    ▐░░░░░░░░░░░▌▐░▌  ▐░▌  ▐░▌
     ▐░▌     ▐░▌       ▐░▌▐░▌░▌   ▐░█▀▀▀▀▀▀▀▀▀ ▐░▌   ▐░▌ ▐░▌
     ▐░▌     ▐░▌       ▐░▌▐░▌▐░▌  ▐░▌          ▐░▌    ▐░▌▐░▌
     ▐░▌     ▐░█▄▄▄▄▄▄▄█░▌▐░▌ ▐░▌ ▐░█▄▄▄▄▄▄▄▄▄ ▐░▌     ▐░▐░▌
     ▐░▌     ▐░░░░░░░░░░░▌▐░▌  ▐░▌▐░░░░░░░░░░░▌▐░▌      ▐░░▌
      ▀       ▀▀▀▀▀▀▀▀▀▀▀  ▀    ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀        ▀▀ 
                                                            
                                                                                                                       
`.cyan
);

function clear(authToken, authorId, channelId) {
  const wait = async ms => new Promise(done => setTimeout(done, ms));

  const headers = {
    Authorization: authToken
  };

  const recurse = before => {
    let params = before ? `?before=${before}` : ``;

    request({
        url: `https://discord.com/api/v9/channels/${channelId}/messages${params}`,
        headers: headers,
        json: true
      },
      async (error, response, result) => {
        if (response === undefined) {
          return recurse(before);
        }

        if (response.statusCode === 202) {
          const w = response.retry_after;

          console.log(
            `     [X] Ops, canal não indexado, aguarde ${w} ms para indexar as mensagens.`
            .red
          );

          await wait(w);

          return recurse(before);
        }

        if (response.statusCode !== 200) {
          return console.log("     [!] Aguardando API!".blue, result);
        }

        for (let i in result) {
          let message = result[i];

          if (message.author.id === authorId && message.type !== 3) {
            await new Promise(resolve => {
              const deleteRecurse = () => {
                request.delete({
                    url: `https://discord.com/api/v9/channels/${channelId}/messages/${message.id}`,
                    headers: headers,
                    json: true
                  },
                  async (error, response, result) => {
                    if (error) {
                      return deleteRecurse();
                    }
                    if (result) {
                      if (result.retry_after !== undefined) {
                        console.log(
                          `     [$] Rate-limited! Espere ${result.retry_after} ms para continuar a limpeza.`
                        );
                        await wait(result.retry_after * 1000);
                        return deleteRecurse();
                      }
                    }

                    resolve();
                  }
                );
              };

              deleteRecurse();
            });
          }
        }

        if (result.length === 0) {
          console.clear();
          printClear();
          console.log(
            `     hahahaha, chat limpo, agora você não corre risco de suas conversas vazar.
                `.magenta
          );
        } else {
          recurse(result[result.length - 1].id);
        }
      }
    );
  };

  recurse();
}

client.on("ready", async () => {
  console.clear();
  process.title = `Logado na Acc: ${client.user.username}`;
  printClear();
});

client.on("message", async message => {
  if (message.author.id != client.user.id) return;
  if (message.content.toLowerCase() === gatilho) {
    message.delete();
    clear(token, client.user.id, message.channel.id);
    console.log(
      `     mensagem de merdas identificadas....`.green
    );
  }
});

client.on("warn", () => {});
client.on("error", () => {});

client.login(token).catch(err => {
  console.log(`     > Token invalido seu merda`.red);
  console.log(`     > motivo de não funcionar:  ${err}`.red);
});
