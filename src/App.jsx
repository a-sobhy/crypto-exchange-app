import React, { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import PriceChartWidget from "./components/PriceChartWidget";
import LadderViewWidget from "./components/LadderViewWidget";
import TopOfBookWidget from "./components/TopOrdersWidget";
import { TabPanel } from "./components/TabPanel";

const availablePairs = ["BTC-USD", "ETH-USD", "LTC-USD", "BCH-USD"];

const App = () => {
  const [selectedPairs, setSelectedPairs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const handleChange = (event) => {
    setSelectedPairs(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box padding={5} display="flex" flexDirection="column">
      <Box display="flex" gap={2} flex="0 0 auto">
        <FormControl fullWidth>
          <InputLabel id="currencyLbl">Currency Pair</InputLabel>
          <Select
            multiple
            value={selectedPairs}
            onChange={handleChange}
            labelId="currencyLbl"
            label="Currency Pair"
          >
            {availablePairs.map((pair) => (
              <MenuItem key={pair} value={pair}>
                {pair}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box flex="1 1 auto">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="currency pair tabs"
        >
          {selectedPairs.map((pair, index) => (
            <Tab key={pair} label={pair} />
          ))}
        </Tabs>
        {selectedPairs.map((pair, index) => (
          <TabPanel key={pair} value={activeTab} index={index}>
            <Box display="flex" gap={2} width="100%" alignItems="stretch">
              <Box width="80%">
                <TopOfBookWidget currencyPair={pair} />
                <br />
                <PriceChartWidget currencyPair={pair} />
              </Box>
              <Box
                width="20%"
                overflow="auto"
                height="72vh"
                boxShadow="0 0 9px -6px #04064c"
                padding={2}
                borderRadius={2}
                position="sticky"
                top={0}
              >
                <LadderViewWidget currencyPair={pair} />
              </Box>
            </Box>
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
};

export default App;
