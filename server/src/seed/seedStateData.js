const mongoose = require('mongoose');
const StateData = require('../models/StateData');

const sampleStateData = [
  {
    stateName: 'Maharashtra',
    cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane', 'Aurangabad', 'Solapur', 'Amravati'],
    cityDetails: [
      { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
      { name: 'Pune', lat: 18.5204, lng: 73.8567 },
      { name: 'Nagpur', lat: 21.1458, lng: 79.0882 },
      { name: 'Nashik', lat: 20.0059, lng: 73.7898 },
      { name: 'Thane', lat: 19.2183, lng: 72.9781 },
      { name: 'Aurangabad', lat: 19.8762, lng: 75.3433 },
      { name: 'Solapur', lat: 17.6599, lng: 75.9064 },
      { name: 'Amravati', lat: 20.9374, lng: 77.7796 },
    ],
    defaultRatePerKwh: 8.5,
    solarIrradiance: 5.4,
    discomName: 'MSEDCL / Tata Power / Adani Electricity',
  },
  {
    stateName: 'Gujarat',
    cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar'],
    cityDetails: [
      { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
      { name: 'Surat', lat: 21.1702, lng: 72.8311 },
      { name: 'Vadodara', lat: 22.3072, lng: 73.1812 },
      { name: 'Rajkot', lat: 22.3039, lng: 70.8022 },
      { name: 'Bhavnagar', lat: 21.7645, lng: 72.1519 },
      { name: 'Jamnagar', lat: 22.4707, lng: 70.0577 },
      { name: 'Gandhinagar', lat: 23.2156, lng: 72.6369 },
    ],
    defaultRatePerKwh: 7.2,
    solarIrradiance: 5.8,
    discomName: 'UGVCL / DGVCL / MGVCL / Torrent Power',
  },
  {
    stateName: 'Karnataka',
    cities: ['Bengaluru', 'Mysuru', 'Hubballi', 'Mangaluru', 'Belagavi', 'Davangere', 'Tumakuru'],
    cityDetails: [
      { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
      { name: 'Mysuru', lat: 12.2958, lng: 76.6394 },
      { name: 'Hubballi', lat: 15.3647, lng: 75.1240 },
      { name: 'Mangaluru', lat: 12.9141, lng: 74.8560 },
      { name: 'Belagavi', lat: 15.8497, lng: 74.4977 },
      { name: 'Davangere', lat: 14.4644, lng: 75.9218 },
      { name: 'Tumakuru', lat: 13.3379, lng: 77.1173 },
    ],
    defaultRatePerKwh: 7.8,
    solarIrradiance: 5.3,
    discomName: 'BESCOM / MESCOM / HESCOM / CESC',
  },
  {
    stateName: 'Delhi',
    cities: ['New Delhi', 'South Delhi', 'North Delhi', 'East Delhi', 'West Delhi', 'Dwarka'],
    cityDetails: [
      { name: 'New Delhi', lat: 28.6139, lng: 77.2090 },
      { name: 'South Delhi', lat: 28.5400, lng: 77.2100 },
      { name: 'North Delhi', lat: 28.7000, lng: 77.1600 },
      { name: 'East Delhi', lat: 28.6300, lng: 77.2800 },
      { name: 'West Delhi', lat: 28.6500, lng: 77.1000 },
      { name: 'Dwarka', lat: 28.5921, lng: 77.0460 },
    ],
    defaultRatePerKwh: 6.8,
    solarIrradiance: 5.1,
    discomName: 'BSES Rajdhani / BSES Yamuna / TPDDL',
  },
  {
    stateName: 'Tamil Nadu',
    cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tiruppur', 'Erode'],
    cityDetails: [
      { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
      { name: 'Coimbatore', lat: 11.0168, lng: 76.9558 },
      { name: 'Madurai', lat: 9.9252, lng: 78.1198 },
      { name: 'Tiruchirappalli', lat: 10.7905, lng: 78.7047 },
      { name: 'Salem', lat: 11.6643, lng: 78.1460 },
      { name: 'Tiruppur', lat: 11.1085, lng: 77.3411 },
      { name: 'Erode', lat: 11.3410, lng: 77.7172 },
    ],
    defaultRatePerKwh: 7.0,
    solarIrradiance: 5.6,
    discomName: 'TANGEDCO',
  },
  {
    stateName: 'Uttar Pradesh',
    cities: ['Noida', 'Greater Noida', 'Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Ghaziabad', 'Prayagraj'],
    cityDetails: [
      { name: 'Noida', lat: 28.5355, lng: 77.3910 },
      { name: 'Greater Noida', lat: 28.4744, lng: 77.5040 },
      { name: 'Lucknow', lat: 26.8467, lng: 80.9462 },
      { name: 'Kanpur', lat: 26.4499, lng: 80.3319 },
      { name: 'Agra', lat: 27.1767, lng: 78.0081 },
      { name: 'Varanasi', lat: 25.3176, lng: 82.9739 },
      { name: 'Ghaziabad', lat: 28.6692, lng: 77.4538 },
      { name: 'Prayagraj', lat: 25.4358, lng: 81.8463 },
    ],
    defaultRatePerKwh: 7.5,
    solarIrradiance: 5.0,
    discomName: 'UPPCL (PVVNL / DGVNL / MVVNL)',
  },
  {
    stateName: 'Rajasthan',
    cities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer', 'Bhilwara'],
    cityDetails: [
      { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
      { name: 'Jodhpur', lat: 26.2389, lng: 73.0243 },
      { name: 'Udaipur', lat: 24.5854, lng: 73.7125 },
      { name: 'Kota', lat: 25.2138, lng: 75.8648 },
      { name: 'Bikaner', lat: 28.0229, lng: 73.3119 },
      { name: 'Ajmer', lat: 26.4499, lng: 74.6399 },
      { name: 'Bhilwara', lat: 25.3407, lng: 74.6313 },
    ],
    defaultRatePerKwh: 7.9,
    solarIrradiance: 6.1,
    discomName: 'JVVNL / AVVNL / JdVVNL',
  },
  {
    stateName: 'West Bengal',
    cities: ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri', 'Asansol', 'Kharagpur'],
    cityDetails: [
      { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
      { name: 'Howrah', lat: 22.5958, lng: 88.2636 },
      { name: 'Durgapur', lat: 23.5204, lng: 87.3119 },
      { name: 'Siliguri', lat: 26.7271, lng: 88.3953 },
      { name: 'Asansol', lat: 23.6889, lng: 86.9661 },
      { name: 'Kharagpur', lat: 22.3460, lng: 87.2320 },
    ],
    defaultRatePerKwh: 8.0,
    solarIrradiance: 4.8,
    discomName: 'WBSEDCL / CESC Kolkata',
  },
  {
    stateName: 'Telangana',
    cities: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam'],
    cityDetails: [
      { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
      { name: 'Warangal', lat: 17.9689, lng: 79.5941 },
      { name: 'Nizamabad', lat: 18.6725, lng: 78.0941 },
      { name: 'Karimnagar', lat: 18.4386, lng: 79.1288 },
      { name: 'Khammam', lat: 17.2473, lng: 80.1514 },
    ],
    defaultRatePerKwh: 7.6,
    solarIrradiance: 5.5,
    discomName: 'TSSPDCL / TSNPDCL',
  },
  {
    stateName: 'Kerala',
    cities: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam'],
    cityDetails: [
      { name: 'Thiruvananthapuram', lat: 8.5241, lng: 76.9366 },
      { name: 'Kochi', lat: 9.9312, lng: 76.2673 },
      { name: 'Kozhikode', lat: 11.2588, lng: 75.7804 },
      { name: 'Thrissur', lat: 10.5276, lng: 76.2144 },
      { name: 'Kollam', lat: 8.8932, lng: 76.6141 },
    ],
    defaultRatePerKwh: 6.9,
    solarIrradiance: 5.0,
    discomName: 'KSEB',
  },
  {
    stateName: 'Bihar',
    cities: ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Purnia'],
    cityDetails: [
      { name: 'Patna', lat: 25.5941, lng: 85.1376 },
      { name: 'Gaya', lat: 24.7955, lng: 85.0002 },
      { name: 'Muzaffarpur', lat: 26.1209, lng: 85.3647 },
      { name: 'Bhagalpur', lat: 25.2425, lng: 87.0124 },
      { name: 'Darbhanga', lat: 26.1542, lng: 85.8918 },
      { name: 'Purnia', lat: 25.7771, lng: 87.4753 },
    ],
    defaultRatePerKwh: 7.4,
    solarIrradiance: 5.2,
    discomName: 'NBPDCL / SBPDCL',
  },
  {
    stateName: 'Madhya Pradesh',
    cities: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain'],
    cityDetails: [
      { name: 'Bhopal', lat: 23.2599, lng: 77.4126 },
      { name: 'Indore', lat: 22.7196, lng: 75.8577 },
      { name: 'Gwalior', lat: 26.2183, lng: 78.1828 },
      { name: 'Jabalpur', lat: 23.1815, lng: 79.9864 },
      { name: 'Ujjain', lat: 23.1765, lng: 75.7885 },
    ],
    defaultRatePerKwh: 7.5,
    solarIrradiance: 5.6,
    discomName: 'MPPKVVCL / MPMKVVCL / MPPoVVCL',
  },
  {
    stateName: 'Odisha',
    cities: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Puri'],
    cityDetails: [
      { name: 'Bhubaneswar', lat: 20.2961, lng: 85.8245 },
      { name: 'Cuttack', lat: 20.4625, lng: 85.8828 },
      { name: 'Rourkela', lat: 22.2604, lng: 84.8536 },
      { name: 'Puri', lat: 19.8135, lng: 85.8312 },
    ],
    defaultRatePerKwh: 6.8,
    solarIrradiance: 5.1,
    discomName: 'TPCODL / NESCO / WESCO',
  },
];

// Coordinate lookup helper for any city name
const getCoordinatesForCity = (cityName) => {
  if (!cityName) return { lat: 25.5941, lng: 85.1376 }; // Default Patna
  const nameLower = cityName.toLowerCase();
  for (const st of sampleStateData) {
    if (st.cityDetails) {
      const match = st.cityDetails.find((c) => c.name.toLowerCase() === nameLower);
      if (match) return { lat: match.lat, lng: match.lng };
    }
  }
  if (nameLower.includes('patna')) return { lat: 25.5941, lng: 85.1376 };
  return { lat: 22.5726, lng: 88.3639 };
};

const seedStateData = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      await StateData.deleteMany({});
      await StateData.insertMany(sampleStateData);
      console.log('[Seed] Indian State solar data with city coordinates updated.');
    }
  } catch (err) {
    console.warn('[Seed Warning] Could not seed state data to MongoDB:', err.message);
  }
};

module.exports = { seedStateData, sampleStateData, getCoordinatesForCity };
