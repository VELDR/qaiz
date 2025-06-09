//Credits to: https://github.com/tanchongmin/strictjson

import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

interface OutputFormat {
  [key: string]: string | string[] | OutputFormat;
}

/**
 * Generates structured JSON output from AI using strict formatting rules
 * Handles dynamic elements, lists, and multiple choice questions with validation
 */
export async function generateStructuredResponse(
  system_prompt: string,
  user_prompt: string | string[],
  output_format: OutputFormat,
  default_category: string = '',
  output_value_only: boolean = false,
  model: string = 'gemini-2.0-flash',
  num_tries: number = 3,
  verbose: boolean = false
) {
  // Determine input format to handle batch processing
  const list_input: boolean = Array.isArray(user_prompt);

  // Check for dynamic placeholders that need content generation
  const has_dynamic_elements: boolean = /<.*?>/.test(
    JSON.stringify(output_format)
  );
  const is_array_output: boolean = list_input;

  let error_msg: string = '';

  // Retry logic for handling API failures and formatting issues
  for (let i = 0; i < num_tries; i++) {
    // Streamlined prompt building for MCQ generation
    let format_instructions = `\nReturn a valid JSON ${
      is_array_output ? 'array' : 'object'
    } with this exact structure: ${JSON.stringify(output_format)}`;

    // MCQ-specific instructions (since this is your primary use case)
    format_instructions += `\nFor multiple choice questions:
    \n- 'answer' must be the correct option
    \n- 'option1', 'option2', 'option3' must be incorrect but plausible alternatives
    \n- All options must be unique and under 15 words
    \n- Never use double quotes (") in any text, use single quotes (') if needed`;

    if (has_dynamic_elements) {
      format_instructions += `\nReplace <placeholders> with actual content.`;
    }

    if (is_array_output) {
      format_instructions += `\nGenerate ${
        Array.isArray(user_prompt) ? user_prompt.length : 1
      } questions as a JSON array.`;
    }

    format_instructions += `\nReturn only the JSON ${
      is_array_output ? 'array' : 'object'
    } - no markdown, explanations, or extra text.`;

    const full_prompt = `${system_prompt}${format_instructions}${error_msg}\n\nUser: ${user_prompt.toString()}`;

    try {
      const response = await ai.models.generateContent({
        model,
        contents: full_prompt,
      });

      let raw_response =
        response.candidates?.[0]?.content?.parts?.[0]?.text || '';

      raw_response = raw_response
        .replace(/```(?:json)?\s*/g, '')
        .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, ' ')
        .trim();

      const json_match = is_array_output
        ? raw_response.match(/\[[\s\S]*\]/)
        : raw_response.match(/\{[\s\S]*\}/);

      if (!json_match) {
        throw new Error('No valid JSON found in response');
      }

      let cleaned_json = json_match[0];

      cleaned_json = cleaned_json
        .replace(/\\"/g, "'")
        .replace(/,(\s*[}\]])/g, '$1'); // Remove trailing commas

      let output = JSON.parse(cleaned_json);

      // Convert single object to array for consistent processing
      if (!Array.isArray(output)) {
        output = [output];
      }

      // Simplified validation - only check required fields exist
      for (const item of output) {
        for (const required_key of Object.keys(output_format)) {
          if (!(required_key in item)) {
            throw new Error(`Missing required field: ${required_key}`);
          }
        }

        // Final quote cleanup
        Object.keys(item).forEach((key) => {
          if (typeof item[key] === 'string') {
            item[key] = item[key].replace(/"/g, "'");
          }
        });
      }

      // Return appropriate format based on input
      return list_input ? output : output[0];
    } catch (error) {
      console.log(error, '<<<<<<<< ERROR');
      error_msg = `\n\nPrevious attempt failed: ${error}`;
      if (verbose) {
        console.log(`Attempt ${i + 1} failed:`, error);
      }
    }
  }

  return list_input ? [] : {};
}

/**
 * Fallback validation when AI is unavailable
 */
function basicTopicValidation(topic: string): {
  isValid: boolean;
  reason?: string;
} {
  // Check for gibberish (too many consonants in a row, random patterns)
  const gibberishPattern =
    /[bcdfghjklmnpqrstvwxyz]{4,}|[0-9]{3,}|[^a-zA-Z0-9\s]{2,}/i;

  if (gibberishPattern.test(topic)) {
    return {
      isValid: false,
      reason: 'Topic appears to contain random characters or gibberish',
    };
  }

  // Check for excessive length or word count
  const words = topic.split(' ').filter((word) => word.length > 0);
  if (words.length > 5) {
    return {
      isValid: false,
      reason: 'Topic is too long. Please use 1-5 words maximum',
    };
  }

  return { isValid: true };
}

/**
 * Validates if a topic is appropriate and educational using AI
 */
export async function validateTopic(topic: string): Promise<{
  isValid: boolean;
  reason?: string;
}> {
  try {
    const result = await generateStructuredResponse(
      `You are a topic validator for educational quizzes. Determine if the given topic is:
      1. Educational and appropriate for quiz questions
      2. Not gibberish or random characters
      3. Not offensive or inappropriate
      4. A real subject that can have factual questions`,
      `Validate this topic: "${topic}"`,
      {
        isValid: 'true or false',
        reason: 'brief explanation if invalid (max 20 words)',
      }
    );

    console.log(result, '<<<< AI');

    return {
      isValid: result.isValid === 'true',
      reason: result.reason || undefined,
    };
  } catch (error) {
    console.error('Topic validation error:', error);
    // Fallback to basic validation if AI fails
    const basicValidation = basicTopicValidation(topic);
    return basicValidation;
  }
}
