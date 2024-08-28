import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './home/Navbar';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Input,
  HStack,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  TableContainer,
} from '@chakra-ui/react';

const MarketForm = () => {
  const [state, setState] = useState('');
  const [commodity, setCommodity] = useState('');
  const [market, setMarket] = useState('');
  const [customState, setCustomState] = useState('');
  const [customCommodity, setCustomCommodity] = useState('');
  const [customMarket, setCustomMarket] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);  // Start loading
    const params = {
      'api-key': '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b',
      format: 'json',
      'filters[State]': state || customState,
      'filters[District]': market || customMarket,
      'filters[Commodity]': commodity || customCommodity,
    };
    try {
      const response = await axios.get('https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24', {
        params: params,
        headers: {
          'accept': 'application/json',
        },
        timeout: 30000,
      });

      setData(response.data.records || []); // If data exists, set it; otherwise, use an empty array
      setError('');
    } catch (err) {
      setError('An error occurred while fetching data.');
      console.error(err);
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  const renderResultsTable = () => {
    return (
      <TableContainer>
        <Table variant='striped' colorScheme='blue'>
          <Thead>
            <Tr>
              <Th>State</Th>
              <Th>District</Th>
              <Th>Market</Th>
              <Th>Commodity</Th>
              <Th>Variety</Th>
              <Th>Grade</Th>
              <Th>Arrival Date</Th>
              <Th>Min Price</Th>
              <Th>Max Price</Th>
              <Th>Modal Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr key={index}>
                <Td>{item.state || item.State}</Td>
                <Td>{item.district || item.District}</Td>
                <Td>{item.market || item.Market}</Td>
                <Td>{item.commodity || item.Commodity}</Td>
                <Td>{item.variety || item.Variety}</Td>
                <Td>{item.grade || item.Grade}</Td>
                <Td>{item.arrival_date || item.Arrival_Date}</Td>
                <Td textColor="red">{item.min_price || item.Min_Price}</Td>
                <Td textColor="green">{item.max_price || item.Max_Price}</Td>
                <Td>{item.modal_price || item.Modal_Price}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <div>
      <Navbar />
      <Box
        maxW="1300px"
        mx="auto"
        p={6}
        borderWidth={1}
        borderRadius="lg"
        overflow="hidden"
        bg="whiteAlpha.800"
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Market Data Fetcher
        </Heading>
        <Box
          as="form"
          onSubmit={handleSubmit}
          maxH="80vh"
          overflowY="auto"
          p={4}
          borderWidth={1}
          borderRadius="lg"
        >
          <HStack spacing={8} align="stretch" m={10}>
            <FormControl>
              <FormLabel>State</FormLabel>
              <Select value={state} onChange={(e) => setState(e.target.value)}>
                <option value="">Select State</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
              </Select>
              <Input
                placeholder="Or enter a custom state"
                value={customState}
                onChange={(e) => setCustomState(e.target.value)}
                mt={2}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Commodity</FormLabel>
              <Select value={commodity} onChange={(e) => setCommodity(e.target.value)}>
                <option value="">Select Commodity</option>
                <option value="Potato">Potato</option>
                <option value="Tomato">Tomato</option>
                <option value="Wheat">Wheat</option>
              </Select>
              <Input
                placeholder="Or enter a custom commodity"
                value={customCommodity}
                onChange={(e) => setCustomCommodity(e.target.value)}
                mt={2}
              />
            </FormControl>
            <FormControl>
              <FormLabel>District</FormLabel>
              <Select value={market} onChange={(e) => setMarket(e.target.value)}>
                <option value="">Select Market</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mysore">Mysore</option>
                <option value="Khargone">Khargone</option>
              </Select>
              <Input
                placeholder="Or enter a custom market"
                value={customMarket}
                onChange={(e) => setCustomMarket(e.target.value)}
                mt={2}
              />
            </FormControl>
          </HStack>
          <Button type="submit" colorScheme="green" width="full" mt={4}>
            Fetch Data
          </Button>
        </Box>
        {loading && (
          <div align="center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </div>
        )}
        <Box mt={6}>
          <Heading as="h3" size="md" mb={4}>
            Data Results:
          </Heading>
          {error && <Text color="red.500">{error}</Text>}
          {renderResultsTable()}
        </Box>
      </Box>
    </div>
  );
};

export default MarketForm;
