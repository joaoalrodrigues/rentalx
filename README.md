# Cadastro de carro

**RF** => Requisitos funcionais
Deve ser possível cadastrar um novo carro.

**RNF** => Requisitos não funcionais
N/A

**RN** => Regra de negócio
Não deve ser possível cadastrar um carro com uma placa de outro carro cadastrado.
Não deve ser possível alterar a placa de um carro já cadastrado.
O carro deve ser cadastrado com disponibilidade por padrão.
Deve ser possível realizar cadastro de novos carros apenas por usuário administrador.

# Listagem de carros

**RF**
Deve se possível listar todos os carros disponíveis.
Deve se possível listar todos os carros disponíveis pelo nome da categoria.
Deve se possível listar todos os carros disponíveis pelo nome da marca.
Deve se possível listar todos os carros disponíveis pelo nome do carro.

**RN**
O usuário não precisa estar logado no sistema.

# Cadastro de Especificação no carro

**RF**
Deve se possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações.
Deve ser possível listar todos os carros.

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação com mesmo nome para o mesmo carro.

# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro.

**RNF**
Utilizar o multer para upload dos arquivos

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro

**RF**
Deve ser possível cadastrar um aluguel.

**RN**
O aluguel deve ter duração mínima de 24 hora.
Não deve ser possível cadastrar um novo aluguel caso já exista um cadastro de aluguel em aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um cadastro de aluguel em aberto para o mesmo carro.

