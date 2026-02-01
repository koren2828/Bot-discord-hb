const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

module.exports = {
  name: 'בדיקה',

  async execute(message) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setDescription('🔥 **משתמש זה לא נמצא בשום וי־איי־פי** 🔥');

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('handling')
        .setLabel('בטיפול')
        .setStyle(ButtonStyle.Secondary)
    );

    await message.channel.send({
      content: '@Staff, @High Staff | @HR | אני',
      embeds: [embed],
      components: [row]
    });
  }
};
