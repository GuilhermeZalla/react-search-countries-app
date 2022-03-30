import './../../../css/country/countries/countries.css';
import { Fragment } from 'react';
import {Link} from 'react-router-dom';

const Countries = (props) => {
    return (
        <Fragment>
                <Link to={`/country_detail/${props.name}`}>
                    <article className="content__article">
                        <header className="content__header">
                            <img className="content__img" src={props.img_url} alt="Flag image" />
                        </header>
                        <div className="content__article-body">
                            <h2 className="content__country-name">{props.name}</h2>
                            <ul className="content__list">
                                <li className="content__item">
                                    <h3 className="content__subtitle">Population:&nbsp;</h3>
                                    <span className="content__info">{props.population}</span>
                                </li>
                                <li className="content__item">
                                    <h3 className="content__subtitle">Region:&nbsp;</h3>
                                    <span className="content__info">{props.region}</span>
                                </li>
                                <li className="content__item">
                                    <h3 className="content__subtitle">Capital:&nbsp;</h3>
                                    <span className="content__info">{props.capital}</span>
                    
                                </li>
                            </ul>
                        </div>
                    </article>
                </Link>
        </Fragment>
    )
}

export default Countries;