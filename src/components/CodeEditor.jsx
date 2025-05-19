import { useRef, useState, useEffect } from "react";
import { Box, HStack, Button, useToast, IconButton } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import { executeCode } from "../api";
import { SunIcon, MoonIcon, LinkIcon, RepeatIcon } from "@chakra-ui/icons";
import { FaGithub, FaUserCircle } from "react-icons/fa";

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
    const savedTheme = localStorage.getItem("theme") || "vs-dark";
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "vs-dark" ? "light" : "vs-dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
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
      toast({ title: "Error", description: error.message, status: "error" });
    } finally {
      setIsLoading(false);
    }
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

  return (
    <Box>
      <HStack justifyContent="space-between" mb={4}>
        <HStack spacing={4}>
          <LanguageSelector language={language} onSelect={setLanguage} />
          <Button onClick={runCode} isLoading={isLoading}>Run Code </Button>
          <Button onClick={downloadCode}>Download</Button>
          <IconButton icon={<RepeatIcon />} onClick={() => setOutput(null)} />
          <IconButton icon={<LinkIcon />} />
        </HStack>

        <HStack spacing={2}>
          <IconButton icon={theme === "vs-dark" ? <SunIcon /> : <MoonIcon />} onClick={toggleTheme} />
          <FaGithub size={24} />
          <FaUserCircle size={24} />
        </HStack>
      </HStack>

      <Editor
        options={{ minimap: { enabled: false } }}
        height="75vh"
        theme={theme}
        language={language}
        value={value}
        onChange={(value) => setValue(value)}
        onMount={(editor) => (editorRef.current = editor)}
      />

      <Output output={output} isError={isError} />
    </Box>
  );
};

export default CodeEditor;
