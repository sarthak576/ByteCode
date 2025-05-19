import React, { useRef, useState, useEffect } from "react";
import { Box, HStack, Button, useToast, IconButton } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { FaPlay, FaDownload, FaSun, FaMoon } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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
  const [theme, setTheme] = useState("vs-dark");

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

  const toggleTheme = () => {
    setTheme(theme === "vs-dark" ? "light" : "vs-dark");
  };

  return (
    <Box>
      <HStack spacing={4} mb={4} justifyContent="space-between">
        <LanguageSelector language={language} onSelect={onSelect} />
        <HStack spacing={2}>
          <IconButton 
            icon={theme === "vs-dark" ? <FaMoon /> : <FaSun />} 
            onClick={toggleTheme} 
            aria-label="Toggle Theme" 
          />
          <Button
            variant="solid"
            colorScheme="green"
            isLoading={isLoading}
            onClick={runCode}
            leftIcon={<FaPlay />}
          >
            Run
          </Button>
          <Button variant="solid" colorScheme="red" onClick={clearOutput}    
            leftIcon={<MdDelete />}  
  >
            Clear 
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
      <HStack spacing={4} align="flex-start">
        <Box w="50%" rounded="md">
          <Editor
            options={{ minimap: { enabled: false } }}
            height="75vh"
            theme={theme}
            language={language}
            value={value}
            onMount={onMount}
            onChange={(value) => setValue(value)}
          />
        </Box>
        <Box w="50%" bg="gray.800" color="white" p={4} rounded="md">
          <Output output={output} isError={isError} />
        </Box>
      </HStack>
    </Box>
  );
};

export default CodeEditor;
