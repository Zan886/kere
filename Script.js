// --- DATA ---
const products = [
    { gender: 'pria', name: "Creed Adventus", price: "40 RB", aroma: "Fresh, Maskulin, Elegan", bestSeller: true, img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=400" },
    { gender: 'pria', name: "Black Opiuem", price: "40 RB", aroma: "Sweet-Spicy Modern", bestSeller: true, img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=400" },
    { gender: 'pria', name: "Axe Afrika", price: "40 RB", aroma: "Hangat, Unik, Maskulin", bestSeller: false, img: "https://images.unsplash.com/photo-1588405864443-3996dc8000be?q=80&w=400" },
    { gender: 'wanita', name: "Gucci Bloom", price: "40 RB", aroma: "Floral Elegan", bestSeller: true, img: "https://images.unsplash.com/photo-1616948055600-8f940c4516ec?q=80&w=400" },
    { gender: 'wanita', name: "Armani My Way", price: "40 RB", aroma: "Feminine, Classy", bestSeller: true, img: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=400" },
    { gender: 'wanita', name: "Syahda", price: "40 RB", aroma: "Soft, Manis, Nyaman", bestSeller: false, img: "https://images.unsplash.com/photo-1608528577221-908233f974b0?q=80&w=400" },
    { gender: 'wanita', name: "Renjana", price: "40 RB", aroma: "Romantic, Warm", bestSeller: false, img: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=400" },
    { gender: 'wanita', name: "Orgms", price: "40 RB", aroma: "Intense, Sultry", bestSeller: true, img: "https://images.unsplash.com/photo-1512789675414-0644a578da49?q=80&w=400" }
];

// --- APP STATE ---
let selectedScent = null;
let userRating = 0;

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    renderProducts();
    initAnimations();
    initRating();
    
    // Remove Preloader
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => document.getElementById('loader').remove(), 1000);
        document.getElementById('hero-bg').classList.remove('scale-110');
        animateStagger();
    }, 1500);
});

// --- UI SCROLL LOGIC ---
window.onscroll = () => {
    const nav = document.getElementById("navbar");
    if (window.scrollY > 100) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
    revealOnScroll();
};

// --- RENDERERS ---
function renderProducts() {
    const grid = document.getElementById('best-seller-grid');
    grid.innerHTML = products.map((p, i) => `
        <div class="product-card group reveal relative overflow-hidden" style="transition-delay: ${i * 100}ms">
            <div class="relative overflow-hidden aspect-[4/5]">
                <img src="${p.img}" class="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000">
                ${p.bestSeller ? `
                    <div class="absolute top-6 left-6 badge-pulse bg-[#D4AF37] text-white text-[8px] font-bold px-4 py-1.5 rounded-full tracking-widest uppercase">
                        Best Seller
                    </div>
                ` : ''}
                <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 backdrop-blur-[2px]">
                    <button onclick="openAndSelect('${p.name}')" class="bg-white text-black px-8 py-3 rounded-full text-[9px] font-bold uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        Acquire Scent
                    </button>
                </div>
            </div>
            <div class="p-8 text-center">
                <h4 class="font-serif text-xl mb-1">${p.name}</h4>
                <p class="text-[9px] text-gray-400 tracking-[0.2em] uppercase mb-4">${p.aroma}</p>
                <p class="text-[#D4AF37] font-bold text-xs tracking-widest">IDR ${p.price}</p>
            </div>
        </div>
    `).join('');
}

// --- ANIMATION CONTROLLER ---
function animateStagger() {
    const items = document.querySelectorAll('.stagger-item');
    items.forEach((item, i) => {
        setTimeout(() => item.classList.add('animate'), i * 200);
    });
}

function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 100;
        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
}

// --- MODAL CONTROLLER ---
function openModal() {
    const modal = document.getElementById("orderModal");
    modal.classList.remove("hidden");
    setTimeout(() => {
        document.getElementById("modal-overlay").classList.add("opacity-100");
        document.getElementById("modal-content").classList.remove("translate-y-20");
        document.getElementById("modal-content").classList.add("translate-y-0");
    }, 10);
    setModalTab('pria');
}

function closeModal() {
    document.getElementById("modal-overlay").classList.remove("opacity-100");
    document.getElementById("modal-content").classList.add("translate-y-20");
    setTimeout(() => {
        document.getElementById("orderModal").classList.add("hidden");
    }, 500);
}

function setModalTab(tab) {
    const list = document.getElementById("modal-list");
    document.getElementById("tab-pria").className = `flex-1 py-6 transition-all border-b-2 ${tab==='pria' ? 'border-[#D4AF37] text-black' : 'border-transparent text-gray-400'}`;
    document.getElementById("tab-wanita").className = `flex-1 py-6 transition-all border-b-2 ${tab==='wanita' ? 'border-[#D4AF37] text-black' : 'border-transparent text-gray-400'}`;
    
    list.innerHTML = products.filter(p => p.gender === tab).map(p => `
        <div onclick="selectScent('${p.name}')" class="p-5 border rounded-3xl flex justify-between items-center cursor-pointer transition-all duration-300 ${selectedScent === p.name ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-black/5 hover:bg-black/5'}">
            <span class="text-sm font-medium tracking-tight">${p.name}</span>
            <div class="flex items-center gap-3">
                <span class="text-[9px] text-gray-400 font-bold uppercase">40 RB</span>
                ${selectedScent === p.name ? '<i data-lucide="check" class="w-4 h-4 text-[#D4AF37]"></i>' : ''}
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

function selectScent(name) {
    selectedScent = name;
    document.getElementById("selection-info").classList.remove("hidden");
    document.getElementById("selected-name").innerText = name;
    
    const btn = document.getElementById("btn-wa");
    btn.disabled = false;
    btn.classList.remove("bg-gray-200", "text-gray-400");
    btn.classList.add("bg-[#111111]", "text-white");
    
    setModalTab(products.find(p => p.name === name).gender);
}

function openAndSelect(name) {
    openModal();
    selectScent(name);
}

function redirectToWA() {
    if (!selectedScent) return;
    const msg = `Halo Goodwill, saya tertarik untuk memesan masterpiece [${selectedScent}]. Mohon info ketersediaan stok.`;
    window.open(`https://wa.me/628123456789?text=${encodeURIComponent(msg)}`, '_blank');
}

// --- REVIEWS ---
function initRating() {
    const container = document.getElementById("rating-input");
    container.innerHTML = [1,2,3,4,5].map(i => `
        <button onclick="setRate(${i})" id="star-${i}" class="text-gray-700 hover:scale-110 transition-transform"><i data-lucide="star" class="w-5 h-5"></i></button>
    `).join('');
    lucide.createIcons();
}

function setRate(r) {
    userRating = r;
    for(let i=1; i<=5; i++) {
        const star = document.getElementById(`star-${i}`);
        star.classList.toggle("text-[#D4AF37]", i <= r);
        star.innerHTML = `<i data-lucide="star" class="w-5 h-5 ${i <= r ? 'fill-current' : ''}"></i>`;
    }
    lucide.createIcons();
}

function submitReview() {
    const name = document.getElementById("rev-name").value;
    const comment = document.getElementById("rev-comment").value;
    const isVerified = document.getElementById("rev-verified").checked;

    if (!name || !comment || userRating === 0) return;

    const div = document.createElement("div");
    div.className = "bg-white/5 p-8 rounded-[2rem] border border-white/5 animate-fade-in";
    
    let stars = "";
    for(let i=0; i<5; i++) stars += `<i data-lucide="star" class="w-3 h-3 ${i < userRating ? 'text-[#D4AF37] fill-current' : 'text-gray-800'}"></i>`;

    div.innerHTML = `
        <div class="flex flex-col gap-4 mb-4">
            <div class="flex justify-between items-start">
                <span class="font-serif text-lg">${name}</span>
                <div class="flex gap-1">${stars}</div>
            </div>
            ${isVerified ? `
                <div class="flex items-center gap-2 text-[#D4AF37] text-[8px] font-bold uppercase tracking-[0.2em]">
                    <i data-lucide="shield-check" class="w-3 h-3"></i> Verified Client
                </div>
            ` : ''}
        </div>
        <p class="text-gray-400 text-xs leading-relaxed italic">"${comment}"</p>
    `;

    document.getElementById("comments-list").prepend(div);
    lucide.createIcons();
    
    // Clear
    document.getElementById("rev-name").value = "";
    document.getElementById("rev-comment").value = "";
    setRate(0);
}
