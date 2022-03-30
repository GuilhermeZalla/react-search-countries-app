import './../../css/country/country.css';
import './../../css/shared/variables/variables.css';
import './../../css/country_detail/country_detail.css';
import { Fragment, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { faArrowLeftLong, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CountryBorders from './country_borders/country_borders';

async function getCountries(name) {
    let response = await fetch(`https://restcountries.com/v2/name/${name}`);
    let result = await response.json();
    return result;
}

async function getCountriesBorders() {
    let response = await fetch(`https://restcountries.com/v2/all`);
    let result = await response.json();
    return result;
}

const CountryDetail = () => {
    const [country, setCountry] = useState([]);
    const [countries, setCountries] = useState([]);
    let { name } = useParams();

    useEffect(() => {
        getCountries(name).then(data => {
            setCountry(data[0]);
        })
        getCountriesBorders().then(data => {
            setCountries(data);
        })
    }, []);

    const getLanguages = () => {
        let list = [];
        country.languages?.map(language => {
            list.push(' ' + language.name);
        })
        let languages = list.toString().replace(' ', '');
        return languages;
    }

    const getCurrencies = () => {
        let list = [];
        country.currencies?.map(currencies => {
            list.push(' ' + currencies.name);
        })
        let currencies = list.toString().replace(' ', ' ');
        return currencies;
    }

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

    return (
        <Fragment>
            <header className="header">
                <h1 className="header__title">Where in the world?</h1>
                <div className="header__page-theme">
                    <button className="header__button" type="button" onClick={changeTheme}><FontAwesomeIcon icon={faMoon} />&nbsp; Dark Mode</button>
                </div>
            </header>
            <main className="content__details">
                <Link to={`/`}><button role="anchor" className="content__link" type="button"><FontAwesomeIcon icon={faArrowLeftLong} />&nbsp; Back</button></Link>
                <div className="content__body">
                    <figure className="content__figure">
                        <img className="content__flag" src={country.flag} alt={`Flag of ${country.name}`} />
                    </figure>
                    <article className="content__article">
                        <h2 className="content__country-name">{country.name}</h2>
                        <ul className="content__list">
                            <li className="content__item">
                                <h3 className="content__subtitle">Native Name:&nbsp;</h3>
                                <span className="content__info">{country.nativeName}</span>
                            </li>
                            <li className="content__item">
                                <h3 className="content__subtitle">Population:&nbsp;</h3>
                                <span className="content__info">{transformValue(country.population)}</span>
                            </li>
                            <li className="content__item">
                                <h3 className="content__subtitle">Region:&nbsp;</h3>
                                <span className="content__info">{country.region}</span>
                            </li>
                            <li className="content__item">
                                <h3 className="content__subtitle">Sub Region:&nbsp;</h3>
                                <span className="content__info">{country.subregion}</span>
                            </li>
                            <li className="content__item">
                                <h3 className="content__subtitle">Capital:&nbsp;</h3>
                                <span className="content__info">{country.capital}</span>
                            </li>
                            <li className="content__item">
                                <h3 className="content__subtitle is-m-3">Top Level Domain:&nbsp;</h3>
                                <span className="content__info">{country.topLevelDomain}</span>
                            </li>
                            <li className="content__item">
                                <h3 className="content__subtitle">Currencies:&nbsp;</h3>
                                <span className="content__info">{getCurrencies()}</span>
                            </li>
                            <li className="content__item">
                                <h3 className="content__subtitle">Languages:&nbsp;</h3>
                                <span className="content__info">{getLanguages()}</span>
                            </li>
                        </ul>
                        <ul className="content__list">
                            <li className="content__item">Border Countries:</li>
                            {
                                country.borders?.map(border => {
                                    return countries?.map((countryBorder, index) => {
                                        if (border === countryBorder.alpha3Code) {
                                            return <CountryBorders key={index} border={countryBorder.name} />
                                        }
                                    })
                                })
                            }
                        </ul>
                    </article>
                </div>
            </main>
        </Fragment>
    )

}

export default CountryDetail;