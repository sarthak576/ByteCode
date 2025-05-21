export const executeCode = async (language, sourceCode) => {
  const API_ENDPOINT = "https://emkc.org/api/v2/piston/execute";
  
 const languageVersions = {
  javascript: "18.15.0",  
  python: "3.10.0",
  java: "15.0.2",
  typescript: "5.0.3",     
  cpp: "10.2.0",
  kotlin: "1.8.20",        
};


  const payload = {
    language: language,
    version: languageVersions[language] || "latest",
    files: [{
      content: sourceCode
    }]
  };

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Execution error:", error);
    throw error;
  }
};