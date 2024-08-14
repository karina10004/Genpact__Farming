import React, { useState } from 'react';
import axios from 'axios';
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
    try {
      const response = await axios.get('http://127.0.0.1:5000/request', {
        params: { 
            commodity: customCommodity || commodity, 
            state: customState || state, 
          
            market: customMarket || market 
        },
        headers: {
            'Content-Type': 'application/json',
          },
        timeout: 30000,
      });
     
      // Filter out any undefined (i.e., non-matching city) entries
      //const finalData = parsedData.filter(item => item.city === (customMarket || market));
      //setData(finalData);
      //console.log("Response data:", response.data);
      console.log(typeof response.data)
     // const parsedData = JSON.parse(response.data);
      //JSON.parse(response.data)
     //const filteredData = response.data.filter(item => item.City.toLowerCase() === market.toLowerCase());
      //setData(filteredData);
      //console.log(parsedData);
      setData(response.data);
      setError('');
    } catch (err) {
      setError('An error occurred while fetching data.');
      console.error(err);
    }
  finally {
    setLoading(false);  // Stop loading
}
  };
  
  const renderResultsTable = () => {
    return (
      <TableContainer>
      <Table variant='striped' colorScheme='blue'>
        <Thead>
          <Tr>
            <Th >S.No</Th>
            <Th width="150">City</Th>
            <Th width="150">Commodity</Th>
            <Th width="150" >Min Prize</Th>
            <Th>Max Prize</Th>
            <Th>Model Prize</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody >
          {data.map((item, index) => (
            <Tr border key={index}>
              <Td>{item["S.No"]}</Td>
              <Td >{item["City"]}</Td>
              <Td>{item["Commodity"]}</Td>
              <Td textColor="red">{item["Min Prize"]}</Td>
              <Td  textColor="green">{item["Max Prize"]}</Td>
              <Td>{item["Model Prize"]}</Td>
              <Td>{item["Date"]}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      </TableContainer>
    );
  };

  return (
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
        <HStack spacing={8} align="stretch"  m={10} >
          <FormControl>
            <FormLabel>State</FormLabel>
            <Select value={state} onChange={(e) => setState(e.target.value)}>
              <option value="">Select State</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              {/* Add more options as needed */}
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
              {/* Add more options as needed */}
            </Select>
            <Input 
              placeholder="Or enter a custom commodity"
              value={customCommodity}
              onChange={(e) => setCustomCommodity(e.target.value)}
              mt={2}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Market</FormLabel>
            <Select value={market} onChange={(e) => setMarket(e.target.value)}>
              <option value="">Select Market</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mysore">Mysore</option>
              <option value="Khargone">Khargone</option>
              {/* Add more options as needed */}
            </Select>
            <Input 
              placeholder="Or enter a custom market"
              value={customMarket}
              onChange={(e) => setCustomMarket(e.target.value)}
              mt={2}
            />
          </FormControl>
          
        </HStack>
        <Button type="submit" colorScheme="green" width="full" 
        mt={4}>
       
        
            Fetch Data
          </Button>
      </Box>
      {loading && <div  align='center' >
            <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      /></div>}  {/* Loading Bar */
      }
      
      <Box mt={6}>
        <Heading as="h3" size="md" mb={4}>
          Data Results:
        </Heading>
        {error && <Text color="red.500">{error}</Text>}
        {renderResultsTable()}
      </Box>
    </Box>
  );
};

export default MarketForm;
