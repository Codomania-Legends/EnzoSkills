const mongoose = require('mongoose');
const USER = require('./backend/Models/User');

async function test() {
  try {
    await mongoose.connect('mongodb://localhost:27017/EnzoSkills');
    const user = await USER.findOne();
    if (!user) { console.log('no user'); return; }
    
    console.log('Testing update on user:', user.user_id);
    
    const updateData = {
      phone_num: '+91 9876543210',
      designation: 'Senior Frontend Developer',
      experience: '3+ years',
      education: {
        secondary_Edu: { school_name: 'Delhi Public School', year: '2016', marks: '92%' },
        higher_Edu: { school_name: 'Delhi Public School', year: '2018', marks: '88%' },
        degree: { clg_name: 'NIT', duration: '4 Years', year: '2022', marks: '8.5 CGPA' }
      },
      projects: [{ project_name: 'EnzoSkills Dashboard', description: 'Desc', project_tech: 'React', project_repo: 'http', deployed_link: 'http' }]
    };

    const result = await USER.findOneAndUpdate(
        { user_id: user.user_id },
        { $set: updateData },
        { new: true, runValidators: true }
    );
    console.log('Success:', result !== null);
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    mongoose.disconnect();
  }
}
test();
