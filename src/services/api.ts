import { RandomUserResponse } from '../types';

const BASE_URL = 'https://randomuser.me/api/';

export const fetchUsersApi = async (page: number, results: number = 20): Promise<RandomUserResponse> => {
  try {
    const response = await fetch(`${BASE_URL}?page=${page}&results=${results}&seed=rn_intern`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data: RandomUserResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch users failed:', error);
    throw error;
  }
};
