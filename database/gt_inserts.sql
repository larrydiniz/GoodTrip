USE goodtrip;

INSERT INTO usuarios (email, nome, senha, username, foto)
VALUES  ('annaj@gmail.com', 'Ana Julia', 'GBjslfksa56', '@annaj', '../public/icons/perfil.svg'), 
		('alexgaudes@gmail.com', 'Alex Gaudes', 'DBj555sa56', '@alequatico', '../public/icons/alex.svg');
        
INSERT INTO viagens (destino, inicio, termino, imagem, fk_id_usuario)
VALUES  ('Praga', '2021-01-01', '2021-01-14', 'https://www.escolhaviajar.com/wp-content/uploads/2016/11/DSCN3000a.jpg', 1), 
		('Santiago', '2021-06-12', '2021-06-18', 'https://sweetway.com.br/wp-content/uploads/2019/01/tudo-o-que-voce-precisa-saber-sobre-santiago-no-chile.jpg', 1),
        ('Bahia', '2022-01-01', '2022-01-12', 'https://www.apabb.org.br/arquivos/upload/regionais/2017/10/09/nucleo-ba_1_29.jpg', 2);
        
INSERT INTO tarefas (data, horario, titulo, descricao, transporte, moeda, custo, fk_id_usuario, fk_id_viagem)
VALUES  ('2021-01-07', '09:00:00', 'Café da Manhã', 'Café da manhã no grande hotel', 2, 0, 76.99, 1, 1),
		('2021-01-07', '12:30:00', 'Almoço', 'Restaurante Lokal Dlouhááá', 2, 2, 8.00, 1, 1),
		('2021-01-09', '09:30:00', 'Café da Manhã', 'Café Domeček', 2, 2, 15.00, 1, 1),
        ('2021-01-14', '08:30:00', 'Café da Manhã', '', 2, 2, 7.00, 1, 1),
        ('2021-06-13', '16:30:00', 'Café da Tarde', '', 2, 2, 35.00, 2, 3);
        
INSERT INTO embarques (fk_id_usuario, fk_id_viagem)
VALUES  (1, 3);

INSERT INTO itens (nome, categoria, fk_id_usuario, fk_id_viagem)
VALUES  ('Escova de Dente', 0, 1, 1),
		('Toalha', 1, 1, 1),
        ('Pasta de Dente', 0, 1, 1),
        ('Escova de Dente', 0, 2, 3),
        ('Pasta de Dente', 0, 2, 3),
        ('4 Camisetas', 1, 1, 1),
        ('3 Calças', 1, 1, 2),
        ('Pilhas', 2, 1, 1),
        ('Câmera fotográfica', 3, 1, 1),
        ('Cabo USB', 3, 1, 1)







