document.addEventListener('DOMContentLoaded', () => {
    // Fungsionalitas Menu Mobile
    const menuBtn = document.getElementById('menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const navLinks = mobileNav.querySelectorAll('a');

    menuBtn.addEventListener('click', () => {
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', !isExpanded);
        mobileNav.classList.toggle('hidden');
    });

    // Menutup menu mobile saat link diklik
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Fungsionalitas Audio Dengarkan Layanan
    const listenButtons = document.querySelectorAll('.listen-btn');
    const audioPlayer = new Audio();
    let currentPlayingBtn = null;

    listenButtons.forEach(btn => {
        const btnTextSpan = btn.querySelector('span');

        btn.addEventListener('click', () => {
            const audioUrl = btn.dataset.audioUrl;
            
            // Menghentikan pemutaran audio lain jika ada
            if (currentPlayingBtn && currentPlayingBtn !== btn) {
                audioPlayer.pause();
                const prevBtnTextSpan = currentPlayingBtn.querySelector('span');
                prevBtnTextSpan.textContent = prevBtnTextSpan.dataset.btnText;
                currentPlayingBtn.querySelector('i').className = 'fa-solid fa-circle-play mr-2';
            }

            // Memulai atau menghentikan audio yang sedang berjalan
            if (audioPlayer.paused || audioPlayer.src !== audioUrl) {
                audioPlayer.src = audioUrl;
                audioPlayer.play();
                btnTextSpan.textContent = 'Berhenti';
                btn.querySelector('i').className = 'fa-solid fa-circle-stop mr-2';
                currentPlayingBtn = btn;
            } else {
                audioPlayer.pause();
                btnTextSpan.textContent = btnTextSpan.dataset.btnText;
                btn.querySelector('i').className = 'fa-solid fa-circle-play mr-2';
                currentPlayingBtn = null;
            }
        });

        // Mengembalikan teks tombol saat audio selesai
        audioPlayer.addEventListener('ended', () => {
            if (currentPlayingBtn) {
                const btnTextSpan = currentPlayingBtn.querySelector('span');
                btnTextSpan.textContent = btnTextSpan.dataset.btnText;
                currentPlayingBtn.querySelector('i').className = 'fa-solid fa-circle-play mr-2';
                currentPlayingBtn = null;
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

    const botResponses = {
        'sakit tenggorokan': 'Sakit tenggorokan seringkali disebabkan oleh infeksi virus. Anda bisa coba minum air hangat, istirahat yang cukup, dan berkumur dengan air garam. Namun, jika gejala tidak membaik atau disertai demam tinggi, segera kunjungi Poli Umum kami.',
        'demam ringan': 'Demam ringan bisa diatasi dengan kompres air hangat, banyak minum air putih, dan istirahat yang cukup. Jika demam terus meningkat, silakan hubungi dokter kami.',
        'ibu hamil': 'Untuk menjaga kesehatan ibu hamil, pastikan asupan nutrisi seimbang, istirahat yang cukup, dan rutin melakukan pemeriksaan kehamilan (ANC). Layanan Kesehatan Ibu & Anak (KIA) kami siap membantu Anda.',
        'terima kasih': 'Sama-sama! Selalu jaga kesehatan Anda. Jika ada pertanyaan lain, jangan ragu untuk bertanya.',
        'lainnya': 'Terima kasih atas pertanyaan Anda. Untuk diagnosis dan penanganan yang tepat, kami sangat menyarankan Anda untuk berkonsultasi langsung dengan dokter kami. Kami melayani berbagai keluhan umum.'
    };

    function sendMessage() {
        const message = userInput.value.trim().toLowerCase();
        if (!message) return;

        // Tampilkan pesan pengguna
        const userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add('chat-message', 'user');
        userMessageDiv.innerHTML = `<p class="text-sm">${message}</p>`;
        chatWindow.prepend(userMessageDiv);

        // Pilih respons bot
        const botResponse = botResponses[message] || botResponses.lainnya;

        // Beri respons bot
        setTimeout(() => {
            const botMessageDiv = document.createElement('div');
            botMessageDiv.classList.add('chat-message', 'bot');
            botMessageDiv.innerHTML = `<p class="text-sm">${botResponse}</p>`;
            chatWindow.prepend(botMessageDiv);
            chatWindow.scrollTop = 0;
        }, 1500);

        userInput.value = '';
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

    function showRandomTip() {
        const randomIndex = Math.floor(Math.random() * dailyTips.length);
        const randomTip = dailyTips[randomIndex];
        dailyTipDiv.innerHTML = `<p>${randomTip}</p>`;
        dailyTipDiv.classList.remove('border-dashed', 'border-gray-300', 'text-gray-500');
        dailyTipDiv.classList.add('bg-white', 'text-gray-800', 'font-medium');
    }

    getTipBtn.addEventListener('click', showRandomTip);
    // Tampilkan tips pertama kali saat halaman dimuat
    showRandomTip();

    // Fitur Scroll to Top
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.remove('invisible', 'opacity-0');
            scrollToTopBtn.classList.add('visible', 'opacity-100');
        } else {
            scrollToTopBtn.classList.remove('visible', 'opacity-100');
            scrollToTopBtn.classList.add('invisible', 'opacity-0');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
