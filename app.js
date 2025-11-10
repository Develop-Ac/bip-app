document.getElementById('start-btn').addEventListener('click', function() {
  const video = document.getElementById('video');
  const resultDiv = document.getElementById('result');
  video.style.display = 'block';
  resultDiv.textContent = 'Lendo...';

  Quagga.init({
    inputStream: {
      name: 'Live',
      type: 'LiveStream',
      target: video,
      constraints: {
        facingMode: 'environment'
      }
    },
    decoder: {
      readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'upc_reader', 'upc_e_reader']
    }
  }, function(err) {
    if (err) {
      resultDiv.textContent = 'Erro ao iniciar câmera: ' + err;
      return;
    }
    Quagga.start();
  });

  Quagga.onDetected(function(data) {
    Quagga.stop();
    video.style.display = 'none';
    resultDiv.textContent = 'Código lido: ' + data.codeResult.code;
  });
});
