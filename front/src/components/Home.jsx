import { useState, useEffect } from 'react';
import axios from 'axios';

export default function NavBar() {
    const [article, setArticle] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/article`)
          .then(res => {
            setArticle(res.data);
          })
          .catch(error => {
            console.error('Une erreur s\'est produite lors de la requête:', error);
          });
      }, []);
    return (
        <div className="content">
            { article.map(article => (
                <div className="article">
                    <p>{ article.id }</p>
                    <p>{ article.titre }</p>
                    <p>{ article.auteur }</p>
                    <p>{ article.texte }</p>
                    <p>{ article.create_date }</p>
                </div>
            )) }
        </div>
    )
}