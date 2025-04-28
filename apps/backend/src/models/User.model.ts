import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  rol: 'admin' | 'tecnico' | 'vendedor';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(enteredPassword: string): Promise<boolean>
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Por favor ingrese un nombre']
  },
  username: {
    type: String,
    required: [true, 'Por favor ingrese un nombre de usuario'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Por favor ingrese una contraseña'],
  },
  rol: {
    type: String,
    enum: ['admin', 'tecnico', 'vendedor'],
    default: 'vendedor'
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.comparePassword = async function(enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
}

const User = model<IUser>('User', userSchema);

export default User;
