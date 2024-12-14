import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '{\n  "hotels": [\n    {\n      "hotelName": "Circus Circus Hotel & Casino",\n      "hotelAddress": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",\n      "price": "Placeholder - Check online",\n      "hotelImageUrl": "Placeholder URL", \n      "geoCoordinates": { "latitude": 36.1215, "longitude": -115.1739 },\n      "rating": "3.5 stars",\n      "description": "A classic Vegas hotel known for its affordable rates and circus acts."\n    },\n    {\n      "hotelName": "Plaza Hotel & Casino",\n      "hotelAddress": "1 South Main Street Las Vegas, NV 89101",\n      "price": "Placeholder - Check online",\n      "hotelImageUrl": "Placeholder URL",\n      "geoCoordinates": { "latitude": 36.1672, "longitude": -115.1383 },\n      "rating": "4 stars",\n      "description": "Downtown hotel with a more classic feel and reasonable rates."\n    },\n    {\n      "hotelName": "Excalibur Hotel & Casino",\n      "hotelAddress": "3850 S Las Vegas Blvd, Las Vegas, NV 89109",\n      "price": "Placeholder - Check online",\n      "hotelImageUrl": "Placeholder URL",\n      "geoCoordinates": { "latitude": 36.1046, "longitude": -115.172 },\n      "rating": "3 stars",\n      "description": "Medieval-themed hotel with budget-friendly options."\n    }\n\n\n  ],\n  "itinerary": {\n    "day1": {\n      "plan": [\n        {\n          "placeName": "Fremont Street Experience",\n          "placeDetails": "Free outdoor pedestrian mall with light shows and street performers.",\n          "placeImageUrl": "Placeholder URL",\n          "geoCoordinates": { "latitude": 36.1675, "longitude": -115.1425 },\n          "ticketPricing": "Free",\n          "rating": "4 stars",\n          "time": "Evening (7 PM - 10 PM)"\n        },\n        {\n          "placeName": "Downtown Container Park",\n          "placeDetails": "Unique shopping and dining area made from shipping containers.",\n          "placeImageUrl": "Placeholder URL",\n          "geoCoordinates": { "latitude": 36.1671, "longitude": -115.1417 },\n          "ticketPricing": "Free entry",\n          "rating": "4 stars",\n          "time": "Afternoon (2 PM - 5 PM)"\n        }\n      ]\n    },\n    "day2": {\n      "plan": [\n        {\n          "placeName": "The Strip (Walking Tour)",\n          "placeDetails": "Walk the length of the Strip, admiring the hotels and casinos.",\n          "placeImageUrl": "Placeholder URL",\n          "geoCoordinates": { "latitude": 36.1146, "longitude": -115.1728 },  // Approximate center\n          "ticketPricing": "Free",\n          "rating": "5 stars",\n          "time": "Morning (9 AM - 1 PM)"\n        },\n          {\n          "placeName": "Bellagio Fountains",\n          "placeDetails": "Free water show with music and lights.",\n          "placeImageUrl": "Placeholder URL",\n          "geoCoordinates": { "latitude": 36.1146, "longitude": -115.1728 }, // Approximate location\n          "ticketPricing": "Free",\n          "rating": "4.5 stars",\n          "time": "Evening (7PM - 8PM)"\n        }\n      ]\n    },\n    "day3": {\n      "plan": [\n        {\n          "placeName": "Seven Magic Mountains",\n          "placeDetails": "Art installation of colorful stacked boulders (requires transportation).",\n          "placeImageUrl": "Placeholder URL",\n          "geoCoordinates": { "latitude": 36.0069, "longitude": -115.0033 },\n          "ticketPricing": "Free",\n          "rating": "4 stars",\n          "time": "Morning (9 AM - 12 PM)"\n        },\n         {\n          "placeName": "Neon Museum",\n          "placeDetails": "Collection of vintage Las Vegas signs.",\n          "placeImageUrl": "Placeholder URL",\n          "geoCoordinates": { "latitude": 36.1375, "longitude": -115.1382},\n          "ticketPricing": "Check website for pricing",\n          "rating": "4 stars",\n          "time": "Afternoon (2 PM - 4 PM)"\n        }\n      ]\n    }\n  }\n}}\n\n',
        },
      ],
    },
  ],
});
