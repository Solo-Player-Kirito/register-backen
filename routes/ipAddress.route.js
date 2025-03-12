const express = require("express");
// const Log = require('./path-to-your-log-model'); // Adjust the path

const IpAdddress = require("../models/idAddress");
const router = express.Router();

router.get("/live/news", async (req, res) => {
  try {
    const logEntry = new IpAdddress({
      eventName: req.body.eventName || "Unknown Event",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      routeAccessed: req.originalUrl,
      requestMethod: req.method,
      referrer: req.headers.referer || req.headers.referrer || "",
      geoLocation: req.body.geoLocation || {}, // You can fill this with an IP geolocation service
      headers: req.headers,
      queryParams: req.query,
      bodyParams: req.body,
      cookies: req.cookies,
      deviceType: req.body.deviceType || "",
      networkProvider: req.body.networkProvider || "",
      isp: req.body.isp || "",
    });
    console.log(logEntry);
    await logEntry.save();
    res.status(201).json({ message: "Log entry saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save log entry", error });
  }
});
router.get("/ip/see", async (req, res) => {
  try {
    const data = await IpAdddress.find();
    res.json({ message: "Log entry details:", data }); // Properly send data as JSON
  } catch (err) {
    console.log("error in log:", err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;

// Let me know if you want to add IP geolocation or tweak anything else! 🚀
