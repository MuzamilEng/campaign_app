const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'di70hltm1', 
    api_key: '253989544865324', 
    api_secret: 'dH2bH5GhQFnHOPYCMY-HcN3sswo' 
  });

module.exports = cloudinary;