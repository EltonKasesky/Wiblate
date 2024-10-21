// next.config.js
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'github.com',
          pathname: '/**', // Permitir qualquer caminho de imagem no GitHub
        },
      ],
    },
  };
  