import mongoose from "mongoose"

const required = true
const indexed  = true

export default mongoose.model("Flow", mongoose.Schema({
  time            : { type : Date,   required, indexed },
  protocol        : { type : String, required, enum : ["tcp", "udp", "icmp"] },
  srcIp           : { type : Number, required },
  srcPort         : { type : Number, required },
  dstIp           : { type : Number, required },
  dstPort         : { type : Number, required },
  duration        : { type : Number, required },
  srcPayloadBytes : { type : Number, required },
  srcTotalBytes   : { type : Number, required },
  dstPayloadBytes : { type : Number, required },
  dstTotalBytes   : { type : Number, required },
  srcPacketCount  : { type : Number, required },
  dstPacketCount  : { type : Number, required },
  forcedOut       : { type : Number, required },
}))
