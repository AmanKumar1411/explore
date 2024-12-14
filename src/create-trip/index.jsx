import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelesListn } from "@/constants/options";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { AI_PROMPT } from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Updates form data and validates "days" input
  const handleInputChange = (name, value) => {
    if (name === "days" && (value < 1 || value > 30)) {
      setError("Days must be between 1 and 30.");
      return;
    }
    setError("");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetches user information using the Google OAuth access token
  const fetchUserInfo = async (tokenInfo) => {
    try {
      if (!tokenInfo?.access_token) {
        throw new Error("Access token is missing!");
      }

      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      );

      localStorage.setItem("userInfo", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error("Error fetching user info:", error.message);
      throw error;
    }
  };

  // Handles Google login and fetches user info upon successful login
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const userInfo = await fetchUserInfo(response);
        console.log("Fetched User Info:", userInfo);
      } catch (error) {
        console.error("Error during user info retrieval:", error.message);
      }
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
      alert("Google login failed. Please try again.");
    },
  });

  const handleSubmit = async () => {
    if (loading) return;

    const user =
      typeof localStorage !== "undefined" ? localStorage.getItem("user") : null;
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (
      !formData.location ||
      !formData.days ||
      !formData.budget ||
      !formData.travelCompanion
    ) {
      setError("Please fill all required fields!");
      return;
    }

    const FINAL_PROMPT = AI_PROMPT.replaceAll(
      "{location}",
      formData?.location || "a destination"
    )
      .replaceAll("{days}", formData?.days || "a few days")
      .replaceAll(
        "{travelCompanion}",
        formData?.travelCompanion || "an unspecified companion"
      )
      .replaceAll("{budget}", formData?.budget || "a moderate budget");

    console.log("Generated Prompt:", FINAL_PROMPT);

    setLoading(true);
    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log(result?.response?.text());
    } catch (err) {
      console.error("Error sending AI prompt:", err);
      setError("Failed to generate a trip plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell your preference 🏕️</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Woohoo, let's plan your trip!
      </p>

      {/* Form Section */}
      <div className="mt-20 flex flex-col gap-9">
        {/* Destination Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is the destination?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v.label);
              },
            }}
          />
        </div>

        {/* Days Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning to stay?
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            inputMode="numeric"
            min="1"
            max="30"
            value={formData?.days || ""}
            onChange={(e) => handleInputChange("days", Number(e.target.value))}
          />
        </div>

        {/* Budget Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((items, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow cursor-pointer ${
                  formData?.budget === items.title && "shadow-lg border-black"
                }`}
                onClick={() => handleInputChange("budget", items.title)}
              >
                <h2 className="text-4xl">{items.icon}</h2>
                <h2 className="font-bold text-lg">{items.title}</h2>
                <h2 className="text-sm text-gray-500">{items.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Companion Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            With whom are you traveling?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelesListn.map((items, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow cursor-pointer ${
                  formData?.travelCompanion === items.title &&
                  "shadow-lg border-black"
                }`}
                onClick={() =>
                  handleInputChange("travelCompanion", items.title)
                }
              >
                <h2 className="text-4xl">{items.icon}</h2>
                <h2 className="font-bold text-lg">{items.title}</h2>
                <h2 className="text-sm text-gray-500">{items.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Submit Button */}
      <div className="mt-10 flex justify-end p-2">
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Generating..." : "Generate Trip"}
        </Button>
      </div>

      {/* Google Login Dialog */}
      <Dialog
        open={openDialog}
        onOpenChange={(isOpen) => setOpenDialog(isOpen)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
              <Button className="w-full mt-5" onClick={login}>
                Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
