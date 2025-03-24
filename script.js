// ค้นหาองค์ประกอบที่เกี่ยวข้อง
const closeBtn = document.getElementById('close-popup');
const popup = document.getElementById('countdown-popup');
const countdownNumber = document.getElementById('countdown-number');

// เมื่อคลิกปุ่มปิด ปิดป๊อปอัพ
closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

// เมื่อคลิกนอก Pop-up หรือที่นอกพื้นที่, ปิด Pop-up
window.addEventListener('click', (event) => {
    if (event.target === popup) {  // ถ้าคลิกที่นอก pop-up
        popup.style.display = 'none';
    }
})

// วันที่เลือกตั้ง
const electionDate = new Date('05/11/2025'); // วันที่เลือกตั้ง

// ฟังก์ชันดึงเวลาไทยจาก API
async function fetchThaiTime() {
    try {
        const response = await fetch('https://timeapi.io/api/time/current/zone?timeZone=Asia/Bangkok'); // API ที่ให้บริการเวลาไทย
        const data = await response.json();
        const serverTime = new Date(data.date); // เวลาที่ได้รับจาก API

        // ตรวจสอบเวลาไทยที่ดึงมา
        console.log('Server Time:', serverTime); // แสดงเวลาใน console

        // คำนวณวันถอยหลัง
        updateCountdown(serverTime);
    } catch (error) {
        console.error('Error fetching time: ', error);
    }
}

// ฟังก์ชันคำนวณวันถอยหลัง
function updateCountdown(serverTime) {
    const timeDiff = electionDate - serverTime; // คำนวณความแตกต่างระหว่างวันที่เลือกตั้งและเวลาจากเซิร์ฟเวอร์
    const daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24)); // คำนวณวันถอยหลัง

    // ตรวจสอบค่าของ daysLeft
    console.log('Days Left:', daysLeft); // ตรวจสอบวันถอยหลังใน Console

    // แสดงผลลัพธ์การนับวันถอยหลัง
    countdownNumber.textContent = daysLeft >= 0 ? daysLeft : "เลือกตั้งแล้ว!"; // แสดงข้อความเมื่อถึงวันเลือกตั้ง
}

// เรียกฟังก์ชันเพื่อดึงเวลาไทยจาก API และอัพเดตการนับถอยหลัง
fetchThaiTime();

// ตั้งเวลาให้อัพเดตเวลาเซิร์ฟเวอร์ทุก 1 ชั่วโมง (3600000 มิลลิวินาที)
setInterval(fetchThaiTime, 3600000); // อัพเดตทุก 1 ชั่วโมง

// ตั้งเวลาให้อัพเดตการนับถอยหลังทุกๆ 1 วัน (86400000 มิลลิวินาที)
setInterval(() => {
    fetchThaiTime(); // เรียกใช้ฟังก์ชันเพื่อดึงเวลาเซิร์ฟเวอร์ใหม่
}, 86400000); // อัพเดตทุก 1 วัน
