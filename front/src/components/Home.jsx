import { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/Home.scss';

export default function NavBar() {
    const [article, setArticle] = useState([]);
    const [weet, setWeet] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3000/article`)
          .then(res => {
            setArticle(res.data);
          })
          .catch(error => {
            console.error('Une erreur s\'est produite lors de la requête:', error);
          });

        }, []);

        const post = async(e)=>{
            e.preventDefault()

            const title = weet.split(' ').slice(0,2).join(' ');

            const newArticle = {
                titre: title,
                texte: weet,
                auteur: 2,
                create_date: Date.now(),
            }

            const res = await axios.post('http://localhost:3000/article', newArticle);

        }
    return (
        <div className="home">
            <div className="center">
                <div className="fyp">
                    <div className="text">
                        <p>Pour vous</p>
                        <p>Abonnements</p>
                    </div>
                    <div className="settings">
                        <div className="pp-set"></div>
                    </div>
                </div>
                <div className="weet">
                    <div className="l-weet">
                        <div className="pp-weet"></div>
                    </div>
                    <div className="r-weet">
                        <div className="input-weet">
                            <input type="text" placeholder='Quoi de neuf ?!' onChange={(e)=> setWeet(e.target.value)}/>
                        </div>
                        <div className="icon-weet">
                            <div className="icons-weet">
                                <div id='icon-weet'></div>
                                <div id='icon-weet'></div>
                                <div id='icon-weet'></div>
                                <div id='icon-weet'></div>
                                <div id='icon-weet'></div>
                                <div id='icon-weet'></div>
                            </div>
                            <div className="post-weet">
                                <div className="btn-post" onClick={post}>
                                    <p>Poster</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tl">
                    { article.map(article => (
                        <div className="article">
                            <div className="header">
                                <div className="pp"></div>
                                <span>{ article.auteur }</span>
                                <span> - </span>
                                <span>{ article.titre }</span>
                            </div>
                            <div className="texte">
                                <p>{ article.texte }</p>
                            </div>
                            <div className="date">
                            <p>{ article.create_date }</p>
                            </div>
                        </div>
                    ))}    
                </div>
            </div>
        </div>
    )
}