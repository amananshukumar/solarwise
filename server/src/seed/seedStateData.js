const mongoose = require('mongoose');
const StateData = require('../models/StateData');

const sampleStateData = [
  {
    stateName: 'Andhra Pradesh',
    cities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Nellore', 'Kurnool'],
    cityDetails: [
      { name: 'Visakhapatnam', lat: 17.6868, lng: 83.2185 },
      { name: 'Vijayawada', lat: 16.5062, lng: 80.6480 },
      { name: 'Guntur', lat: 16.3067, lng: 80.4365 },
      { name: 'Tirupati', lat: 13.6288, lng: 79.4192 },
      { name: 'Nellore', lat: 14.4426, lng: 79.9865 },
      { name: 'Kurnool', lat: 15.8281, lng: 78.0373 },
    ],
    defaultRatePerKwh: 7.1,
    solarIrradiance: 5.5,
    discomName: 'APSPDCL / APEPDCL',
  },
  {
    stateName: 'Arunachal Pradesh',
    cities: ['Itanagar', 'Naharlagun', 'Pasighat', 'Tawang'],
    cityDetails: [
      { name: 'Itanagar', lat: 27.0844, lng: 93.6053 },
      { name: 'Naharlagun', lat: 27.1042, lng: 93.6934 },
      { name: 'Pasighat', lat: 28.0664, lng: 95.3262 },
      { name: 'Tawang', lat: 27.5861, lng: 91.8594 },
    ],
    defaultRatePerKwh: 5.5,
    solarIrradiance: 4.2,
    discomName: 'Department of Power Arunachal Pradesh',
  },
  {
    stateName: 'Assam',
    cities: ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat', 'Tezpur'],
    cityDetails: [
      { name: 'Guwahati', lat: 26.1445, lng: 91.7362 },
      { name: 'Dibrugarh', lat: 27.4728, lng: 94.9120 },
      { name: 'Silchar', lat: 24.8333, lng: 92.7789 },
      { name: 'Jorhat', lat: 26.7509, lng: 94.2037 },
      { name: 'Tezpur', lat: 26.6338, lng: 92.8000 },
    ],
    defaultRatePerKwh: 7.2,
    solarIrradiance: 4.5,
    discomName: 'APDCL',
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
    stateName: 'Chhattisgarh',
    cities: ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg'],
    cityDetails: [
      { name: 'Raipur', lat: 21.2514, lng: 81.6296 },
      { name: 'Bhilai', lat: 21.1938, lng: 81.3509 },
      { name: 'Bilaspur', lat: 22.0797, lng: 82.1391 },
      { name: 'Korba', lat: 22.3595, lng: 82.7501 },
      { name: 'Durg', lat: 21.1904, lng: 81.2849 },
    ],
    defaultRatePerKwh: 6.9,
    solarIrradiance: 5.3,
    discomName: 'CSPDCL',
  },
  {
    stateName: 'Goa',
    cities: ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa'],
    cityDetails: [
      { name: 'Panaji', lat: 15.4909, lng: 73.8278 },
      { name: 'Margao', lat: 15.2736, lng: 73.9581 },
      { name: 'Vasco da Gama', lat: 15.3959, lng: 73.8157 },
      { name: 'Mapusa', lat: 15.5929, lng: 73.8118 },
    ],
    defaultRatePerKwh: 5.8,
    solarIrradiance: 5.4,
    discomName: 'Goa Electricity Department',
  },
  {
    stateName: 'Gujarat',
    cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Gandhinagar'],
    cityDetails: [
      { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
      { name: 'Surat', lat: 21.1702, lng: 72.8311 },
      { name: 'Vadodara', lat: 22.3072, lng: 73.1812 },
      { name: 'Rajkot', lat: 22.3039, lng: 70.8022 },
      { name: 'Bhavnagar', lat: 21.7645, lng: 72.1519 },
      { name: 'Gandhinagar', lat: 23.2156, lng: 72.6369 },
    ],
    defaultRatePerKwh: 7.2,
    solarIrradiance: 5.8,
    discomName: 'UGVCL / DGVCL / MGVCL / Torrent Power',
  },
  {
    stateName: 'Haryana',
    cities: ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Hisar', 'Karnal'],
    cityDetails: [
      { name: 'Gurugram', lat: 28.4595, lng: 77.0266 },
      { name: 'Faridabad', lat: 28.4089, lng: 77.3178 },
      { name: 'Panipat', lat: 29.3909, lng: 76.9635 },
      { name: 'Ambala', lat: 30.3782, lng: 76.7767 },
      { name: 'Hisar', lat: 29.1492, lng: 75.7217 },
      { name: 'Karnal', lat: 29.6857, lng: 76.9905 },
    ],
    defaultRatePerKwh: 7.0,
    solarIrradiance: 5.2,
    discomName: 'DHBVN / UHBVN',
  },
  {
    stateName: 'Himachal Pradesh',
    cities: ['Shimla', 'Dharamshala', 'Mandi', 'Solan', 'Kullu'],
    cityDetails: [
      { name: 'Shimla', lat: 31.1048, lng: 77.1734 },
      { name: 'Dharamshala', lat: 32.2190, lng: 76.3234 },
      { name: 'Mandi', lat: 31.7084, lng: 76.9319 },
      { name: 'Solan', lat: 30.9045, lng: 77.0967 },
      { name: 'Kullu', lat: 31.9579, lng: 77.1095 },
    ],
    defaultRatePerKwh: 5.4,
    solarIrradiance: 4.8,
    discomName: 'HPSEBL',
  },
  {
    stateName: 'Jharkhand',
    cities: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh'],
    cityDetails: [
      { name: 'Ranchi', lat: 23.3441, lng: 85.3096 },
      { name: 'Jamshedpur', lat: 22.8046, lng: 86.2029 },
      { name: 'Dhanbad', lat: 23.7957, lng: 86.4304 },
      { name: 'Bokaro', lat: 23.6693, lng: 86.1511 },
      { name: 'Hazaribagh', lat: 23.9961, lng: 85.3637 },
    ],
    defaultRatePerKwh: 6.7,
    solarIrradiance: 5.1,
    discomName: 'JBVNL / Tata Power Jamshedpur',
  },
  {
    stateName: 'Karnataka',
    cities: ['Bengaluru', 'Mysuru', 'Hubballi', 'Mangaluru', 'Belagavi', 'Tumakuru'],
    cityDetails: [
      { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
      { name: 'Mysuru', lat: 12.2958, lng: 76.6394 },
      { name: 'Hubballi', lat: 15.3647, lng: 75.1240 },
      { name: 'Mangaluru', lat: 12.9141, lng: 74.8560 },
      { name: 'Belagavi', lat: 15.8497, lng: 74.4977 },
      { name: 'Tumakuru', lat: 13.3379, lng: 77.1173 },
    ],
    defaultRatePerKwh: 7.8,
    solarIrradiance: 5.3,
    discomName: 'BESCOM / MESCOM / HESCOM / CESC',
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
    stateName: 'Manipur',
    cities: ['Imphal', 'Churachandpur', 'Thoubal', 'Ukhrul'],
    cityDetails: [
      { name: 'Imphal', lat: 24.8170, lng: 93.9368 },
      { name: 'Churachandpur', lat: 24.3333, lng: 93.6833 },
      { name: 'Thoubal', lat: 24.6333, lng: 94.0167 },
      { name: 'Ukhrul', lat: 25.1167, lng: 94.3667 },
    ],
    defaultRatePerKwh: 6.2,
    solarIrradiance: 4.4,
    discomName: 'MSPDCL',
  },
  {
    stateName: 'Meghalaya',
    cities: ['Shillong', 'Tura', 'Jowai', 'Nongpoh'],
    cityDetails: [
      { name: 'Shillong', lat: 25.5788, lng: 91.8933 },
      { name: 'Tura', lat: 25.5142, lng: 90.2032 },
      { name: 'Jowai', lat: 25.4452, lng: 92.2036 },
      { name: 'Nongpoh', lat: 25.9022, lng: 91.8814 },
    ],
    defaultRatePerKwh: 6.5,
    solarIrradiance: 4.3,
    discomName: 'MePDCL',
  },
  {
    stateName: 'Mizoram',
    cities: ['Aizawl', 'Lunglei', 'Champhai', 'Serchhip'],
    cityDetails: [
      { name: 'Aizawl', lat: 23.7271, lng: 92.7176 },
      { name: 'Lunglei', lat: 22.8864, lng: 92.7314 },
      { name: 'Champhai', lat: 23.4731, lng: 93.3275 },
      { name: 'Serchhip', lat: 23.3000, lng: 92.8500 },
    ],
    defaultRatePerKwh: 6.0,
    solarIrradiance: 4.4,
    discomName: 'P&ED Mizoram',
  },
  {
    stateName: 'Nagaland',
    cities: ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang'],
    cityDetails: [
      { name: 'Kohima', lat: 25.6751, lng: 94.1086 },
      { name: 'Dimapur', lat: 25.9060, lng: 93.7271 },
      { name: 'Mokokchung', lat: 26.3219, lng: 94.5222 },
      { name: 'Tuensang', lat: 26.2800, lng: 94.8300 },
    ],
    defaultRatePerKwh: 6.1,
    solarIrradiance: 4.3,
    discomName: 'Department of Power Nagaland',
  },
  {
    stateName: 'Odisha',
    cities: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Puri', 'Sambalpur'],
    cityDetails: [
      { name: 'Bhubaneswar', lat: 20.2961, lng: 85.8245 },
      { name: 'Cuttack', lat: 20.4625, lng: 85.8828 },
      { name: 'Rourkela', lat: 22.2604, lng: 84.8536 },
      { name: 'Puri', lat: 19.8135, lng: 85.8312 },
      { name: 'Sambalpur', lat: 21.4669, lng: 83.9812 },
    ],
    defaultRatePerKwh: 6.8,
    solarIrradiance: 5.1,
    discomName: 'TPCODL / NESCO / WESCO',
  },
  {
    stateName: 'Punjab',
    cities: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda'],
    cityDetails: [
      { name: 'Ludhiana', lat: 30.9010, lng: 75.8573 },
      { name: 'Amritsar', lat: 31.6340, lng: 74.8723 },
      { name: 'Jalandhar', lat: 31.3260, lng: 75.5762 },
      { name: 'Patiala', lat: 30.3398, lng: 76.3869 },
      { name: 'Bathinda', lat: 30.2110, lng: 74.9455 },
    ],
    defaultRatePerKwh: 7.3,
    solarIrradiance: 5.1,
    discomName: 'PSPCL',
  },
  {
    stateName: 'Rajasthan',
    cities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer'],
    cityDetails: [
      { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
      { name: 'Jodhpur', lat: 26.2389, lng: 73.0243 },
      { name: 'Udaipur', lat: 24.5854, lng: 73.7125 },
      { name: 'Kota', lat: 25.2138, lng: 75.8648 },
      { name: 'Bikaner', lat: 28.0229, lng: 73.3119 },
      { name: 'Ajmer', lat: 26.4499, lng: 74.6399 },
    ],
    defaultRatePerKwh: 7.9,
    solarIrradiance: 6.1,
    discomName: 'JVVNL / AVVNL / JdVVNL',
  },
  {
    stateName: 'Sikkim',
    cities: ['Gangtok', 'Namchi', 'Geyzing', 'Mangan'],
    cityDetails: [
      { name: 'Gangtok', lat: 27.3389, lng: 88.6065 },
      { name: 'Namchi', lat: 27.1667, lng: 88.3500 },
      { name: 'Geyzing', lat: 27.2833, lng: 88.2500 },
      { name: 'Mangan', lat: 27.5000, lng: 88.5333 },
    ],
    defaultRatePerKwh: 5.2,
    solarIrradiance: 4.1,
    discomName: 'Energy & Power Department Sikkim',
  },
  {
    stateName: 'Tamil Nadu',
    cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
    cityDetails: [
      { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
      { name: 'Coimbatore', lat: 11.0168, lng: 76.9558 },
      { name: 'Madurai', lat: 9.9252, lng: 78.1198 },
      { name: 'Tiruchirappalli', lat: 10.7905, lng: 78.7047 },
      { name: 'Salem', lat: 11.6643, lng: 78.1460 },
    ],
    defaultRatePerKwh: 7.0,
    solarIrradiance: 5.6,
    discomName: 'TANGEDCO',
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
    stateName: 'Tripura',
    cities: ['Agartala', 'Udaipur', 'Dharmanagar', 'Kailashahar'],
    cityDetails: [
      { name: 'Agartala', lat: 23.8315, lng: 91.2868 },
      { name: 'Udaipur', lat: 23.5333, lng: 91.4833 },
      { name: 'Dharmanagar', lat: 24.3667, lng: 92.1667 },
      { name: 'Kailashahar', lat: 24.3333, lng: 92.0000 },
    ],
    defaultRatePerKwh: 6.4,
    solarIrradiance: 4.5,
    discomName: 'TSECL',
  },
  {
    stateName: 'Uttar Pradesh',
    cities: ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Prayagraj', 'Noida', 'Ghaziabad'],
    cityDetails: [
      { name: 'Lucknow', lat: 26.8467, lng: 80.9462 },
      { name: 'Kanpur', lat: 26.4499, lng: 80.3319 },
      { name: 'Varanasi', lat: 25.3176, lng: 82.9739 },
      { name: 'Agra', lat: 27.1767, lng: 78.0081 },
      { name: 'Prayagraj', lat: 25.4358, lng: 81.8463 },
      { name: 'Noida', lat: 28.5355, lng: 77.3910 },
      { name: 'Ghaziabad', lat: 28.6692, lng: 77.4538 },
    ],
    defaultRatePerKwh: 7.5,
    solarIrradiance: 5.0,
    discomName: 'UPPCL (PVVNL / DGVNL / MVVNL)',
  },
  {
    stateName: 'Uttarakhand',
    cities: ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rishikesh'],
    cityDetails: [
      { name: 'Dehradun', lat: 30.3165, lng: 78.0322 },
      { name: 'Haridwar', lat: 29.9457, lng: 78.1642 },
      { name: 'Roorkee', lat: 29.8543, lng: 77.8880 },
      { name: 'Haldwani', lat: 29.2183, lng: 79.5130 },
      { name: 'Rishikesh', lat: 30.0869, lng: 78.2676 },
    ],
    defaultRatePerKwh: 6.2,
    solarIrradiance: 5.0,
    discomName: 'UPCL',
  },
  {
    stateName: 'West Bengal',
    cities: ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri', 'Asansol'],
    cityDetails: [
      { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
      { name: 'Howrah', lat: 22.5958, lng: 88.2636 },
      { name: 'Durgapur', lat: 23.5204, lng: 87.3119 },
      { name: 'Siliguri', lat: 26.7271, lng: 88.3953 },
      { name: 'Asansol', lat: 23.6889, lng: 86.9661 },
    ],
    defaultRatePerKwh: 8.0,
    solarIrradiance: 4.8,
    discomName: 'WBSEDCL / CESC Kolkata',
  },
  {
    stateName: 'Delhi',
    cities: ['New Delhi', 'South Delhi', 'North Delhi', 'East Delhi', 'Dwarka'],
    cityDetails: [
      { name: 'New Delhi', lat: 28.6139, lng: 77.2090 },
      { name: 'South Delhi', lat: 28.5400, lng: 77.2100 },
      { name: 'North Delhi', lat: 28.7000, lng: 77.1600 },
      { name: 'East Delhi', lat: 28.6300, lng: 77.2800 },
      { name: 'Dwarka', lat: 28.5921, lng: 77.0460 },
    ],
    defaultRatePerKwh: 6.8,
    solarIrradiance: 5.1,
    discomName: 'BSES Rajdhani / BSES Yamuna / TPDDL',
  },
  {
    stateName: 'Jammu & Kashmir',
    cities: ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla'],
    cityDetails: [
      { name: 'Srinagar', lat: 34.0837, lng: 74.7973 },
      { name: 'Jammu', lat: 32.7266, lng: 74.8570 },
      { name: 'Anantnag', lat: 33.7311, lng: 75.1489 },
      { name: 'Baramulla', lat: 34.2040, lng: 74.3435 },
    ],
    defaultRatePerKwh: 5.6,
    solarIrradiance: 4.6,
    discomName: 'JPDCL / KPDCL',
  },
  {
    stateName: 'Chandigarh',
    cities: ['Chandigarh', 'Sector 17', 'Sector 35', 'Manimajra'],
    cityDetails: [
      { name: 'Chandigarh', lat: 30.7333, lng: 76.7794 },
      { name: 'Sector 17', lat: 30.7398, lng: 76.7821 },
      { name: 'Sector 35', lat: 30.7250, lng: 76.7650 },
      { name: 'Manimajra', lat: 30.7214, lng: 76.8433 },
    ],
    defaultRatePerKwh: 5.9,
    solarIrradiance: 5.1,
    discomName: 'Chandigarh Electricity Department',
  },
  {
    stateName: 'Puducherry',
    cities: ['Puducherry', 'Karaikal', 'Mahe', 'Yanam'],
    cityDetails: [
      { name: 'Puducherry', lat: 11.9416, lng: 79.8083 },
      { name: 'Karaikal', lat: 10.9254, lng: 79.8380 },
      { name: 'Mahe', lat: 11.7022, lng: 75.5347 },
      { name: 'Yanam', lat: 16.7333, lng: 82.2167 },
    ],
    defaultRatePerKwh: 5.8,
    solarIrradiance: 5.4,
    discomName: 'Puducherry Electricity Department',
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
      console.log(`[Seed] All ${sampleStateData.length} Indian States & UTs with 4+ cities per state updated.`);
    }
  } catch (err) {
    console.warn('[Seed Warning] Could not seed state data to MongoDB:', err.message);
  }
};

module.exports = { seedStateData, sampleStateData, getCoordinatesForCity };
