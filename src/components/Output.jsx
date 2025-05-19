// Output.jsx
import { Box, Text, IconButton } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

const Output = ({ output, isError, onClear }) => {
  return (
    <Box 
      width="100%" 
      height="100%"
      bg="gray.800" 
      color="white" 
      p={4} 
      rounded="md"
      position="relative"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="lg" fontWeight="bold">
          Output
        </Text>
        <IconButton
          icon={<MdDelete />}
          onClick={onClear}
          aria-label="Clear output"
          size="sm"
          variant="ghost"
          colorScheme="red"
        />
      </Box>
      
      <Box
        height="calc(100% - 50px)"
        p={4}
        bg="gray.900"
        borderRadius={4}
        overflowY="auto"
        fontFamily="monospace"
        border="1px solid"
        borderColor={isError ? "red.500" : "gray.700"}
      >
        {output ? (
          output.map((line, i) => (
            <Text 
              key={i} 
              color={isError ? "red.400" : "white"}
              whiteSpace="pre-wrap"
            >
              {line}
            </Text>
          ))
        ) : (
          <Text color="gray.500" fontStyle="italic">
            Click "Run Code" to see the output here
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default Output;