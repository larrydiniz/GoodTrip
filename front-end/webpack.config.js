const path = require('path');

module.exports = {
  entry: {
      index: './public/scripts/main.js',
      alterarSenha: './public/scripts/alterar-senha.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'bundles'),
  },
};