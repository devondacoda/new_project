export const formatInput = input => input.toLowerCase().replace(/[^a-z\s]/g, '');
export const checkAnswer = (answer, input) => answer === input;
