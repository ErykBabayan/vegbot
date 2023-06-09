
import {TextChannel} from "discord.js";
import config from "./config";
import { Client, GatewayIntentBits } from "discord.js";


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
    ],
});
const channelId: string = "1097919505407152168";

client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}`);
    scheduleMessage();
});

client.login(config.DISCORD_TOKEN);

function scheduleMessage() {
    const now = new Date();
    const targetTime:any = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 0, 0); // 19:00 UTC = 21:00 in Poland
    const timeUntilTarget = targetTime.getTime() - now.getTime();
    if (timeUntilTarget < 0) {
        // If the target time has already passed today set target date for tomorrow
        targetTime.setDate(targetTime.getDate() + 1);
    }

    console.log("working");
    setTimeout(() => {
        sendMessage();
        scheduleMessage();
    }, targetTime.getTime() - now.getTime());

}

function sendMessage() {
    const now = new Date();
    const channel = client.channels.cache.get(channelId);
    (channel as TextChannel).send(`@here Daily ${now.getDate()}.${now.getMonth()+1} : Co dzisiaj zrobiliście?`);
}