export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  isTyping?: boolean;
}

export interface SocialLink {
  name: string;
  url: string;
  icon?: string; // Simplified for this example
}

export interface GridItemProps {
  title: string;
  subtitle: string;
  description?: string;
  imageUrl?: string;
  className?: string;
  link?: string;
  tags?: string[];
  accentColor?: 'neon' | 'orange' | 'blue' | 'white';
}
