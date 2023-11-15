CREATE TABLE utilisateur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    pwd VARCHAR(255),
    nom VARCHAR(255),
    prenom VARCHAR(255)
);



INSERT INTO utilisateur (email, pwd, nom, prenom) VALUES
('utilisateur1@example.com', 'motdepasse1', 'Nom1', 'Prenom1'),
('utilisateur2@example.com', 'motdepasse2', 'Nom2', 'Prenom2'),
('utilisateur3@example.com', 'motdepasse3', 'Nom3', 'Prenom3');
