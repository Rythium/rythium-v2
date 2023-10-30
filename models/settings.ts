// We grab Schema and model from mongoose library.
const {
  welcomech,
  autorole,
  tchannel,
  tickets,
  lang,
} = require("../defaults.json");
import { Schema, model } from "mongoose";

// We declare new schema.
const guildSettingSchema = new Schema(
  {
    guildID: {
      type: String,
    },
    welcomech: {
      type: Number,
      default: welcomech,
    },
    autorole: {
      type: Number,
      default: autorole,
    },
    lang: {
      type: String,
      default: lang,
    },
  }
);

// We export it as a mongoose model.
module.exports = model("guild_settings", guildSettingSchema);
