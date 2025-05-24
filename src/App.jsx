import { useEffect, useState } from "react";
import SignIn from "./components/Signin";
import CodeEditor from "./components/CodeEditor";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("googleUser");
    if (user) setIsLoggedIn(true);
  }, []);

  return isLoggedIn ? (
    <CodeEditor setIsLoggedIn={setIsLoggedIn} />
  ) : (
    <SignIn setIsLoggedIn={setIsLoggedIn} />
  );
}

export default App;
