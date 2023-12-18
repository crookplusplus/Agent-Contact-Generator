const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const agentSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    nick_name: {
      type: String,
    },
    broker: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
    website: {
      type: String,
    },
    num_transactions: {
      type: String,
    },
    mobile: {
      type: String,
    },
    business: {
      type: String,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    APICall_id: {
      type: Schema.Types.ObjectId,
      ref: "ApiCall",
      required: true,
    },
    contacted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Agent", agentSchema);
