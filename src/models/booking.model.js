import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    date: { type: String, required: true }, 
    time: { type: String, required: true }, 
    status: { type: String, enum:["pendiente", "confirmada", "cancelada"], default:"pendiente", required: true }, 
    services: [
    {
        service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required:true },
        quantity: { type: Number, default: 1 }
    }
]
}, {timestamps:true});

export default mongoose.model("Booking", bookingSchema);
