import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Typography } from "@mui/material";

const App = () => {
  // State variables to manage user input, response data, and filter selections
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null); // Use descriptive names for better clarity
  const [selectedFilters, setSelectedFilters] = useState([]); // Renamed for consistency

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Parse the trimmed JSON input
      const parsedInput = JSON.parse(jsonInput.trim());

      // Make a POST request to the API endpoint with the parsed data
      const response = await axios.post("http://localhost:8000/bfhl", parsedInput);

      // Update the state with the received response data
      setResponseData(response.data);
    } catch (error) {
      // Handle errors gracefully, consider using a more specific error handling mechanism
      alert("Invalid JSON or API error");
    }
  };

  // Function to filter the response data based on selected filters
  const filteredData = () => {
    if (!responseData) return null; // Check if response data exists before filtering

    const { numbers, alphabets, highest_lowercase_alphabet } = responseData;
    const filteredObject = {};

    // Build the filtered object based on selected filters
    if (selectedFilters.includes("Numbers")) filteredObject.numbers = numbers;
    if (selectedFilters.includes("Alphabets")) filteredObject.alphabets = alphabets;
    if (selectedFilters.includes("Highest lowercase alphabet")) {
      filteredObject.highest_lowercase_alphabet = highest_lowercase_alphabet;
    }

    return filteredObject;
  };

  return (
    <Box sx={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <Typography variant="h4" gutterBottom>
        BFHL Challenge!
      </Typography>

      {/* Text field for JSON input */}
      <TextField
        fullWidth
        multiline
        rows={2}
        variant="outlined"
        placeholder="API Input"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        sx={{ marginBottom: "20px" }}
      />

      {/* Submit button */}
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          width: "100%",
          backgroundColor: "#1976d2",
          color: "#fff",
          fontWeight: "bold",
          marginBottom: "20px",
          "&:hover": { backgroundColor: "#115293" },
        }}
      >
        Submit
      </Button>

      {/* Multi-select dropdown for filtering */}
      <FormControl fullWidth sx={{ marginBottom: "20px" }}>
        <InputLabel>Multi Filter</InputLabel>
        <Select
          multiple
          value={selectedFilters}
          onChange={(e) => setSelectedFilters(e.target.value)}
          renderValue={(selected) => selected.join(", ")}
        >
          <MenuItem value="Numbers">Numbers</MenuItem>
          <MenuItem value="Alphabets">Alphabets</MenuItem>
          <MenuItem value="Highest lowercase alphabet">Highest lowercase alphabet</MenuItem>
        </Select>
      </FormControl>

      {/* Display filtered response data if available */}
      {responseData && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Filtered Response
          </Typography>
          <Typography>{JSON.stringify(filteredData(), null, 2)}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default App;