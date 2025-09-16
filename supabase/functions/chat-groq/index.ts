import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, stream } = await req.json();
    const groqApiKey = Deno.env.get('GROQ_API_KEY');

    if (!groqApiKey) {
      throw new Error('GROQ_API_KEY not found');
    }

    const streamInfo = getStreamInfo(stream);
    const systemPrompt = `You are an AI career counselor specializing in ${stream}. ${streamInfo.description} 

Provide helpful, accurate information about:
- Career opportunities in ${stream}
- Required skills and qualifications
- Educational pathways
- Industry trends
- Salary expectations
- Work-life balance

Keep responses concise and student-friendly. Always be encouraging and supportive.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const botResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: botResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-groq function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getStreamInfo(stream: string) {
  const streamData = {
    'Science': {
      description: 'Science stream focuses on Physics, Chemistry, Biology, and Mathematics. It opens doors to engineering, medicine, research, and technology careers.'
    },
    'Commerce': {
      description: 'Commerce stream covers Business Studies, Accountancy, Economics, and Mathematics. It leads to careers in business, finance, accounting, and entrepreneurship.'
    },
    'Arts': {
      description: 'Arts/Humanities stream includes History, Geography, Political Science, Psychology, and Literature. It offers careers in civil services, journalism, teaching, and social work.'
    },
    'Engineering': {
      description: 'Engineering combines mathematics, science, and technology to design and build solutions. It includes various specializations like Computer Science, Mechanical, Civil, and Electrical engineering.'
    },
    'Medical': {
      description: 'Medical field focuses on healthcare, medicine, and life sciences. It includes careers as doctors, nurses, researchers, and healthcare administrators.'
    },
    'Technology': {
      description: 'Technology stream covers computer science, software development, AI, and digital innovation. It leads to careers in IT, software engineering, and emerging tech fields.'
    }
  };

  return streamData[stream] || { description: 'This educational stream offers diverse career opportunities and skill development.' };
}