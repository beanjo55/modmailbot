const Eris = require("eris");
const threadUtils = require("../threadUtils");

/**
 * @param {Eris.CommandClient} bot
 */
module.exports = bot => {
  threadUtils.addInboxServerCommand(bot, "id", async (msg, args, thread) => {
    if (! thread) return;
    let dmchannel = await thread.getDMChannel();
    bot.createMessage(msg.channel.id, `User ID: ${thread.user_id}\nChannel ID: ${dmchannel.id}`);
  });
};