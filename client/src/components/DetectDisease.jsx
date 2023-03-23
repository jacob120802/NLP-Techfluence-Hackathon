import React, { useState } from 'react';

function DetectDisease() {
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({rawtext: inputText})
    });

    const data = await response.json();
    setResultText(data.result);
  };

  return (
    <div className="mx-auto max-w-md p-4 bg-gray-100 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="mb-2 font-semibold text-gray-700">
          Enter Text:
          <input type="text" value={inputText} onChange={handleInputChange} className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </label>
        <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
          Submit
        </button>
      </form>
      {resultText && (
        <div className="mt-4">
          <h2 className="font-semibold text-gray-700">Result:</h2>
          <p className="mt-2 text-gray-600">{resultText}</p>
        </div>
      )}
    </div>
  );
}

export default DetectDisease;