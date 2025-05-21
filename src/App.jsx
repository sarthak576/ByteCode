import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import SignIn from "./components/Signin";

function App() {
  return (
    <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
<SignIn/>
    </Box>
  );
}

export default App;
