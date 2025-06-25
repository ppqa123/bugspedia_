export interface InsectCardData {
  id?: string; // optional, comes from Firestore doc ID
  name: string;
  image: string;
  habitat: string;
behavior: string;
  description: string;
  rarity?: "common" | "rare" | "epic" | "legendary"; // optional enhancement
  seasonal?: boolean;
}
