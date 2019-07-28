const Discord = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const member = message.guild.member;
  client.channels.get("596689677059227659") // Rules channel
    .send("*By replying `I agree` below, you confirm that you will follow all of the rules as described above. If you do not comply with these rules, you may be subject to disciplinary action.*");

  const response = await client.awaitReply(message, "Do you agree? ");

  // message.reply("You replied `" + response + "` here"); // For debugging purposes

  var agreed = (response == "I agree" || response == "i agree" || response == "I AGREE" || response == "i Agree" || response == "yes" || response == "YES" || response == "Yes");

  if (agreed) {
    message.reply("thanks for agreeing to the rules. You now have access to the rest of the Discord server! Enjoy your stay!");
    const tempRole = "602210192557473893"; // Applicant
    const roleToAdd = "596671782027788308" // Recruit
    message.member.addRole(roleToAdd);
    message.member.removeRole(tempRole);
  } else {
    message.reply("you have NOT agreed. Please type `I agree` *exactly* if you will follow the rules.");
    checkAgreed();
  }
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "rules",
  category: "Moderation",
  description: "Prompt a user to accept the rules",
  usage: "rules"
};