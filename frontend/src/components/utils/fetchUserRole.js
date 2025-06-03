import axios from 'axios';
import { getAuth } from 'firebase/auth';

const fetchUserRole = async () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  if (currentUser) {
    const token = await currentUser.getIdToken();
    const response = await axios.get('/api/getUserRole', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.role;
  }
  throw new Error('No user logged in');
};

export default fetchUserRole;
