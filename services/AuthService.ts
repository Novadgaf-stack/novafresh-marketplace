import { auth } from '@/lib/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updateProfile,
  User
} from 'firebase/auth';
import { fetchUserRoleFromDB, persistUserToDB } from './dbService';

export const AuthService = {
  async loginWithGoogle(roleChoice: string) {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    let dbRole = await fetchUserRoleFromDB(result.user.uid);
    if (!dbRole && roleChoice) {
      await persistUserToDB(result.user.uid, result.user.email, result.user.displayName, roleChoice);
      dbRole = roleChoice;
    }
    return { user: result.user, role: dbRole || 'customer' };
  },
  
  async handleEmailLogin(email: string, pass: string) {
    const result = await signInWithEmailAndPassword(auth, email, pass);
    const dbRole = await fetchUserRoleFromDB(result.user.uid);
    return { user: result.user, role: dbRole || 'customer' };
  },

  async handleEmailRegister(email: string, pass: string, name: string, roleChoice: string) {
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    if (name) {
      await updateProfile(result.user, { displayName: name });
    }
    await persistUserToDB(result.user.uid, email, name, roleChoice || 'customer');
    return { user: result.user, role: roleChoice || 'customer' };
  },

  async executeSignOut() {
    await signOut(auth);
  }
};
