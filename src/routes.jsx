import { BrowserRouter, Routes, Route} from "react-router-dom";
import CountriesScreen from "./screens/countries";
import CountryScreenDetail from "./screens/country_detail";

const Routess = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route exact path='/' element={<CountriesScreen/>}/>
                <Route exact path='/country_detail/:name' element={<CountryScreenDetail/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Routess;