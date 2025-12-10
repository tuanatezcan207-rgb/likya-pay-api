// --- LIKYA PAY MAHSUPLAŞMA API ÇEKİRDEĞİ (NODE.JS + EXPRESS) ---

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware (Ara Yazılım): Gelen JSON verisini işleme
app.use(express.json());

// Basit CORS ayarı (Daha sonra Vercel bunu otomatik halledecektir)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// =================================================================
// I. MAHSUPLAŞMA ALGORİTMASI ÇEKİRDEĞİ (GRAPH CYCLE FINDER)
// =================================================================

/**
 * Borç döngülerini (cycle) bulur ve mahsuplaşma sonucunu hesaplar.
 * @param {Array<Array>} iliskiler - Borç/alacak ilişkileri listesi: [Alacaklı, Borçlu, Miktar]
 */
function mahsuplamaIsleminiBaslat(iliskiler) {
    // 1. Veriyi Graph (Yönlü Çizge) Yapısına Dönüştürme
    const graph = {}; 
    iliskiler.forEach(([alacakli, borclu, miktar]) => {
        if (!graph[alacakli]) graph[alacakli] = [];
        graph[alacakli].push({ hedef: borclu, miktar: miktar });
    });
    
    const tumDonguler = [];
    const tumSirketler = new Set([...Object.keys(graph), ...iliskiler.map(i => i[1])]);

    // 2. DFS (Derinlik Öncelikli Arama) ile döngü arama
    for (const baslangicSirket of tumSirketler) {
        const yol = [];
        const yoldakiMiktarlar = [];
        const ziyaretEdildi = new Set();
        dfs(baslangicSirket, baslangicSirket, graph, yol, yoldakiMiktarlar, ziyaretEdildi, tumDonguler);
    }
    
    // 3. Mahsuplaşma Sonuçlarını Hesaplama
    return hesaplaMahsuplasma(tumDonguler);
}

/**
 * DFS Yardımcı Fonksiyonu (Recursive). 
 */
function dfs(mevcutSirket, baslangicSirket, graph, yol, yoldakiMiktarlar, ziyaretEdildi, tumDonguler) {
    yol.push(mevcutSirket);
    ziyaretEdildi.add(mevcutSirket);

    if (graph[mevcutSirket]) {
        for (const kenar of graph[mevcutSirket]) {
            const hedef = kenar.hedef;
            const miktar = kenar.miktar;

            if (hedef === baslangicSirket && yol.length > 1) {
                // *** DÖNGÜ BULUNDU! ***
                const dongu = {
                    path: [...yol, hedef],
                    miktarlar: [...yoldakiMiktarlar, miktar]
                };
                tumDonguler.push(dongu);
                continue; 
            }

            if (!ziyaretEdildi.has(hedef)) {
                yoldakiMiktarlar.push(miktar);
                dfs(hedef, baslangicSirket, graph, yol, yoldakiMiktarlar, ziyaretEdildi, tumDonguler);
                yoldakiMiktarlar.pop(); // Geri izleme (Backtracking)
            }
        }
    }
    
    yol.pop();
    ziyaretEdildi.delete(mevcutSirket);
}


/**
 * Mahsup miktarını hesaplar ve raporu oluşturur.
 */
function hesaplaMahsuplasma(donguler) {
    let toplamMahsupHacmi = 0;
    const rapor = [];

    for (const dongu of donguler) {
        const mahsupMiktari = Math.min(...dongu.miktarlar); // En küçük miktar kuralı
        
        if (mahsupMiktari > 0) {
            toplamMahsupHacmi += mahsupMiktari * (dongu.path.length - 1); // Mahsup edilen hacim
            
            for (let i = 0; i < dongu.path.length - 1; i++) {
                const alacakli = dongu.path[i];
                const borclu = dongu.path[i+1];
                const orijinalMiktar = dongu.miktarlar[i];

                rapor.push({
                    islem_id: `NET_${Date.now()}_${Math.random().toString(36).substring(7)}`,
                    alacakli,
                    borclu,
                    mahsupMiktari: mahsupMiktari,
                    kalanBorc: orijinalMiktar - mahsupMiktari,
                    dongu: dongu.path.join(' → '),
                    durum: 'Mahsuplaştı'
                });
            }
        }
    }
    return { rapor, toplamMahsupHacmi };
}


// =================================================================
// II. API UÇ NOKTASI (ENDPOINT) TANIMLAMA
// =================================================================

/**
 * Ana Mahsuplaşma İşlemi Uç Noktası (POST /api/v1/netting)
 * Gelen Veri Örneği: { "iliskiler": [["A", "B", 1000], ["B", "C", 1000], ["C", "A", 1000]] }
 */
app.post('/api/v1/netting', async (req, res) => {
    const borcIliskileri = req.body.iliskiler;

    // 1. Veri Doğrulama (Input Validation)
    if (!Array.isArray(borcIliskileri) || borcIliskileri.length === 0) {
        return res.status(400).json({ error: "İlişkiler listesi ('iliskiler') boş veya formatı hatalı." });
    }

    try {
        // 2. Algoritma Çekirdeğini Çalıştırma
        const sonuc = mahsuplamaIsleminiBaslat(borcIliskileri); 

        // 3. Başarılı Yanıt Döndürme
        return res.status(200).json({
            durum: "Başarılı",
            toplam_mahsup_hacmi: sonuc.toplamMahsupHacmi.toLocaleString('tr-TR'),
            bulunan_donguler: sonuc.rapor.length / 3, // Basit döngü sayısı tahmini
            mahsuplama_raporu: sonuc.rapor
        });

    } catch (hata) {
        console.error("Kritik Hata:", hata);
        return res.status(500).json({ error: "Sunucu içi kritik hata oluştu (Internal Server Error)." });
    }
});


// 3. Ana Sayfa Uç Noktası (GET /)
app.get('/', (req, res) => {
    res.send('Likya Pay API çalışıyor. Mahsuplaşma için /api/v1/netting adresine POST isteği gönderin.');
});


// --- Sunucuyu Başlatma ---
app.listen(PORT, () => {
    console.log(`[Sunucu] Likya Pay API ${PORT} portunda dinleniyor.`);
});
