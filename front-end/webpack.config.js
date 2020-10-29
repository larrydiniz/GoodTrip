const path = require('path');

module.exports = {
  entry: {
      index: './public/scripts/index.js',
      mobileMenu: './public/scripts/commons/mobileMenu.js',
      alterarSenha: './public/scripts/alterar-senha.js',
      edicaoDePerfil: './public/scripts/edicaoDePerfil.js',
      agendaDeViagem: './public/scripts/agenda-viagem.js',
      cadastroDeViagem: './public/scripts/cadastro-viagem.js',
      edicaoDePerfil: './public/scripts/edicaoDePerfil.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'bundles'),
  },
};