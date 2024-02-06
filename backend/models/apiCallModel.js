const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const apiCallSchema = new mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    num_agents: {
      type: String,
      required: true,
    },
    zip_code: {
      type: String,
      required: true,
    },
    call_result:{
      type: String
    },
    agents_contacted: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ApiCall", apiCallSchema);
