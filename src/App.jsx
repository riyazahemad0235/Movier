import "./App.css";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import SearchPage from "./pages/SearchPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import MovieProvider from "./context/MovieContext";
import DisplayMovie from "./components/DisplayMovie";

function App() {
  return (
    <MovieProvider>
      <BrowserRouter basename="/movier">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="DisplayMovie/:id" element={<DisplayMovie />} />
            <Route path="SearchPage" element={<SearchPage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </MovieProvider>
  );
}

export default App;
