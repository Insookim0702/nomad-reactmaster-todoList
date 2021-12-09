import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Header from '../components/Header'

function Router() {
    <BrowserRouter>
    <Header />
        <Routes>
            <Route path="/"></Route>
        </Routes>
    </BrowserRouter>
}

export default Router;