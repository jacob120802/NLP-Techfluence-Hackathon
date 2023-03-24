import React, { useState,useEffect } from 'react';

function BMICalculator(props) {
    useEffect(() => {
        document.title = props.title
    }, [])

    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [bodyType, setBodyType] = useState('')

    const calculateBmi = () => {
        const bmiValue = (weight / (height / 100) ** 2).toFixed(2);
        setBmi(bmiValue);
        if (bmiValue < 18.5) {
            setBodyType('Underweight');
        }
        else if (bmiValue >= 18.5 && bmiValue < 25) {
            setBodyType('Normal');
        }
        else if (bmiValue >= 25 && bmiValue < 30) {
            setBodyType('Overweight');
        }
        else{
            setBodyType('Obese');
        }
    };

    return (
        <div className="bg-zinc-200 h-[100vh] flex flex-col justify-center sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="mb-4">
                        <label htmlFor="weight" className="block text-gray-700 font-medium mb-2">
                            Weight (kg)
                        </label>
                        <input
                            type="number"
                            name="weight"
                            id="weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            autoComplete="off"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="height" className="block text-gray-700 font-medium mb-2">
                            Height (cm)
                        </label>
                        <input
                            type="number"
                            name="height"
                            id="height"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            autoComplete="off"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <button onClick={calculateBmi} className="w-full bg-indigo-600 text-white p-3 rounded">
                            Calculate BMI
                        </button>
                    </div>
                    {bmi && (
                        <div>
                            <p className="text-gray-700 font-medium mb-2 text-center">BMI: {bmi}</p>
                            <p className="text-gray-700 font-medium mb-2 text-center">{bodyType}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BMICalculator
