import { AppProviders } from '@/src/provider/provider';
import { app } from '@/src/shared/firebase.config';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

/**
 * Helper to sync Firebase user data with our MongoDB backend
 */
const syncUserWithBackend = async (user: User, isOAuth = false) => {
  try {
    await AppProviders.CreateUserUseCase.execute({
      email: user.email || '',
      password: isOAuth ? 'google-oauth' : 'managed-via-firebase',
      name: user.displayName || 'temp-name',
    });
  } catch (error) {
    console.log('User exists or error creating, attempting update...', error);
  }
};

export const AuthService = {
  getCurrentUser: (): User | null => auth.currentUser,

  isLoggedIn: (): boolean => !!auth.currentUser,

  loginWithGoogle: async (): Promise<User | null> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncUserWithBackend(result.user, true);
      return result.user;
    } catch (error) {
      console.error('Auth Error:', error);
      return null;
    }
  },

  loginWithEmail: async (email: string, password: string): Promise<User | null> => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await syncUserWithBackend(result.user, false);
      return result.user;
    } catch (error) {
      console.error('Auth Error:', error);
      return null;
    }
  },

  signUpWithEmail: async (email: string, password: string): Promise<User | null> => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Optional: Sync backend here too if you want the record created immediately
      await syncUserWithBackend(result.user, false);
      return result.user;
    } catch (error) {
      console.error('Auth Error:', error);
      return null;
    }
  },

  logout: () => signOut(auth),
};