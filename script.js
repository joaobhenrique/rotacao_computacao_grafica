// Configurações iniciais
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Função para desenhar o plano de fundo (eixos)
function drawAxes() {
  ctx.beginPath();
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, canvas.height);
  ctx.moveTo(0, centerY);
  ctx.lineTo(canvas.width, centerY);
  ctx.strokeStyle = 'gray';
  ctx.stroke();
}

// Função de rotação
function rotatePoint(x, y, angle) {
  const radians = (Math.PI / 180) * angle; // Convertendo para radianos
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const newX = x * cos - y * sin;
  const newY = x * sin + y * cos;
  return { x: newX, y: newY };
}

// Função para desenhar um ponto
function drawPoint(x, y, color = 'red') {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(centerX + x, centerY - y, 3, 0, 2 * Math.PI); // Invertendo o eixo Y
  ctx.fill();
}

// Função para iniciar a animação com o raio especificado pelo usuário
// Função para iniciar a animação com o raio e o ângulo especificados pelo usuário
function startAnimation() {
  const radiusInput = document.getElementById('radiusInput');
  const angleInput = document.getElementById('angleInput');
  const radius = parseFloat(radiusInput.value);
  const angleStep = parseFloat(angleInput.value); // Novo valor do input de ângulo

  if (isNaN(radius) || radius <= 0) {
    alert('Por favor, digite um valor válido para o raio.');
    return;
  }

  if (isNaN(angleStep) || angleStep <= 0) {
    alert('Por favor, digite um valor válido para o ângulo.');
    return;
  }

  animateRotation(radius, angleStep);
}

// Função para animar a rotação do ponto com o passo de ângulo especificado
function animateRotation(radius, angleStep) {
  let angle = 0;

  function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
    drawAxes(); // Redesenha os eixos

    // Calcula a nova posição do ponto após a rotação
    const rotatedPoint = rotatePoint(radius, 0, angle);
    drawPoint(rotatedPoint.x, rotatedPoint.y);

    angle += angleStep; // Incrementa o ângulo de acordo com o valor do usuário
    if (angle >= 360) {
      angle = 0; // Reseta o ângulo após uma rotação completa
    }

    requestAnimationFrame(drawFrame); // Chama o próximo frame de animação
  }

  drawFrame(); // Inicia a animação
}

// Inicializa o plano de fundo
drawAxes();
