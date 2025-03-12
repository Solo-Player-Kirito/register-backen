const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true }, // Name of the event
    eventTime: { type: Date, default: Date.now }, // Event timestamp
    ipAddress: { type: String, required: true }, // IP address of the user
    userAgent: { type: String }, // User agent (browser/device info)
    routeAccessed: { type: String, required: true }, // Route or URL accessed
    requestMethod: { type: String, required: true }, // HTTP request method (GET, POST, etc.)
    referrer: { type: String }, // Referring URL
    geoLocation: {
      country: String,
      region: String,
      city: String,
      latitude: Number,
      longitude: Number,
    },
    headers: { type: mongoose.Schema.Types.Mixed }, // Full request headers
    queryParams: { type: mongoose.Schema.Types.Mixed }, // Query parameters
    bodyParams: { type: mongoose.Schema.Types.Mixed }, // Request body parameters
    cookies: { type: mongoose.Schema.Types.Mixed }, // Cookies sent with the request
    deviceType: { type: String }, // Device type (mobile, tablet, desktop)
    networkProvider: { type: String }, // Network provider (if determinable)
    isp: { type: String }, // Internet Service Provider
  },
  { timestamps: true }
);
const IpAdddress = mongoose.model("Log-scheam-ip-level", logSchema);

module.exports = IpAdddress;

// Clean and simple! Let me know if you’d like me to refine this even further or help with logging middleware! 🚀
