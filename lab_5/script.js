document.addEventListener("DOMContentLoaded", () => {
    const systemInfo = {
        browser: navigator.userAgent,  
        platform: navigator.platform,  
        language: navigator.language,  
        screenWidth: window.screen.width, 
        screenHeight: window.screen.height, 
        lastVisit: new Date().toLocaleString() 
    };

    localStorage.setItem('user_browser_data', JSON.stringify(systemInfo));

    const footerContainer = document.getElementById('storage-info');
    
    const savedData = JSON.parse(localStorage.getItem('user_browser_data'));

    if (savedData) {
        footerContainer.innerHTML = `
            <p><strong>Операційна система/Браузер:</strong> ${savedData.browser}</p>
            <p><strong>Платформа:</strong> ${savedData.platform}</p>
            <p><strong>Мова:</strong> ${savedData.language}</p>
            <p><strong>Роздільна здатність:</strong> ${savedData.screenWidth}x${savedData.screenHeight}</p>
            <p style="color: #718096; font-size: 12px;">Дані оновлено: ${savedData.lastVisit}</p>
        `;
    }
});

function loadEmployerComments() {
    const variant = 2;
    const container = document.getElementById('comments-container');

    fetch(`https://jsonplaceholder.typicode.com/posts/${variant}/comments`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Помилка мережі');
            }
            return response.json();
        })
        .then(comments => {
            container.innerHTML = '';

        
            comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.className = 'exp-item';
                commentElement.style.borderBottom = '1px solid #edf2f7';
                commentElement.style.padding = '15px 0';

                commentElement.innerHTML = `
                    <p><strong>${comment.name}</strong> <small>(${comment.email})</small></p>
                    <p style="font-style: italic; color: #4a5568;">"${comment.body}"</p>
                `;
                
                container.appendChild(commentElement);
            });
        })
        .catch(error => {
            console.error('Помилка:', error);
            container.innerHTML = '<p style="color: red;">Не вдалося завантажити відгуки.</p>';
        });
}

loadEmployerComments();

const modal = document.getElementById('contactModal');
const closeBtn = document.querySelector('.close-button');

setTimeout(() => {
    modal.style.display = 'block';
}, 3000); 

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

const toggleSwitch = document.querySelector('#checkbox');

function applyTheme() {
    const hour = new Date().getHours();

    const isNight = (hour >= 21 || hour < 7);
    
    if (isNight) {
        document.body.classList.add('dark-mode');
        toggleSwitch.checked = false; 
    } else {
        document.body.classList.remove('dark-mode');
        toggleSwitch.checked = true;
    }
}

toggleSwitch.addEventListener('change', (e) => {
    if (!e.target.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

applyTheme();

setTimeout(() => {
    document.getElementById('contactModal').style.display = 'block';
}, 60000);