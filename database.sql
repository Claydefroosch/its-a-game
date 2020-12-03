DROP TABLE IF EXISTS highscore;

CREATE TABLE highscore(
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    score INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO highscore (username, score) VALUES ('Nicolas Cage', 450);

INSERT INTO highscore (username, score) VALUES (
    'Arnold Schwarzenegger',
    100
);

INSERT INTO highscore (username, score) VALUES (
    'Vegeta',
    9000
);