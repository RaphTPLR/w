CREATE TABLE article (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255),
    auteur VARCHAR(15),
    create_date DATETIME
);


INSERT INTO article (id, titre, auteur, create_date) VALUES
(1, 'Titre de l\'article 1', 'Auteur 1', '2023-11-15 10:30:00'),
(2, 'Titre de l\'article 2', 'Auteur 2', '2023-11-15 11:45:00'),
(3, 'Titre de l\'article 3', 'Auteur 3', '2023-11-15 14:20:00'),
(4, 'Titre de l\'article 4', 'Auteur 1', '2023-11-15 16:00:00'),
(5, 'Titre de l\'article 5', 'Auteur 2', '2023-11-15 18:30:00');
