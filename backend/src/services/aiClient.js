import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const HUGGINGFACE_API_URL = process.env.HUGGINGFACE_API_URL || 'https://api-inference.huggingface.co/models/gpt2';

// Article topics for variety
const topics = [
  'The Future of Artificial Intelligence',
  'Sustainable Living and Climate Change',
  'Modern Web Development Trends',
  'The Impact of Technology on Society',
  'Healthy Lifestyle and Wellness',
  'Space Exploration and Discovery',
  'Digital Privacy and Security',
  'The Evolution of Remote Work',
  'Innovations in Renewable Energy',
  'The Rise of Electric Vehicles'
];

/**
 * Generate article content using HuggingFace API
 * @returns {Promise<{title: string, content: string, summary: string}>}
 */
export async function generateArticle() {
  try {
    // Select random topic
    const topic = topics[Math.floor(Math.random() * topics.length)];
    
    console.log(`🤖 Generating article about: ${topic}`);
    
    // Create prompt for article generation
    const prompt = `Write a detailed blog article about "${topic}". 

Article Title: ${topic}

Introduction:`;

    // Call HuggingFace API
    const response = await axios.post(
      HUGGINGFACE_API_URL,
      {
        inputs: prompt,
        parameters: {
          max_length: 500,
          temperature: 0.8,
          top_p: 0.9,
          do_sample: true,
          return_full_text: false
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000 // 30 second timeout
      }
    );

    let generatedText = '';
    
    if (Array.isArray(response.data) && response.data.length > 0) {
      generatedText = response.data[0].generated_text || '';
    } else if (response.data.generated_text) {
      generatedText = response.data.generated_text;
    }

    // Clean up the generated text
    const content = generatedText.trim() || 
      `This article explores ${topic.toLowerCase()}. As technology continues to evolve, understanding these concepts becomes increasingly important. This topic represents a significant area of development and innovation in our modern world. The implications and applications are vast and continue to shape our future in meaningful ways.`;

    // Create summary (first 150 characters)
    const summary = content.substring(0, 150) + '...';

    console.log('✅ Article generated successfully');

    return {
      title: topic,
      content: content,
      summary: summary
    };

  } catch (error) {
    console.error('❌ Error generating article:', error.message);
    
    // Fallback: return a basic article if API fails
    const fallbackTopic = topics[Math.floor(Math.random() * topics.length)];
    return {
      title: fallbackTopic,
      content: `This is an automatically generated article about ${fallbackTopic.toLowerCase()}. In today's rapidly changing world, this topic has become increasingly relevant. Understanding the nuances and implications helps us navigate the complexities of modern life. As we continue to explore and innovate, these concepts will play a crucial role in shaping our future. The intersection of technology, society, and human experience creates fascinating opportunities for growth and development.`,
      summary: `An exploration of ${fallbackTopic.toLowerCase()} and its impact on our modern world.`
    };
  }
}

export default { generateArticle };
