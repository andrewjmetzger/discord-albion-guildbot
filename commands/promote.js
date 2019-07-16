    
const Discord = require('discord.js');

exports.run = async (client, message, args, level) => {
  try {
    const settings = client.getSettings(message.guild.id);
    const user = message.mentions.users.first();
    const roleToAdd = message.mentions.roles.first();
    
    if (!message.guild.roles.find(r => roleToAdd)) return message.reply('That\'s not a role!');
    if (user) {
      if (message.guild.members.get(message.author.id).highestRole.name == '@everyone') message.reply('The role you are trying to add is above your highest role\'s position!');
      else {
        if (Number(message.member.highestRole.position) >= Number(message.guild.roles.find(r => roleToAdd).position)) {
          if (message.member.hasPermission('MANAGE_ROLES')) {
              const member = message.guild.member(user);
              if (member) {
                if (message.guild.roles.find(r => roleToAdd)) {
                  member.addRole(roleToAdd).then(() => {
                    message.reply(`Successfully promoted ${user.tag}`);

                    const modLogChannel = settings.modLogChannel;
                    if (modLogChannel && message.guild.channels.find(c => c.name === settings.modLogChannel)) {
                      let embed = new Discord.RichEmbed()
                      .setTitle('Promote Member')
                      .setColor('#eeeeee')
                      .setDescription(`Name: ${user.username}\nID: ${user.id}\nModerator: ${message.author.username}`);

                      message.guild.channels.find(c => c.name === settings.modLogChannel).send(embed);
                    }
                  }).catch('There was an error!');
                } else message.reply('I can\'t find that role!');
              } else message.reply('That user isn\'t in this guild!');
          } else message.reply('You don\'t have the Manage Roles permission!');
        } else message.reply('The role you are trying to add is above your highest role\'s position!');
      }
    } else message.reply('You didn\'t mention the user to promote!');
  } catch (err) {
    message.channel.send('There was an error!\n' + err.stack).catch();
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "promote",
  category: "Moderation",
  description: "Promote a user to the mentioned role",
  usage: "promote @user @role"
};
