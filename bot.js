
//This project was created for MakeSPP 2020 Xabier.N 
const Discord = require('discord.js');
const { Client, MessageAttachment } = require('discord.js');
const { link } = require('ffmpeg-static');


const client = new Discord.Client();
const config = require("./config.json");
const packagelock = require("./package-lock.json")

client.on('ready', () => {
  console.log(`Estoy listo!, conectado en ${client.guilds.size} servidores y  ${client.users.size} usuarios.`);
   client.user.setPresence( {
       status: "online",
       game: {
           name: prefix + `help | Estoy en ${client.guilds.size} servidores.`,
           type: "PLAYING"
       }
    });
   
});

var prefix = config.prefix;




client.on('message', message => {


  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  /*
  Mostrar errores, desabilitado
  client.on("error", (e) => console.error(e));
  client.on("warn", (e) => console.warn(e));
  client.on("debug", (e) => console.info(e));
  */
  
  if (!message.guild) return;
  client.on("guildMemberAdd", (member) => {
    if (!message.guild) return;
    console.log(`Nuevo usuario:  ${member.user.username} se ha unido a ${member.guild.name}.`);
    var canal = client.channels.get('bienvenido'); 
    canal.send(`${member.user}, bienvenido al servidor pasala bien.`);
    
  });
 
  
  
  

  
  if (message.content.startsWith(prefix + "kick")) {
   
    const user = message.mentions.users.first();
    
    if (user) {
     
      const member = message.guild.member(user);
    
      if (member) {
        
        member
          .kick('Ha realizado conductas inapropiasda')
          .then(() => {
            
            message.reply(`Eliminado correctamente ${user.tag}`);
          })
          .catch(err => {
            
            message.reply('No se puede eliminar a ese miembro');
            
            console.error(err);
          });
         }  
      else {
        
        message.reply("El usuario no está en este servidor");
      }
     } 
    else {
      message.reply("No has dicho ha quien hay que eliminar!");
    }
  }
  
  

  
 if (message.content.startsWith(prefix + "rip")) {
    
    
    const attachment = new MessageAttachment('https://i.imgur.com/w3duR07.png');
   
    message.channel.send(attachment);
  }
  if (message.content.startsWith(prefix + "ping")) {
    message.channel.send("pong!");
  }
  if (message.content.startsWith(prefix + "hola")) {
    message.channel.send("Hola que tal?");
  }
   
  if (message.content.startsWith(prefix + config.comando_personalizado)) {
      message.channel.send(config.frase_personalizada);
  }


  if (message.content.startsWith(prefix + "conectar")) { 
    let voiceChannel = message.member.voiceChannel;
    if (!voiceChannel || voiceChannel.type !== 'voice') {
    message.channel.send('¡Necesitas unirte a un canal de voz primero!.').catch(error => message.channel.send(error));
    } else if (message.guild.voiceConnection) {
    message.channel.send('Ya estoy conectado en un canal de voz.');
    } else {
     message.channel.send('Conectando...').then(m => {
      voiceChannel.join().then(() => {
               m.edit(':white_check_mark: | Conectado exitosamente.').catch(error => message.channel.send(error));
         }).catch(error => message.channel.send(error));
     }).catch(error => message.channel.send(error));
    }
   }

  if (message.content.startsWith(prefix + "desconectar")) { 
    let voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
        message.channel.send('No estoy en un canal de voz.');
    } else {
      message.channel.send(':white_check_mark: | Desconectado exitosamente.').then(m => {
        voiceChannel.leave().then(() => {
                 m.edit(':white_check_mark: | Desconectado exitosamente.').catch(error => message.channel.send(error));
           }).catch(error => message.channel.send(error));
       }).catch(error => message.channel.send(error));
      }
    }

  if (message.content.startsWith(prefix + "play")) {
      if (!message.guild.voiceConnection) return message.channel.send('¡No estoy en un canal de voz!, use ' + prefix + 'join para unirme a un canal.').catch(error => message.channel.send(error));
      const dispatcher = message.guild.voiceConnection.playArbitraryInput(`https://www.youtube.com/watch?v=GWCldYPEsl4&ab_channel=FischPege`);
  }

  if(message.content.startsWith(prefix + "server")){

    var server = message.guild;
  
    const embed = new Discord.RichEmbed()
    .setThumbnail(server.iconURL)
    .setAuthor(server.name, server.iconURL)
    .addField('ID', server.id, true)
    .addField('Región', 'Europa', true)
    .addField('Creado el', '10 de Septiembre', true)
    .addField('Dueño del Servidor', server.owner.user.username, true)
    .addField('Miembros', server.memberCount, true)
    .addField('Roles', server.roles.size, true)
    .setDescription("**Invita a tus amigos a unirse!!** || "+ config.link)
    .setFooter("@xabinovoa", client.user.avatarURL)
    .setColor(0x66b3ff)
      
   message.channel.send({ embed });
  
  }
  if(message.content.startsWith(prefix + "user")){
    let userm = message.mentions.users.first()
    if(!userm){
      var user = message.author;
      
        const embed = new Discord.RichEmbed()
        .setThumbnail(user.avatarURL)
        .setAuthor(user.username+'#'+user.discriminator, user.avatarURL)
        .addField('Jugando a', user.presence.game != null ? user.presence.game.name : "Nada", true)
        .addField('ID', user.id, true)
        .addField('Estado', user.presence.status, true)
        .addField('Apodo', message.member.nickname, true)
        .addField('Cuenta Creada', user.createdAt.toDateString(), true)
        .addField('Fecha de Ingreso', message.member.joinedAt.toDateString())
        .addField('Roles', message.member.roles.map(roles => `\`${roles.name}\``).join(', '))
        .setColor(0x66b3ff)
        
       message.channel.send({ embed });
    }else{
      const embed = new Discord.RichEmbed()
      .setThumbnail(userm.avatarURL)
      .setAuthor(userm.username+'#'+userm.discriminator, userm.avatarURL)
      .addField('Jugando a', userm.presence.game != null ? userm.presence.game.name : "Nada", true)
      .addField('ID', userm.id, true)
      .addField('Estado', userm.presence.status, true)
      .addField('Cuenta Creada', userm.createdAt.toDateString(), true)
      .setColor(0x66b3ff)
      
     message.channel.send({ embed });
    }
    
  }
  if(message.content.startsWith(prefix + "help")){

    message.channel.send('**'+message.author.username+'**, Revisa tus mensajes privados.');
    message.author.send('**COMANDOS DE FliOne**\n```\n'+
    '-> '+prefix+'ping           :: Comprueba la latencia del bot y de tus mensajes.\n'+
    '-> '+prefix+'avatar         :: Muestra el avatar de un usuario.\n'+
    '-> '+prefix+'user <@user>   :: Muestra información sobre un usuario mencioando.\n'+
    '-> '+prefix+'server         :: Muestra información de un servidor determinado.\n'+
    '-> '+prefix+'ban <@user>    :: Banear a un usuario del servidor incluye razon.\n'+
    '-> '+prefix+'bot            :: Información sobre FlipOne\n'+
    '-> '+prefix+'kick <@user>   :: Patear a un usuario del servidor incluye razon.\n'+
    '-> '+prefix+'hola           :: Retorna un saludo como mensaje.\n'+
    '-> '+config.comando_personalizado+'        :: ' + config.info_comando + '\n```\n\n'+
    config.server + " | " + config.eslogan + " | " + config.link );
    
  }
  if (message.content.startsWith(prefix + "bot")) {
    var server = message.guild;
    var textoActivo="Buy me a coffe"
    var URL="https://www.buymeacoffee.com/FlipOne"
    const embed = new Discord.RichEmbed()
    
    .setDescription("**FlipOne :robot: **")
    .addField('Versión', packagelock.version )
    .addField('Región', 'Europa' )
    .addField('Creado el', '10 de Septiembre')
    .addField('Creador', 'Xab0333')
    .addField('Idioma', 'Español')
    .addField("Participa", 'Ayúdame a mejorar! [Comprame un café :coffee: ](https://www.buymeacoffee.com/FlipOne)')
    
    .setColor(0x66b3ff)
    
   message.channel.send({ embed });
  }

    
    
   if (message.content.startsWith(prefix + "ban")) {
     
    const user = message.mentions.users.first();
      
    if (user) {
       
     const member = message.guild.member(user);
       
      if (member) {
         
          member
            .ban({
              reason: 'Han realizado conductas inapropiasdas!',
            })
            .then(() => {
            
              message.reply(` Baneado correctamente ${user.tag}`);
            })
            .catch(err => {
              
              message.reply('No se puede banear a ese miembro ');
              
              console.error(err);
            });
           } else {
          
          message.reply("El usuario no está en este servidor!");
         
        }
       }
        else {
        
        message.reply("No has dicho ha quien hay que banear!");
      }
    } 
});
client.login(config.token);
