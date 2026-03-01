import mongoose from 'mongoose';

const TeacherEtokiesSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  teacher: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Teacher', 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  }, // Etokies earned in this transaction
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const TeacherEtokies = mongoose.models.TeacherEtokies || mongoose.model('TeacherEtokies', TeacherEtokiesSchema);

export default TeacherEtokies;
