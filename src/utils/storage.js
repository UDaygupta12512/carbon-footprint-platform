// A simple string hash function for basic tamper-checking
const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(16);
};

const SECRET_SALT = "eco_track_salt_v1";

export const saveUserData = (data) => {
  try {
    const jsonString = JSON.stringify(data);
    const signature = hashString(jsonString + SECRET_SALT);
    
    const payload = {
      data: jsonString,
      signature: signature
    };
    
    const encoded = btoa(encodeURIComponent(JSON.stringify(payload)));
    localStorage.setItem('carbonUserDataSec', encoded);
    localStorage.removeItem('carbonUserData');
  } catch (error) {
    console.error("Failed to save user data", error);
  }
};

export const loadUserData = () => {
  try {
    const encoded = localStorage.getItem('carbonUserDataSec');
    if (encoded) {
      const decodedPayload = JSON.parse(decodeURIComponent(atob(encoded)));
      
      const { data, signature } = decodedPayload;
      const expectedSignature = hashString(data + SECRET_SALT);
      
      if (signature !== expectedSignature) {
        throw new Error("Data integrity check failed! Signature mismatch.");
      }
      
      const parsedData = JSON.parse(data);
      
      // Validate types to ensure integrity
      if (typeof parsedData.ecoTokens !== 'number') parsedData.ecoTokens = 150;
      if (!Array.isArray(parsedData.purchasedItems)) parsedData.purchasedItems = [];
      if (typeof parsedData.currentScore !== 'number' && parsedData.currentScore !== undefined) {
          parsedData.currentScore = 100;
      }
      return parsedData;
    }
    
    // Fallback for existing users migrating
    const oldSaved = localStorage.getItem('carbonUserData');
    if (oldSaved) {
        const parsedData = JSON.parse(oldSaved);
        saveUserData(parsedData); 
        return parsedData;
    }
  } catch (error) {
    console.error("Failed to load user data, data has been tampered with or is corrupt.", error);
    localStorage.removeItem('carbonUserDataSec');
  }
  return null;
};

export const clearUserData = () => {
    localStorage.removeItem('carbonUserDataSec');
    localStorage.removeItem('carbonUserData');
};
