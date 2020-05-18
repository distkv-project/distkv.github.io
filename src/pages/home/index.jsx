import React from 'react';
import ReactDOM from 'react-dom';
import cls from 'classnames';
import 'whatwg-fetch'; // fetch polyfill
import { getScrollTop } from '../../../utils';
import Button from '../../components/button';
import Footer from '../../components/footer';
import Language from '../../components/language';
import Item from './featureItem';
import './index.scss';

import HeaderRefactored from '../../components/headerRefactored';
import Slider from "../../components/slider";
import EventCard from "../community/eventCard";
class Home extends Language {

    constructor(props) {
        super(props);
        this.state = {
            headerType: 'primary',
            starCount: 0,
            forkCount: 0,
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            const scrollTop = getScrollTop();
            if (scrollTop > 66) {
                this.setState({
                    headerType: 'normal',
                });
            } else {
                this.setState({
                    headerType: 'primary',
                });
            }
        });
        fetch('//api.github.com/repos/distkv-project/distkv')
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    starCount: data.stargazers_count,
                    forkCount: data.forks_count,
                });
            });
    }

    render() {
        const { starCount, forkCount } = this.state;
        const language = this.getLanguage();
        const module = "home";
        const dataSource = this.getLanguageDict(language, module);
        const newsDataSource = this.getLanguageDict(language, "community");
        const { headerType } = this.state;
        const headerLogo = headerType === 'primary' ? '/images/distkv-logo-white.png' : '/images/distkv-logo.png';
        return (
            <div className="home-page">
                <section
                  className={cls({
                    'top-section': true,
                    [`top-section-${language}`]: true,
                  })}
                >
                    <HeaderRefactored
                        currentKey="home"
                        type={headerType}
                        logo={headerLogo}
                        language={language}
                        onLanguageChange={this.onLanguageChange}
                    />

                    <div className="top-body">
                        <div className="vertical-middle">
                            <div className="product-name">
                                <h2>{dataSource.brand.brandName}</h2>
                            </div>
                            <p className="product-desc">{dataSource.brand.briefIntroduction}</p>
                            <div className="button-area">
                                {
                                    dataSource.brand.buttons.map(b => <Button type={b.type} key={b.type} link={b.link}
                                                                              target={b.target}>{b.text}</Button>)
                                }
                            </div>
                            <div className="github-buttons">
                                <a href="https://github.com/distkv-project/distkv" target="_blank" rel="noopener noreferrer">
                                    <div className="star">
                                        <img src="https://img.alicdn.com/tfs/TB1FlB1JwHqK1RjSZFPXXcwapXa-32-32.png"/>
                                        <span className="type">Star</span>
                                        <span className="line"/>
                                        <span className="count">{starCount}</span>
                                    </div>
                                </a>
                                <a href="https://github.com/distkv-project/distkv/fork" target="_blank" rel="noopener noreferrer">
                                    <div className="fork">
                                        <img src="https://img.alicdn.com/tfs/TB1zbxSJwDqK1RjSZSyXXaxEVXa-32-32.png"/>
                                        <span className="type">Fork</span>
                                        <span className="line"/>
                                        <span className="count">{forkCount}</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="header-image">
                            <img src="/images/distkv-header-image.png"/>
                        </div>
                    </div>
                </section>
                <section className="feature-section">
                  <div className="feature-container">
                    <h3>{dataSource.features.title}</h3>
                    <ul>
                      {
                        dataSource.features.list.map((feature, i) => (
                          <Item feature={feature} key={i} />
                        ))
                      }
                    </ul>
                  </div>
                </section>
                <section className="events-section">
                  <h3>{newsDataSource.events.title}</h3>
                  <Slider>
                    {newsDataSource.events.list.map((event, i) => (
                      <EventCard event={event} key={i} />
                    ))}
                  </Slider>
                </section>
                <Footer logo="/images/distkv-logo-gray.png" language={language} module={module}/>
            </div>
        );
    }
}

document.getElementById('root') && ReactDOM.render(<Home/>, document.getElementById('root'));

export default Home;
