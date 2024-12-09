const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  kinde_id: { 
    type: String, 
    required: true, 
    unique: true 
  }, // ID from Kinde
  
  name: { 
    type: String, 
    required: true 
  },
  
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  
  profile_picture: { 
    type: String 
  }, // URL to the profile picture
  
  preferences: [
    {
      category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category' 
      }, 
      notification_enabled: { 
        type: Boolean, 
        default: true 
      } 
    }
  ],
  
  role: { 
    type: String, 
    enum: ['admin',  'user'], 
    default: 'user', // Default role is 'user'
    required: true
  },
  
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('User', UserSchema);