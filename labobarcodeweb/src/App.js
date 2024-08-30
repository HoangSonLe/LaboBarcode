import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ErrorPage from "./components/errorpage/ErrorPage";
import Layout from "./components/layout/Layout";
import Warranty from "./components/warranty/Warranty";
import WarrantyManagement from "./components/warrantymanagement/WarrantyManagement";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});
function App() {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/:id?" index element={<Warranty />} />
                        <Route path="/quanlythebaohanh" element={<WarrantyManagement />} />
                        {/* <Route path="contact" element={<Contact />} /> */}
                        <Route path="*" element={<ErrorPage />} />
                    </Route>
                </Routes>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
