"use client";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { ArrowLeftRight, Repeat, Search } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { AirplaneTakeOff01Icon } from "hugeicons-react";
import { flights } from "@/lib/const";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {  useFlightStore } from "@/lib/useFlightStore";
import Link from "next/link";
import { usePassengerDetailsStore } from "@/lib/usePassengerDetails";

const TextField = dynamic(() => import("@mui/material/TextField"), {
  ssr: false,
});

const menuProps = {
  PaperProps: {
    style: {
      maxHeight: 52 * 7,
      width: 250,
    },
  },
};

const Page = () => {
  const {
    selectedDate,
    from,
    to,
    results,
    setFrom,
    setTo,
    setSelectedDate,
    handleSearch,
    isSearchDisabled,
  } = useFlightStore();

  const { setSelectedFlight, selectedFlight } = usePassengerDetailsStore();

  const switchLocations = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSelectFlight = async (result) => {
    // Store the selected flight in the zustand store
    setSelectedFlight({
      fromLocation: from,
      toLocation: to,
      departureTime: result.time1,
      arrivalTime: result.time2,
      flightDuration: result.duration,
      layover: result.layover,
      price: result.amount,
      logo: result.logo,
    });
    console.log("selected result", result);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center flex-col space-y-10">
        <h1 className="text-white font-bold text-5xl mt-16">Search Flight</h1>

        <div className="w-[80%] p-16 rounded-xl bg-[#f2f0f0] flex-col sm:flex sm:flex-row  justify-between gap-5 items-center">
          {/* From Dropdown */}
          <FormControl
            variant="outlined"
            className="w-52"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                fontWeight: "bold",
                fontSize: "1.2rem", // Adjust the size
                "& fieldset": {
                  borderColor: "#b0b0b0",
                },
                "&:hover fieldset": {
                  borderColor: "#4a90e2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#4a90e2",
                },
              },
            }}
          >
            <InputLabel
              htmlFor="from-select"
              sx={{
                fontWeight: "bold",
                fontSize: "1.3rem",
                backgroundColor: "#f2f0f0",
              }}
            >
              From
            </InputLabel>
            <Select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              displayEmpty
              MenuProps={menuProps}
              inputProps={{ id: "from-select" }}
              IconComponent={() => null} // Remove dropdown arrow
              sx={{
                padding: "10px",
                width: "250px",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
              renderValue={(selected) => {
                const selectedFlight = flights.find(
                  (flight) => flight.loc === selected
                );
                return selectedFlight
                  ? `${selectedFlight.location} (${selectedFlight.loc})`
                  : "";
              }}
            >
              {flights.map((flight) => (
                <MenuItem key={flight.id} value={flight.loc}>
                  <div className="flex items-center gap-3">
                    <AirplaneTakeOff01Icon size={32} />
                    <div>
                      <p className="text-lg font-bold text-gray-700">
                        {flight.location} ({flight.loc})
                      </p>
                      <p className="font-normal text-sm text-muted-foreground text-wrap">
                        {flight.airport}
                      </p>
                    </div>
                  </div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="transparent" onClick={switchLocations}>
            <ArrowLeftRight className="w-6 h-6 text-pink-500" />
          </Button>

          {/* To Dropdown */}
          <FormControl
            variant="outlined"
            className="w-52"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                fontWeight: "bold",
                fontSize: "1.2rem", // Adjust the size
                "& fieldset": {
                  borderColor: "#b0b0b0",
                },
                "&:hover fieldset": {
                  borderColor: "#4a90e2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#4a90e2",
                },
              },
            }}
          >
            <InputLabel
              htmlFor="to-select"
              sx={{
                fontWeight: "bold",
                fontSize: "1.3rem",
                backgroundColor: "#f2f0f0",
              }}
            >
              To
            </InputLabel>
            <Select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              displayEmpty
              MenuProps={menuProps}
              inputProps={{ id: "to-select" }}
              IconComponent={() => null}
              sx={{
                padding: "10px",
                width: "250px",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
              renderValue={(selected) => {
                const selectedFlight = flights.find(
                  (flight) => flight.loc === selected
                );
                return selectedFlight
                  ? `${selectedFlight.location} (${selectedFlight.loc})`
                  : "";
              }}
            >
              {flights.map((flight) => (
                <MenuItem key={flight.id} value={flight.loc}>
                  <div className="flex items-center gap-3">
                    <AirplaneTakeOff01Icon size={32} />
                    <div>
                      <p className="text-lg font-bold text-gray-700">
                        {flight.location} ({flight.loc})
                      </p>
                      <p className="font-normal text-sm text-muted-foreground text-wrap">
                        {flight.airport}
                      </p>
                    </div>
                  </div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Date Picker */}
          <div className="flex flex-col items-start">
            <Input
              type="date"
              style={{ fontWeight: "bold", fontSize: "1.3rem" }}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="p-5 border border-gray-500 hover:border-gray-600 w-52 h-16 font-bold text-2xl"
            />
          </div>

          {/* Search Button */}
          <Tooltip
            title={isSearchDisabled() ? "Please fill all fields" : ""}
            placement="top"
            arrow
          >
            <span>
              <Button
                variant="contained"
                className={`text-white px-4 py-3 w-50 h-14 rounded-2xl min-w-[50px] ${
                  isSearchDisabled()
                    ? "bg-gradient-to-r from-[#ad51eb] to-[#d62c84]  cursor-not-allowed"
                    : "bg-gradient-to-r from-[#d62c84] to-[#ad51eb]"
                }`}
                onClick={handleSearch}
                disabled={isSearchDisabled()}
              >
                <Search className="w-6 h-6 text-white" />
              </Button>
            </span>
          </Tooltip>
        </div>
      </div>

      {results && results.length > 0 ? (
        <div className="w-[80%] mt-10 mx-auto   rounded-xl shadow-lg">
          <ScrollArea className="h-[350px]">
            {results.map((result, index) => (
              <Card key={index} className="bg-white shadow-lg my-2 px-6 p-4">
                <div className="flex items-center justify-between gap-4">
                  <img
                    src={result.logo}
                    alt="airline logo"
                    className="w-32 h-32"
                  />
                  <div className="flex items-center justify-center gap-8">
                    <span className="flex flex-col font-bold justify-center items-center text-gray-700 space-y-2">
                      <p className="text-3xl">{result.time1}</p>
                      <p className="text-xl font-light">{from}</p>
                    </span>
                    <span className="flex flex-col font-light justify-center items-center text-gray-700 space-y-2">
                      <p className="text-xl">{result.duration}</p>
                      <div className="w-20 bg-gray-700 h-1"> </div>
                      <p>{result.layover}</p>
                    </span>
                    <span className="flex flex-col font-bold justify-center items-center text-gray-700 space-y-2">
                      <p className="text-3xl">{result.time2}</p>
                      <p className="text-xl font-light">{to}</p>
                    </span>
                  </div>

                  <span className="text-3xl flex flex-col font-bold text-gray-700 space-y-2">
                    <p>{result.amount}</p>
                    <Button
                      variant="contained"
                      className="bg-gradient-to-r from-[#d62c84] to-[#ad51eb]"
                      onClick={() => handleSelectFlight(result)} // Handle flight selection
                    >
                    <Link href="/pages/passenger-detail">
                      Select
                    </Link>
                    </Button>
                  </span>
                </div>
              </Card>
            ))}
          </ScrollArea>
        </div>
      ) : (
        <div className="">
          {/* <h2 className="text-xl font-bold mb-4">No Results Found</h2> */}
        </div>
      )}
    </div>
  );
};

export default Page;
