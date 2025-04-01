import Profile from './model.js';

const profileController = {
  getAllProfiles: async (req, res) => {
    try {
      const filter = { isDeleted: false };
      
      if (req.query.skills) {
        const skillsArray = req.query.skills.split(',');
        filter.skills = { $in: skillsArray };
      }
      
      if (req.query.localisation) {
        filter['information.localisation'] = { 
          $regex: req.query.localisation, 
          $options: 'i' 
        };
      }
      
      const profiles = await Profile.find(filter);
      
      res.status(200).json({
        success: true,
        count: profiles.length,
        data: profiles
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  getProfileById: async (req, res) => {
    try {
      const profile = await Profile.findOne({ 
        _id: req.params.id,
        isDeleted: false 
      });
      
      if (!profile) {
        return res.status(404).json({
          success: false,
          error: 'Profil non trouvé'
        });
      }
      
      res.status(200).json({
        success: true,
        data: profile
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  createProfile: async (req, res) => {
    try {
      const existingProfile = await Profile.findOne({ 
        email: req.body.email,
        isDeleted: false 
      });
      
      if (existingProfile) {
        return res.status(400).json({
          success: false,
          error: 'Un profil avec cet email existe déjà'
        });
      }
      
      const profile = await Profile.create({
        name: req.body.name,
        email: req.body.email
      });
      
      res.status(201).json({
        success: true,
        data: profile
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  updateProfile: async (req, res) => {
    try {
      let profile = await Profile.findOne({ 
        _id: req.params.id,
        isDeleted: false 
      });
      
      if (!profile) {
        return res.status(404).json({
          success: false,
          error: 'Profil non trouvé'
        });
      }
      
      profile.name = req.body.name || profile.name;
      profile.email = req.body.email || profile.email;
      
      await profile.save();
      
      res.status(200).json({
        success: true,
        data: profile
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  deleteProfile: async (req, res) => {
    try {
      const profile = await Profile.findOne({ 
        _id: req.params.id,
        isDeleted: false 
      });
      
      if (!profile) {
        return res.status(404).json({
          success: false,
          error: 'Profil non trouvé'
        });
      }
      
      await profile.softDelete();
      
      res.status(200).json({
        success: true,
        data: {}
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  addExperience: async (req, res) => {
    try {
      const profile = await Profile.findOne({ 
        _id: req.params.id,
        isDeleted: false 
      });
      
      if (!profile) {
        return res.status(404).json({
          success: false,
          error: 'Profil non trouvé'
        });
      }
      
      profile.experience.unshift(req.body);
      await profile.save();
      
      res.status(200).json({
        success: true,
        data: profile
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  deleteExperience: async (req, res) => {
    try {
      const profile = await Profile.findOne({ 
        _id: req.params.id,
        isDeleted: false 
      });
      
      if (!profile) {
        return res.status(404).json({
          success: false,
          error: 'Profil non trouvé'
        });
      }
      
      profile.experience = profile.experience.filter(
        exp => exp._id.toString() !== req.params.exp
      );
      
      await profile.save();
      
      res.status(200).json({
        success: true,
        data: profile
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  addSkill: async (req, res) => {
    try {
      const profile = await Profile.findOne({ 
        _id: req.params.id,
        isDeleted: false 
      });
      
      if (!profile) {
        return res.status(404).json({
          success: false,
          error: 'Profil non trouvé'
        });
      }
      
      if (profile.skills.includes(req.body.skill)) {
        return res.status(400).json({
          success: false,
          error: 'Cette compétence existe déjà'
        });
      }
      
      profile.skills.push(req.body.skill);
      await profile.save();
      
      res.status(200).json({
        success: true,
        data: profile
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  deleteSkill: async (req, res) => {
    try {
      const profile = await Profile.findOne({ 
        _id: req.params.id,
        isDeleted: false 
      });
      
      if (!profile) {
        return res.status(404).json({
          success: false,
          error: 'Profil non trouvé'
        });
      }
      
      profile.skills = profile.skills.filter(skill => skill !== req.params.skill);
      
      await profile.save();
      
      res.status(200).json({
        success: true,
        data: profile
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  updateInformation: async (req, res) => {
    try {
      const profile = await Profile.findOne({ 
        _id: req.params.id,
        isDeleted: false 
      });
      
      if (!profile) {
        return res.status(404).json({
          success: false,
          error: 'Profil non trouvé'
        });
      }
      
      if (!profile.information) {
        profile.information = {};
      }
      
      profile.information.bio = req.body.bio || profile.information.bio;
      profile.information.localisation = req.body.localisation || profile.information.localisation;
      profile.information.siteWeb = req.body.siteWeb || profile.information.siteWeb;
      
      await profile.save();
      
      res.status(200).json({
        success: true,
        data: profile
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
};

export default profileController;