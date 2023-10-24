import { theme } from "@/presentation/styles/theme";
import Router from "@/main/routes/router";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import GlobalStyles from "@/presentation/styles";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
            <GlobalStyles />
        </ThemeProvider>
    );
};

export default App;
