import React, { useRef, useState, useEffect } from "react";
import { 
  Box, 
  HStack, 
  Button, 
  useToast, 
  IconButton,
  useColorMode  // Added for global theme
} from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { FaPlay, FaDownload, FaSun, FaMoon, FaUpload } from "react-icons/fa"; // Added FaUpload
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import { executeCode } from "../api";

const CodeEditor = () => {
  const editorRef = useRef();
  const toast = useToast();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode(); // Global theme control

  // Editor theme now syncs with global theme
  const editorTheme = colorMode === 'light' ? 'light' : 'vs-dark';

  useEffect(() => {
    setValue(CODE_SNIPPETS[language]);
  }, [language]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearOutput = () => {
    setOutput(null);
    setIsError(false);
  };

  const downloadCode = () => {
    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${language === 'javascript' ? 'js' : language}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Deploy function placeholder
  const handleDeploy = () => {
    toast({
      title: "Deployment Initiated",
      description: "Your code is being deployed...",
      status: "info",
      duration: 3000,
    });
    // Add actual deployment logic here
  };

  return (
    <Box height="100vh" display="flex" flexDirection="column" bg={colorMode === 'light' ? 'gray.50' : 'gray.900'}>
      {/* Toolbar */}
      <Box bg={colorMode === 'light' ? 'gray.100' : 'gray.800'} p={2}>
        <HStack spacing={4} justifyContent="space-between">
          <LanguageSelector language={language} onSelect={onSelect} />
          <HStack spacing={2}>
            <IconButton 
              icon={colorMode === 'light' ? <FaMoon /> : <FaSun />} 
              onClick={toggleColorMode} 
              aria-label="Toggle Theme"
              colorScheme="teal"
            />
            <Button
              variant="outline"
              colorScheme="purple"
              onClick={handleDeploy}
              leftIcon={<FaUpload />}
            >
              Deploy
            </Button>
            <Button
              variant="solid"
              colorScheme="green"
              isLoading={isLoading}
              onClick={runCode}
              leftIcon={<FaPlay />}
            >
              Run
            </Button>
            <Button
              variant="outline"
              colorScheme="blue"
              onClick={downloadCode}
              leftIcon={<FaDownload />}
            >
              Download
            </Button>
          </HStack>
        </HStack>
      </Box>

      {/* Editor and Output */}
      <Box flex={1} display="flex" overflow="hidden">
        <Box width="50%" p={2}>
          <Editor
            options={{ 
              minimap: { enabled: false },
              scrollBeyondLastLine: false
            }}
            height="100%"
            theme={editorTheme}
            language={language}
            value={value}
            onMount={onMount}
            onChange={(value) => setValue(value)}
          />
        </Box>
        <Box width="50%" p={2}>
          <Output 
            output={output} 
            isError={isError} 
            onClear={clearOutput} 
            colorMode={colorMode}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CodeEditor;