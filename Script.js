// --- DATA CONFIGURATION ---
const products = {
    pria: [
        { id: 1, name: "Creed Adventus", price: "40 RB", aroma: "Fresh, Maskulin, Elegan", bestSeller: true, img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=400" },
        { id: 2, name: "Black Opiuem", price: "40 RB", aroma: "Sweet-Spicy Modern", bestSeller: true, img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=400" },
        { id: 3, name: "Axe Afrika", price: "40 RB", aroma: "Hangat, Unik, Maskulin", bestSeller: true, img: "https://images.unsplash.com/photo-1588405864443-3996dc8000be?q=80&w=400" },
        { id: 4, name: "Aesthetic", price: "40 RB" },
        { id: 5, name: "Farhampython", price: "40 RB" },
        { id: 6, name: "Harmony", price: "40 RB" }
    ],
    wanita: [
        { id: 7, name: "Gucci Bloom", price: "40 RB", aroma: "Floral Elegan", bestSeller: true, img: "https://images.unsplash.com/photo-1616948055600-8f940c4516ec?q=80&w=400" },
        { id: 8, name: "Armani My Way", price: "40 RB", aroma: "Feminine, Classy", bestSeller: true, img: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=400" },
        { id: 9, name: "Syahda", price: "40 RB", aroma: "Soft, Manis, Nyaman", bestSeller: true, img: "https://images.unsplash.com/photo-1608528577221-908233f974b0?q=80&w=400" },
        { id: 10, name: "Gucci Gardenia", price: "40 RB" },
        { id: 11, name: "Renjana", price: "40 RB" },
        { id: 12, name: "Hawas Ice", price: "40 RB" }
    ]
};

// --- INITIALIZATION ---
let selectedParfum = "";
let currentModalTab = "pria";
let userRating = 0;

document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    renderBestSellers();
    renderRatingInput();
    setupScrollReveal();
});

// --- UI RENDERING ---
function renderBestSellers() {
    const renderSection = (id, list) => {
        const container = document.getElementById(id);
        const bestSellers = list.filter(p => p.bestSeller);
        container.innerHTML = bestSellers.map(p => `
            <div class="product-card group reveal">
                <div class="overflow-hidden bg-gray-50 aspect-square mb-8 relative rounded-[1.2rem]">
                    <img src="${p.img}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                        <button onclick="openAndSelect('${p.name}')" class="bg-white text-black px-8 py-3 text-[9px] font-bold uppercase tracking-[0.2em] rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">Order Piece</button>
                    </div>
                </div>
                <div class="px-2">
                    <h4 class="font-serif text-2xl mb-2 text-[#111111]">${p.name}</h4>
                    <p class="text-[10px] text-gray-400 tracking-widest uppercase mb-4">${p.aroma}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-[#D4AF37] font-bold text-xs tracking-tighter">Starting at ${p.price}</span>
                        <div class="w-8 h-[1px] bg-gray-100"></div>
                    </div>
                </div>
            </div>
        `).join('');
    };

    renderSection("best-seller-men", products.pria);
    renderSection("best-seller-women", products.wanita);
}

// --- MODAL LOGIC ---
function openModal() {
    document.getElementById("orderModal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
    setModalTab(currentModalTab);
}

function closeModal() {
    document.getElementById("orderModal").classList.add("hidden");
    document.body.style.overflow = "auto";
}

function setModalTab(tab) {
    currentModalTab = tab;
    const tabPria = document.getElementById("tab-pria");
    const tabWanita = document.getElementById("tab-wanita");
    const listContainer = document.getElementById("modal-list");

    tabPria.className = `flex-1 py-5 border-b-2 transition-all duration-500 ${tab === 'pria' ? 'border-[#D4AF37] text-black' : 'border-transparent text-gray-300'}`;
    tabWanita.className = `flex-1 py-5 border-b-2 transition-all duration-500 ${tab === 'wanita' ? 'border-[#D4AF37] text-black' : 'border-transparent text-gray-300'}`;

    listContainer.innerHTML = products[tab].map(p => `
        <div onclick="selectItem('${p.name}')" class="p-5 border rounded-2xl flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-all duration-300 ${selectedParfum === p.name ? 'border-[#D4AF37] bg-yellow-50/30' : 'border-gray-100'}">
            <span class="text-sm font-semibold tracking-tight">${p.name}</span>
            <div class="flex items-center gap-3">
                <span class="text-[9px] text-gray-400 font-bold tracking-widest">40 RB</span>
                ${selectedParfum === p.name ? '<i data-lucide="check" class="w-4 h-4 text-[#D4AF37]"></i>' : ''}
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

function selectItem(name) {
    selectedParfum = name;
    document.getElementById("selection-info").classList.remove("hidden");
    document.getElementById("selected-name").innerText = name;
    
    const btn = document.getElementById("btn-wa");
    btn.disabled = false;
    btn.className = "wa-glow w-full py-5 rounded-full bg-[#111111] text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 cursor-pointer shadow-xl";
    
    setModalTab(currentModalTab);
}

function openAndSelect(name) {
    if (products.wanita.find(p => p.name === name)) currentModalTab = "wanita";
    else currentModalTab = "pria";
    openModal();
    selectItem(name);
}

function redirectToWA() {
    if (!selectedParfum) return;
    const phone = "628123456789"; 
    const msg = `Halo Goodwill, saya ingin memesan parfum [${selectedParfum}], harga mulai 40 RB.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
}

// --- RATING & REVIEW SYSTEM ---
function renderRatingInput() {
    const container = document.getElementById("rating-input");
    container.innerHTML = [1, 2, 3, 4, 5].map(i => `
        <button onclick="setRate(${i})" class="star-btn text-gray-600 transition-all duration-300 hover:scale-125" id="star-${i}">
            <i data-lucide="star"></i>
        </button>
    `).join('');
    lucide.createIcons();
}

function setRate(r) {
    userRating = r;
    for (let i = 1; i <= 5; i++) {
        const star = document.getElementById(`star-${i}`);
        if (i <= r) {
            star.classList.add("text-[#D4AF37]");
            star.classList.remove("text-gray-600");
            star.innerHTML = `<i data-lucide="star" class="fill-current w-6 h-6"></i>`;
        } else {
            star.classList.remove("text-[#D4AF37]");
            star.classList.add("text-gray-600");
            star.innerHTML = `<i data-lucide="star" class="w-6 h-6"></i>`;
        }
    }
    lucide.createIcons();
}

function submitReview() {
    const name = document.getElementById("rev-name").value;
    const comment = document.getElementById("rev-comment").value;
    const isVerified = document.getElementById("rev-verified").checked;

    if (!name || !comment || userRating === 0) return;

    const list = document.getElementById("comments-list");
    const div = document.createElement("div");
    div.className = `p-8 rounded-3xl border border-white/5 transition-all animate-fade-in ${isVerified ? 'bg-[#1A1A1A] border-l-4 border-l-[#D4AF37]' : 'bg-transparent'}`;
    
    let stars = "";
    for(let i=0; i<5; i++) stars += `<i data-lucide="star" class="w-3 h-3 ${i < userRating ? 'text-[#D4AF37] fill-current' : 'text-gray-700'}"></i>`;

    div.innerHTML = `
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div class="flex items-center gap-4">
                <span class="font-serif text-lg">${name}</span>
                ${isVerified ? `
                    <span class="badge-verified px-3 py-1 rounded-full text-[8px] font-bold text-black uppercase tracking-widest flex items-center gap-1">
                        <i data-lucide="shield-check" class="w-3 h-3"></i> Verified Buyer
                    </span>
                ` : ''}
            </div>
            <div class="flex gap-1">${stars}</div>
        </div>
        <p class="text-gray-400 text-sm leading-relaxed font-light italic">"${comment}"</p>
    `;

    list.prepend(div);
    lucide.createIcons();
    
    // Clear
    document.getElementById("rev-name").value = "";
    document.getElementById("rev-comment").value = "";
    document.getElementById("rev-verified").checked = false;
    setRate(0);
}

// --- UTILS ---
function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
          }
