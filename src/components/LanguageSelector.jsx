import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Flex,
  Icon,
  useColorModeValue
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import { 
  SiJavascript, 
  SiPython, 
  SiTypescript,
  SiCplusplus,
  SiKotlin,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";

// Modern language versions (2023 standards)
const LANGUAGE_VERSIONS = {
  "javascript": "ES2023",
  "python": "3.11",
  "java": "21",
  "typescript": "5.2",
  "cpp": "C++23",
  "kotlin": "1.8.20",
};

const languageIcons = {
  javascript: SiJavascript,
  python: SiPython,
  java: FaJava,
  typescript: SiTypescript,
  cpp: SiCplusplus,
  kotlin: SiKotlin,
};

const LanguageSelector = ({ language, onSelect }) => {
  const activeColor = useColorModeValue("blue.500", "blue.300");
  const menuBg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box>
      <Menu>
        <MenuButton 
          as={Button} 
          rightIcon={<FaChevronDown />}
          minW="150px"
          variant="outline"
          _hover={{ bg: hoverBg }}
          _expanded={{ bg: hoverBg }}
        >
          <Flex align="center" gap={2}>
            <Icon as={languageIcons[language]} color={activeColor} />
            <Text textTransform="capitalize">{language}</Text>
          </Flex>
        </MenuButton>
        <MenuList 
          bg={menuBg} 
          boxShadow="xl"
          maxH="60vh"
          overflowY="auto"
        >
          {Object.entries(LANGUAGE_VERSIONS).map(([lang, version]) => (
            <MenuItem 
              key={lang}
              onClick={() => onSelect(lang)}
              bg={lang === language ? hoverBg : "transparent"}
              _hover={{ bg: hoverBg }}
            >
              <Flex align="center" gap={3} w="100%">
                <Icon as={languageIcons[lang]} boxSize={5} />
                <Text textTransform="capitalize" flex={1}>
                  {lang}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {version}
                </Text>
              </Flex>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;