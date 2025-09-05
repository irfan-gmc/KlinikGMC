document.addEventListener('DOMContentLoaded', () => {
    // Fungsionalitas Menu Mobile
    const menuBtn = document.getElementById('menu-btn');
    const mobileNav = document.getElementById('mobile-nav');

    menuBtn.addEventListener('click', () => {
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', !isExpanded);
        mobileNav.classList.toggle('hidden');
    });

    // Fungsionalitas Audio Dengarkan Layanan
    const listenButtons = document.querySelectorAll('.listen-btn');
    const audioPlayer = new Audio();
    let currentPlayingBtn = null;

    listenButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const audioUrl = btn.dataset.audioUrl;

            // Hentikan pemutaran sebelumnya jika ada
            if (currentPlayingBtn && currentPlayingBtn !== btn) {
                audioPlayer.pause();
                currentPlayingBtn.innerHTML = `<i class="fa-solid fa-circle-play mr-2"></i> Dengarkan`;
            }

            // Jika audio yang sama diklik, hentikan pemutaran
            if (audioPlayer.src.endsWith(audioUrl) && !audioPlayer.paused) {
                audioPlayer.pause();
                btn.innerHTML = `<i class="fa-solid fa-circle-play mr-2"></i> Dengarkan`;
                currentPlayingBtn = null;
            } else {
                audioPlayer.src = audioUrl;
                audioPlayer.play();
                btn.innerHTML = `<i class="fa-solid fa-circle-stop mr-2"></i> Stop`;
                currentPlayingBtn = btn;
            }
        });
    });

    // Fungsionalitas Chatbot AI (Contoh Sederhana)
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            // Tampilkan pesan pengguna
            const userMessageDiv = document.createElement('div');
            userMessageDiv.classList.add('chat-message', 'user');
            userMessageDiv.innerHTML = `<p class="text-sm">${message}</p>`;
            chatWindow.prepend(userMessageDiv);

            // Beri respons bot (contoh sederhana)
            setTimeout(() => {
                const botMessageDiv = document.createElement('div');
                botMessageDiv.classList.add('chat-message', 'bot');
                botMessageDiv.innerHTML = `<p class="text-sm">Terima kasih atas pertanyaan Anda. Untuk diagnosis dan penanganan yang tepat, kami sangat menyarankan Anda untuk berkonsultasi langsung dengan dokter kami. Kami melayani keluhan umum seperti flu, batuk, demam, dan lain-lain.</p>`;
                chatWindow.prepend(botMessageDiv);
                chatWindow.scrollTop = 0; // Auto-scroll ke atas
            }, 1500);

            userInput.value = '';
        }
    }

    // Fungsionalitas Tips Sehat Harian
    const getTipBtn = document.getElementById('get-tip-btn');
    const dailyTipDiv = document.getElementById('daily-tip');

    const dailyTips = [
        "Minum setidaknya 8 gelas air putih per hari untuk menjaga tubuh tetap terhidrasi. 💧",
        "Luangkan waktu 30 menit setiap hari untuk berolahraga, seperti jalan kaki atau jogging. 🏃‍♀️",
        "Konsumsi buah dan sayuran berwarna-warni untuk mendapatkan berbagai nutrisi penting. 🍎🥦",
        "Tidur cukup 7-8 jam per malam sangat penting untuk pemulihan dan kesehatan mental. 😴",
        "Kelola stres dengan meditasi, hobi, atau berbicara dengan orang terdekat.🧘‍♂️"
    ];

    getTipBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * dailyTips.length);
        const randomTip = dailyTips[randomIndex];
        dailyTipDiv.innerHTML = `<p>${randomTip}</p>`;
        dailyTipDiv.classList.remove('border-dashed', 'border-gray-300', 'text-gray-500');
        dailyTipDiv.classList.add('bg-white', 'text-gray-800', 'font-medium');
    });
});
