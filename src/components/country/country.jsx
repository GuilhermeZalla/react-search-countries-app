import './../../css/country/country.css';
import './../../css/shared/variables/variables.css';
import { Fragment, useState, useEffect } from 'react';
import Countries from './countries/countries';
import { faMoon, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

async function getCountries() {
    let response = await fetch('https://restcountries.com/v2/all');
    let result = await response.json();
    return result;
}

const Country = () => {
    const [countries, setCountries] = useState();
    const [region, setRegionFilter] = useState("All");
    const [countryName, filterCountryByName] = useState(false);

    useEffect(() => {
        getCountries().then(data => {
            setCountries(data);
        })
    }, []);

    const getRegion = event => {
        let regionName = event.target.value;
        let filter = regionName[0].toUpperCase() + regionName.slice(1).toLowerCase();
        setRegionFilter(filter);
    }

    const getCountry = event => filterCountryByName(event.target.value);
    

    const transformValue = number => {
        const internationalNumberFormat = new Intl.NumberFormat('en-US');
        return internationalNumberFormat.format(number);
    }

    const changeTheme = () => {
        let btn = document.querySelector(".header__button");
        let btnStyle = getComputedStyle(btn).getPropertyValue('--clr-light-txt');
        let r = document.querySelector(':root');
        if (btnStyle === 'hsl(200, 15%, 8%)') {
            r.style.setProperty('--clr-light-txt', 'hsl(0, 0%, 100%)');
            r.style.setProperty('--clr-light-txt-element', 'hsl(209, 23%, 22%)');
            r.style.setProperty('--clr-bg', 'hsl(207, 26%, 17%)');
            r.style.setProperty('--box-shadow', 'none');
            r.style.setProperty('--clr-icon', 'hsl(0, 0%, 100%)');
        } else {
            r.style.setProperty('--clr-light-txt', 'hsl(200, 15%, 8%)');
            r.style.setProperty('--clr-light-txt-element', 'hsl(0, 0%, 100%)');
            r.style.setProperty('--clr-bg', 'hsl(0, 0%, 98%)');
            r.style.setProperty('--box-shadow', '0px 0px 9px 0px #787a7a61');
            r.style.setProperty('--clr-icon', 'hsla(0, 0%, 50%, 0.637)');
        }
    }

    if (countryName) {
        return (
            <Fragment>
                <header className="header">
                    <h1 className="header__title">Where in the world?</h1>
                    <div className="header__page-theme">
                        <button className="header__button" type="button" onClick={changeTheme}> <FontAwesomeIcon icon={faMoon} />&nbsp; Dark Mode</button>
                    </div>
                </header>
                <main className="content">
                    <div className="content__filters">
                        <input className="content__input" type="search" placeholder='Search for a country...' onChange={getCountry} />
                        <FontAwesomeIcon className="icon" icon={faSearch} />
                        <select className="content__select" name="region" id="regions" onChange={getRegion} >
                            <option disable="true" defaultValue={"Filter by Region"} hidden></option>
                            <option value="africa">Africa</option>
                            <option value="americas">America</option>
                            <option value="asia">Asia</option>
                            <option value="europe">Europe</option>
                            <option value="oceania">Oceania</option>
                            <option value="all">All countries</option>
                        </select>
                    </div>
                    <div className="content__countries">
                        {countries?.map((country, index) => {
                            if (country.name.toLowerCase() === countryName.toLowerCase()) {
                                return <Countries key={index} img_url={country.flag} name={country.name} population={transformValue(country.population)} region={country.region} capital={country.capital} />
                            } else {
                                return null;
                            }
                        })}
                    </div>
                </main>
            </Fragment>
        )
    } else if (region === "All") {
        return (
            <Fragment>
                <header className="header">
                    <h1 className="header__title">Where in the world?</h1>
                    <div className="header__page-theme">
                        <button className="header__button" type="button" onClick={changeTheme}> <FontAwesomeIcon icon={faMoon} />&nbsp; Dark Mode</button>
                    </div>
                </header>
                <main className="content">
                    <div className="content__filters">
                        <input className="content__input" type="search" placeholder='Search for a country...' onChange={getCountry} />
                        <FontAwesomeIcon className="icon" icon={faSearch} />
                        <select className="content__select" name="region" id="regions" onChange={getRegion} >
                            <option disable="true" defaultValue={"Filter by Region"} hidden>Filter by Region</option>
                            <option value="africa">Africa</option>
                            <option value="americas">America</option>
                            <option value="asia">Asia</option>
                            <option value="europe">Europe</option>
                            <option value="oceania">Oceania</option>
                            <option value="all">All countries</option>
                        </select>
                    </div>
                    <div className="content__countries">
                        {countries?.map((country, index) => <Countries key={index} img_url={country.flag} name={country.name} population={transformValue(country.population)} region={country.region} capital={country.capital} />)}
                    </div>
                </main>
            </Fragment>
        )
    } else if (region !== "All") {
        return (
            <Fragment>
                <header className="header">
                    <h1 className="header__title">Where in the world?</h1>
                    <div className="header__page-theme">
                        <button className="header__button" type="button" onClick={changeTheme}> <FontAwesomeIcon icon={faMoon} />&nbsp; Dark Mode</button>
                    </div>
                </header>
                <main className="content">
                    <div className="content__filters">
                        <input className="content__input" type="search" placeholder='Search for a country...' onChange={getCountry} />
                        <FontAwesomeIcon className="icon" icon={faSearch} />
                        <select className="content__select" name="region" id="regions" onChange={getRegion} >
                            <option disable="true" defaultValue={"Filter by Region"} hidden>Filter by Region</option>
                            <option value="africa">Africa</option>
                            <option value="americas">America</option>
                            <option value="asia">Asia</option>
                            <option value="europe">Europe</option>
                            <option value="oceania">Oceania</option>
                            <option value="all">All countries</option>
                        </select>
                    </div>
                    <div className="content__countries">
                        {countries?.map((country, index) => {
                            if (country.region === region) {
                                return <Countries key={index} img_url={country.flag} name={country.name} population={transformValue(country.population)} region={country.region} capital={country.capital} />
                            }
                        })}
                    </div>
                </main>
            </Fragment>
        )
    }
}

export default Country;