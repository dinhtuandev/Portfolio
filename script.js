document.addEventListener("DOMContentLoaded", function () {
//    <script>
        // 11. Clean Code: Comment giải thích
        // JavaScript: Hiển thị đồng hồ thời gian thực
        function updateClock() {
            const now = new Date();
            const time = now.toLocaleTimeString('vi-VN');
            const date = now.toLocaleDateString('vi-VN');
            document.getElementById('clock').innerHTML = `<span class="time">${time}</span><br><span class="date">${date}</span>`;
        }

        // Cập nhật đồng hồ mỗi giây
        updateClock();
        setInterval(updateClock, 1000);

        // JavaScript nhỏ: Tự động cập nhật năm hiện tại trong footer
        document.getElementById('currentYear').textContent = new Date().getFullYear();

        // JavaScript nhỏ: Nút cuộn lên đầu trang (Tuyệt đối không cần framework)
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '&#9650;'; // Biểu tượng mũi tên lên
        scrollToTopBtn.classList.add('scroll-to-top');
        document.body.appendChild(scrollToTopBtn);

        window.onscroll = function () {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        };

        scrollToTopBtn.onclick = function () {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        };
        // JavaScript nhỏ: Chuyển đổi giao diện sáng/tối
        const toggleSwitch = document.querySelector('.toggle-switch input[type="checkbox"]');
        const body = document.body;

        toggleSwitch.addEventListener('change', function () {
            if (this.checked) {
                body.classList.add('dark-theme');
                body.classList.remove('light-theme');
            } else {
                body.classList.add('light-theme');
                body.classList.remove('dark-theme');
            }
        
        // JavaScript nhỏ: Chuyển đổi ngôn ngữ (Tiếng Việt/English)
        const languageSwitch = document.querySelector('.language-switch');
        const content = document.querySelectorAll('.content');

        languageSwitch.addEventListener('change', function () {
            if (this.value === 'vi') {
                content.forEach(element => {
                    element.innerHTML = element.getAttribute('data-vi');
                });
            } else if (this.value === 'en') {
                content.forEach(element => {
                    element.innerHTML = element.getAttribute('data-en');
                });
            }
        });
    // </script>
    // Mini Memory Game

  const canvas = document.getElementById('memoryGame');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // Thêm nhiều màu sắc hơn và sử dụng các biểu tượng thay vì chỉ màu
  const cardTypes = [
    { color: "#ff6b6b", symbol: "♥" },
    { color: "#feca57", symbol: "★" },
    { color: "#1dd1a1", symbol: "♣" },
    { color: "#54a0ff", symbol: "♦" },
    { color: "#5f27cd", symbol: "♠" },
    { color: "#ee5253", symbol: "✿" },
    { color: "#00d2d3", symbol: "♫" },
    { color: "#ff9f43", symbol: "☼" }
  ];
  
  let grid = [],
    flipped = [],
    matched = [],
    size = 4, // Tăng kích thước lên 4x4
    moves = 0,
    score = 0,
    startTime = 0,
    gameOver = false,
    gameStarted = false,
    canClick = true; // Thêm biến để kiểm soát việc click
  
  const movesCountElement = document.getElementById('moves-count');
  const pairsFoundElement = document.getElementById('pairs-found');
  const totalPairsElement = document.getElementById('total-pairs');
  const resultContainer = document.querySelector('.game-result');
  const restartButton = document.querySelector('.restart-button');
  
  // Khởi tạo game
  initGame();
  
  // Thêm sự kiện cho nút restart
  if (restartButton) {
    restartButton.addEventListener('click', resetGame);
  }
  
  function resetGame() {
    grid = [];
    flipped = [];
    matched = [];
    moves = 0;
    score = 0;
    gameOver = false;
    gameStarted = false;
    canClick = true;
    
    if (resultContainer) resultContainer.style.display = 'none';
    if (restartButton) restartButton.style.display = 'none';
    
    updateScoreDisplay();
    initGame();
  }
  
  function updateScoreDisplay() {
    if (movesCountElement) movesCountElement.textContent = moves;
    if (pairsFoundElement) pairsFoundElement.textContent = matched.length / 2;
    if (totalPairsElement) totalPairsElement.textContent = (size * size) / 2;
  }
  
  function initGame() {
    // Tạo một mảng các cặp thẻ
    let cardPairs = [];
    const totalPairs = (size * size) / 2;
    
    // Chọn ngẫu nhiên các loại thẻ từ cardTypes
    const selectedCardTypes = [...cardTypes]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalPairs);
    
    // Tạo các cặp thẻ
    for (let i = 0; i < totalPairs; i++) {
      cardPairs.push(selectedCardTypes[i], selectedCardTypes[i]);
    }
    
    // Xáo trộn các thẻ
    cardPairs = cardPairs.sort(() => Math.random() - 0.5);
    grid = cardPairs;
    
    // Cập nhật hiển thị điểm số
    updateScoreDisplay();
    
    // Vẽ game
    drawGame();
  }
  
  function calculateScore() {
    const timeTaken = (Date.now() - startTime) / 1000;
    const maxPairs = size * size / 2;
    const matchedPairs = matched.length / 2;
    
    // Tính độ chính xác (tránh chia cho 0)
    const accuracy = moves > 0 ? (matchedPairs / moves) * 100 : 0;
    
    // Tính điểm dựa trên độ chính xác và thời gian
    let timeBonus = Math.max(0, 200 - timeTaken);
    score = Math.round((accuracy + timeBonus) * (matchedPairs / maxPairs));
    
    return {
      score,
      moves,
      timeTaken: timeTaken.toFixed(1),
      accuracy: accuracy.toFixed(1),
      pairs: matchedPairs
    };
  }
  
  function showResult() {
    const result = calculateScore();
    gameOver = true;
    
    // Hiển thị kết quả
    if (resultContainer) {
      const scoreElement = document.getElementById('result-score');
      const movesElement = document.getElementById('result-moves');
      const timeElement = document.getElementById('result-time');
      const accuracyElement = document.getElementById('result-accuracy');
      const messageElement = document.getElementById('result-message');
      
      if (scoreElement) scoreElement.textContent = result.score;
      if (movesElement) movesElement.textContent = result.moves;
      if (timeElement) timeElement.textContent = result.timeTaken + 's';
      if (accuracyElement) accuracyElement.textContent = result.accuracy + '%';
      if (messageElement) messageElement.textContent = getResultMessage(result.score);
      
      resultContainer.style.display = 'block';
    }
    
    if (restartButton) {
      restartButton.style.display = 'block';
    }
  }
  
  function getResultMessage(score) {
    if (score >= 150) return "Tuyệt vời! Bạn có trí nhớ siêu phàm!";
    if (score >= 100) return "Rất giỏi! Bạn có trí nhớ tốt!";
    if (score >= 50) return "Khá tốt! Hãy tiếp tục luyện tập!";
    return "Hãy thử lại, bạn có thể làm tốt hơn!";
  }
  
  function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (gameOver) {
      return;
    }
    
    // Tính toán kích thước thẻ dựa trên kích thước lưới
    const cardWidth = Math.min(90, (canvas.width - 100) / size);
    const cardHeight = Math.min(90, (canvas.height - 100) / size);
    const padding = 10;
    
    // Vẽ các ô thẻ bài
    grid.forEach((card, i) => {
      const col = i % size;
      const row = Math.floor(i / size);
      
      const x = col * (cardWidth + padding) + 50;
      const y = row * (cardHeight + padding) + 50;
      
      // Kiểm tra xem thẻ đã được lật hoặc đã được ghép đôi chưa
      const isFlipped = flipped.includes(i);
      const isMatched = matched.includes(i);
      
      // Vẽ nền thẻ
      ctx.fillStyle = isMatched ? "#e0f7fa" : (isFlipped ? card.color : "#2c3e50");
      ctx.strokeStyle = isMatched ? "#4caf50" : "#34495e";
      ctx.lineWidth = isMatched ? 3 : 1;
      
      // Vẽ thẻ với góc bo tròn
      ctx.beginPath();
      ctx.moveTo(x + 10, y);
      ctx.lineTo(x + cardWidth - 10, y);
      ctx.quadraticCurveTo(x + cardWidth, y, x + cardWidth, y + 10);
      ctx.lineTo(x + cardWidth, y + cardHeight - 10);
      ctx.quadraticCurveTo(x + cardWidth, y + cardHeight, x + cardWidth - 10, y + cardHeight);
      ctx.lineTo(x + 10, y + cardHeight);
      ctx.quadraticCurveTo(x, y + cardHeight, x, y + cardHeight - 10);
      ctx.lineTo(x, y + 10);
      ctx.quadraticCurveTo(x, y, x + 10, y);
      ctx.closePath();
      
      ctx.fill();
      ctx.stroke();
      
      // Nếu thẻ đã được lật, hiển thị biểu tượng
      if (isFlipped || isMatched) {
        ctx.fillStyle = isMatched ? "#4caf50" : "#fff";
        ctx.font = `${cardWidth * 0.5}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(card.symbol, x + cardWidth / 2, y + cardHeight / 2);
      }
    });
  }
  
  // Xử lý sự kiện click
  canvas.addEventListener("click", function(e) {
    if (!canClick || gameOver) {
      return;
    }
    
    if (!gameStarted) {
      gameStarted = true;
      startTime = Date.now();
    }
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Tính toán kích thước thẻ
    const cardWidth = Math.min(90, (canvas.width - 100) / size);
    const cardHeight = Math.min(90, (canvas.height - 100) / size);
    const padding = 10;
    
    // Kiểm tra xem người dùng đã click vào thẻ nào
    for (let i = 0; i < grid.length; i++) {
      const col = i % size;
      const row = Math.floor(i / size);
      
      const x = col * (cardWidth + padding) + 50;
      const y = row * (cardHeight + padding) + 50;
      
      if (
        mouseX >= x && mouseX <= x + cardWidth &&
        mouseY >= y && mouseY <= y + cardHeight
      ) {
        // Nếu thẻ chưa được lật và chưa được ghép đôi
        if (!flipped.includes(i) && !matched.includes(i)) {
          flipped.push(i);
          drawGame();
          
          // Nếu đã lật 2 thẻ, kiểm tra xem chúng có giống nhau không
          if (flipped.length === 2) {
            moves++;
            updateScoreDisplay();
            
            const [first, second] = flipped;
            if (grid[first].symbol === grid[second].symbol && grid[first].color === grid[second].color) {
              // Nếu giống nhau, thêm vào mảng matched
              matched.push(first, second);
              flipped = [];
              
              // Cập nhật hiển thị điểm số
              updateScoreDisplay();
              
              // Kiểm tra xem đã tìm thấy tất cả các cặp chưa
              if (matched.length === grid.length) {
                setTimeout(function() {
                  showResult();
                }, 500);
              }
            } else {
              // Nếu không giống nhau, đợi một chút rồi úp lại
              canClick = false;
              setTimeout(function() {
                flipped = [];
                canClick = true;
                drawGame();
              }, 1000);
            }
          }
          
          break;
        }
      }
    }
  });
  
  // Thêm sự kiện resize để game hiển thị tốt trên mọi kích thước màn hình
  window.addEventListener('resize', function() {
    drawGame();
  });
});
    
});
