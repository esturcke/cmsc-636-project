import mongoose from "mongoose"

const required = true
const unique   = true

export default mongoose.model("Host", mongoose.Schema({
  ip       : { type : Number, required, unique },
  name     : { type : String, required },
  nickName : { type : String, required },
  site     : { type : String, required, enum : ["1", "2", "3"] },
  type     : { type : String, required, enum : ["workstation", "administrator", "server"] },
  service  : { type : String, enum : ["http", "smtp", "domain"] },
}))
