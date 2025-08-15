import { useState, useEffect } from 'react';

export function useContent<T>(contentFile: string): T | null {
  const [content, setContent] = useState<T | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(`/content/${contentFile}`);
        if (!response.ok) {
          throw new Error(`Failed to load ${contentFile}`);
        }
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error(`Error loading content from ${contentFile}:`, error);
      }
    };

    loadContent();
  }, [contentFile]);

  return content;
}