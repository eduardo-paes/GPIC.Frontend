import { theme } from "@/infrastructure/presentation/styles/theme";
import Router from "@/main/routes/router";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import GlobalStyles from "@/infrastructure/presentation/styles/GlobalStyles";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Router />
        <GlobalStyles />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
