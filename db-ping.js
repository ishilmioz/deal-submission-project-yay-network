// db-ping.js
require('dotenv').config();
const mongoose = require('mongoose');

(async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('HATA: MONGODB_URI tanımlı değil (.env dosyanı kontrol et)');
    process.exit(1);
  }
  try {
    const t0 = Date.now();
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 20000,
      maxPoolSize: 1,
    });
    console.log(
      'OK: Bağlandı ->',
      mongoose.connection.name,
      `(${Date.now() - t0}ms)`
    );
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('BAĞLANTI BAŞARISIZ:', err.name, '-', err.message);
    if (err.reason) console.error('reason:', err.reason);
    process.exit(2);
  }
})();
