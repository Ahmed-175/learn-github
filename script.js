document.addEventListener('DOMContentLoaded', () => {
  const terminal = document.querySelector('.terminal-content');
  const cursor = document.querySelector('.cursor');
  const commands = [
    'system_status',
    'show_modules',
    'init_sequence'
  ];
  
  let currentCommand = '';
  let commandIndex = 0;
  let isTyping = false;

  // Simulate typing effect
  function typeText(text, element, callback) {
    let index = 0;
    isTyping = true;
    
    const interval = setInterval(() => {
      if (index < text.length) {
        element.textContent += text[index];
        index++;
      } else {
        clearInterval(interval);
        isTyping = false;
        if (callback) callback();
      }
    }, 50);
  }

  // Create new command line
  function createNewLine() {
    const line = document.createElement('div');
    line.className = 'line';
    line.innerHTML = `
      <span class="prompt">$</span>
      <span class="command"></span>
      <span class="cursor">█</span>
    `;
    terminal.appendChild(line);
    return line;
  }

  // Process command
  function processCommand(command) {
    const output = document.createElement('div');
    output.className = 'output';
    
    switch(command) {
      case 'system_status':
        output.innerHTML = `
          <div class="status-line">[OK] Core systems operational</div>
          <div class="status-line">[OK] Memory allocation: 8GB/16GB</div>
          <div class="status-line">[OK] Network connection established</div>
        `;
        break;
      case 'show_modules':
        output.innerHTML = `
          <div class="module">
            <span class="module-name">neural_engine</span>
            <span class="module-status">[ACTIVE]</span>
          </div>
          <div class="module">
            <span class="module-name">quantum_processor</span>
            <span class="module-status">[ACTIVE]</span>
          </div>
          <div class="module">
            <span class="module-name">bio_sensors</span>
            <span class="module-status">[ACTIVE]</span>
          </div>
        `;
        break;
      case 'init_sequence':
        output.innerHTML = `
          <div class="status-line">[INIT] Starting system initialization...</div>
          <div class="status-line">[INIT] Loading core modules...</div>
          <div class="status-line">[INIT] Establishing neural network...</div>
          <div class="status-line">[INIT] System ready</div>
        `;
        break;
    }
    
    terminal.appendChild(output);
  }

  // Start the terminal simulation
  function startTerminal() {
    const line = createNewLine();
    const commandElement = line.querySelector('.command');
    
    typeText(commands[commandIndex], commandElement, () => {
      processCommand(commands[commandIndex]);
      commandIndex++;
      
      if (commandIndex < commands.length) {
        setTimeout(() => {
          startTerminal();
        }, 1000);
      }
    });
  }

  // Start the simulation
  setTimeout(startTerminal, 1000);

  // Add matrix rain effect
  function createMatrixRain() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      column.style.left = `${i * 20}px`;
      column.style.animationDelay = `${Math.random() * 2}s`;
      terminal.appendChild(column);
    }
  }

  createMatrixRain();

  const buttons = document.querySelectorAll('.android-button');
  const statusBoxes = document.querySelectorAll('.status-box');
  const moduleItems = document.querySelectorAll('.module-item');
  const progressBars = document.querySelectorAll('.progress');
  
  // Button click effects
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Add click animation
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 100);

      // Show action message
      const action = button.dataset.action;
      const messages = {
        init: 'Initializing system components...',
        scan: 'Scanning environment...',
        update: 'Checking for updates...',
        connect: 'Establishing connection...'
      };

      // Create and show notification
      const notification = document.createElement('div');
      notification.className = 'notification';
      notification.textContent = messages[action];
      document.body.appendChild(notification);

      // Animate progress bars
      progressBars.forEach(bar => {
        const currentWidth = parseInt(bar.style.width);
        const newWidth = Math.min(currentWidth + 10, 100);
        bar.style.width = `${newWidth}%`;
      });

      // Remove notification after delay
      setTimeout(() => {
        notification.remove();
      }, 2000);
    });
  });

  // Status box hover effects
  statusBoxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
      box.style.transform = 'translateY(-2px)';
      box.style.boxShadow = '0 0 20px rgba(0, 195, 255, 0.2)';
    });

    box.addEventListener('mouseleave', () => {
      box.style.transform = 'translateY(0)';
      box.style.boxShadow = 'none';
    });
  });

  // Module item hover effects
  moduleItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const status = item.querySelector('.module-status');
      status.textContent = 'SCANNING...';
      status.style.color = '#00c3ff';
    });

    item.addEventListener('mouseleave', () => {
      const status = item.querySelector('.module-status');
      status.textContent = status.dataset.originalStatus || 'ACTIVE';
      status.style.color = '';
    });
  });

  // Store original status text
  moduleItems.forEach(item => {
    const status = item.querySelector('.module-status');
    status.dataset.originalStatus = status.textContent;
  });

  // Add notification styles
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(0, 195, 255, 0.1);
      border: 1px solid rgba(0, 195, 255, 0.3);
      color: #00c3ff;
      padding: 15px 25px;
      border-radius: 5px;
      animation: slideIn 0.3s ease, fadeOut 0.3s ease 1.7s;
      z-index: 1000;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Simulate system activity
  setInterval(() => {
    const randomBox = statusBoxes[Math.floor(Math.random() * statusBoxes.length)];
    const light = randomBox.querySelector('.status-light');
    
    light.style.opacity = '0.5';
    setTimeout(() => {
      light.style.opacity = '1';
    }, 200);
  }, 3000);

  // Initialize the interface
  initializeHologram();
  initializeNetworkVisualization();
  initializeQuantumDisplay();
  initializeDataStream();
  initializeButtons();
  updateSystemInfo();
});

// Hologram core animation
function initializeHologram() {
  const core = document.querySelector('.hologram-core');
  if (!core) return;

  // Create additional rings dynamically
  for (let i = 0; i < 3; i++) {
    const ring = document.createElement('div');
    ring.className = 'core-ring';
    core.appendChild(ring);
  }

  // Add floating particles
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'quantum-particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 2}s`;
    core.appendChild(particle);
  }
}

// Network visualization
function initializeNetworkVisualization() {
  const container = document.querySelector('.network-visualization');
  if (!container) return;

  // Create nodes
  for (let i = 0; i < 5; i++) {
    const node = document.createElement('div');
    node.className = 'node';
    node.style.left = `${Math.random() * 80 + 10}%`;
    node.style.top = `${Math.random() * 80 + 10}%`;
    container.appendChild(node);
  }

  // Create connections between nodes
  const nodes = container.querySelectorAll('.node');
  nodes.forEach((node, index) => {
    if (index < nodes.length - 1) {
      const connection = document.createElement('div');
      connection.className = 'connection';
      container.appendChild(connection);
      updateConnection(connection, node, nodes[index + 1]);
    }
  });
}

function updateConnection(connection, node1, node2) {
  const rect1 = node1.getBoundingClientRect();
  const rect2 = node2.getBoundingClientRect();
  const container = connection.parentElement;
  const containerRect = container.getBoundingClientRect();

  const x1 = rect1.left + rect1.width / 2 - containerRect.left;
  const y1 = rect1.top + rect1.height / 2 - containerRect.top;
  const x2 = rect2.left + rect2.width / 2 - containerRect.left;
  const y2 = rect2.top + rect2.height / 2 - containerRect.top;

  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

  connection.style.width = `${length}px`;
  connection.style.left = `${x1}px`;
  connection.style.top = `${y1}px`;
  connection.style.transform = `rotate(${angle}deg)`;
}

// Quantum display animation
function initializeQuantumDisplay() {
  const display = document.querySelector('.quantum-display');
  if (!display) return;

  // Create quantum particles
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'quantum-particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 3}s`;
    display.appendChild(particle);
  }
}

// Data stream animation
function initializeDataStream() {
  const container = document.querySelector('.stream-container');
  if (!container) return;

  // Create data lines
  for (let i = 0; i < 8; i++) {
    const line = document.createElement('div');
    line.className = 'data-line';
    line.style.top = `${(i * 12.5)}%`;
    line.style.animationDelay = `${i * 0.25}s`;
    container.appendChild(line);
  }
}

// Interactive buttons
function initializeButtons() {
  const buttons = document.querySelectorAll('.holographic-button');
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Create ripple effect
      const ripple = document.createElement('div');
      ripple.className = 'button-ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      button.appendChild(ripple);

      // Remove ripple after animation
      setTimeout(() => ripple.remove(), 1000);

      // Show action feedback
      showActionFeedback(button.textContent.trim());
    });
  });
}

function showActionFeedback(action) {
  const feedback = document.createElement('div');
  feedback.className = 'action-feedback';
  feedback.textContent = `Executing: ${action}`;
  document.body.appendChild(feedback);

  // Animate feedback
  setTimeout(() => {
    feedback.style.opacity = '0';
    feedback.style.transform = 'translateY(-20px)';
  }, 100);

  // Remove feedback
  setTimeout(() => feedback.remove(), 1000);
}

// System information updates
function updateSystemInfo() {
  const values = document.querySelectorAll('.info-value');
  
  setInterval(() => {
    values.forEach(value => {
      const currentValue = parseFloat(value.textContent);
      const newValue = currentValue + (Math.random() - 0.5) * 0.1;
      value.textContent = newValue.toFixed(2);
    });
  }, 2000);
}

// Add CSS for new elements
const style = document.createElement('style');
style.textContent = `
    .quantum-particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        animation: float 3s infinite;
    }

    .button-ripple {
        position: absolute;
        background: var(--glow-color);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 1s linear;
        pointer-events: none;
    }

    .action-feedback {
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 247, 255, 0.1);
        border: 1px solid var(--primary-color);
        color: var(--primary-color);
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 0.9rem;
        letter-spacing: 1px;
        transition: all 0.3s ease;
        z-index: 1000;
    }

    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
