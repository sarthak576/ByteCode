import { Box, Text } from "@chakra-ui/react";

const Output = ({ output, isError }) => {
  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg" color="white">
        Output
      </Text>
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};
export default Output;