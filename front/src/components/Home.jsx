import { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/Home.scss';
import moment from 'moment';
import 'moment/locale/fr';
import ImageIcon from '@mui/icons-material/Image';
import GifBoxIcon from '@mui/icons-material/GifBox';
import ListIcon from '@mui/icons-material/List';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [user, setUser] = useState([]);
  const [weet, setWeet] = useState('');
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [pwd, setPwd] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articleRes = await axios.get('http://localhost:3000/article');
        const articlesRecuperes = articleRes.data;
        const userRes = await axios.get('http://localhost:3000/utilisateur');
        const userRecuperes = userRes.data;

        // const articlesAvecNoms = await Promise.all(
        //   articlesRecuperes.map(async (article) => {
        //     try {
        //       const responseUser = await axios.get(`http://localhost:3000/utilisateur/${article.auteur}`);
        //       const utilisateur = responseUser.data;

        //       return { ...article, utilisateur };
        //     } catch (error) {
        //       console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        //       return article;
        //     }
        //   })
        // );


        setUser(userRecuperes);
        // setArticles(articlesAvecNoms);
        setArticles(articlesRecuperes);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la requête:', error);
      }
    };

    fetchArticles();

        }, []);

        const ls = localStorage;

        const [loginData, setLoginData] = useState({email: '',password: ''});

        const [isLoggedIn, setLoggedIn] = useState(false);

  const post = async (e) => {
    e.preventDefault();

    const title = weet.split(' ').slice(0, 2).join(' ');

    const newArticle = {
      titre: title,
      texte: weet,
      auteur: 28,
      create_date: Date.now(),
    };

    try {
      const res = await axios.post('http://localhost:3000/article', newArticle);
      console.log(res.data);
    } catch (error) {
      console.error('Erreur lors de la publication de l\'article :', error);
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    let state = true;

    try {
      const check = await axios.get('http://localhost:3000/utilisateur');

      for (let i = 0; i < check.data.length - 1; i++) {
        if (check.data[i].email === email) {
          state = false;
        }
      }

      console.log(state);

      if (state) {
        const newUser = {
          email: email,
          nom: nom,
          prenom: prenom,
          pwd: pwd,
        };

        console.log(newUser);
        const res = await axios.post('http://localhost:3000/utilisateur', newUser);
        console.log(res.data);
      } else {
        console.log("L'utilisateur existe déjà !");
      }
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur :', error);
    }

        const goLogin = async () => {
            try {
                const rows = await axios.post('http://localhost:3000/login', loginData);
                if(rows.status === 200) {
                    setLoggedIn(true);
                    ls.setItem("key1", rows.email);
                    ls.setItem("key2", rows.nom);
                    ls.setItem("key3", rows.prenom);
                    ls.setItem("key4", rows.id);
                    console.log("Connecté")
                } else {
                    console.log("Non");
                }
            } catch (error) {
                console.error(error);
            }
        }
  };

  moment.locale('fr');

    return (
        <div className="home">
            <div className="left">
                <div className="navbar">

                </div>
                <div className="profil-picture">
                    <div className="pp-box">
                        <div className="pp"></div>
                    </div>
                    <div className="content">
                        <div className="nom">
                            <p>Nom</p>
                        </div>
                        <div className="email">
                            <p>email@email.email</p>
                        </div>
                    </div>
                    <div className="options">
                        <MoreHorizIcon />
                    </div>
                </div>
            </div>
            <div className="center">
                <div className="fyp">
                    <div className="text">
                        <p>Pour vous</p>
                        <p>Abonnements</p>
                    </div>
                    <div className="settings">
                        <SettingsIcon />
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
                                <div id='icon-weet'>
                                    <ImageIcon />
                                </div>
                                <div id='icon-weet'>
                                    <GifBoxIcon />
                                </div>
                                <div id='icon-weet'>
                                    <ListIcon />
                                </div>
                                <div id='icon-weet'>
                                    <SentimentSatisfiedAltIcon />
                                </div>
                                <div id='icon-weet'>
                                    <PendingActionsIcon />
                                </div>
                                <div id='icon-weet'>
                                    <AddLocationIcon />
                                </div>
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
                {articles.map((article) => (
                    <div className="article" key={article.id}>
                    <div className="header">
                        <div className="pp"></div>
                        <span>{article.utilisateur ? article.utilisateur.nom : 'Auteur inconnu'} {article.utilisateur ? article.utilisateur.prenom : ''} -</span>
                        <span>:- {article.titre}</span>
                    </div>
                    <div className="texte">
                        <p>{article.texte}</p>
                    </div>
                    <div className="date">
                        <p>{moment(article.create_date).format('LLL')}</p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            <div className="right">
                <div className="searchbar">
                    <div className="search-icon">
                        <SearchIcon />
                    </div>
                    <input type="text" placeholder='Chercher'/>
                </div>
                <div className="create-user" id='box'>
                    <div className="title">
                        <h3>CREATE</h3>
                    </div>
                    <div className="form">
                        <div className="email">
                            <input type="text" placeholder='Email' onChange={(e)=> setEmail(e.target.value)} required/>
                        </div>
                        <div className="perso">
                            <input type="text" placeholder='Nom' onChange={(e)=> setNom(e.target.value)} required/>
                            <input type="text" placeholder='Prénom' onChange={(e)=> setPrenom(e.target.value)} required/>
                        </div>
                        <div className="pwd">
                            <input type="password" placeholder='Mot de passe' onChange={(e)=> setPwd(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="submit">
                        <div className="btn-submit" onClick={ createUser }>CREER</div>
                    </div>
                </div>
                <div className="login-user" id='box'>
                    <div className="title">
                        <h3>LOGIN</h3>
                    </div>
                    <div className="form">
                        <div className="email">
                            <input type="text" placeholder='Email' onChange={(e) => setLoginData({...loginData, email: e.target.value})}/>
                        </div>
                        <div className="pwd">
                            <input type="password" placeholder='Mot de passe' onChange={(e) => setLoginData({...loginData, password: e.target.value})}/>
                        </div>
                    </div>
                    <div className="submit">
                        <div className="btn-submit" onClick={goLogin}>CREER</div>
                    </div>
                </div>
                <div className="recommendation" id='box'>
                    <div className="title">
                        <h3>RECOMMENDATION</h3>
                    </div>
                    <div className="container">
                        { user.map((user) => (
                            <div className="row-user">
                                <div className="pp-box">
                                    <div className="pp"></div>
                                </div>
                                <div className="content">
                                    <div className="name">
                                        <p>{ user.nom } { user.prenom }</p>
                                    </div>
                                    <div className="email">
                                        <p>@{ user.email }</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}