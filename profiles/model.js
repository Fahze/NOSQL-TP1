import mongoose from "mongoose";
const { Schema } = mongoose;

const ExperienceSchema = new Schema(
  {
    titre: {
      type: String,
      required: true,
    },
    entreprise: {
      type: String,
      required: true,
    },
    dates: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const InformationSchema = new Schema({
  bio: {
    type: String,
  },
  localisation: {
    type: String,
  },
  siteWeb: {
    type: String,
  },
});

const ProfileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    experience: [ExperienceSchema],
    skills: [String],
    information: InformationSchema,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

ProfileSchema.methods.softDelete = function () {
  this.isDeleted = true;
  return this.save();
};

ProfileSchema.index({ skills: 1 });
ProfileSchema.index({ "information.localisation": 1 });

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;

