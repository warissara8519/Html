// ==========================================
// 1. Top-up Calculator (คำนวณเติมเงิน)
// ==========================================
function calculateTopup() {
  const packageValue = parseInt(document.getElementById('coinPackage').value);
  const promoCode = document.getElementById('topupPromo').value.trim().toUpperCase();
  
  let price = packageValue;
  let bonusCoins = 0;

  // โบนัสตามแพ็กเกจ
  if (packageValue === 500) bonusCoins = 50;
  if (packageValue === 1000) bonusCoins = 150;
  if (packageValue === 2000) bonusCoins = 400;

  // โค้ดส่วนลด GAMER10 ลด 10%
  let discount = 0;
  if (promoCode === 'GAMER10') {
    discount = price * 0.10;
  }

  const netPrice = price - discount;
  const totalCoins = packageValue + bonusCoins;

  document.getElementById('topupResult').innerHTML = `
    <div class="small">
      <div>ได้รับ Coins ทั้งหมด: <strong class="text-warning">${totalCoins.toLocaleString()} Coins</strong> (โบนัส +${bonusCoins})</div>
      <div>ราคาปกติ: ${price} บาท</div>
      ${discount > 0 ? `<div class="text-success">ส่วนลด (GAMER10): -${discount} บาท</div>` : ''}
      <hr class="my-1 border-secondary">
      <div class="fw-bold text-info">ยอดชำระสุทธิ: ${netPrice.toLocaleString()} บาท</div>
    </div>
  `;
}

// ==========================================
// 2. Item Calculator (คำนวณราคารวมไอเทม)
// ==========================================
function calculateItems() {
  const inputStr = document.getElementById('itemPrices').value;
  const isVip = document.getElementById('vipPass').checked;

  // แปลง String เป็น Array ของตัวเลข
  const prices = inputStr.split(',').map(item => parseFloat(item.trim())).filter(num => !isNaN(num));

  if (prices.length === 0) {
    document.getElementById('itemResult').innerHTML = '<span class="text-danger">กรุณากรอกราคาไอเทมให้ถูกต้อง</span>';
    return;
  }

  // คำนวณราคารวมทั้งหมดด้วย reduce
  const totalRaw = prices.reduce((sum, price) => sum + price, 0);
  let vipDiscount = isVip ? totalRaw * 0.10 : 0;
  const finalTotal = totalRaw - vipDiscount;

  document.getElementById('itemResult').innerHTML = `
    <div class="small">
      <div>จำนวนไอเทม: <strong>${prices.length} ชิ้น</strong></div>
      <div>ราคารวม: ${totalRaw.toLocaleString()} Coins</div>
      ${isVip ? `<div class="text-info">ส่วนลด VIP (10%): -${vipDiscount.toLocaleString()} Coins</div>` : ''}
      <hr class="my-1 border-secondary">
      <div class="fw-bold text-warning">ยอดที่ต้องจ่าย: ${finalTotal.toLocaleString()} Coins</div>
    </div>
  `;
}

// ==========================================
// 3. Winrate & Rank Calculator (คำนวณ Winrate)
// ==========================================
function calculateRank() {
  const wins = parseInt(document.getElementById('winsCount').value) || 0;
  const losses = parseInt(document.getElementById('lossesCount').value) || 0;
  const totalMatches = wins + losses;

  if (totalMatches === 0) {
    document.getElementById('rankResult').innerHTML = '<span class="text-danger">โปรดระบุจำนวนการเล่น</span>';
    return;
  }

  const winrate = ((wins / totalMatches) * 100).toFixed(1);

  // ตัดเกณฑ์ระดับ Rank
  let rankName = 'BRONZE';
  let rankClass = 'text-secondary';

  if (winrate >= 75) {
    rankName = 'RADIANT / MYTHIC';
    rankClass = 'text-warning';
  } else if (winrate >= 60) {
    rankName = 'DIAMOND';
    rankClass = 'text-info';
  } else if (winrate >= 50) {
    rankName = 'GOLD';
    rankClass = 'text-success';
  } else if (winrate >= 40) {
    rankName = 'SILVER';
    rankClass = 'text-light';
  }

  document.getElementById('rankResult').innerHTML = `
    <div class="small">
      <div>เล่นไปทั้งหมด: <strong>${totalMatches} แมตช์</strong></div>
      <div>อัตราชนะ (Winrate): <strong class="text-info">${winrate}%</strong></div>
      <hr class="my-1 border-secondary">
      <div>ระดับ Rank ปัจจุบัน: <span class="fw-bold ${rankClass}">${rankName}</span></div>
    </div>
  `;
}

// ==========================================
// 4. Leaderboard Data (ดึงข้อมูลผู้เล่นมาแสดง)
// ==========================================
const playersData = [
  { rank: 1, name: "ShadowNinja", rankName: "RADIANT", score: 2850, online: true },
  { rank: 2, name: "CyberPro99", rankName: "DIAMOND", score: 2410, online: true },
  { rank: 3, name: "ViperQueen", rankName: "DIAMOND", score: 2300, online: false },
  { rank: 4, name: "NoobMaster69", rankName: "GOLD", score: 1750, online: true }
];

function renderLeaderboard() {
  const tbody = document.getElementById('leaderboardBody');
  tbody.innerHTML = playersData.map(player => `
    <tr>
      <td class="font-orbitron fw-bold text-info">#${player.rank}</td>
      <td class="fw-bold">${player.name}</td>
      <td><span class="badge bg-dark border border-info text-info badge-rank">${player.rankName}</span></td>
      <td class="font-orbitron">${player.score.toLocaleString()}</td>
      <td>
        ${player.online 
          ? '<span class="badge bg-success-subtle text-success border border-success">ONLINE</span>' 
          : '<span class="badge bg-secondary-subtle text-secondary">OFFLINE</span>'}
      </td>
    </tr>
  `).join('');
}

// โหลด Leaderboard ทันทีที่เปิดหน้าเว็บ
window.onload = function() {
  renderLeaderboard();
  calculateTopup();
  calculateItems();
  calculateRank();
};