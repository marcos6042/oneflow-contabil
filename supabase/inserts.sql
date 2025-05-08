-- Empresas de teste
insert into empresas (razao_social, cnpj, uf, unidade, cod_sistema) values
('Empresa Exemplo 1', '12345678000100', 'SP', 'MATRIZ', 'EMP001');

-- Plano de contas exemplo
insert into plano_contas (empresa_id, codigo, descricao) values
(1, '1.1.1', 'Caixa'),
(1, '1.1.2', 'Banco'),
(1, '2.1.1', 'Fornecedores');
