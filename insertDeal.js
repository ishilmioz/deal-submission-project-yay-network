const mongoose = require('mongoose');

const uri = 'your-mongodb-connection-string'; // Replace with your MongoDB URI

const DealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

const Deal = mongoose.model('Deal', DealSchema);

async function insertDeal() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const deal = new Deal({ name: 'Deal1', isActive: true });
    await deal.save();

    console.log('Deal inserted:', deal);
    mongoose.connection.close();
  } catch (err) {
    console.error('Error inserting deal:', err);
    mongoose.connection.close();
  }
}

insertDeal();
