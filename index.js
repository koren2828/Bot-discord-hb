const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Map();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log(`✅ מחובר כ־${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (!message.content.startsWith('!') || message.author.bot) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const commandName = args.shift();

  const command = client.commands.get(commandName);
  if (!command) return;

  command.execute(message);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  const STAFF_ROLE_ID = process.env.STAFF_ROLE_ID;

  if (interaction.customId === 'handling') {
    if (!interaction.member.roles.cache.has(STAFF_ROLE_ID)) {
      return interaction.reply({
        content: '⛔ רק Staff יכולים ללחוץ על הכפתור.',
        ephemeral: true
      });
    }

    await interaction.update({
      content: `🛠️ בטיפול ע״י ${interaction.user}`,
      components: []
    });
  }
});

client.login(process.env.TOKEN);
